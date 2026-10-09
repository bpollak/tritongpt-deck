from pathlib import Path
from PIL import Image, ImageOps
import json,subprocess,shutil,argparse,sys
from concurrent.futures import ThreadPoolExecutor
parser=argparse.ArgumentParser(description="Rebuild app-only Cabinet recordings from original computer-use captures.")
parser.add_argument('--capture-dir',type=Path,required=True,help='Directory with HD logs and source captures')
parser.add_argument('--contract-source',type=Path,required=True)
parser.add_argument('--mobile-source',type=Path,required=True)
parser.add_argument('--output-dir',type=Path,default=Path(__file__).resolve().parents[1]/'public/media/cabinet')
args=parser.parse_args()
R=args.capture_dir.resolve()
D=args.output_dir.resolve();D.mkdir(parents=True,exist_ok=True)
FF=shutil.which('ffmpeg') or 'ffmpeg'
manifest={}
def render(path,crop=None):
 im=Image.open(path).convert('RGB')
 if crop:im=im.crop(tuple(round(v) for v in crop))
 # Only original captured pixels are rendered. Preserve aspect ratio.
 im=ImageOps.contain(im,(1920,1080),method=Image.Resampling.LANCZOS)
 if im.size==(1920,1080):return im
 canvas=Image.new('RGB',(1920,1080),'black');canvas.paste(im,((1920-im.width)//2,(1080-im.height)//2));return canvas
def encode(name,segments,poster=0):
 out=R/name;out.mkdir(exist_ok=True);concat=[];clock=0;num=0;details=[]
 for k,s in enumerate(segments):
  frames=s['frames'];dur=s['duration'];crop=s.get('crop');weights=s.get('weights',[1]*len(frames));scale=dur/sum(weights)
  for j,path in enumerate(frames):
   dst=out/f'{num:05}.png';render(path,crop).save(dst);num+=1
   concat += [f"file '{dst}'",f'duration {weights[j]*scale:.9f}']
   if k==poster and j==len(frames)-1:render(path,crop).save(out/(name+'-poster.jpg'),quality=98,subsampling=0)
  details.append({'sources':[str(p) for p in frames],'duration':dur,'crop':crop});clock+=dur
 concat += [f"file '{dst}'"]
 (out/'concat.txt').write_text('\n'.join(concat)+'\n')
 subprocess.run([FF,'-y','-v','error','-f','concat','-safe','0','-i',str(out/'concat.txt'),'-t',str(clock),'-vf','fps=30,format=yuv420p','-c:v','libx264','-preset','fast','-crf','16','-profile:v','high','-level:v','4.1','-an','-threads','2','-movflags','+faststart',str(out/(name+'.mp4'))],check=True)
 for suffix in ['.mp4','-poster.jpg']:shutil.copyfile(out/(name+suffix),D/(name+'-clean'+suffix))
 manifest[name]={'duration':clock,'size':[1920,1080],'segments':details,'method':'Original captures only; crop/resize, no added text, panels, captions or synthesized UI.'}
 print(name,clock,'seconds',num,'frames',flush=True)

def training():
 log=json.loads((R/'training-hd-log.json').read_text());select=lambda label:[Path(x['file']) for x in log if x['label']==label]
 seg=[]
 for label,dur,crop in [('homepage',3,(0,0,3370,1896)),('learn',3,(0,0,3370,1896)),('discovery-section',3,(260,120,3110,1723)),('library',4,(260,300,3110,1903)),('poster',2,(290,290,2330,1438)),('playback',6,(290,290,2330,1438)),('quiz',3,(280,700,2440,1915)),('feedback',5,(900,650,2500,1550)),('score',7,(280,0,2440,1215))]:
  seg.append({'frames':select(label),'duration':dur,'crop':crop})
 encode('cabinet-training-discovery',seg,4)

def service():
 log=json.loads((R/'servicenow-hd-log.json').read_text());select=lambda label:[Path(x['file']) for x in log if x['label']==label]
 seg=[]
 for label,dur,crop in [('vpn-input',9,(0,0,3370,1896)),('vpn-result',9,(700,80,2670,1188)),('hardware-input',9,(0,0,3370,1896)),('hardware-result',11,(700,80,2670,1188)),('selected-unsaved',12,(300,50,3000,1569))]:
  seg.append({'frames':select(label),'duration':dur,'crop':crop})
 encode('cabinet-servicenow-routing',seg,3)

def contract():
 script=Path(__file__).resolve().parent/'rebuild-cabinet-contract-word.py'
 report=R/'contract-word-window-manifest.json'
 subprocess.run([sys.executable,str(script),'--source',str(args.contract_source.resolve()),'--work-dir',str(R/'contract-word-window'),'--output-dir',str(D),'--manifest',str(report)],check=True)
 manifest['cabinet-contract-review']=json.loads(report.read_text())

def mobile():
 p=args.mobile_source.resolve();out=R/'mobile-native';out.mkdir(exist_ok=True)
 specs=[('mobile-home-raw.mp4',0,6),('mobile-website-before.mp4',0,6),('mobile-website-task-raw.mp4',14,30),('mobile-website-task-raw.mp4',44,8),('mobile-website-task-raw.mp4',324,10),('mobile-website-task-raw.mp4',390,10),('mobile-website-after.mp4',0,10)]
 for i,(src,start,dur) in enumerate(specs):
  subprocess.run([FF,'-y','-v','error','-ss',str(start),'-i',str(p/src),'-t',str(dur),'-vf','setpts=PTS-STARTPTS,tpad=stop_mode=clone:stop_duration=120,fps=30,setsar=1,format=yuv420p','-c:v','libx264','-preset','fast','-crf','16','-profile:v','high','-level:v','5.1','-threads','2','-an',str(out/f'{i}.mp4')],check=True)
 (out/'concat.txt').write_text(''.join(f"file '{out}/{i}.mp4'\n" for i in range(len(specs))))
 dst=out/'cabinet-mobile-website.mp4'
 subprocess.run([FF,'-y','-v','error','-f','concat','-safe','0','-i',str(out/'concat.txt'),'-c','copy','-movflags','+faststart',str(dst)],check=True)
 poster=out/'cabinet-mobile-website-poster.jpg';subprocess.run([FF,'-y','-v','error','-ss','72','-i',str(dst),'-frames:v','1','-q:v','1',str(poster)],check=True)
 shutil.copyfile(dst,D/(dst.stem+'-clean.mp4'));shutil.copyfile(poster,D/'cabinet-mobile-website-clean-poster.jpg')
 manifest['cabinet-mobile-website']={'duration':80,'size':[1206,2622],'segments':specs,'method':'Original native simulator recordings, no downscaling, framing, added titles or overlays. Waiting time edited as before.'};print('mobile 80 seconds native1206x2622',flush=True)

with ThreadPoolExecutor(max_workers=2) as pool:list(pool.map(lambda f:f(),[training,service,contract,mobile]))
(R/'clean-render-manifest.json').write_text(json.dumps(manifest,indent=2))
