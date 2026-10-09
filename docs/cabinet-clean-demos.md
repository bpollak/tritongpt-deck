# Cabinet app-only demo exports

October 8, 2026: seven videos and their posters were replaced with clean exports. Only actual captured application/document content is rendered. Added titles, captions, status banners, side panels and provenance footers were removed. Native app labels and document text are retained. All demo slides use the full slide canvas; presentation controls reveal only on direct use. Source/release framing remains in speaker notes for narration.

Desktop exports are 1920 × 1080, 30 fps, H.264 CRF 16, except the revised Contract Reviewer clip: 2560 × 1978, preserving the entire real Word window and source aspect ratio throughout. It replaces the prior callout crops with document and add-in together. The simulator remains native 1206 × 2622, 30 fps, CRF 16, fitting the slide height. Browser clips were recaptured at 2× density; native Word/Excel/PowerPoint and Harness captures were used directly for focused crops. No old small framed export was enlarged. Clips contain genuine transitions and held keyframes, with waits shortened; the productivity clip is a sequence of authentic still captures.

The `-clean` filenames avoid stale cached framed media. Legacy VTT files are reference material and are not attached to the players. Raw captures stay outside the public media directory. Exact source paths, crops, durations, dimensions and output hashes are recorded in the adjacent media manifests. Rebuild scripts require the original local capture directories and FFmpeg/Pillow; run from this resident worktree, outside iCloud.

```sh
python3 scripts/rebuild-cabinet-clean-demos.py --capture-dir /Users/bpollak/dev/cabinet-clean-demos-20261008 --service-source /Users/bpollak/dev/cabinet-servicenow-natural-20261008 --contract-source /Users/bpollak/dev/cabinet-contract-capture-20261008 --mobile-source /Users/bpollak/dev/cabinet-demo-capture-20261008
python3 scripts/rebuild-cabinet-citizen-demos.py --capture-root /Users/bpollak/dev/cabinet-citizen-capture-20261008
python3 scripts/rebuild-cabinet-productivity.py --help
```

Validation: all seven complete videos decoded without errors; browser playback verified clean media URLs, expected native dimensions, zero text tracks, no reserved navigation clearance and no player errors. Audience tests pass. Build passes. The modified Presentation component retains one pre-existing React effect lint error, confirmed against HEAD; no new lint error was introduced. Thumbnails were regenerated for the current renderer and checked for freshness. Cabinet timing remains 18 slides / 1,200 seconds.

ServiceNow was recaptured with ordinary support-case wording and no visible demo/fictional qualifiers. The actual suggestions were regenerated from those inputs; the new file is `cabinet-servicenow-routing-natural.mp4`. Inputs stayed on an unsaved form and were discarded. Exact new scores and capture details are in `cabinet-servicenow-natural-manifest.json`.
