# Cabinet run of show

20 minutes of presentation; 10 minutes of unscripted Q&A follows. The current view includes fresh Harness UI captures, an 80-second mobile website recording, and a 90-second productivity key-frame walkthrough. Other use-case and metric slots remain placeholders.

Open `?audience=cabinet#slide=ai-operating-review-title`. The first slide is the exact existing PK intro, shared through audience assignment. Cabinet-only placeholders follow it. All existing PK and other audience sequences retain their order.

| Slide | Time | Elapsed | Purpose |
| --- | ---: | ---: | --- |
| PK intro: TritonAI Operating Review | 0:30 | 0:30 | Open with the familiar visual |
| Citizen developers, powered by sovereign AI | 1:00 | 1:30 | Establish the two pillars |
| Class Planner | 2:00 | 3:30 | Lead with the builder origin story and a short workflow |
| Passport | 1:00 | 4:30 | Second citizen developer example |
| Cash receipts | 2:00 | 6:30 | Administrative anchor; current phase and proposed ROI |
| Contract review in Word | 1:30 | 8:00 | New add-in; plant the queue prioritization ask |
| Administrative AI: quick updates | 1:30 | 9:30 | Transcript, ticket routing, college assistant, Directory |
| The Harness is everything around the model | 0:45 | 10:15 | Original animation; optional task-choice framing |
| Bigger tasks split across sub-agents | 0:15 | 10:30 | Original website animated SVG |
| TritonAI Harness | 1:00 | 11:30 | UI screenshot talk-through; plugins, skills, key functions |
| Personal productivity | 1:30 | 13:00 | Existing fictional files to Excel charts and a PowerPoint summary |
| Review before expansion | 0:30 | 13:30 | Data, permissions, human review, validation |
| Learn, then build | 3:00 | 16:30 | Mobile request through checked local preview |
| Sovereign AI | 1:15 | 17:45 | UCSD-managed inference and cross-campus use |
| TritonAI at scale | 1:15 | 19:00 | Current metrics and attribution |
| Three decisions for Cabinet | 1:00 | 20:00 | Prioritize, support, endorse |

The optional Berkeley quote is a removed slide, outside the timed sequence. Restore it in the manager only after exact text and attribution are approved; if used, absorb its time within the 2:30 scale section.

## Fresh recording slots

