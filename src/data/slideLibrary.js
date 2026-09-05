import { isSlideVisibleForAudience } from './audiences.js';
import { getSlideManagerSection, getSlideManagerTitle } from './slideRegistry.js';

export const ENTIRE_LIBRARY = 'library';

const collectText = (value) => {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.map(collectText).join(' ');
  if (value && typeof value === 'object') return Object.values(value).map(collectText).join(' ');
  return typeof value === 'number' ? String(value) : '';
};

export const selectLibrarySlides = (slides, { audience = ENTIRE_LIBRARY, query = '' } = {}) => {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return slides.filter((slide) => {
    if (audience !== ENTIRE_LIBRARY && !isSlideVisibleForAudience(slide, audience)) return false;
    if (!terms.length) return true;
    const text = `${getSlideManagerTitle(slide)} ${getSlideManagerSection(slide)} ${collectText(slide)}`.toLocaleLowerCase();
    return terms.every((term) => text.includes(term));
  });
};
