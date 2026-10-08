# Cabinet run of show

20 minutes of presentation; 10 minutes of unscripted Q&A follows. The current view is a framework with fresh recording placeholders, not a finished presentation.

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
| The Harness is everything around the model | 0:45 | 10:15 | Original website comparison and its animations |
| Bigger tasks split across sub-agents | 0:15 | 10:30 | Original website animated SVG |
| TritonAI Harness | 1:00 | 11:30 | UI screenshot talk-through; plugins, skills, key functions |
| Personal productivity | 1:30 | 13:00 | Data capture and analysis to Excel charts and a PowerPoint summary |
| Review before expansion | 0:30 | 13:30 | Data, permissions, human review, validation |
| Learn, then build | 3:00 | 16:30 | One continuous training-to-website sequence |
| Sovereign AI | 1:15 | 17:45 | UCSD-managed inference and cross-campus use |
| TritonAI at scale | 1:15 | 19:00 | Current metrics and attribution |
| Three decisions for Cabinet | 1:00 | 20:00 | Prioritize, support, endorse |

The optional Berkeley quote is a removed slide, outside the timed sequence. Restore it in the manager only after exact text and attribution are approved; if used, absorb its time within the 2:30 scale section.

## Fresh recording slots

The framing visuals reuse the [current Harness website comparison and animated sub-agent diagram](https://tritonai.ucsd.edu/developer-apis/harness.html), verified October 8, 2026. Their original HTML, SVGs, styling and animations are copied locally, with fonts included. Only the whole composition scales to the slide. The original static component graphics are an optional removed Q&A backup. No graphic has been redesigned or given an invented animation.

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

For the continuous enablement sequence, open Harness Essentials and play a short segment, then request the homepage update through the mobile app. Capture the rendered preview and checks. Publishing is a separate approval step. Narration should make clear that the phone directs the Harness running on the host computer. If processing time is shortened in the edited clip, mark that passage visibly.

Approved homepage target:

- Heading: “Start with TritonAI Harness Essentials”
- Description: approximately eight minutes, followed by practice with fictional files; narrated chapters, captions, transcript and knowledge checks.
- Button: “Open Harness training”; preserve `/training/harness/`.

## Attach a finished recording

For the appropriate entry in `src/data/slides.js`, keep its stable slug and audience. Set `type` to `video`; add verified `videoSrc`, `poster`, and `captionsSrc` paths. Use `videoLoop: false`, `videoClearNav: true`, `videoAutoPlay: true`, and `hideDemoBadge: true`. The existing player has native controls, muted playback, and caption support. Do not insert a media path before the asset exists. The placeholder renderer remains available by returning `type` to `content`. The Harness overview keeps the stable slug `cabinet-harness-mobile-demo` and now renders fresh Plugins and Skills screenshots with separate buttons and live presenter narration. It is not a duplicate mobile task recording.

The UI captures are from Nightly `0.3.6-nightly.20261008.63`, October 8. The Plugins view focuses on GitHub and Google Workspace for projection readability; the Skills view enlarges the Accessibility title and description. Local path lines are excluded from the exported visible crop, and the raw path-bearing capture is not bundled in the deck. Workspace and review-control captures can be added after they are available.

Personal workflow storyboard, 90 seconds: fictional workshop CSV and notes (0–10), request and source reads (10–23), summary and missing-response calculation (23–40), checked Excel charts (40–60), short PowerPoint brief (60–80), result files and human review (80–90). The prepared fictional dataset has 42 responses, four blank Room ratings, and a Room average of 113/38 = 2.97. The actual Harness run and its outputs remain pending. An official campus PowerPoint template must be supplied before claiming template fidelity.

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
