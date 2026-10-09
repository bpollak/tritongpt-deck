#!/usr/bin/env python3
"""Encode executive clips from timestamped, uncropped computer-use captures."""
import argparse
import hashlib
import json
from pathlib import Path
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]


def run(args):
    return subprocess.run(args, check=True, capture_output=True, text=True).stdout


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def encode(name, dimensions, segments, poster_time):
    media = ROOT / 'public/media/cabinet'
    destination = media / f'cabinet-{name}-wide.mp4'
    records = []
    with tempfile.TemporaryDirectory(prefix='cabinet-final-') as folder:
        work = Path(folder)
        parts = []
        for index, (log_path, start, duration) in enumerate(segments):
            log = json.loads(log_path.read_text())
            frames = log['frames']
            if start + duration > log['duration']:
                raise ValueError(f'Edit exceeds source: {log_path}')
            concat = work / f'{index}.ffconcat'
            lines = ['ffconcat version 1.0']
            for i, frame in enumerate(frames):
                end = frames[i + 1]['time'] if i + 1 < len(frames) else log['duration']
                lines.extend([f"file '{log_path.parent / frame['file']}'", f"duration {end - frame['time']:.6f}"])
            lines.append(f"file '{log_path.parent / frames[-1]['file']}'")
            concat.write_text('\n'.join(lines) + '\n')
            part = work / f'{index}.mp4'
            run(['ffmpeg', '-y', '-v', 'error', '-safe', '0', '-i', str(concat),
                 '-ss', str(start), '-t', str(duration), '-vf',
                 f'scale={dimensions[0]}:{dimensions[1]}:force_original_aspect_ratio=decrease:flags=lanczos,'
                 f'pad={dimensions[0]}:{dimensions[1]}:(ow-iw)/2:(oh-ih)/2:black,setsar=1',
                 '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', '-threads', '2',
                 '-pix_fmt', 'yuv420p', '-r', '30', '-movflags', '+faststart', str(part)])
            parts.append(part)
            records.append({'source': str(log_path), 'source_sha256': sha(log_path),
                            'start_seconds': start, 'duration_seconds': duration,
                            'source_frames': len(frames), 'source_duration_seconds': log['duration']})
        playlist = work / 'parts.txt'
        playlist.write_text(''.join(f"file '{part}'\n" for part in parts))
        run(['ffmpeg', '-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', str(playlist),
             '-c', 'copy', '-movflags', '+faststart', str(destination)])
    poster = media / f'cabinet-{name}-wide-poster.jpg'
    run(['ffmpeg', '-y', '-v', 'error', '-ss', str(poster_time), '-i', str(destination),
         '-frames:v', '1', '-q:v', '2', str(poster)])
    run(['ffmpeg', '-v', 'error', '-i', str(destination), '-f', 'null', '-'])
    metadata = json.loads(run(['ffprobe', '-v', 'error', '-show_entries',
                              'format=duration:stream=width,height', '-of', 'json', str(destination)]))
    return {'name': name, 'video': destination.name, 'poster': poster.name,
            'video_sha256': sha(destination), 'metadata': metadata, 'segments': records}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, required=True)
    parser.add_argument('--office-source', type=Path, required=True)
    args = parser.parse_args()
    learning = encode('learning', (2560, 1600), [
        (args.source / 'learning-nav-frames.json', 1, 4.5),
        (args.source / 'learning-series-frames.json', .5, 4.5),
        (args.source / 'learning-lesson-frames.json', .8, 3.8),
        (args.source / 'learning-instructor-frames.json', 1, 6),
        (args.source / 'learning-check-frames.json', 1.4, 3.8)
    ], 15)
    office_log = args.office_source / 'powerpoint-frames.json'
    office = json.loads(office_log.read_text())
    productivity = encode('productivity', (2560, 1440), [
        (args.source / 'harness-task-full-frames.json', 0, 4),
        (args.source / 'excel-charts-full-frames.json', 0, 6),
        (office_log, 0, office['duration'] - office['frames'][0]['time'])
    ], 7)
    manifest = {
        'purpose': 'Cabinet executive presentation; original app pixels, silent for voice-over',
        'added_headers_footers_captions': False, 'cropping': False, 'digital_zoom': False,
        'speed_changes': False, 'full_frame_aspect_ratio_preserved': True,
        'timing': 'Observed screenshot timing retained in 30 fps encoding; roughly 2-4 distinct captured frames per second. This is not 30 distinct capture frames per second.',
        'source_qualifications': {
            'learning': 'Current public website. Real video playback and brief revisited answer feedback. Existing browser-local quiz progress preserved; no new completion or credential claimed.',
            'productivity': 'Fresh full-window Harness Nightly .63 and Excel captures, plus retained native PowerPoint navigation. Actual files from prepared sample data. Task generation is not replayed. Excel native zoom temporarily adjusted to fit charts and restored. No sending or publication.'
        },
        'clips': [learning, productivity]
    }
    (ROOT / 'docs/cabinet-final-media-manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
    print(json.dumps([{'name': c['name'], 'duration': c['metadata']['format']['duration']} for c in manifest['clips']]))


if __name__ == '__main__':
    main()
