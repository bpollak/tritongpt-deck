#!/usr/bin/env python3
"""Short, silent Cabinet cuts from captured app pixels, with an edit manifest.

No generated UI, captions, zoom animation, or speed changes. Original long
recordings are retained. Office navigation is a new timestamped computer-use
screen recording; its sampling cadence is preserved when encoded at 30 fps.
"""
import argparse
from concurrent.futures import ThreadPoolExecutor
import hashlib
import json
from pathlib import Path
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
MEDIA = ROOT / 'public/media/cabinet'
CUTS = {
    'directory': ('cabinet-directory-clean.mp4', [(0, 3), (20, 9), (40, 10)], 13),
    'passport': ('cabinet-passport-clean.mp4', [(0, 8), (13, 8), (42, 8)], 19),
    'contract-review': ('cabinet-contract-review-word-window.mp4', [(10, 7), (19, 8), (31, 12), (65, 5)], 17),
    'servicenow': ('cabinet-servicenow-routing-natural.mp4', [(0, 3), (9, 8), (18, 3), (27, 8), (40, 5)], 15),
    'learning': ('cabinet-training-discovery-clean.mp4', [(0, 2), (6, 2), (9, 4), (15, 6)], 10),
    'mobile': ('cabinet-mobile-website-clean.mp4', [(12, 6), (42, 6), (60, 6), (70, 8)], 21),
}


def run(args):
    return subprocess.run(args, check=True, capture_output=True, text=True)


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def encode_args():
    return ['-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '16',
            '-threads', '2', '-pix_fmt', 'yuv420p', '-r', '30', '-movflags', '+faststart']


def finish(name, poster_time, records):
    video = MEDIA / f'cabinet-{name}-executive.mp4'
    poster = MEDIA / f'cabinet-{name}-executive-poster.jpg'
    run(['ffmpeg', '-y', '-v', 'error', '-ss', str(poster_time), '-i', str(video),
         '-frames:v', '1', '-q:v', '2', str(poster)])
    # Full decode, not just container metadata.
    run(['ffmpeg', '-v', 'error', '-i', str(video), '-f', 'null', '-'])
    metadata = json.loads(run(['ffprobe', '-v', 'error', '-show_entries',
                              'format=duration:stream=width,height', '-of', 'json', str(video)]).stdout)
    return {'name': name, 'video': video.name, 'poster': poster.name,
            'video_sha256': sha(video), 'metadata': metadata, 'segments': records}


def cut(item):
    name, (source_name, sections, poster_time) = item
    source = MEDIA / source_name
    filters = []
    records = []
    for i, (start, duration) in enumerate(sections):
        filters.append(f'[0:v]trim=start={start}:duration={duration},setpts=PTS-STARTPTS[v{i}]')
        records.append({'source': source_name, 'start_seconds': start, 'duration_seconds': duration})
    filters.append(''.join(f'[v{i}]' for i in range(len(sections))) +
                   f'concat=n={len(sections)}:v=1:a=0[out]')
    run(['ffmpeg', '-y', '-v', 'error', '-i', str(source), '-filter_complex',
         ';'.join(filters), '-map', '[out]', *encode_args(),
         str(MEDIA / f'cabinet-{name}-executive.mp4')])
    return finish(name, poster_time, records)


def office(source_root):
    records = []
    with tempfile.TemporaryDirectory(prefix='cabinet-executive-') as folder:
        work = Path(folder)
        parts = []
        # Brief evidence of the actual Harness task, followed by real Office navigation.
        first = work / 'task.mp4'
        run(['ffmpeg', '-y', '-v', 'error', '-ss', '22', '-i',
             str(MEDIA / 'cabinet-personal-productivity-clean.mp4'), '-t', '3',
             '-vf', 'scale=1920:1080,setsar=1', *encode_args(), str(first)])
        parts.append(first)
        records.append({'source': 'cabinet-personal-productivity-clean.mp4',
                        'start_seconds': 22, 'duration_seconds': 3,
                        'type': 'Authentic held Harness execution capture'})
        for app in ['excel', 'powerpoint']:
            log = json.loads((source_root / f'{app}-frames.json').read_text())
            frames = log['frames']
            concat = work / f'{app}.ffconcat'
            lines = ['ffconcat version 1.0']
            for i, frame in enumerate(frames):
                path = source_root / frame['file']
                end = frames[i+1]['time'] if i+1 < len(frames) else log['duration']
                lines += [f"file '{path}'", f"duration {end-frame['time']:.6f}"]
            lines += [f"file '{source_root / frames[-1]['file']}'"]
            concat.write_text('\n'.join(lines)+'\n')
            target = work / f'{app}.mp4'
            run(['ffmpeg', '-y', '-v', 'error', '-safe', '0', '-i', str(concat),
                 '-t', str(log['duration']-frames[0]['time']), '-vf',
                 'scale=1920:1080:force_original_aspect_ratio=decrease:flags=lanczos,'
                 'pad=1920:1080:(ow-iw)/2:(oh-ih)/2:black,setsar=1',
                 *encode_args(), str(target)])
            parts.append(target)
            records.append({'source': str(source_root / f'{app}-frames.json'),
                            'duration_seconds': log['duration']-frames[0]['time'],
                            'frame_count': len(frames),
                            'type': 'New timestamped native app screen recording',
                            'sha256': sha(source_root / f'{app}-frames.json')})
        playlist = work / 'parts.txt'
        playlist.write_text(''.join(f"file '{part}'\n" for part in parts))
        run(['ffmpeg', '-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i',
             str(playlist), '-c', 'copy', '-movflags', '+faststart',
             str(MEDIA / 'cabinet-productivity-executive.mp4')])
    return finish('productivity', 10, records)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--office-source', required=True, type=Path)
    args = parser.parse_args()
    with ThreadPoolExecutor(max_workers=2) as pool:
        records = list(pool.map(cut, CUTS.items()))
    records.append(office(args.office_source.resolve()))
    manifest = {'purpose': 'Executive capability highlights; silent for presenter voice-over',
                'added_titles_or_captions': False, 'generated_ui': False,
                'speed_changes': False, 'original_long_cuts_retained': True,
                'source_limitations': 'Existing sources combine live screencast segments and authentic held screen captures. These edits do not turn still captures into continuous video. Passport is an isolated local copy; ServiceNow cases were not submitted; mobile edits were not published. Release status and source qualifications remain in presenter notes.',
                'clips': records}
    (ROOT / 'docs/cabinet-executive-media-manifest.json').write_text(json.dumps(manifest, indent=2)+'\n')
    print(json.dumps([{'name': r['name'], 'duration': r['metadata']['format']['duration']} for r in records]))


if __name__ == '__main__':
    main()