The framing visuals reuse the [current Harness website comparison and animated sub-agent diagram](https://tritonai.ucsd.edu/developer-apis/harness.html), verified October 8, 2026. Their original HTML, SVGs, styling and animations are copied locally, with fonts included. Only the whole composition scales to the slide. The original static component graphics are an optional removed Q&A backup. No graphic has been redesigned or given an invented animation.

### Cabinet comparison framing

The `cabinet-chat-and-harness` slide opens with **Comparison**, a six-row matrix adapted from the website. It uses the same teal / slate / blue column headers, product badges, alternating shared rows, icons, and bold summaries with supporting detail. Each capability occupies one row across both products. **Use cases** is also an aligned table, and **Website animation** retains the original graphic and animation unchanged. The framing slot remains 45 seconds within the 16-slide Cabinet sequence. Highlight system access and human oversight, then move to the UI and productivity demonstrations; the other rows support Q&A.

The workspaces serve complementary tasks. This does not claim a smarter model, identical model inventories, or a replacement for TritonGPT. TritonGPT supports files, retrieval, purpose-built assistants and bounded assistant tools. The original animation is illustrative, not a universal one-prompt capability limit.

| Website matrix row | Default comparison treatment |
| --- | --- |
| Where it runs | Campus browser service versus a Mac/Windows app. The paired phone directs the host, verified in the simulator recording. |
| System access | Uploaded files and assistant context versus opened folders, edits, commands and Git within granted access. |
| Data storage | Campus chats with automatic deletion after 90 days versus local files/history. Selected context goes to the chosen model and tools exchange data with their services. |
| Host plugins | Campus sources and assistant tools versus enabled service plugins. Account permissions and enabled abilities constrain access. |
| Human oversight | Review responses versus choosing an approval mode and inspecting changes/output. Full access can act without prompts; the fictional demonstrations used Full access. |
| Data classification | P1–P3 only in approved services/setups; P4 prohibited. Check the service, model route and use case. |

The separate Use cases table preserves Best fit, Where you work, and Typical result. It connects the saved workbook, briefing deck, and checked website change to our actual new demonstrations. Local Office artifact creation is distinct from Microsoft 365 cloud-plugin access. Copy and presenter qualifications are stored in `workflowComparison` and `speakerNotes` in `src/data/slides.js`.

Sources independently checked October 8, 2026: [Harness comparison matrix and execution architecture](https://tritonai.ucsd.edu/developer-apis/harness.html), [TritonGPT capabilities](https://tritonai.ucsd.edu/tritongpt/index.html), and [TritonGPT privacy policy](https://tritonai.ucsd.edu/tritongpt/privacy.html). The policy independently confirms automatic deletion after 90 days and approved-service qualifications. Compact links and the verification date appear in the adapted views; fuller source and interpretation notes remain available to the presenter. Shared Gateway access does not guarantee matching client model lists or self-hosting on every route.

The `recording.mediaStem` field names each intended capture. It is a planning identifier, not a link to nonexistent media. No old video is assigned to Cabinet.

| Slot | Capture | On-screen material |
| --- | --- | --- |
| `cabinet-class-planner` | Desktop: assemble and check a schedule | Fictional student example |
| `cabinet-passport` | Workflow selected after highlights arrive | Owner-confirmed scenario |
| `cabinet-cash-receipts` | Receipt to human-reviewed result | Fictional receipt |
| `cabinet-contract-review` | New Word add-in, agreement to review | Fictional agreement |
| `cabinet-harness-overview` | Fresh UI screenshots, workspace/plugins/skills/review | Demonstration project |
| `cabinet-training-website` | Website training, mobile request, preview/checks | Approved homepage training edit |
| `cabinet-personal-productivity` | Capture and analyze data, Excel charts, PowerPoint summary | Compact fictional dataset and checked outputs |

The finished mobile recording shows the prior training block, the mobile request, actual file edits and checks, the completed result, and updated local page in mobile Safari. Training playback has not been captured in this clip. Publishing is a separate approval step. Narration should make clear that the phone directs the Harness running on the host computer. If processing time is shortened in the edited clip, mark that passage visibly.

Approved homepage target:

- Heading: “Start with TritonAI Harness Essentials”
- Description: approximately eight minutes, followed by practice with fictional files; narrated chapters, captions, transcript and knowledge checks.
- Button: “Open Harness training”; preserve `/training/harness/`.

## Attach a finished recording

For the appropriate entry in `src/data/slides.js`, keep its stable slug and audience. Set `type` to `video`; add verified `videoSrc`, `poster`, and `captionsSrc` paths. Use `videoLoop: false`, `videoClearNav: true`, `videoAutoPlay: true`, and `hideDemoBadge: true`. The existing player has native controls, muted playback, and caption support. Do not insert a media path before the asset exists. The placeholder renderer remains available by returning `type` to `content`. The Harness overview keeps the stable slug `cabinet-harness-mobile-demo` and now renders fresh Plugins and Skills screenshots with separate buttons and live presenter narration. It is not a duplicate mobile task recording.

The UI captures are from Nightly `0.3.6-nightly.20261008.63`, October 8. Three Plugins stages cover all seven captured rows: GitHub/Google Workspace/Kuali Build, Microsoft 365/n8n, and Lucid/Tableau. Microsoft 365/n8n is shown first. Compact controls keep all seven names visible; the captured UI stays in readable excerpts. Skills stages show installed Accessibility and Branding instructions. Functions shows fresh Browser access/profile/viewport controls, then GLM and the permission menu. The captured fictional task uses Full access; no institutional default or Supervised-run claim is made. The inspected inventory did not confirm a Spreadsheets or Presentations skill title; Microsoft 365 cloud access is distinct from local Excel/PowerPoint artifact creation. Raw path-bearing captures and Runtime host/key details are not bundled. Device hub was not installed in the captured app and is not featured.

Release separation checked October 8: stable **0.3.6** is the published desktop release and includes all seven captured plugins. The overview's green availability strip identifies released capabilities; its amber capture-build line identifies the actual **Nightly .63** screenshots. The productivity player uses the same distinction. The mobile player carries an amber **Mobile preview / Nightly capture** header because production mobile distribution has not been confirmed. A desktop stable release and a mobile build pipeline do not by themselves establish a production mobile rollout.

The exact stable-to-Nightly .63 comparison contains only two unreleased changes: `/feedback` routes to the TritonAI feedback skill, and the Skills catalog retains a saved copy while refreshing. Neither has a dedicated proof capture in the deck. The seven core stills and both demos are complete; separate stable-binary screenshots and any desired nightly-only demonstration remain open. See `public/cabinet-harness/README.md` for the audited capture inventory and primary release links.


Personal workflow storyboard, 90 seconds: fictional workshop CSV and notes (0–10), request and source reads (10–23), summary and missing-response calculation (23–40), checked Excel charts (40–60), short PowerPoint brief (60–80), result files and human review (80–90). The prepared fictional dataset has 42 responses, four blank Room ratings, and a Room average of 113/38 = 2.97. The actual official GLM run is complete. Inputs and the verified official UCSD BlueAndGold template remain unchanged. Native Excel and final PowerPoint review passed. The finished 90-second video is a labeled montage of actual UI key frames, not a continuous screen recording. It shows existing file ingestion, formulas, both Excel charts, a PowerPoint chart, decisions, actions and unresolved questions. Survey scale is 1–5; chart axes are 0–5 for a zero baseline.

Keep raw captures and a local captioned fallback. The web deck is the presentation vehicle; PDF and PowerPoint exports provide static frames, not embedded playable demo media.

## Content still to confirm

| Item | Dependency | Treatment until confirmed |
| --- | --- | --- |
| Class Planner | Kevin: demo framing, origin and usage evidence | Flexible capture slot; no usage number |
| Passport | Nikki Giaquenta: highlights | Editable scenario placeholder |
| Cash receipts | Owner: completed phases, current phase, ROI assumptions | No savings or phase claims |
| Contract review | Sandra and Sean: queue, timings, deployment status | New add-in slot; no before/after number |
| Directory | Nicole: status, roadmap and naming | Early phase; scraped data and arts/humanities gaps stated |
| Quick hits | Owners: production versus pilot labels | Status pending, except transcript TSS gate |
| Harness overview | Current interface and capabilities | Fresh UI screenshots; functions verified before narration |
| Personal productivity | Training workflow and checked output artifacts | Fresh compact data-to-Excel-to-PowerPoint recording |
| Governance | Current data classification, PII and policy wording | Review checkpoints only |
| Scale | Current analytics sources and measurement dates | Reuse analytics layouts after data refresh |
| Model contracts | Current state and Pradeep’s preferred wording | No claim that agreements are signed |
| Berkeley quote | Dan and AVC approval | Removed optional slide |

Q&A preparation should use fresh vertical backups and recorded fallbacks. No BioBib material belongs in Cabinet or its backups.

## Completed capture assets

- `public/media/cabinet/cabinet-mobile-website.mp4`: 80 seconds; actual simulator recording, three completed fictional sample chats, official GLM 5.3, local preview only. Long processing waits are cut and labeled. Temporary simulator client revoked after capture; authorized clients returned from six to five.
- `public/media/cabinet/cabinet-personal-productivity.mp4`: 90 seconds; actual fresh UI key-frame montage, clearly labeled. Checked workbook has 26 formulas and two native charts; four-slide campus PowerPoint has one native chart and source notes.
- Both clips have verified local posters, native controls, English VTT captions, and no looping. Raw captures and edit manifests are retained in the capture folders outside the application.
