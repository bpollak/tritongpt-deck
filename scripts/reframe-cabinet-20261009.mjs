import fs from 'node:fs';
import { slides } from '../src/data/slides.js';
import { slideManagerState as state } from '../src/data/slideManagerState.js';

if (slides.some(slide => slide.slug === 'cabinet-verticals-at-a-glance')) {
  throw new Error('The Cabinet reframing has already been applied.');
}

const file = 'src/data/slides.js';
let source = fs.readFileSync(file, 'utf8');
const bySlug = new Map(slides.map(s => [s.slug, structuredClone(s)]));
const changed = new Set();
const edit = (slug, fields) => { Object.assign(bySlug.get(slug), fields); changed.add(slug); };
fs.writeFileSync('/Users/bpollak/dev/cash-receipts-project-review-20261009/deck-before.json', JSON.stringify({ slides, state }));

edit('cabinet-citizen-developer-story', {
  title: 'Citizen developers, powered by sovereign AI',
  subtitle: 'Help staff turn their knowledge of the work into useful tools.',
  content: [
    { heading: 'People who know the workflow', text: 'Staff and students identify the need, shape the tool, and own the result.' },
    { heading: 'Tools that help them build', text: 'Campus applications, connected workspaces, training, and support.' },
    { heading: 'AI under campus management', text: 'Evaluated models, appropriate data handling, and validation before expansion.' }
  ],
  speakerNotes: 'Opening: 90 seconds including 30 seconds on the unchanged PK title. Staff become builders, not just AI users. Two pillars: citizen development and sovereign, UCSD-managed inference. Give one sentence on UC policy alignment and a person accountable for the workflow. Start with the people and outputs, then explain the engine. Class Planner and Passport demonstrate different AI-assisted development paths; do not claim every example used our Harness or was created by a non-programmer. Transition: Here is what campus builders are already doing.'
});
edit('cabinet-class-planner-demo', { durationSeconds: 75,
  speakerNotes: bySlug.get('cabinet-class-planner-demo').speakerNotes + ' Revised allocation: 75 seconds. Use Kevin’s framing: built quickly, robust usage, now extended by student developers. This is presenter-provided framing, not a newly verified personnel history. Do not name builders or say the original development used TritonAI Harness. End on the recurring student need, rather than each button.' });
edit('cabinet-passport-demo', { durationSeconds: 75,
  speakerNotes: bySlug.get('cabinet-passport-demo').speakerNotes + ' Revised allocation: 75 seconds. Department staff provide workflow knowledge; specialists help support the service. Nikki’s additional example is optional and requires her actual material; do not invent a quotation or claim.' });
edit('cabinet-cash-receipts-demo', {
  layout: 'cabinet-cash-receipts', title: 'Apply received cash faster',
  subtitle: 'Less payment research. Clearer balances. More capacity for staff.',
  content: [], durationSeconds: 120,
  cashReceipts: {
    metrics: [ { value: '$79M', label: 'Average monthly undistributed cash', note: 'Historical business-case baseline' }, { value: '$1.3–3.0M', label: 'Proposed annual financial benefit', note: 'Initial estimate; assumptions being reconciled' } ],
    phases: [ { title: 'Populate receipts', text: 'Collect and normalize payment information.' }, { title: 'Match clear cases', text: 'Use invoice identifiers and approved rules.' }, { title: 'Research complex cases', text: 'Rank possible matches with supporting evidence.' }, { title: 'Resolve the outcome', text: 'Apply, review, request information, or retry.' } ],
    status: 'Discovery → design · Initial delivery target: late 2026 · Phase dates and boundaries being finalized',
    financialDrivers: 'Potential value: staff capacity, improved collections and investment earnings, reduced matching-related risk.'
  },
  sources: [ { label: 'October 5 design', href: 'https://ucsdcollab.atlassian.net/wiki/spaces/AI/pages/3864494148/Solution+Design+Overview' }, { label: 'March 2026 business case', href: 'https://ucsdcollab.atlassian.net/wiki/spaces/AI/pages/4080566338/Modernizing+Cash+Application+ROI' } ],
  pendingNote: undefined, recording: undefined,
  speakerNotes: 'Two minutes. This is a project update, not a recording of a deployed cash matching tool. Roughly $2.6B in annual institutional receipts; current design reports 39% applied without human intervention. Cash already received can remain unapplied while staff research where it belongs; $79M is a historical average monthly undistributed balance, not annual loss, incremental income, or a savings claim. Four development phases follow the October 5 Confluence design. All due dates are TBD and Phase 1 detailed dates are blank. Shawn’s October 8 transcript says discovery is becoming design, integrations remain the main dependency, and the initial easy-matching delivery targets year-end 2026. His older two-phase boundaries are still being reconciled with Alex’s new four-phase documents. Do not equate old Phase 1 to new Receipt Population or promise November go-live. Proposed $1.3M–$3M annual financial benefit comes from the March business-case assumptions republished September 30. It is not measured savings or approved net ROI; costs are not netted and categories must be checked for overlap. Shawn says the sponsor revisited the initial estimate; June email contains updated assumptions. BFS needs to reconcile the estimate before committing to it. Labor hours are not currently measured; emphasize the financial consequences of unapplied balances, collections and accuracy, not a staffing reduction. Staff review unresolved or uncertain matches; automatic application is conditional on approved controls. Ask Cabinet to support integrations, ownership and the cash receipts path.'
});
edit('cabinet-contract-review-demo', { durationSeconds: 90,
  speakerNotes: bySlug.get('cabinet-contract-review-demo').speakerNotes + ' Revised allocation: 90 seconds. The AI team built this current example; the ambition is to give campus builders tools and involvement to develop the next focused workflows. Existing supervised Procurement workflow is production; broad add-in deployment still requires Microsoft trusted-app setup. In the October 8 transcript Shawn identifies OCGA as the next candidate, subject to the contract-type list from Nicole. Advancement and real estate were reviewed and do not fit this use case; do not list them as queued adopters. Plant the ask: prioritize OCGA’s relevant contract types and the next eligible groups. No before/after timing is measured.' });
