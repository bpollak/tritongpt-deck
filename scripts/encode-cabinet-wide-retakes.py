#!/usr/bin/env python3
"""Encode timestamped, uncropped computer-use retakes at their native aspect.

Frames hold for their actual observed interval; no invented UI or motion.
"""
from concurrent.futures import ThreadPoolExecutor
import argparse
import hashlib
import json
from pathlib import Path
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
MEDIA = ROOT / 'public/media/cabinet'
CHAPTERS = {
    'directory': ['directory-opening', 'directory-request-v2', 'directory-results'],
    'passport': ['passport-opening-v2', 'passport-start', 'passport-visit', 'passport-contact', 'passport-readiness'],
    'contract-review': ['word-rules-open', 'word-rule-toggle', 'word-settings-agent-request', 'word-agent-visible'],
    'servicenow': ['servicenow-hardware', 'servicenow-hardware-select', 'servicenow-dns', 'servicenow-dns-select'],
}


def run(args):
    return subprocess.run(args, check=True, capture_output=True, text=True)


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def encode(name, source):
    records = []
    width, height = (2560, 1978) if name == 'contract-review' else (2560, 1600)
    with tempfile.TemporaryDirectory(prefix='cabinet-wide-') as temp:
        folder = Path(temp)
        parts = []
        for chapter in CHAPTERS[name]:
            log_path = source / chapter / 'frames.json'
            log = json.loads(log_path.read_text())
            frames = log['frames']
            lines = ['ffconcat version 1.0']
            for index, frame in enumerate(frames):
                end = frames[index + 1]['time'] if index + 1 < len(frames) else log['duration']
                lines += [f"file '{source / chapter / frame['file']}'", f"duration {end - frame['time']:.6f}"]
            lines += [f"file '{source / chapter / frames[-1]['file']}'"]
            playlist = folder / f'{chapter}.ffconcat'
            playlist.write_text('\n'.join(lines) + '\n')
            target = folder / f'{chapter}.mp4'
            duration = log['duration'] - frames[0]['time']
            run(['ffmpeg', '-y', '-v', 'error', '-safe', '0', '-i', str(playlist),
                 '-t', str(duration), '-vf', f'scale={width}:{height}:flags=lanczos,setsar=1',
                 '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '16',
                 '-threads', '2', '-pix_fmt', 'yuv420p', '-r', '30', str(target)])
            parts.append(target)
            records.append({'source': str(log_path), 'source_log_sha256': sha(log_path),
                            'frame_count': len(frames), 'duration_seconds': duration,
                            'crop': False, 'speed_change': False})
        playlist = folder / 'parts.txt'
        playlist.write_text(''.join(f"file '{part}'\n" for part in parts))
        video = MEDIA / f'cabinet-{name}-wide.mp4'
        poster = MEDIA / f'cabinet-{name}-wide-poster.jpg'
        run(['ffmpeg', '-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', str(playlist),
             '-c', 'copy', '-movflags', '+faststart', str(video)])
        run(['ffmpeg', '-y', '-v', 'error', '-ss', '2', '-i', str(video), '-frames:v', '1', '-q:v', '2', str(poster)])
        run(['ffmpeg', '-v', 'error', '-i', str(video), '-f', 'null', '-'])
        metadata = json.loads(run(['ffprobe', '-v', 'error', '-show_entries',
                                  'format=duration:stream=width,height', '-of', 'json', str(video)]).stdout)
        return {'name': name, 'video': video.name, 'poster': poster.name,
                'video_sha256': sha(video), 'metadata': metadata, 'chapters': records}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', required=True, type=Path)
    args = parser.parse_args()
    with ThreadPoolExecutor(max_workers=2) as pool:
        clips = list(pool.map(lambda name: encode(name, args.source.resolve()), CHAPTERS))
    manifest = {
        'capture_date': '2026-10-08', 'purpose': 'Whole-app capability demonstrations for Cabinet voice-over',
        'crop': False, 'added_titles_or_captions': False, 'generated_ui': False,
        'sampling': 'Timestamped real UI screenshots; observed intervals preserved at 30 fps. Browser about 4 fps; native Word about 1-2 fps. No claim of 30 distinct captured frames each second.',
        'source_qualifications': {
            'directory': 'Live development app; actual expertise query and generated matches. No outreach or selection.',
            'passport': 'Actual application source running locally with prepared sample visitor data. No production queue access or passport eligibility decision.',
            'contract-review': 'Installed Word add-in and public vendor agreement with existing unaccepted tracked changes. Rules deselected/restored; Extra knowledge toggled/restored; actual Talk to agent question and answer. No new review, acceptance, signature, or transmission of agreement.',
            'servicenow': 'Logged-in current interface; actual FieldSupport-Intake 79.9% and Hostmaster 96.9% suggestions from ordinary prepared case descriptions. Scores are not measured accuracy. Selected on unsaved forms, then discarded. No case submitted.',
        }, 'clips': clips,
    }
    (ROOT / 'docs/cabinet-wide-retakes-manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
    print(json.dumps([{ 'name': clip['name'], **clip['metadata']} for clip in clips]))


if __name__ == '__main__':
    main()
