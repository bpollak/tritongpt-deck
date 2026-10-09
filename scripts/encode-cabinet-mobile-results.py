#!/usr/bin/env python3
"""Cut the mobile demo to app context and website results, without task logs."""
import hashlib
import json
from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[1]
MEDIA = ROOT / 'public/media/cabinet'


def run(args):
    return subprocess.run(args, check=True, capture_output=True, text=True).stdout


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    source = MEDIA / 'cabinet-mobile-website-clean.mp4'
    video = MEDIA / 'cabinet-mobile-results.mp4'
    poster = MEDIA / 'cabinet-mobile-results-poster.jpg'
    sections = [(0, 3, 'Mobile Harness workspace'), (6, 4, 'Website before the change'),
                (70, 8, 'Website after the change')]
    filters = [f'[0:v]trim=start={start}:duration={duration},setpts=PTS-STARTPTS[v{i}]'
               for i, (start, duration, _) in enumerate(sections)]
    filters.append('[v0][v1][v2]concat=n=3:v=1:a=0[out]')
    run(['ffmpeg', '-y', '-v', 'error', '-i', str(source), '-filter_complex',
         ';'.join(filters), '-map', '[out]', '-an', '-c:v', 'libx264', '-preset',
         'medium', '-crf', '16', '-threads', '2', '-pix_fmt', 'yuv420p', '-r', '30',
         '-movflags', '+faststart', str(video)])
    run(['ffmpeg', '-y', '-v', 'error', '-ss', '10', '-i', str(video), '-frames:v', '1',
         '-q:v', '2', str(poster)])
    run(['ffmpeg', '-v', 'error', '-i', str(video), '-f', 'null', '-'])
    metadata = json.loads(run(['ffprobe', '-v', 'error', '-show_entries',
                              'format=duration:stream=width,height', '-of', 'json', str(video)]))
    manifest = {
        'name': 'mobile', 'video': video.name, 'poster': poster.name,
        'video_sha256': sha(video), 'metadata': metadata,
        'source': source.name, 'source_sha256': sha(source),
        'segments': [{'start_seconds': s, 'duration_seconds': d, 'description': label}
                     for s, d, label in sections],
        'treatment': 'Original portrait pixels and timing. Mobile workspace then website before/after. No task prompt, Markdown file view, commands, checks, or processing log. No crop, zoom, captions, or generated UI. Original recording retained.',
        'source_qualification': 'October 8 simulator and Nightly .63 host capture. The update was made in a separate local website checkout and not published. This short edit shows workspace context and actual before/after website views, not the request being entered or the task executing. Some source views are held original captures. Temporary pairing remains revoked.',
    }
    (ROOT / 'docs/cabinet-mobile-results-manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
    print(json.dumps({'video': video.name, 'duration': metadata['format']['duration']}))


if __name__ == '__main__':
    main()
