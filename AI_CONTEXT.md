# UCSD Presentation Application - AI Context

## Project Overview
This project is a **React-based single-page application (SPA)** designed to serve as a dynamic, interactive presentation deck for **UC San Diego's TritonAI** initiatives. It replaces traditional PowerPoint slides with a web-native experience featuring rich animations, responsive layouts, and embedded media.

## HARD RULE: run nothing inside this iCloud directory
This repo is under `~/Documents` (iCloud Drive). Evicted "dataless" files hang any process that reads them, so never run `vite`, `npm`, `node`, builds, or tests here. Edit here; run via `scripts/run-outside-icloud.sh [command]`, which mirrors the repo to `~/dev/tritongpt-deck-run` and runs there. See `CLAUDE.md` / `AGENTS.md`.

## Technology Stack
-   **Build Tool**: [Vite](https://vitejs.dev/).
-   **Framework**: [React](https://react.dev/) (v19).
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4), `clsx` for conditional classes.
-   **Animation**: [Framer Motion](https://www.framer.com/motion/) for slide transitions and element animations.
-   **Icons**: [Lucide React](https://lucide.dev/).
-   **Browser verification**: `@playwright/test` provides focused navigation, audience, mobile, library, and download regression checks. It also generates committed static thumbnails.
-   **Utilities**: `qrcode.react` for client-side QR code generation.

## Project Structure
-   **`src/data/slides.js`**: **CRITICAL**. This file is the specific single source of truth for all presentation content. It exports a `slides` array containing objects with properties like `id`, stable `slug`, `type`, `layout`, `title`, `content`, `imageSrc`, etc.
-   **`src/components/Slide.jsx`**: The main rendering component. It acts as a factory, rendering different layouts based on the `slide.layout` prop (e.g., `title-hero`, `solution-showcase`, `ecosystem-visual`).
-   **`src/Presentation.jsx`**: Handles slide navigation, audience filtering, keyboard event listeners, and the shared TritonAI progress/navigation shell.
-   **`src/index.css`**: Defines the presentation-wide TritonAI visual system and responsive viewer chrome.
-   **`public/media/`**: Stores static assets like images (`headshot.jpg`) and videos. Referenced as absolute paths (e.g., `/media/file.jpg`).

## Key Design Concepts
1.  **Layout-Driven Rendering**: The application does not have unique routes for slides. It iterates through the `slides` array. To change a slide's look, you verify the `layout` property in `slides.js` and modify the corresponding conditional block in `Slide.jsx`.
2.  **Aesthetics**: The shared presentation shell follows the public TritonAI site:
    -   **Navy**: `#182B49`
    -   **Blue**: `#00629B`
    -   **Gold**: `#FFCD00` (used for emphasis, rules, and key metrics)
    -   **Sky**: Light blue accents (e.g. text-ucsd-sky)
    -   **Sand**: `#F5F0E6`
    -   **Typography**: Teko for display headings; Roboto for body copy and controls.
    -   **Effects**: Restrained shadows, bright-blue/gold rules, sand content surfaces, and navy-to-Connect-Blue hero treatments. Existing slide-specific motion remains available.
3.  **Responsive Design**: The deck must function on desktop (presentation mode) and mobile devices. `Slide.jsx` uses standard Tailwind responsive prefixes (`sm:`, `md:`) to adjust font sizes and layouts (e.g., switching from flex-col to flex-row).

## Critical Workflows
### Development
-   `npm run dev`: Starts the local Vite server (default: `http://localhost:5173`). HMR is active.

### Deployment (Dual-Target)
1.  **GitHub Pages**: Built via `npm run build` -> `npm run deploy` (uses `gh-pages` package). Serves from the `gh-pages` branch.
2.  **Vercel**: Triggered automatically via `git push origin main`. Configured via `vercel.json` to handle SPA rewrites.

## Specific Implementation Details
-   **QR Codes**: Do **NOT** use external APIs (like `api.qrserver.com`) due to CSP/reliability. Use the `<QRCodeSVG>` component from `qrcode.react`.
-   **Last Slide**: Specifically designed as a "Closing/Contact" slide. It aligns the presenter photo and QR code side-by-side with strict alignment rules (top-aligned).

## Adding New Slides
1.  Add a new object to the `slides` array in `src/data/slides.js`.
2.  Choose an existing `layout` (e.g., `dense-list`, `graphic-heavy`) OR define a new one.
3.  DSMLP platform slides use the `dsmlp-foundation` and `dsmlp-tritonai-boundary` layouts in `Slide.jsx`, which mirror the TritonAI site's Teko, navy, gold, cyan, and white-card visual language.

## AI Maintenance Instructions
**CRITICAL**: As an AI agent working on this project, you are responsible for maintaining this document.
-   **When to Update**:
    -   If you add a new library or dependency.
    -   If you modify the folder structure.
    -   If you change the deployment workflow.
    -   If you introduce a new slide layout or data pattern.
-   **How to Update**:
    -   Read this file first to understand the existing context.
    -   Append or modify the relevant sections above to reflect your changes.
    -   Ensure the "Technology Stack" and "Project Structure" sections remain accurate.

## Slide library and reading improvements

- `src/data/slideLibrary.js` supplies one ordered selection for the manager rows and both document exports. Text search is combined with the chosen presentation. `library` is a manager-only selector and is never a valid audience URL tag.
- `src/components/SlideThumbnail.jsx`, `src/data/slideThumbnailKey.js`, and `src/data/slideThumbnails.json` display lazy static content previews. `scripts/generate-slide-thumbnails.mjs` refreshes these via a development-only capture route. `scripts/check-slide-thumbnails.mjs` checks their content, renderer fingerprints, and files.
- `src/components/SlideManager.css` owns responsive manager styling. The source content, ordering, removal, and audience assignment model is unchanged.
- `src/Presentation.jsx` marks supported mobile reading layouts with `data-mobile-reading`; viewer-scoped CSS below 768px restores natural content height and places claim notes after the content. The component framework stacks its four cards on phones. These rules do not affect exports or other authored layouts.
- Unknown or missing URL audiences fail closed. Existing valid audience tags remain case-insensitive and stable slide hashes remain intact.
- `npm test` runs data behavior checks. `npm run test:browser` starts a dedicated local server. `npm run thumbnails` regenerates committed previews; run it after slide content or renderer changes, then `npm run check:thumbnails`. Normal deployment builds do not install or launch a browser.

- Slides may opt into the existing phone reading flow with `mobileReading: true`; the established-assistants roster uses this to keep all entries and its source note reachable on narrow screens.
- Project rosters can set `roster.density: "comfortable"` to use larger card headings and regular spacing with a short-description inventory; other rosters retain automatic density.
- Project roster `density: "expanded"` uses taller cards, larger labels, and content-sized rows for the 21-item assistant library.

## Cabinet demonstration framework

- `?audience=cabinet` shares the exact PK `ai-operating-review-title` opening, then presents Cabinet-only content with stable `cabinet-*` slugs. Other audience selections retain their existing content and order.
- `CabinetFrameworkSlide.jsx` and its scoped CSS render `cabinet-demo` recording placeholders and `cabinet-outline` topic slides. These layouts use the existing TritonAI palette and typography. They do not borrow old recordings.
- `CabinetHarnessOverview.jsx` renders staged fresh Plugins and Skills screenshot excerpts under `cabinet-harness-overview`; current nightly version is identified in its caption. Raw path-bearing captures are not bundled. This 60-second UI talk-through leads directly into the 90-second data-to-Excel-to-PowerPoint placeholder.
- `CabinetWebsiteVisual.jsx` renders `cabinet-website-visual` from local original website HTML/SVG snapshots in `cabinetWebsiteVisuals.js`. `CabinetWebsiteVisual.css` scopes the original CSS, isolates animation names, bundles fonts from the website's sources, and retains reduced-motion support. `ResizeObserver` uniformly fits the fixed desktop composition into the slide; there is no iframe or redesigned graphic. Comparison and sub-agent animations are active; the original static component cards are a removed optional backup. Provenance is in `public/cabinet-website/README.md` and slide notes.
- Source content remains in `src/data/slides.js`; order, removals, and audience assignments remain in `slideManagerState.js`. `durationSeconds`, `speakerNotes`, and `recording` describe timing, preparation, and the expected fresh capture. Presenter preparation details are also collected in `CABINET-RUN-OF-SHOW.md`.
- When approved media arrives, change the demo's `type` to `video` and add `videoSrc`, `poster`, and `captionsSrc`. The existing video renderer takes precedence over its placeholder layout. Keep `videoLoop: false`, `videoClearNav: true`, and `videoAutoPlay: true` for silent desktop playback with native controls. Verify the recording before exposing it to Cabinet.
- The Berkeley quotation placeholder is removed from the active deck until exact text and attribution are approved. No old metrics or BioBib content are assigned to Cabinet.
