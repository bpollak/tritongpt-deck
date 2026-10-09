import fs from 'node:fs';
import { slides } from '../src/data/slides.js';
import { slideManagerState as state } from '../src/data/slideManagerState.js';

let source = fs.readFileSync('src/data/slides.js', 'utf8');
const edits = new Map();
const personal = structuredClone(slides.find(s => s.slug === 'cabinet-personal-productivity-demo'));
Object.assign(personal, {type:'video', layout:'cabinet-demo', content:[], demoOnly:true,
  videoSrc:'/media/cabinet/cabinet-daily-briefing-debrief.mp4',
  poster:'/media/cabinet/cabinet-daily-briefing-debrief-poster.jpg',
  releaseContext:undefined,
  managerSummary:'Actual morning briefing and evening Chief of Staff debrief emails, with protected details excluded.',
  speakerNotes:'90 seconds. Show the actual October 8 morning briefing and Chief of Staff debrief emails in Outlook. Brett confirmed the debrief arrives by email. Say: In the morning, I have the context for the meetings and previous commitments. At the end of the day, the debrief brings together the decisions and what I need to carry forward. It closes the loop on the daily briefing. This is Brett’s configured personal workflow, not a default feature enabled for every Harness user. Two presentation-safe message views were recorded October 9 and edited morning then evening; this is not a continuous live generation. The full messages include protected material, which is excluded from the capture. Original message text and Outlook framing are preserved; no fabricated output, subtitles or demo banners. Native capture is 1685x1052 pixels; the video pads one pixel rather than claiming an upscaled source is higher resolution. The recorded evening summary is a personal synthesis, not the authoritative source for project dates or availability. Use the separately verified source notes for those claims. Excel and PowerPoint outputs now appear in the enablement film.'});
edits.set(personal.slug,personal);
const passport=structuredClone(slides.find(s=>s.slug==='cabinet-passport-demo'));
passport.durationSeconds=50;
passport.speakerNotes=passport.speakerNotes.replace('Revised allocation: 75 seconds.','Revised allocation: 50 seconds.').replace('Nikki’s additional example is optional and requires her actual material; do not invent a quotation or claim.','Nikki’s October 8 email confirms Passport’s Citizen Developer program context; the next 25-second slide gives two further examples from her actual summary.');
edits.set(passport.slug,passport);
const cash=structuredClone(slides.find(s=>s.slug==='cabinet-cash-receipts-demo'));
cash.speakerNotes=cash.speakerNotes.replace('Roughly $2.6B in annual institutional receipts; current design reports 39% applied without human intervention. ','');
edits.set(cash.slug,cash);
for(const [slug,slide] of edits){
  const pos=source.indexOf(`    "slug": "${slug}"`);
  const start=source.lastIndexOf('\n  {',pos)+1;
  const next=source.indexOf('\n  {',pos);
  const end=next<0?source.lastIndexOf('\n];'):next-1;
  if(pos<0||source.slice(start,end).includes('...'))throw new Error(slug);
  source=source.slice(0,start)+'  '+JSON.stringify(slide,null,2).replaceAll('\n','\n  ')+source.slice(end);
}
const slug='cabinet-department-builders';
if(!slides.some(s=>s.slug===slug)){
  const example={id:1024,slug,type:'content',layout:'cabinet-outline',
    title:'Departments are already building',subtitle:'Examples from IPPS and RRSS',audiences:['cabinet'],
    managerSection:'Citizen Developer Showcase',durationSeconds:25,
    content:[
      {heading:'Core Bio Services pricing',text:'Harness + n8n compares supplier pricing. Team reports 3 hours saved per update, about 150 hours per year.'},
      {heading:'Facilities compliance',text:'n8n extracts inspection findings into Excel and work items. One five-building run: 81 issues extracted in 13 seconds versus about 45 minutes manually.'}
    ],
    speakerNotes:'25 seconds after Passport. Source: Nikki Giaquinta’s RRSS/IPPS AI Projects email, received October 8 at 4:53 PM PT, read directly October 9. These are owner-reported examples, not independently timed or annual audited outcomes. Pricing annualization is 3 hours per update × roughly 50 updates/year = roughly 150 hours/year; no measured observation period was supplied. Same-day pricing suggestions are a stated workflow benefit. Facilities describes extraction/report preparation and work-item creation, not physically fixing 81 compliance issues in 13 seconds. The manual 45-minute baseline is approximate and the automated 13 seconds is one reported five-building run; don’t extrapolate annual savings or imply human remediation takes 13 seconds. No net ROI, implementation cost, dollar conversion, staff reduction or generalized accuracy is asserted. Both show departments supplying workflow knowledge and building focused tools. Green Spend, Concur reconciliation and custodial assignments are additional examples in Nikki’s email for Q&A; early-discussion ServiceNow deflection and Non-PO review are not presented as deployed products. No private records or email addresses shown on this slide.',
    sourceNote:'Source: Nikki Giaquinta · October 8, 2026 · team-reported results'};
  source=source.replace(/\n\];\s*$/,`,\n  ${JSON.stringify(example,null,2).replaceAll('\n','\n  ')}\n];\n`);
}
state.order=state.order.filter(s=>s!==slug);
state.order.splice(state.order.indexOf('cabinet-passport-demo')+1,0,slug);
state.audiences[slug]=['cabinet'];
state.removed=state.removed.filter(s=>s!==slug);
const backups=['cabinet-directory-demo','cabinet-routing-savings','cabinet-research-data-trust','cabinet-training-discovery-demo'];
state.removed=state.removed.filter(s=>!backups.includes(s));
for(const backup of backups){
  state.audiences[backup]=['cabinet-backup'];
  if(!state.order.includes(backup))state.order.push(backup);
}
state.order=state.order.filter(s=>!state.removed.includes(s));
fs.writeFileSync('src/data/slides.js',source);
fs.writeFileSync('src/data/slideManagerState.js','export const slideManagerState = '+JSON.stringify(state,null,2)+';\n\nexport default slideManagerState;\n');
console.log('Updated email film and owner-sourced department examples.');
