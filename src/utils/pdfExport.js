import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Slide from '../components/Slide';

const SLIDE_WIDTH_PX = 1600;
const SLIDE_HEIGHT_PX = 900;
const PAGE_WIDTH_IN = 13.333;
const PAGE_HEIGHT_IN = 7.5;
const MOUNT_SETTLE_MS = 1100;
const VIDEO_SEEK_TIMEOUT_MS = 4000;

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
  host.style.width = `${SLIDE_WIDTH_PX}px`;
  host.style.height = `${SLIDE_HEIGHT_PX}px`;
  host.style.overflow = 'hidden';
  host.style.pointerEvents = 'none';
  host.style.opacity = '1';
  host.setAttribute('aria-hidden', 'true');
  return host;
};

const primeVideoFirstFrame = (video) =>
  new Promise((resolve) => {
    const done = () => {
      cleanup();
      resolve();
    };

    const timeout = setTimeout(done, VIDEO_SEEK_TIMEOUT_MS);

    const cleanup = () => {
      clearTimeout(timeout);
      video.removeEventListener('seeked', done);
      video.removeEventListener('loadeddata', onLoadedData);
      video.removeEventListener('error', done);
    };

    const onLoadedData = () => {
      try {
        video.currentTime = 0;
      } catch {
        done();
      }
    };

    video.addEventListener('seeked', done, { once: true });
    video.addEventListener('error', done, { once: true });

    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.autoplay = false;

    if (video.readyState >= 2) {
      try {
        video.currentTime = 0;
      } catch {
        done();
      }
    } else {
      video.addEventListener('loadeddata', onLoadedData, { once: true });
      try {
        video.load();
      } catch {
        // ignore; timeout will resolve
      }
    }
  });

const COLOR_PROPS = [
  'color',
  'background-color',
  'border-top-color',
  'border-right-color',
  'border-bottom-color',
  'border-left-color',
  'outline-color',
  'text-decoration-color',
  'caret-color',
  'fill',
  'stroke',
  'accent-color',
  'column-rule-color'
];

const COMPOSITE_PROPS = ['background-image', 'box-shadow', 'text-shadow', 'border-image-source'];

const MODERN_COLOR_FNS = ['oklch', 'oklab', 'lch', 'lab', 'color-mix', 'color', 'hwb'];
const MODERN_COLOR_FN_RE = new RegExp(`\\b(?:${MODERN_COLOR_FNS.join('|')})\\s*\\(`, 'gi');
const MODERN_COLOR_VALUE_RE = new RegExp(`\\b(?:${MODERN_COLOR_FNS.join('|')})\\s*\\(`, 'i');

const createOklchConverter = (win) => {
  const probeCanvas = win.document.createElement('canvas');
  probeCanvas.width = 1;
  probeCanvas.height = 1;
  const probe = probeCanvas.getContext('2d');

  const cache = new Map();

  // Canvas `fillStyle` serializes in the original color space, so reading it
  // back still returns `oklch(...)`. We rasterize a 1×1 fill and read the
  // sRGB pixel to force conversion.
  const oklchToRgb = (value) => {
    if (!value) return value;
    if (cache.has(value)) return cache.get(value);
    try {
      probe.clearRect(0, 0, 1, 1);
      probe.fillStyle = 'rgba(0, 0, 0, 0)';
      probe.fillStyle = value;
      probe.fillRect(0, 0, 1, 1);
      const data = probe.getImageData(0, 0, 1, 1).data;
      const [r, g, b, a] = data;
      const resolved = a === 255
        ? `rgb(${r}, ${g}, ${b})`
        : `rgba(${r}, ${g}, ${b}, ${(a / 255).toFixed(3)})`;
      cache.set(value, resolved);
      return resolved;
    } catch {
      cache.set(value, value);
      return value;
    }
  };

  const findBalancedEnd = (text, openParenIndex) => {
    let depth = 0;
    for (let i = openParenIndex; i < text.length; i += 1) {
      const ch = text[i];
      if (ch === '(') depth += 1;
      else if (ch === ')') {
        depth -= 1;
        if (depth === 0) return i;
      }
    }
    return -1;
  };

  return (value) => {
    if (!value || !MODERN_COLOR_VALUE_RE.test(value)) return value;
    MODERN_COLOR_FN_RE.lastIndex = 0;

    let out = '';
    let cursor = 0;
    let match;
    while ((match = MODERN_COLOR_FN_RE.exec(value)) !== null) {
      const start = match.index;
      const openParen = start + match[0].length - 1;
      const end = findBalancedEnd(value, openParen);
      if (end === -1) break;
      out += value.slice(cursor, start);
      const fullCall = value.slice(start, end + 1);
      out += oklchToRgb(fullCall);
      cursor = end + 1;
      MODERN_COLOR_FN_RE.lastIndex = cursor;
    }
    out += value.slice(cursor);
    return out;
  };
};

const applyRgbOverridesToElement = (element, rewrite) => {
  const computed = window.getComputedStyle(element);
  for (const prop of COLOR_PROPS) {
    const current = computed.getPropertyValue(prop);
    if (current && MODERN_COLOR_VALUE_RE.test(current)) {
      element.style.setProperty(prop, rewrite(current));
    }
  }
  for (const prop of COMPOSITE_PROPS) {
    const current = computed.getPropertyValue(prop);
    if (current && MODERN_COLOR_VALUE_RE.test(current)) {
      element.style.setProperty(prop, rewrite(current));
    }
  }
};

