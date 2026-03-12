# UCSD Modern Presentation

This is a high-performance, web-based presentation platform built with React, Vite, Tailwind CSS, and Framer Motion, customized with UC San Diego branding.

**Live Demo**: https://tritongpt-deck.vercel.app/

## Features

- **UCSD Branding**: Custom colors (Navy, Gold, Blue) and typography (Montserrat/Source Sans Pro).
- **Smooth Animations**: Framer Motion powered transitions and staggered content entry.
- **Responsive**: Works on desktop, tablet, and mobile.
- **Content**: Extracted from the provided PowerPoint.
- **Keyboard Navigation**: Use Arrow keys, Space, or Enter to navigate.
- **Touch Support**: Swipe left/right on touch devices.

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

`npm run dev` and `npm run build` now run a slide sync step first. That step validates slide ids, audiences, local media references, and generates deployment artifacts in `public/slides.json` and `public/slide-manager-registry.json`.

On `localhost`, slide audience edits are mirrored into browser-local preview state so the presentation view updates immediately, and the local admin UI can also write those changes back to `src/data/slides.js` through a Vite dev-only endpoint.

## Customization

-   **Slides**: Edit `src/data/slides.js` to update content.
-   **Slide Registry**: `src/data/slideRegistry.js` derives the slide-manager inventory directly from `src/data/slides.js`, so new slides show up in the manager automatically.
-   **Styling**: Modify `tailwind.config.js` or `src/index.css`.
-   **Components**: Adjust `src/components/Slide.jsx` for layout changes.
