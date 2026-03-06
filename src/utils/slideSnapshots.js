import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import html2canvas from 'html2canvas';
import Slide from '../components/Slide';

const SNAPSHOT_WIDTH = 1600;
const SNAPSHOT_HEIGHT = 900;
const SNAPSHOT_WAIT_MS = 1100;

export const SNAPSHOT_LAYOUTS = new Set([
  'compound-architecture',
  'agent-workflow',
  'analytics-chart'
]);

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const waitForFrame = () =>
  new Promise((resolve) => {
    requestAnimationFrame(() => resolve());
  });

const createHost = () => {
  const host = document.createElement('div');
  host.style.position = 'fixed';
  host.style.left = '-20000px';
  host.style.top = '0';
  host.style.width = `${SNAPSHOT_WIDTH}px`;
  host.style.height = `${SNAPSHOT_HEIGHT}px`;
  host.style.overflow = 'hidden';
  host.style.pointerEvents = 'none';
  host.style.opacity = '1';
  host.setAttribute('aria-hidden', 'true');
  return host;
};

const captureSingleSlide = async (slide) => {
  const host = createHost();
  document.body.appendChild(host);

  const root = createRoot(host);

  try {
    root.render(
      createElement(
        'div',
        {
          style: {
            width: `${SNAPSHOT_WIDTH}px`,
            height: `${SNAPSHOT_HEIGHT}px`,
            background: slide.backgroundColor || '#F5F0E6'
          }
        },
        createElement(Slide, { slide })
      )
    );

    // Wait for React mount + motion/image settle before capture.
    await waitForFrame();
    await waitForFrame();
    await wait(SNAPSHOT_WAIT_MS);

    const canvas = await html2canvas(host, {
      backgroundColor: null,
      useCORS: true,
      scale: 2,
      logging: false,
      width: SNAPSHOT_WIDTH,
      height: SNAPSHOT_HEIGHT,
      windowWidth: SNAPSHOT_WIDTH,
      windowHeight: SNAPSHOT_HEIGHT
    });

    return canvas.toDataURL('image/png');
  } finally {
    root.unmount();
    host.remove();
  }
};

export const captureSlideSnapshots = async (slidesData, layoutFilter = SNAPSHOT_LAYOUTS) => {
  if (!Array.isArray(slidesData) || slidesData.length === 0) return {};
  if (typeof window === 'undefined' || typeof document === 'undefined') return {};

  const targets = slidesData.filter((slide) => layoutFilter.has(slide.layout));
  if (!targets.length) return {};

  const snapshotsById = {};

  for (const slide of targets) {
    try {
      const snapshot = await captureSingleSlide(slide);
      if (snapshot) snapshotsById[slide.id] = snapshot;
    } catch (error) {
      // Non-fatal: export should continue with layout renderer/fallback.
      console.warn(`Snapshot capture failed for slide ${slide.id}`, error);
    }
  }

  return snapshotsById;
};