edit('cabinet-directory-demo', { managerSection: 'Administrative Verticals', durationSeconds: 0,
  speakerNotes: bySlug.get('cabinet-directory-demo').speakerNotes + ' Revised location: optional full recording for Q&A. The active quick-hit film includes an excerpt. October 8 transcript: VCRI demo with Faith Hawkins and Corey went well; next phase continues with Nicole’s team. Source is scraped public data with gaps in arts and humanities; improved backend coverage is a main next-phase task. Shawn explicitly says the name is Directory. Final external naming confirmation with Nicole remains a coordination item, not permission to contact her.' });
edit('cabinet-administrative-quick-hits', { title: 'From requests to the right people', durationSeconds: 45,
  videoSrc: '/media/cabinet/cabinet-administrative-montage.mp4', poster: '/media/cabinet/cabinet-administrative-montage-poster.jpg',
  managerSummary: 'Brief actual ServiceNow routing and Directory results in full app context.',
  speakerNotes: '45 seconds. Actual excerpts from the existing whole-app recordings: ServiceNow specialist routing, then Directory expertise matching. Different workflows and recorded takes; no continuous cross-system action is implied. ServiceNow suggests and staff selects; no case is saved. Model scores are not measured accuracy. Directory remains early-phase, with incomplete public-source data. Following the successful VCRI demonstration with Faith and Corey, Nicole’s team is continuing development; backend data quality, including arts and humanities coverage, is a focus. State those caveats briefly in voice-over. Full recordings remain available in the library for questions. The routing savings model is also retained as backup, with the original assumed 90% accuracy and timing qualifications.'
});
edit('cabinet-harness-mobile-demo', { durationSeconds: 45,
  speakerNotes: bySlug.get('cabinet-harness-mobile-demo').speakerNotes + ' Revised allocation: 45 seconds. Use just two screenshots, Plugins then Skills; avoid the detailed settings tour. Describe plugins as connected tools and skills as reusable working instructions. Native Nightly labels remain visible; distinguish released desktop capabilities from the mobile preview. The phone itself appears in the following enablement film. Do not imply this desktop catalog is the current mobile UI.' });
