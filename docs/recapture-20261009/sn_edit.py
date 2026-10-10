import subprocess, sys
SRC='/Users/bpollak/dev/tritongpt-deck-cabinet-20261009/public/media/cabinet/cabinet-servicenow-wide.mp4'
OUT=sys.argv[1]
fps=30
# (start, end, zoom, cx, cy) in seconds / source pixels (2560x1600)
wins=[(3.2,6.3,2.5,2380,118),(7.0,14.6,1.65,1280,420),(15.4,17.9,1.25,1120,450),
      (21.0,25.3,2.5,2380,118),(26.0,34.6,1.65,1280,420),(35.4,39.5,1.25,1120,450)]
ramp=0.5
terms=[];xs=[];ys=[]
for a,b,z,cx,cy in wins:
    A,B,R=int(a*fps),int(b*fps),int(ramp*fps)
    up=f"clip((in-{A})/{R},0,1)"; dn=f"(1-clip((in-{B-R})/{R},0,1))"
    w=f"({up}*{up}*(3-2*{up}))*{dn}*(1-0)"
    terms.append(f"{z-1}*{w}")
    xs.append((A,B,cx)); ys.append((A,B,cy))
zexpr="1+"+"+".join(terms)
def pick(lst,default):
    e=str(default)
    for A,B,c in reversed(lst): e=f"if(between(in,{A-1},{B+1}),{c},{e})"
    return e
cx=pick(xs,1280); cy=pick(ys,800)
x=f"min(max({cx}-iw/zoom/2,0),iw-iw/zoom)"; y=f"min(max({cy}-ih/zoom/2,0),ih-ih/zoom)"
Y="0xFFCD00"
def hl(x,y,w,h,en):
    return (f"drawbox=x={x}:y={y}:w={w}:h={h}:color={Y}@0.34:t=fill:enable='{en}',"
            f"drawbox=x={x-6}:y={y-6}:w={w+12}:h={h+12}:color={Y}@0.95:t=6:enable='{en}'")
vf=",".join([
  hl(2206,86,346,64,"between(t,0,6.4)+between(t,18,25.4)"),
  hl(616,500,1328,52,"between(t,7.6,15)+between(t,26.6,35)"),
  hl(1716,640,418,48,"between(t,15.3,18)+between(t,35.3,40)"),
  "tpad=stop_mode=clone:stop_duration=1.5",
  f"zoompan=z='{zexpr}':x='{x}':y='{y}':d=1:s=2560x1600:fps={fps}",
  "format=yuv420p"])
subprocess.run(['ffmpeg','-y','-loglevel','error','-i',SRC,'-vf',vf,'-c:v','libx264','-preset','slow','-crf','18','-movflags','+faststart','-an',OUT],check=True)
print('done')
