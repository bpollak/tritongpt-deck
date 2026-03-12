import { slides as defaultSlides } from '../data/slides';

export const LOCAL_SLIDE_PREVIEW_KEY = 'ucsd-presentation.local-slide-preview';
export const LOCAL_SLIDE_PREVIEW_EVENT = 'ucsd-presentation:local-slide-preview-updated';

const LOCAL_PREVIEW_HOSTS = new Set(['localhost', '127.0.0.1']);

export const isLocalPreviewHost = () => {
  if (typeof window === 'undefined') return false;
  return LOCAL_PREVIEW_HOSTS.has(window.location.hostname);
};

const hasMatchingInventory = (candidateSlides, sourceSlides) => {
  if (!Array.isArray(candidateSlides) || candidateSlides.length !== sourceSlides.length) {
    return false;
  }

  return sourceSlides.every((slide, index) => String(slide.id) === String(candidateSlides[index]?.id));
};

export const readLocalSlidePreview = (sourceSlides = defaultSlides) => {
  if (!isLocalPreviewHost()) return null;

  try {
    const rawValue = window.localStorage.getItem(LOCAL_SLIDE_PREVIEW_KEY);
    if (!rawValue) return null;

    const parsedValue = JSON.parse(rawValue);
    return hasMatchingInventory(parsedValue, sourceSlides) ? parsedValue : null;
  } catch {
    return null;
  }
};

export const writeLocalSlidePreview = (slides) => {
  if (!isLocalPreviewHost()) return;

  window.localStorage.setItem(LOCAL_SLIDE_PREVIEW_KEY, JSON.stringify(slides));
  window.dispatchEvent(new CustomEvent(LOCAL_SLIDE_PREVIEW_EVENT));
};

export const clearLocalSlidePreview = () => {
  if (!isLocalPreviewHost()) return;

  window.localStorage.removeItem(LOCAL_SLIDE_PREVIEW_KEY);
  window.dispatchEvent(new CustomEvent(LOCAL_SLIDE_PREVIEW_EVENT));
};
