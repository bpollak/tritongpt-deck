#!/usr/bin/env python3
"""Reuse original captured outputs from the public Harness training opening."""
import argparse
import base64
import hashlib
import json
from pathlib import Path
import re
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]


def run(args):
    return subprocess.run(args, check=True, capture_output=True, text=True).stdout


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--training-html', type=Path, required=True)
    args = parser.parse_args()
    source = args.training_html.read_text()
    media = ROOT / 'public/media/cabinet'
    video = media / 'cabinet-harness-outputs.mp4'
    poster = media / 'cabinet-harness-outputs-poster.jpg'
    records = []
    with tempfile.TemporaryDirectory(prefix='cabinet-outputs-') as folder:
        work = Path(folder)
        parts = []
        for index, (key, description) in enumerate([
            ('v20ExcelDash', 'Full native Excel window: survey dashboard and charts'),
            ('v20Ppt3', 'Full native PowerPoint window: editable briefing chart'),
            ('v20AppPage', 'Complete captured app page: campus workshop registration'),
        ]):
            matches = re.findall(r'SHOTS\.' + re.escape(key) +
                                 r'\s*=\s*[\'\"]data:image/(\w+);base64,([^\'\"]+)[\'\"]', source)
            if not matches:
                raise ValueError(f'Missing original capture: {key}')
            kind, data = matches[-1]
            image = work / f'{key}.{kind}'
            image.write_bytes(base64.b64decode(data))
            dimensions = json.loads(run(['ffprobe', '-v', 'error', '-show_entries',
                                         'stream=width,height', '-of', 'json', str(image)]))['streams'][0]
            part = work / f'{index}.mp4'
            run(['ffmpeg', '-y', '-v', 'error', '-loop', '1', '-i', str(image), '-t', '8',
                 '-vf', 'scale=2560:1440:force_original_aspect_ratio=decrease:flags=lanczos,'
                 'pad=2560:1440:(ow-iw)/2:(oh-ih)/2:black,setsar=1',
                 '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', '-threads', '2',
                 '-pix_fmt', 'yuv420p', '-r', '30', '-movflags', '+faststart', str(part)])
            parts.append(part)
            records.append({'source_key': f'SHOTS.{key}', 'description': description,
                            'source_image_sha256': sha(image), 'source_dimensions': dimensions,
                            'start_seconds': index * 8, 'duration_seconds': 8,
                            'treatment': 'Held original capture; full frame, no synthetic motion'})
        playlist = work / 'parts.txt'
        playlist.write_text(''.join(f"file '{part}'\n" for part in parts))
        run(['ffmpeg', '-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', str(playlist),
             '-c', 'copy', '-movflags', '+faststart', str(video)])
    run(['ffmpeg', '-y', '-v', 'error', '-i', str(video), '-frames:v', '1', '-q:v', '2', str(poster)])
    run(['ffmpeg', '-v', 'error', '-i', str(video), '-f', 'null', '-'])
    metadata = json.loads(run(['ffprobe', '-v', 'error', '-show_entries',
                              'format=duration:stream=width,height,profile,level', '-of', 'json', str(video)]))
    manifest = {
        'name': 'productivity', 'video': video.name, 'poster': poster.name,
        'video_sha256': sha(video), 'metadata': metadata, 'segments': records,
        'source_url': 'https://tritonai.ucsd.edu/training/harness/',
        'source_html_sha256': sha(args.training_html),
        'source_qualification': 'Original real captures embedded in the training opening, recorded September 2026 on Nightly 0.3.5.20260926.39. Prepared sample survey and workshop outputs. These are held captures from recorded runs, not a new continuous task recording. The training contains rebuilt scenes elsewhere; none are included here.',
        'output_treatment': 'Silent 24-second montage; original captured views contained in a 2560×1440 canvas. No crop, digital zoom, labels, headers, footers, or generated UI. Native input resolution is 2000–2400 pixels wide; encoding does not add source detail.',
    }
    (ROOT / 'docs/cabinet-harness-outputs-manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
    print(json.dumps({'video': video.name, 'duration': metadata['format']['duration']}))


if __name__ == '__main__':
    main()
