from pathlib import Path
from PIL import Image
import json, subprocess, hashlib, shutil, argparse

parser=argparse.ArgumentParser(description="Rebuild citizen developer app-only demos from high-density computer-use captures")
parser.add_argument('--capture-root',type=Path,required=True)
parser.add_argument('--output-dir',type=Path,default=Path(__file__).resolve().parents[1]/'public/media/cabinet')
args=parser.parse_args()
ROOT=args.capture_root.resolve()
SOURCE=ROOT/'clean-high-density'
DEST=args.output_dir.resolve();DEST.mkdir(parents=True,exist_ok=True)
MOTION=json.loads((SOURCE/'motion-log.json').read_text())
# Crops use only genuine app pixels. No title, footer, caption, backdrop, or UI is drawn.
# (width fraction, horizontal center fraction, top fraction); height is exactly 16:9.
SPECS={
 'directory':[
  (8,'directory-expertise',[],(.72,.50,.20)),
  (3,'directory-processing',[],(.72,.50,.20)),
  (7,'directory-summary',[],(.76,.50,.35)),
  (12,'directory-matches',[('directory-results-scroll',2.5)],(.72,.50,.23)),
  (8,'directory-topic-search',[('directory-directory-transition',1.2),('directory-topic-search',2.5)],(.76,.50,.20)),
  (12,'directory-profile-focused',[('directory-profile-scroll',2.5)],(.64,.62,0)),
 ],
 'passport':[
  (5,'passport-start',[('passport-location-start',2)],(.80,.50,.08)),
  (4,'passport-visit-type',[('passport-walk-in',1.5)],(.72,.50,.12)),
  (4,'passport-contact',[('passport-contact-transition',.7),('passport-contact',1.3)],(.68,.50,.01)),
  (8,'passport-readiness',[('passport-readiness-transition',.8),('passport-application-yes',.8),('passport-missing-photo',2)],(.64,.50,0)),
  (5,'passport-confirmation',[('passport-confirmation',1.8)],(.72,.50,.12)),
  (10,'passport-staff-review',[('passport-staff-review',2)],(.78,.54,.13)),
  (6,'passport-complete',[('passport-complete',2)],(.78,.54,.13)),
  (8,'passport-reports',[('passport-reports',2)],(.76,.54,.13)),
 ]
}

def crop_app(source, spec):
 im=Image.open(source).convert('RGB');w,h=im.size
 cw=min(round(w*spec[0]),round(h*16/9));ch=round(cw*9/16)
 left=max(0,min(w-cw,round(w*spec[1]-cw/2)))
 top=max(0,min(h-ch,round(h*spec[2])))
 box=(left,top,left+cw,top+ch)
 return im.crop(box).resize((1920,1080),Image.Resampling.LANCZOS), {'source_pixels':[w,h],'crop_pixels':list(box),'upsampled':cw<1920 or ch<1080}

manifest={'description':'Fresh actual browser UI captures and native CDP screencast transitions, edited with real state holds to 50 seconds. Not a continuous real-time recording. No UI or output fabricated. No added headers, footers, captions, panels, padding, or synthetic animation. Source captures are native high-density PNG, not enlarged old frames.','capture':json.loads((SOURCE/'capture-manifest.json').read_text()),'encoding':{'width':1920,'height':1080,'fps':30,'codec':'H.264','crf':16,'pixel_format':'yuv420p','audio':False,'subtitle_stream':False},'clips':{}}
for name,segments in SPECS.items():
 frames=SOURCE/f'{name}-clean-edited';frames.mkdir(exist_ok=True)
 concat=[];entries=[];counter=0;clock=0
 def append(path,duration,crop,kind,stage):
  global counter
  im,details=crop_app(path,crop);target=frames/f'{counter:06}.png';im.save(target)
  concat.extend([f"file '{target}'",f'duration {duration:.9f}'])
  entries.append({'source':str(path.relative_to(ROOT)),'duration':duration,'kind':kind,'stage':stage,**details})
  counter+=1
  return im,target
 for total,state,groups,crop in segments:
  used=0
  for stage,seconds in groups:
   raw=[f for f in MOTION if f['stage']==stage]
   if not raw:continue
   weights=[max(.03,min(.35,raw[j+1]['timestamp']-f['timestamp'])) if j+1<len(raw) else .12 for j,f in enumerate(raw)]
   factor=seconds/sum(weights)
   for f,weight in zip(raw,weights):
    im,target=append(SOURCE/f['file'],weight*factor,crop,'native transition',stage)
   used+=seconds
  im,target=append(SOURCE/f'{state}.png',total-used,crop,'actual state hold',state)
  clock+=total
  if (name=='directory' and state=='directory-topic-search') or (name=='passport' and state=='passport-readiness'):
   im.save(SOURCE/f'cabinet-{name}-poster.jpg',quality=96,subsampling=0)
 concat.append(f"file '{target}'")
 concatfile=frames/'concat.txt';concatfile.write_text('\n'.join(concat)+'\n')
 output=SOURCE/f'cabinet-{name}.mp4'
 subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','error','-f','concat','-safe','0','-i',str(concatfile),'-t','50','-vf','fps=30,format=yuv420p','-c:v','libx264','-preset','medium','-crf','16','-an','-threads','2','-movflags','+faststart',str(output)],check=True)
 probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(output)]))
 video=next(s for s in probe['streams'] if s['codec_type']=='video')
 assert video['width']==1920 and video['height']==1080 and video['codec_name']=='h264'
 assert abs(float(probe['format']['duration'])-50)<.04
 assert len(probe['streams'])==1
 assert not any(e['upsampled'] for e in entries)
 manifest['clips'][name]={'duration_seconds':50,'frame_count':int(video['nb_frames']),'native_source_dimensions':sorted({tuple(e['source_pixels']) for e in entries}),'all_crops_at_least_output_resolution':True,'entries':entries,'sha256':hashlib.sha256(output.read_bytes()).hexdigest(),'bytes':output.stat().st_size}
 backup=SOURCE/'previous-public';backup.mkdir(exist_ok=True)
 for filename in [f'cabinet-{name}.mp4',f'cabinet-{name}-poster.jpg']:
  if (DEST/filename).exists() and not (backup/filename).exists():shutil.copy2(DEST/filename,backup/filename)
  shutil.copy2(SOURCE/filename,DEST/filename.replace('.mp4','-clean.mp4').replace('-poster.jpg','-clean-poster.jpg'))
 print(name,video['width'],video['height'],probe['format']['duration'],int(video['nb_frames']),output.stat().st_size)
(SOURCE/'clean-edit-manifest.json').write_text(json.dumps(manifest,indent=2))
