"""Guided edit: yellow highlighter boxes plus smooth zooms on a recording.

Usage: python3 guided.py spec.json
spec = {
  "src": "...mp4", "out": "...mp4", "w": 2560, "h": 1600, "fps": 30, "tail": 1.0,
  "zooms": [[start, end, zoom, cx, cy], ...],          # seconds, source pixels
  "highlights": [[x, y, w, h, "between(t,a,b)+..."], ...]
}
Zooms ease in and out over `ramp` seconds (default 0.5) and hold in between.
"""
import json, subprocess, sys

spec = json.load(open(sys.argv[1]))
fps, W, H = spec.get("fps", 30), spec["w"], spec["h"]
ramp = spec.get("ramp", 0.5)
terms, centers = [], []
for a, b, z, cx, cy in spec["zooms"]:
    A, B, R = int(a * fps), int(b * fps), max(1, int(ramp * fps))
    up = f"clip((in-{A})/{R},0,1)"
    dn = f"(1-clip((in-{B - R})/{R},0,1))"
    terms.append(f"{z - 1}*({up}*{up}*(3-2*{up}))*{dn}")
    centers.append((A, B, cx, cy))
zexpr = "1+" + "+".join(terms) if terms else "1"


def pick(i, default):
    e = str(default)
    for A, B, *c in reversed(centers):
        e = f"if(between(in,{A - 1},{B + 1}),{c[i]},{e})"
    return e


x = f"min(max({pick(0, W // 2)}-iw/zoom/2,0),iw-iw/zoom)"
y = f"min(max({pick(1, H // 2)}-ih/zoom/2,0),ih-ih/zoom)"
Y = "0xFFCD00"
filters = []
for hx, hy, hw, hh, en in spec.get("highlights", []):
    filters.append(f"drawbox=x={hx}:y={hy}:w={hw}:h={hh}:color={Y}@0.32:t=fill:enable='{en}'")
    filters.append(f"drawbox=x={hx - 6}:y={hy - 6}:w={hw + 12}:h={hh + 12}:color={Y}@0.95:t=6:enable='{en}'")
if spec.get("tail"):
    filters.append(f"tpad=stop_mode=clone:stop_duration={spec['tail']}")
filters.append(f"zoompan=z='{zexpr}':x='{x}':y='{y}':d=1:s={W}x{H}:fps={fps}")
filters.append("format=yuv420p")
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", spec["src"], "-vf", ",".join(filters),
                "-c:v", "libx264", "-preset", "slow", "-crf", "19", "-movflags", "+faststart", "-an", spec["out"]], check=True)
print("wrote", spec["out"])
