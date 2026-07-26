# UCSD Presentation Application - AI Context

## Project Overview
This project is a **React-based single-page application (SPA)** designed to serve as a dynamic, interactive presentation deck for **UC San Diego's TritonAI** initiatives. It replaces traditional PowerPoint slides with a web-native experience featuring rich animations, responsive layouts, and embedded media.

## Technology Stack
-   **Build Tool**: [Vite](https://vitejs.dev/).
-   **Framework**: [React](https://react.dev/) (v19).
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4), `clsx` for conditional classes.
-   **Animation**: [Framer Motion](https://www.framer.com/motion/) for slide transitions and element animations.
-   **Icons**: [Lucide React](https://lucide.dev/).
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
