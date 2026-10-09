#!/usr/bin/env python3
"""Combine existing real captures without overlays, cropping or speed changes."""
import hashlib
import json
from pathlib import Path
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
MEDIA = ROOT / 'public/media/cabinet'
EMAIL = Path('/Users/bpollak/dev/cabinet-email-capture-20261009')
ENCODE = ['-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '16',
          '-threads', '2', '-pix_fmt', 'yuv420p', '-r', '30', '-movflags', '+faststart']
FIT = 'scale=2560:1600:force_original_aspect_ratio=decrease:flags=lanczos,pad=2560:1600:(ow-iw)/2:(oh-ih)/2:black,setsar=1'

def run(args):
    return subprocess.run(args, check=True, capture_output=True, text=True).stdout

def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def finish(parts, stem, folder):
    playlist = folder / (stem + '.txt')
    playlist.write_text(''.join(f"file '{p}'\n" for p in parts))
    video = MEDIA / (stem + '.mp4')
    run(['ffmpeg', '-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', str(playlist),
         '-c', 'copy', '-movflags', '+faststart', str(video)])
    poster = MEDIA / (stem + '-poster.jpg')
    run(['ffmpeg', '-y', '-v', 'error', '-i', str(video), '-frames:v', '1', '-q:v', '2', str(poster)])
    run(['ffmpeg', '-v', 'error', '-i', str(video), '-f', 'null', '-'])
    probe = json.loads(run(['ffprobe', '-v', 'error', '-show_entries',
                           'format=duration:stream=width,height', '-of', 'json', str(video)]))
    return {'video': video.name, 'sha256': digest(video), 'metadata': probe}

manifest = {'date': '2026-10-09', 'publication': 'Local review only', 'films': []}
with tempfile.TemporaryDirectory(prefix='cabinet-revision-') as tmp:
    folder = Path(tmp)
    for stem, inputs in [
        ('cabinet-enablement-combined', [('cabinet-learning-wide.mp4', 0, None),
                                         ('cabinet-mobile-results.mp4', 0, None),
                                         ('cabinet-harness-results.mp4', 0, None)]),
        ('cabinet-administrative-montage', [('cabinet-servicenow-wide.mp4', 15, 16),
                                           ('cabinet-directory-wide.mp4', 0, 4),
                                           ('cabinet-directory-wide.mp4', 24, 8)])]:
        parts = []
        sources = []
        for index, (name, start, duration) in enumerate(inputs):
            source = MEDIA / name
            part = folder / f'{stem}-{index}.mp4'
            command = ['ffmpeg', '-y', '-v', 'error', '-ss', str(start), '-i', str(source)]
            if duration is not None:
                command += ['-t', str(duration)]
            run(command + ['-vf', FIT] + ENCODE + [str(part)])
            parts.append(part)
            sources.append({'file': name, 'sha256': digest(source), 'start': start,
                            'duration': duration or 'full original clip'})
        film = finish(parts, stem, folder)
        film.update(sources=sources, treatment='Separate captured sessions edited into one silent fallback. Full source views contained; no crop, zoom, overlays or speed changes. Portrait mobile view is letterboxed.')
        manifest['films'].append(film)

    email_log = json.loads((EMAIL / 'capture-log.json').read_text())
    parts = []
    for section in email_log['sections']:
        lines = ['ffconcat version 1.0']
        frames = section['frames']
        for index, frame in enumerate(frames):
            end = frames[index + 1]['time'] if index + 1 < len(frames) else section['duration']
            start = frame['time'] if index else 0
            lines.extend([f"file '{EMAIL / frame['file']}'", f'duration {end-start:.6f}'])
        lines.append(f"file '{EMAIL / frames[-1]['file']}'")
        playlist = folder / (section['name'] + '.ffconcat')
        playlist.write_text('\n'.join(lines) + '\n')
        part = folder / (section['name'] + '.mp4')
        # Preserve the native 1685x1052 capture; pad one pixel for H.264's even dimensions.
        run(['ffmpeg', '-y', '-v', 'error', '-safe', '0', '-i', str(playlist), '-t',
             str(section['duration']), '-vf', 'pad=1686:1052:0:0:black,setsar=1',
             *ENCODE, str(part)])
        parts.append(part)
    film = finish(parts, 'cabinet-daily-briefing-debrief', folder)
    film.update(source='Actual October 8 briefing and Chief of Staff debrief emails viewed in Outlook on October 9.',
                treatment='Two real message views captured at approximately 2 fps, preserving observed timing, joined morning then evening. Native 1685x1052 source pixels, one pixel padded. No invented email, text overlays, cropping or digital zoom. Outlook message reading zoom was 175 percent and restored to 100 percent afterward.',
                scope='Only the opening morning brief and presentation-related evening summary. Personnel details, family schedule, financial negotiation details and unrelated inbox are excluded. Not a continuous email-generation recording or a default product feature.')
    manifest['films'].append(film)
(ROOT / 'docs/cabinet-revision-media-manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
print(json.dumps([{ 'video': f['video'], 'metadata': f['metadata'] } for f in manifest['films']]))
