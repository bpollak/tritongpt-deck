# Fresh Harness UI excerpts

Captured October 8, 2026 from TritonAI Harness Nightly `0.3.6-nightly.20261008.63`.

- `plugins-campus-current-excerpt.png`: GitHub, Google Workspace, and Kuali Build rows from the fresh Plugins capture.
- `plugins-microsoft-n8n-current-excerpt.png`: Microsoft 365 and n8n rows from the same capture; the default displayed stage.
- `plugins-lucid-tableau-current-excerpt.png`: original Lucid and Tableau rows, composed as two screenshot excerpts. Together the three plugin stages cover all seven rows without fitting the entire list into a single small image.
- `skills-accessibility-current-excerpt.png`: original fresh Skills screenshot, showing the Accessibility title and description. Local path and ownership lines remain outside the crop.
- `skills-branding-current-excerpt.png`: original fresh Skills screenshot, showing the Branding title and description, with path and ownership lines outside the crop.
- `browser-access-current-excerpt.png`: original fresh Browser settings excerpts for agent access, profiles and viewport. The Device hub section is outside the crop; no installed-device capability is inferred from it.
- `model-permissions-current-excerpt.png`: original fresh fictional-task controls, with GLM selected and the permission menu visible. The captured task is in Full access, as displayed; this is not represented as an institutional default or a Supervised run. Runtime host/key details and other thread content are outside the crop.

Excerpts were composed with CSS clipping and exported as screenshots without replacing or rewriting the captured UI. Raw captures containing path lines are not included. Capture provenance and feature availability are separate. Every image above was captured from Nightly .63. The stable tag/source and published release independently establish availability of the desktop capabilities shown; these are not captures from the stable binary. The completed personal-productivity demonstration is a separate actual 90-second key-frame montage with reviewed Excel and PowerPoint outputs.


## Release audit — October 8, 2026

- **Released desktop baseline:** [stable v0.3.6](https://github.com/dbalders/TritonAI-Harness/releases/tag/v0.3.6), published October 8, 2026; GitHub reports neither draft nor prerelease. Includes Plugins v0.1.10 and all seven captured plugins, including Lucid and Tableau.
- **Captured build:** [v0.3.6-nightly.20261008.63](https://github.com/dbalders/TritonAI-Harness/releases/tag/v0.3.6-nightly.20261008.63), explicitly an opt-in testing prerelease.
- **Exact difference:** [stable-to-captured-nightly comparison](https://github.com/dbalders/TritonAI-Harness/compare/v0.3.6...v0.3.6-nightly.20261008.63) is two commits ahead, zero behind: `/feedback` routes to the TritonAI feedback skill; the Skills catalog can display a saved copy while refreshing in the background. Those behaviors are not established by the existing still captures.
- **Visual convention:** green = capability available in stable 0.3.6; amber = preview or nightly capture provenance. Labels identify both availability and the actual build used. A nightly screenshot is not evidence that its entire feature set is unreleased.

| Capture area | Current evidence | Release treatment |
| --- | --- | --- |
| Seven plugins | Three incorporated screenshot stages | Released desktop capabilities; actual capture is Nightly .63 |
| Accessibility and Branding skills | Two incorporated screenshot stages | Stable skill capability; installed examples, captured on Nightly .63 |
| Browser and model/approval controls | Two incorporated screenshot stages | Released desktop capabilities; actual capture is Nightly .63 |
| Desktop workspace and task progress | Actual UI frames in the productivity demo | Stable workflow capability; actual capture is Nightly .63 |
| Excel and PowerPoint outputs | Reviewed native artifacts and 90-second montage | Stable workflow capability; actual capture is Nightly .63 |
| Phone-directed website update | 80-second simulator recording | Mobile preview; production mobile rollout not independently verified |
| `/feedback` shortcut | Release/source difference verified | Nightly-only; no dedicated screenshot or recording incorporated |
| Saved Skills-catalog behavior | Release/source difference verified | Nightly-only; existing stills do not prove refresh/loading behavior |
| Stable-binary UI | No separate stable-app capture | Recapture if the presentation must show the production binary itself |

Still needed for a release-specific capture set: clean stable-binary UI screenshots, a dedicated nightly-only capture if desired, and any confirmation of production mobile distribution. No runtime keys, private threads, or local path-bearing raw screenshots are bundled.