// Walks the REAL DOM (attached document, where getComputedStyle resolves
// colors). Applies inline rgb overrides so every element html2canvas inspects
// resolves to an rgb-space color. Returns a restore function that reverts
// any inline-style mutations made to `document.documentElement` /
// `document.body` (so we don't leave the host page tinted).
const overrideOklchForCapture = (host) => {
  const rewrite = createOklchConverter(window);
  const ancestorSavedStyles = new Map();

  for (const ancestor of [document.documentElement, document.body]) {
    if (!ancestor) continue;
    const priorCssText = ancestor.style.cssText;
    applyRgbOverridesToElement(ancestor, rewrite);
    ancestorSavedStyles.set(ancestor, priorCssText);
  }

  applyRgbOverridesToElement(host, rewrite);
  const walker = document.createTreeWalker(host, NodeFilter.SHOW_ELEMENT);
  let node = walker.nextNode();
  while (node) {
    applyRgbOverridesToElement(node, rewrite);
    node = walker.nextNode();
  }

  return () => {
    for (const [ancestor, cssText] of ancestorSavedStyles) {
      ancestor.style.cssText = cssText;
    }
  };
};

const replaceVideosWithFirstFrameImages = async (host) => {
  const videos = Array.from(host.querySelectorAll('video'));
  if (videos.length === 0) return;

  await Promise.all(videos.map(primeVideoFirstFrame));

  for (const video of videos) {
    const rect = video.getBoundingClientRect();
    const hostRect = host.getBoundingClientRect();
    const width = Math.max(1, Math.round(video.videoWidth || rect.width));
    const height = Math.max(1, Math.round(video.videoHeight || rect.height));

    const frameCanvas = document.createElement('canvas');
    frameCanvas.width = width;
    frameCanvas.height = height;

    let dataUrl = null;
    try {
      const ctx = frameCanvas.getContext('2d');
      ctx.drawImage(video, 0, 0, width, height);
      dataUrl = frameCanvas.toDataURL('image/png');
    } catch {
      // Tainted canvas or decode failure — fall back to poster below.
      dataUrl = null;
    }

    const replacement = document.createElement('img');
    replacement.src = dataUrl || video.poster || '';
    const computed = window.getComputedStyle(video);
    replacement.style.width = `${rect.width}px`;
    replacement.style.height = `${rect.height}px`;
    replacement.style.objectFit = computed.objectFit || 'cover';
    replacement.style.objectPosition = computed.objectPosition || 'center';
    replacement.style.borderRadius = computed.borderRadius || '';
    replacement.style.position = computed.position === 'static' ? '' : computed.position;
    if (replacement.style.position) {
      replacement.style.left = `${rect.left - hostRect.left}px`;
      replacement.style.top = `${rect.top - hostRect.top}px`;
    }
    replacement.setAttribute('aria-hidden', 'true');

    video.replaceWith(replacement);

    if (dataUrl) {
      await new Promise((resolve) => {
        if (replacement.complete) return resolve();
        replacement.addEventListener('load', resolve, { once: true });
        replacement.addEventListener('error', resolve, { once: true });
      });
    }
  }
};

const captureSlideAsPng = async (slide) => {
  const host = createHost();
  document.body.appendChild(host);
  const root = createRoot(host);

  try {
    root.render(
      createElement(
        'div',
        {
          style: {
            width: `${SLIDE_WIDTH_PX}px`,
            height: `${SLIDE_HEIGHT_PX}px`,
            background: slide.backgroundColor || '#F5F0E6'
          }
        },
        createElement(Slide, { slide })
      )
    );

    await waitForFrame();
    await waitForFrame();
    await wait(MOUNT_SETTLE_MS);

    await replaceVideosWithFirstFrameImages(host);
    const restoreAncestorStyles = overrideOklchForCapture(host);

    try {
      const canvas = await html2canvas(host, {
        backgroundColor: slide.backgroundColor || '#FFFFFF',
        useCORS: true,
        scale: 2,
        logging: false,
        width: SLIDE_WIDTH_PX,
        height: SLIDE_HEIGHT_PX,
        windowWidth: SLIDE_WIDTH_PX,
        windowHeight: SLIDE_HEIGHT_PX
      });
      return canvas.toDataURL('image/png');
    } finally {
      restoreAncestorStyles();
    }
  } finally {
    root.unmount();
    host.remove();
  }
};

const buildFilename = (audienceLabel) => {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  const safeLabel = String(audienceLabel || 'all').replace(/[^a-zA-Z0-9-]+/g, '-');
  return `TritonGPT-Presentation-${safeLabel}-${stamp}.pdf`;
};

export const exportSlidesToPdf = async (slidesData, { audienceLabel = 'all', onProgress } = {}) => {
  if (!Array.isArray(slidesData) || slidesData.length === 0) {
    throw new Error('No slides to export.');
  }

  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'in',
    format: [PAGE_WIDTH_IN, PAGE_HEIGHT_IN],
    compress: true
  });

  for (let i = 0; i < slidesData.length; i += 1) {
    const slide = slidesData[i];
    if (typeof onProgress === 'function') {
      onProgress({ current: i + 1, total: slidesData.length, slide });
    }

    const pngDataUrl = await captureSlideAsPng(slide);

    if (i > 0) pdf.addPage([PAGE_WIDTH_IN, PAGE_HEIGHT_IN], 'landscape');
    pdf.addImage(pngDataUrl, 'PNG', 0, 0, PAGE_WIDTH_IN, PAGE_HEIGHT_IN, undefined, 'FAST');
  }

  pdf.save(buildFilename(audienceLabel));
};
