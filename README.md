# UCSD Modern Presentation

This is a high-performance, web-based presentation platform built with React, Vite, Tailwind CSS, and Framer Motion, customized with UC San Diego branding.

**Live Demo**: https://tritongpt-deck.vercel.app/

## Features

- **TritonAI Branding**: Shared UC San Diego navy, Connect Blue, bright blue, gold, and sand palette with Teko display headings and Roboto body copy.
- **Smooth Animations**: Framer Motion powered transitions and staggered content entry.
- **Mobile reading**: Solution showcases, dashboard slides, and the harness component overview scroll at widths below 768px. Their source notes follow the content. Desktop presentation layouts remain unchanged.
- **Content**: Extracted from the provided PowerPoint.
- **Stable Deep Links**: Shared `#slide=<slug>` links stay attached to the same slide even when slides are reordered.
- **Keyboard Navigation**: Use Arrow keys, Space, or Enter to navigate.
- **Touch Support**: Swipe left/right on touch devices.
- **Slide library**: Open `/manage` to search slide content, browse thumbnails, and export the exact filtered selection.
- **Audience links**: Missing or unknown audience tags show a link-help message. The manager distinguishes Entire library from Default presentation (`audience=all`).

## Setup

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Start the development server:
    ```bash
    npm run dev
    ```

3.  Build for production:
    ```bash
    npm run build
    ```

`npm run dev` and `npm run build` now run a slide sync step first. That step validates slide ids, stable slide slugs, audiences, local media references, and generates deployment artifacts in `public/slides.json` and `public/slide-manager-registry.json`.

On `localhost`, slide audience edits are mirrored into browser-local preview state so the presentation view updates immediately, and the local admin UI can also write those changes back to `src/data/slideManagerState.js` through a Vite dev-only endpoint.

## Customization

-   **Slides**: Edit `src/data/slides.js` to update content.
-   **Permalinks**: Each slide now needs a unique `slug`. Use that stable slug for shared links, and do not change it after sending links out.
-   **Slide Registry**: `src/data/slideRegistry.js` derives the slide-manager inventory directly from `src/data/slides.js`, so new slides show up in the manager automatically.
-   **Styling**: Modify `tailwind.config.js` or the shared TritonAI presentation system in `src/index.css`.
-   **Components**: Adjust `src/components/Slide.jsx` for layout changes.

## Verification and slide thumbnails

Use Node.js 22 or later. After `npm ci`, run:

```bash
npm test
npm run check:deck
npm run build
npx playwright install chromium
npm run test:browser
```

Browser tests cover keyboard activation, audience links, phone reading, the manager, and the contents of downloaded PDF/PowerPoint files. `npm run lint` is also available; inherited lint findings should be compared with the base revision.

Thumbnails are committed JPEGs in `public/slide-thumbnails/`, with a content manifest in `src/data/slideThumbnails.json`. Browsing the manager loads images lazily and does not start slide videos. After editing slide content or the renderer, regenerate and check them:

```bash
npm run thumbnails
npm run check:thumbnails
```

The generator starts its own loopback Vite server and captures the development-only `/__thumbnail` route at 1600×900. It never calls save or publish endpoints. Unchanged thumbnails are reused, and obsolete generated images are removed after a successful run. Audience-only edits and reordering reuse their content previews. A new or changed slide without a matching image shows an Open slide preview fallback instead of a stale thumbnail.

Use `npm run thumbnails -- --force` after replacing an image or video at the same URL. Interrupted captures resume from a local progress file. Normal production builds do not require a browser installation. For an existing compatible Chromium installation, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` for thumbnail generation and browser tests. The standard Playwright browser remains the default.
