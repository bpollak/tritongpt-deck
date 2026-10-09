#!/usr/bin/env python3
"""Rebuild the 90-second Cabinet demo using only original native app captures.

Requires ffmpeg and ffprobe on PATH. Source PNGs remain unchanged.
Example:
  python3 scripts/rebuild-cabinet-productivity.py \
    --source-dir /Users/bpollak/dev/cabinet-productivity-capture-20261008
"""
import argparse
import hashlib
import json
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
SEGMENTS = [
    # source, duration, crop x/y/width/height, reason (manifest only)
    ("harness-productivity-source-fresh.png", 9, (1834, 0, 1920, 1080),
     "Actual CSV preview and source-file navigation; native pixels, no enlargement."),
    ("harness-productivity-request-fresh.png", 12, (920, 520, 1920, 1080),
     "Actual prompt composer, local output requirements, and visible GLM selection."),
    ("harness-productivity-working-fresh.png", 9, (920, 0, 1920, 1080),
     "Actual submitted prompt and Running python3 execution status."),
    ("productivity-excel-formula-fresh.png", 15, (0, 0, 2720, 1530),
     "Native Excel formula bar, selected Room average, counts, comments, and source line."),
    ("productivity-excel-dashboard-fresh.png", 8, (60, 620, 1920, 1080),
     "Actual ratings chart and workbook labels at native pixel size."),
    ("productivity-excel-dashboard-fresh.png", 7, (3200, 620, 1920, 1080),
     "Actual comment-count chart at native pixel size."),
    ("productivity-powerpoint-chart-final.png", 10, (875, 318, 3760, 2115),
     "Actual final PowerPoint slide canvas with editable ratings chart."),
    ("productivity-powerpoint-decisions-final.png", 10, (875, 318, 3760, 2115),
     "Actual final PowerPoint slide canvas with recorded decisions."),
    ("productivity-powerpoint-actions-final.png", 10, (875, 318, 3760, 2115),
     "Actual repaired PowerPoint slide canvas with owners and unresolved questions."),
]


def run(args):
    return subprocess.run(args, check=True, capture_output=True, text=True)


def probe(path):
    return json.loads(run(["ffprobe", "-v", "error", "-show_streams",
                           "-show_format", "-of", "json", str(path)]).stdout)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source-dir", required=True, type=Path)
    parser.add_argument("--output-dir", type=Path,
                        default=ROOT / "public/media/cabinet")
    parser.add_argument("--manifest", type=Path,
                        default=ROOT / "docs/cabinet-productivity-media-manifest.json")
    args = parser.parse_args()
    source = args.source_dir.resolve()
    output = args.output_dir.resolve()
    output.mkdir(parents=True, exist_ok=True)
    args.manifest.parent.mkdir(parents=True, exist_ok=True)
    video = output / "cabinet-personal-productivity-clean.mp4"
    poster = output / "cabinet-personal-productivity-clean-poster.jpg"
    records = []
    clock = 0
    for name, duration, crop, reason in SEGMENTS:
        path = source / name
        stream = probe(path)["streams"][0]
        width, height = stream["width"], stream["height"]
        x, y, w, h = crop
        assert x >= 0 and y >= 0 and x + w <= width and y + h <= height
        assert w >= 1920 and h >= 1080, "Never enlarge a small crop"
        assert w * 1080 == h * 1920, "Crop must fill 16:9 without stretching"
        records.append({"source": name, "source_dimensions": [width, height],
                        "source_sha256": hashlib.sha256(path.read_bytes()).hexdigest(),
                        "start_seconds": clock, "duration_seconds": duration,
                        "crop_xywh": crop, "crop_reason": reason})
        clock += duration
    assert clock == 90
    with tempfile.TemporaryDirectory(prefix="cabinet-productivity-") as temp:
        work = Path(temp)

        def encode(item):
            i, record = item
            x, y, w, h = record["crop_xywh"]
            target = work / f"segment-{i}.mp4"
            vf = (f"crop={w}:{h}:{x}:{y},"
                  "scale=1920:1080:flags=lanczos:out_range=tv:out_color_matrix=bt709,"
                  "setsar=1,format=yuv420p")
            run(["ffmpeg", "-y", "-hide_banner", "-loglevel", "error",
                 "-loop", "1", "-framerate", "30", "-i", str(source / record["source"]),
                 "-t", str(record["duration_seconds"]), "-vf", vf, "-an",
                 "-c:v", "libx264", "-preset", "medium", "-crf", "16",
                 "-threads", "2", "-pix_fmt", "yuv420p", "-color_range", "tv",
                 "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709",
                 str(target)])
            return target

        with ThreadPoolExecutor(max_workers=2) as pool:
            parts = list(pool.map(encode, enumerate(records)))
        concat = work / "concat.txt"
        concat.write_text("".join(f"file '{part.name}'\n" for part in parts))
        staged = work / video.name
        run(["ffmpeg", "-y", "-hide_banner", "-loglevel", "error",
             "-f", "concat", "-safe", "0", "-i", str(concat),
             "-c", "copy", "-movflags", "+faststart", str(staged)])
        info = probe(staged)
        stream = info["streams"][0]
        assert (stream["width"], stream["height"], stream["codec_name"]) == (1920, 1080, "h264")
        assert stream["pix_fmt"] == "yuv420p"
        assert stream["r_frame_rate"] == "30/1"
        assert abs(float(info["format"]["duration"]) - 90) < 0.05
        staged_poster = work / poster.name
        run(["ffmpeg", "-y", "-hide_banner", "-loglevel", "error",
             "-ss", "46", "-i", str(staged), "-frames:v", "1", "-q:v", "2",
             str(staged_poster)])
        video.write_bytes(staged.read_bytes())
        poster.write_bytes(staged_poster.read_bytes())
    manifest = {"duration_seconds": clock, "dimensions": [1920, 1080],
                "codec": "H.264", "pixel_format": "yuv420p", "fps": 30,
                "crf": 16, "added_graphics": False, "added_captions": False,
                "audio": False, "letterboxing": False,
                "source_directory": str(source),
                "media_type": "Edited sequence of authentic screen captures; not continuous video.",
                "limitations": ["Static keyframes preserve the original 90-second edit timing.",
                                "Focused crops omit peripheral app chrome and some source rows.",
                                "Original app content, native labels, cursor, and PowerPoint template footer remain visible.",
                                "No content was redrawn, composited, or fabricated."],
                "segments": records,
                "video_sha256": hashlib.sha256(video.read_bytes()).hexdigest(),
                "poster_sha256": hashlib.sha256(poster.read_bytes()).hexdigest(),
                "poster_time_seconds": 46}
    args.manifest.write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"Rebuilt {video}\nPoster: {poster}\nManifest: {args.manifest}")


if __name__ == "__main__":
    main()
