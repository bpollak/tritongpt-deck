"""Rebuild the contract demo with the entire recorded Word window intact."""
from pathlib import Path
from PIL import Image
import argparse, hashlib, json, subprocess

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--source', type=Path, required=True)
parser.add_argument('--work-dir', type=Path, required=True)
parser.add_argument('--output-dir', type=Path, default=Path(__file__).resolve().parents[1] / 'public/media/cabinet')
parser.add_argument('--manifest', type=Path, default=Path(__file__).resolve().parents[1] / 'docs/cabinet-contract-word-manifest.json')
args = parser.parse_args()
source, work, output = args.source.resolve(), args.work_dir.resolve(), args.output_dir.resolve()
work.mkdir(parents=True, exist_ok=True)
output.mkdir(parents=True, exist_ok=True)
log = json.loads((source / 'frame-log.json').read_text())
segments = [
    ('Agreement in Word', 4, ['01-agreement.png']),
    ('Rules selected in the add-in', 6, ['02-rules.png']),
    ('Business context and options', 5, ['03-ready.png', '04-review-started.png']),
    ('Actual rule pass and changes appearing', 10, ['05-progress.png', '09-progress.png', '14-progress.png', '17-latest.png']),
    ('Review complete with tracked changes and comments', 6, ['20-complete.png']),
    ('Reviewing the proposed preamble changes', 12, [log[i]['file'] for i in range(771, 797)]),
    ('Navigating indemnity and liability changes', 10, [log[i]['file'] for i in range(816, 837)]),
    ('Rule-linked explanation beside the document', 7, ['23-rule-explanation.png']),
    ('Follow-up question and actual response', 5, [log[i]['file'] for i in range(837, 854)]),
    ('Response alongside the reviewed agreement', 5, ['26-summary-visible.png']),
]
concat, entries = [], []
for label, duration, names in segments:
    for name in names:
        path = source / name
        with Image.open(path) as image:
            assert image.size == (3440, 2658), (name, image.size)
        concat += [f"file '{path}'", f'duration {duration / len(names):.9f}']
    entries.append({'label': label, 'duration_seconds': duration, 'sources': names, 'source_dimensions': [3440, 2658], 'crop': None})
concat.append(f"file '{source / names[-1]}'")
(work / 'concat.txt').write_text('\n'.join(concat) + '\n')
name = 'cabinet-contract-review-word-window'
video, poster = output / (name + '.mp4'), output / (name + '-poster.jpg')
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', str(work / 'concat.txt'), '-t', '70', '-vf', 'scale=2560:1978:flags=lanczos,fps=30,setsar=1,format=yuv420p', '-c:v', 'libx264', '-preset', 'fast', '-crf', '16', '-profile:v', 'high', '-level:v', '5.1', '-threads', '2', '-an', '-movflags', '+faststart', str(video)], check=True)
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-ss', '29', '-i', str(video), '-frames:v', '1', '-q:v', '1', str(poster)], check=True)
probe = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'stream=codec_name,width,height,r_frame_rate:format=duration', '-of', 'json', str(video)]))
assert abs(float(probe['format']['duration']) - 70) < .01
manifest = {'date': '2026-10-08', 'video': '/media/cabinet/' + video.name, 'poster': '/media/cabinet/' + poster.name, 'source_directory': str(source), 'treatment': 'Entire original Word window throughout: ribbon, document, tracked changes, comments and Contract Review task pane remain together in their real positions. No callout crops, camera pans, magnification, composited panels, added titles, captions or footers. Original aspect ratio preserved with a single downscale. Processing time shortened and native recorded frames held for narration; not continuous real time.', 'duration_seconds': 70, 'source_dimensions': [3440, 2658], 'export_dimensions': [2560, 1978], 'fps': 30, 'crf': 16, 'segments': entries, 'video_sha256': hashlib.sha256(video.read_bytes()).hexdigest(), 'poster_sha256': hashlib.sha256(poster.read_bytes()).hexdigest(), 'probe': probe}
args.manifest.parent.mkdir(parents=True, exist_ok=True)
args.manifest.write_text(json.dumps(manifest, indent=2) + '\n')
print(json.dumps(probe), flush=True)
