import { DEFAULT_AUDIENCE } from './audiences.js';
import { slides } from './slides.js';

const toTitleCase = (value) =>
  value.replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

const getVideoLabelFromSrc = (videoSrc) => {
  if (!videoSrc) return null;

  const filename = videoSrc.split('/').pop();
  if (!filename) return null;

  const stem = filename.replace(/\.[^.]+$/, '');
  return toTitleCase(stem.replace(/([a-zA-Z])(\d)/g, '$1 $2').replace(/[-_]+/g, ' ').trim());
};

export const getSlideManagerTitle = (slide) => {
  if (slide.title) return slide.title;
  if (slide.managerLabel) return slide.managerLabel;
  if (slide.type === 'video') {
    const inferredLabel = getVideoLabelFromSrc(slide.videoSrc);
    return inferredLabel ? `Video: ${inferredLabel}` : `Video Slide ${slide.id}`;
  }

  return `Slide ${slide.id}`;
};

export const buildSlideManagerRegistry = (sourceSlides) => sourceSlides.map((slide, index) => ({
  id: slide.id,
  order: index + 1,
  title: getSlideManagerTitle(slide),
  subtitle: slide.subtitle || '',
  type: slide.type || 'content',
  audiences: Array.isArray(slide.audiences) && slide.audiences.length > 0
    ? [...slide.audiences]
    : [DEFAULT_AUDIENCE]
}));

export const slideManagerRegistry = buildSlideManagerRegistry(slides);