edit('cabinet-governance', { pendingNote: undefined,
  title: 'Give builders a supported path', subtitle: 'The data, model route, permissions, and action determine the controls.',
  content: [ { heading: 'Use the approved environment', text: 'Match data classification to the service, model route, and use case.' }, { heading: 'Keep access scoped', text: 'Connected tools follow account permissions; choose the appropriate approval mode.' }, { heading: 'Validate before expansion', text: 'Check quality and workflow outcomes with an accountable owner.' } ],
  speakerNotes: '30 seconds. Data classification and UC policy alignment are part of the ecosystem, not blanket approval. P1–P3 only in approved services/setups, model routes and use cases; P4 prohibited under current published product guidance. Selected context is sent to the selected model; tools exchange data with connected services. Campus-managed inference can keep processing on campus for those routes, but commercial routes are distinct. Supervised and Full access are different operating modes; the selected mode determines prompts. A person validates consequential outputs before expansion. TSS downstream behavior is one concrete gate. Existing website update recording uses a local checkout, with publication a separate decision. Current comparison source and privacy guidance were checked October 8/9; do not invent an institutional certification.'
});
edit('cabinet-training-website-demo', { title: 'Learn, then put the tools to work', durationSeconds: 180,
  videoSrc: '/media/cabinet/cabinet-enablement-combined.mp4', poster: '/media/cabinet/cabinet-enablement-combined-poster.jpg',
  managerSummary: 'Single fallback film: training discovery and playback, mobile website update result, then Excel and PowerPoint outputs.',
  speakerNotes: 'Three minutes including narration and one approximately 61-second fallback film. Begin at the TritonAI site, find training, play a short instructor excerpt and show brief knowledge-check feedback. Pivot within the same video block to the actual mobile workspace and website before/after, then the original Excel graphs and native PowerPoint output. Say: The same workspace helps people learn and produce work they can use. This is an edited fallback made from separate actual captured sessions; it is not one continuous live run or a new production publication. The mobile preview directed a Nightly host and changed a separate local website checkout. Publication remains separate, and temporary simulator pairing is revoked. Do not claim the recorded website update went live or reactivate pairing for a stitched playback. If doing a live sequence, use the existing approved demo checkout and stop at review rather than inventing a public website edit. Training: prior browser-local quiz feedback, not a new certificate completion. The original Excel training captures and October 9 native PowerPoint output remain full frame. No added demo headers, footers, Markdown file views, code, logs, captions or digital zoom. Transition: The same pattern can help an executive prepare and follow through each day.'
});
edit('cabinet-personal-productivity-demo', { type: 'content', layout: 'cabinet-outline', title: 'Close the loop on the working day',
  subtitle: '“It closes the loop on the daily briefing.”',
  content: [ { heading: 'Morning: prepare', text: 'Bring meeting context, priorities, and previous commitments together.' }, { heading: 'End of day: debrief', text: 'Review decisions and work completed; identify what still needs follow-through.' }, { heading: 'Next day: act', text: 'Carry forward the next actions, with evidence and an owner.' } ],
  demoOnly: undefined, videoSrc: undefined, poster: undefined, recording: undefined,
  managerSummary: 'Brett’s actual daily briefing and Chief of Staff debrief workflow; presentation-safe capture pending.',
  speakerNotes: '90 seconds. Brett’s exact October 8 explanation: at the end of the day the Chief of Staff debrief looks at the work completed and produces the things he needs to make sure he does the next day; it closes the loop on the daily briefing. Present this as Brett’s personal workflow, not a default Harness feature enabled for every user. Morning briefings are visible in the installed Harness; full sources include protected personnel and family content and cannot be captured indiscriminately. Record only a presentation-safe actual excerpt. A separate debrief surface has not yet been located; until it is supplied, use this concise narrated workflow rather than labeling a fabricated output as real. The Excel/PowerPoint recording now appears in the consolidated enablement film.'
});
edit('cabinet-sovereign-ai', { durationSeconds: 90, subtitle: 'A shared foundation for campus builders, researchers, and UC collaboration.',
  content: [ { heading: 'Campus control', text: 'Evaluate and serve open-weight models through UCSD-managed infrastructure and access controls.' }, { heading: 'Model choice', text: 'Keep campus-hosted inference and approved commercial APIs available for different needs.' }, { heading: 'UC-wide opportunity', text: 'Berkeley researchers already use the gateway. Explore expansion with campus support and clear cost attribution.' } ],
  speakerNotes: bySlug.get('cabinet-sovereign-ai').speakerNotes + ' Revised allocation: 90 seconds. Lead with sovereign AI, the second pillar powering the citizen developer ecosystem and research. Berkeley gateway use is confirmed in Brett/Shawn’s October 8 discussion; expanded campus operationalization and UCOP funding/broker options remain discussion, not an approved UC-wide launch. A support liaison at each campus and token attribution would support expansion. UC Tech News article is still a draft; Dan’s quote awaits his AVC approval and is excluded. Anthropic/OpenAI contract updates are omitted until current terms/status and Pradeep’s preferred wording are confirmed. Keep commercial/open-weight comparison, NVIDIA sources and Navier–Stokes detail in backup for questions. Sovereign refers to service/deployment control, not a promise that every route is on campus GPUs or that data never leaves a workstation.' });
