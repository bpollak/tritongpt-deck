#!/usr/bin/env python3
"""Keep the training Excel graphs and add real native PowerPoint navigation."""
import argparse
import hashlib
import json
from pathlib import Path
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
MEDIA = ROOT / 'public/media/cabinet'


def run(args):
    return subprocess.run(args, check=True, capture_output=True, text=True).stdout


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--capture-log', type=Path, required=True)
    args = parser.parse_args()
    log = json.loads(args.capture_log.read_text())
    if log['duration'] < 10:
        raise ValueError('Need ten seconds of recorded navigation')
    source = MEDIA / 'cabinet-harness-outputs.mp4'
    video = MEDIA / 'cabinet-harness-results.mp4'
    poster = MEDIA / 'cabinet-harness-results-poster.jpg'
    encode = ['-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', '-threads',
              '2', '-pix_fmt', 'yuv420p', '-r', '30', '-movflags', '+faststart']
    with tempfile.TemporaryDirectory(prefix='cabinet-release-output-') as folder:
        work = Path(folder)
        parts = [work / f'{i}.mp4' for i in range(3)]
        run(['ffmpeg', '-y', '-v', 'error', '-i', str(source), '-t', '8', *encode, str(parts[0])])
        lines = ['ffconcat version 1.0']
        for i, frame in enumerate(log['frames']):
            end = log['frames'][i + 1]['time'] if i + 1 < len(log['frames']) else log['duration']
            lines.extend([f"file '{args.capture_log.parent / frame['file']}'",
                          f"duration {end - frame['time']:.6f}"])
        lines.append(f"file '{args.capture_log.parent / log['frames'][-1]['file']}'")
        playlist = work / 'frames.ffconcat'
        playlist.write_text('\n'.join(lines) + '\n')
        run(['ffmpeg', '-y', '-v', 'error', '-safe', '0', '-i', str(playlist), '-t', '10',
             '-vf', 'scale=2560:1440:force_original_aspect_ratio=decrease:flags=lanczos,'
             'pad=2560:1440:(ow-iw)/2:(oh-ih)/2:black,setsar=1', *encode, str(parts[1])])
        run(['ffmpeg', '-y', '-v', 'error', '-ss', '16', '-i', str(source), '-t', '6',
             *encode, str(parts[2])])
        playlist = work / 'parts.txt'
        playlist.write_text(''.join(f"file '{part}'\n" for part in parts))
        run(['ffmpeg', '-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', str(playlist),
             '-c', 'copy', '-movflags', '+faststart', str(video)])
    run(['ffmpeg', '-y', '-v', 'error', '-i', str(video), '-frames:v', '1', '-q:v', '2', str(poster)])
    run(['ffmpeg', '-v', 'error', '-i', str(video), '-f', 'null', '-'])
    metadata = json.loads(run(['ffprobe', '-v', 'error', '-show_entries',
                              'format=duration:stream=width,height', '-of', 'json', str(video)]))
    manifest = {
        'name': 'productivity', 'video': video.name, 'poster': poster.name,
        'video_sha256': sha(video), 'metadata': metadata,
        'segments': [
            {'source': source.name, 'source_sha256': sha(source), 'start_seconds': 0,
             'duration_seconds': 8, 'description': 'Original training Excel graphs, full native window'},
            {'source': str(args.capture_log), 'source_sha256': sha(args.capture_log), 'start_seconds': 0,
             'duration_seconds': 10, 'frames': len(log['frames']),
             'description': 'October 9 native PowerPoint: chart, decisions, then actions; real UI navigation'},
            {'source': source.name, 'source_sha256': sha(source), 'start_seconds': 16,
             'duration_seconds': 6, 'description': 'Original training app output'}],
        'treatment': 'Silent. Full captured views, aspect ratios preserved with containment. No crop, digital zoom, speed change, labels, task logs, Markdown files, or rebuilt UI. Original Excel/app views are held captures; PowerPoint preserves observed navigation timing.',
        'source_qualification': 'Excel and app: September training captures, Nightly .39. PowerPoint: October 9 native review of the actual four-slide output generated October 8 on Nightly .63. Prepared workshop data; distinct recorded runs, not one continuous generation. No sending or publication of the underlying files.',
    }
    (ROOT / 'docs/cabinet-release-outputs-manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
    print(json.dumps({'video': video.name, 'duration': metadata['format']['duration']}))


if __name__ == '__main__':
    main()
