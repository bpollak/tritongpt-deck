"""Build the ServiceNow clip from natural-language case captures."""
from pathlib import Path
from PIL import Image
import argparse, hashlib, json, subprocess

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--capture-dir', type=Path, required=True)
parser.add_argument('--output-dir', type=Path, default=Path(__file__).resolve().parents[1] / 'public/media/cabinet')
parser.add_argument('--manifest', type=Path, default=Path(__file__).resolve().parents[1] / 'docs/cabinet-servicenow-natural-manifest.json')
args = parser.parse_args()
source, output = args.capture_dir.resolve(), args.output_dir.resolve()
work = source / 'edited'
work.mkdir(exist_ok=True)
output.mkdir(parents=True, exist_ok=True)
log = json.loads((source / 'frame-log.json').read_text())
specs = [('vpn-input',9,(0,0,3370,1896)),('vpn-result',9,(700,80,2670,1188)),('hardware-input',9,(0,0,3370,1896)),('hardware-result',11,(700,80,2670,1188)),('selected-unsaved',12,(300,50,3004,1571))]
concat, entries = [], []
for i,(label,duration,crop) in enumerate(specs):
    path = Path(next(x['file'] for x in log if x['label'] == label))
    with Image.open(path) as image:
        dimensions = list(image.size)
        assert crop[2] <= image.width and crop[3] <= image.height
        assert crop[2]-crop[0] >= 1920 and crop[3]-crop[1] >= 1080
        image.convert('RGB').crop(crop).resize((1920,1080),Image.Resampling.LANCZOS).save(work/f'{i:03}.png')
    concat += [f"file '{work/f'{i:03}.png'}'", f'duration {duration}']
    entries.append({'label':label,'source':str(path),'source_dimensions':dimensions,'duration_seconds':duration,'crop':crop})
concat.append(f"file '{work/'004.png'}'")
(work/'concat.txt').write_text('\n'.join(concat)+'\n')
video=output/'cabinet-servicenow-routing-natural.mp4'
poster=output/'cabinet-servicenow-routing-natural-poster.jpg'
subprocess.run(['ffmpeg','-y','-v','error','-f','concat','-safe','0','-i',str(work/'concat.txt'),'-t','50','-vf','fps=30,setsar=1,format=yuv420p','-c:v','libx264','-preset','fast','-crf','16','-profile:v','high','-level:v','4.1','-threads','2','-an','-movflags','+faststart',str(video)],check=True)
subprocess.run(['ffmpeg','-y','-v','error','-ss','30','-i',str(video),'-frames:v','1','-q:v','1',str(poster)],check=True)
probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries','stream=codec_name,width,height,r_frame_rate:format=duration','-of','json',str(video)]))
assert float(probe['format']['duration']) == 50
manifest={'date':'2026-10-08','video':'/media/cabinet/'+video.name,'poster':'/media/cabinet/'+poster.name,'treatment':'Actual ServiceNow UI recaptured with ordinary support-case wording, without visible demo or fictional qualifiers. No text was removed or altered in screenshot pixels. Held keyframes and focused crops at 1920x1080,30fps,CRF16; no added captions or framing. Sample inputs are not submitted production tickets.','submitted':False,'saved':False,'discarded':True,'contact_and_requester_details':'Blank; no real requester/device/location data used','recommendations':{'vpn':[{'group':'ITS-ServiceDesk','score':91.8},{'group':'ITS-SDMI','score':2.3},{'group':'ITS-Hostmaster','score':2.3}],'onsite_hardware':[{'group':'ITS-FieldSupport-Intake','score':79.9},{'group':'ITS-ServiceDesk','score':18.1},{'group':'ITS-RRSS-BAPS','score':0.7}]},'selected_group':'ITS-FieldSupport-Intake','segments':entries,'probe':probe,'video_sha256':hashlib.sha256(video.read_bytes()).hexdigest(),'poster_sha256':hashlib.sha256(poster.read_bytes()).hexdigest()}
args.manifest.parent.mkdir(exist_ok=True,parents=True)
args.manifest.write_text(json.dumps(manifest,indent=2)+'\n')
print(json.dumps(probe),flush=True)
