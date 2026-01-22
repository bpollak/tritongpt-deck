# UCSD Modern Presentation

This is a high-performance, web-based presentation platform built with React, Vite, Tailwind CSS, and Framer Motion, customized with UC San Diego branding.

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

## Customization

-   **Slides**: Edit `src/data/slides.js` to update content.
-   **Styling**: Modify `tailwind.config.js` or `src/index.css`.
-   **Components**: Adjust `src/components/Slide.jsx` for layout changes.