edit('cabinet-asks-close', { title: 'More builders. More useful workflows.', subtitle: 'Support the ecosystem and validate what works.',
  content: [ { heading: 'Prioritize contract review', text: 'Confirm the next eligible groups and contract types, starting with OCGA.' }, { heading: 'Support cash receipts', text: 'Advance the integrations, ownership, and validated financial benefit case.' }, { heading: 'Endorse validation gates', text: 'Require workflow checks and accountable owners before expansion.' } ],
  speakerNotes: 'One minute. Three explicit asks: prioritize the next eligible contract review groups/types, support the cash receipts path, and endorse validation before expansion including TSS. Close: more campus builders, more useful verticals, and a sovereign inference foundation that can support wider UC collaboration. Avoid claiming campus-wide contracts, UCOP funding, or an approved Berkeley quote. Ten minutes of Q&A follows separately. Nikki’s power-user example and Nicole’s contract-type list remain coordination inputs, not placeholders visible to Cabinet.' });

const summary = { id: 1023, slug: 'cabinet-verticals-at-a-glance', type: 'content', layout: 'cabinet-outline', title: 'Apply the pattern across campus work', subtitle: 'Focused tools, expert review, and a clear next step.', audiences: ['cabinet'], managerSection: 'Administrative Verticals', durationSeconds: 45,
 content: [ { heading: 'Transcript matching', text: 'Match coursework; validate downstream TSS behavior before expansion.' }, { heading: 'ServiceNow routing', text: 'Recommend specialist assignment groups; staff reviews the destination.' }, { heading: 'College selection', text: 'Help students explore college fit through self-service guidance.' }, { heading: 'Directory', text: 'VCRI demo advanced to the next phase; improve coverage across arts and humanities.' } ],
 speakerNotes: '45 seconds. Four quick hits, one sentence each; this is a capability showcase, not training. Transcript matching requires the TSS downstream validation/go-live checkpoint before expansion; no new launch date or success metric is asserted. ServiceNow recommendations are assisted selection in unsaved demo forms; do not claim automatic deployment. College selection is an admissions self-service example, not an admission or assignment decision. Directory name and next-phase status follow the October 8 transcript; Nicole’s team continues development after the Faith/Corey demonstration, with incomplete scraped-source coverage a candid limitation. Do not describe early ranking as an institutional faculty evaluation.' };
source = source.replace(/\n\];\s*$/, `,\n  ${JSON.stringify(summary, null, 2).replaceAll('\n', '\n  ')}\n];\n`);
state.audiences[summary.slug] = ['cabinet'];

for (const slug of changed) {
  const marker = `    "slug": "${slug}"`;
  const pos = source.indexOf(marker);
  const start = source.lastIndexOf('\n  {', pos) + 1;
  const next = source.indexOf('\n  {', pos);
  const end = next < 0 ? source.lastIndexOf('\n];') : next - 1;
  if (start < 0 || pos < 0 || end <= start) throw new Error(slug);
  const region = source.slice(start, end);
  if (region.includes('...')) throw new Error(`Do not flatten shared spread ${slug}`);
  source = source.slice(0, start) + '  ' + JSON.stringify(bySlug.get(slug), null, 2).replaceAll('\n', '\n  ') + source.slice(end);
}
fs.writeFileSync(file, source);

const active = ['ai-operating-review-title','cabinet-citizen-developer-story','cabinet-class-planner-demo','cabinet-class-planner-utilization','cabinet-passport-demo','cabinet-cash-receipts-demo','cabinet-contract-review-demo','cabinet-verticals-at-a-glance','cabinet-administrative-quick-hits','cabinet-chat-and-harness','cabinet-harness-mobile-demo','cabinet-governance','cabinet-training-website-demo','cabinet-personal-productivity-demo','cabinet-sovereign-ai','cabinet-scale','cabinet-asks-close'];
const inactive = ['cabinet-directory-demo','cabinet-routing-savings','cabinet-research-data-trust','cabinet-training-discovery-demo'];
state.order = [ ...state.order.filter(s => !s.startsWith('cabinet-') && s !== 'ai-operating-review-title').slice(0,1), ...active, ...state.order.filter(s => !active.includes(s) && s !== state.order[0]) ];
state.order = [...new Set(state.order)];
state.removed = state.removed.filter(s => !active.includes(s));
state.removed = [...new Set([...state.removed, ...inactive])];
fs.writeFileSync('src/data/slideManagerState.js', 'export const slideManagerState = '+JSON.stringify(state,null,2)+';\n\nexport default slideManagerState;\n');
console.log(JSON.stringify({active, changed:[...changed], durationSeconds:1200, unpublished:true},null,2));
