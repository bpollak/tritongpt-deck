import { DEFAULT_AUDIENCE } from './audiences.js';
import { slides } from './slideDeck.js';

const toTitleCase = (value) =>
  value.replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

const cleanText = (value) => (
  String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim()
);

const truncateText = (value, maxLength = 150) => {
  const cleaned = cleanText(value);
  if (cleaned.length <= maxLength) return cleaned;
  return `${cleaned.slice(0, maxLength - 1).trim()}...`;
};

const humanizeToken = (value) => toTitleCase(cleanText(value).replace(/[-_]+/g, ' '));

const getTextFromParts = (parts) => {
  if (!Array.isArray(parts)) return '';
  return cleanText(parts.map((part) => part?.text || '').join(''));
};

const getVideoLabelFromSrc = (videoSrc) => {
  if (!videoSrc) return null;

  const filename = videoSrc.split('/').pop();
  if (!filename) return null;

  const stem = filename.replace(/\.[^.]+$/, '');
  return toTitleCase(stem.replace(/([a-zA-Z])(\d)/g, '$1 $2').replace(/[-_]+/g, ' ').trim());
};

const getSlugLabel = (slide) => {
  if (!slide.slug) return '';
  return humanizeToken(slide.slug);
};

export const getSlideManagerTitle = (slide) => {
  if (slide.managerLabel) return slide.managerLabel;
  if (slide.title) return slide.title;
  if (slide.headline) return cleanText(slide.headline);
  if (slide.programTitle) return slide.programTitle;

  const partsText = getTextFromParts(slide.parts);
  if (partsText) return partsText;

  if (slide.marker) return humanizeToken(String(slide.marker).replace(/[.:].*$/, ''));

  if (slide.type === 'video') {
    const inferredLabel = getVideoLabelFromSrc(slide.videoSrc);
    return inferredLabel ? `Video: ${inferredLabel}` : `Video Slide ${slide.id}`;
  }

  return getSlugLabel(slide) || `Slide ${slide.id}`;
};

const sectionRules = [
  { test: (slide) => slide.layout === 'title-hero', section: 'Opening' },
  { test: (slide) => /cabinet-harness/.test(slide.slug || ''), section: 'Agent Harness' },
  { test: (slide) => /cabinet-people/.test(slide.slug || ''), section: 'People & Org Change' },
  { test: (slide) => slide.type === 'video' || /^video-/.test(slide.slug || ''), section: 'Demo Video' },
  { test: (slide) => /thank-you|questions/.test(slide.slug || ''), section: 'Closing' },
  { test: (slide) => /roadmap|training|takeaways|team|numbers|analytics/.test(slide.slug || ''), section: 'Strategy & Adoption' },
  { test: (slide) => /contract|transcript|socratic|search|pdf|onbase|hosting|api-program|developer-api/.test(slide.slug || ''), section: 'Use Cases & Builder Paths' },
  { test: (slide) => /tritongpt|tritonai|platform|widget|gateway/.test(slide.slug || ''), section: 'TritonAI Platform' },
  { test: (slide) => /workforce|graduate|reskilling|jobs|skills/.test(slide.slug || ''), section: 'Workforce Context' },
  { test: (slide) => /uc-san-diego|campus/.test(slide.slug || ''), section: 'Campus Context' }
];

export const getSlideManagerSection = (slide) => {
  if (slide.managerSection) return slide.managerSection;
  const matchedRule = sectionRules.find(({ test }) => test(slide));
  return matchedRule?.section || 'Core Deck';
};

const highlightKeys = new Set([
  'claim',
  'label',
  'title',
  'name',
  'stage',
  'kicker',
  'tierLabel',
  'users',
  'process',
  'deployment'
]);

const skippedKeys = new Set([
  'id',
  'slug',
  'aliases',
  'audiences',
  'color',
  'softColor',
  'fill',
  'stroke',
  'icon',
  'logoUrl',
  'image',
  'imageScale',
  'imagePosition',
  'layout',
  'type',
  'variant',
  'hidden'
]);

const addHighlight = (highlights, value, title) => {
  const cleaned = cleanText(value);
  if (!cleaned || cleaned.length < 3) return;
  if (cleaned === cleanText(title)) return;
  if (/^(all|content|title|video)$/i.test(cleaned)) return;
  if (highlights.some((item) => item.toLowerCase() === cleaned.toLowerCase())) return;
  highlights.push(cleaned);
};

const collectHighlights = (value, highlights, title) => {
  if (!value || highlights.length >= 8) return;

  if (Array.isArray(value)) {
    value.forEach((item) => collectHighlights(item, highlights, title));
    return;
  }

  if (typeof value !== 'object') return;

  Object.entries(value).forEach(([key, child]) => {
    if (highlights.length >= 8 || skippedKeys.has(key)) return;

    if (highlightKeys.has(key) && typeof child === 'string') {
      addHighlight(highlights, child, title);
    }

    collectHighlights(child, highlights, title);
  });
};

export const getSlideManagerSummary = (slide, title = getSlideManagerTitle(slide)) => {
  if (slide.managerSummary) return slide.managerSummary;

  const directSummary = [
    slide.subtitle,
    slide.subhead,
    slide.afterText,
    slide.traceGoal,
    slide.tiersFooter
  ].map(cleanText).find(Boolean);

  if (directSummary) return truncateText(directSummary);

  const headline = cleanText(slide.headline);
  if (headline && headline !== cleanText(title)) return truncateText(headline);

  const partsText = getTextFromParts(slide.parts);
  if (partsText && partsText !== cleanText(title)) return truncateText(partsText);

  const highlights = [];
  collectHighlights(slide, highlights, title);

  if (highlights.length > 0) {
    return truncateText(`Covers: ${highlights.slice(0, 4).join('; ')}`);
  }

  if (slide.type === 'video') {
    return 'Embedded media slide for live demo or screen recording playback.';
  }

  return slide.layout ? `Layout: ${humanizeToken(slide.layout)}` : '';
};

export const getSlideManagerTags = (slide) => {
  const tags = [
    slide.layout ? humanizeToken(slide.layout) : null,
    slide.variant ? humanizeToken(slide.variant.replace(/^harness-/, '')) : null,
    slide.marker ? humanizeToken(slide.marker) : null,
    slide.hidden ? 'Hidden variant' : null
  ].filter(Boolean);

  return [...new Set(tags)].slice(0, 3);
};

export const buildSlideManagerRegistry = (sourceSlides) => sourceSlides.map((slide, index) => ({
  id: slide.id,
  slug: slide.slug || '',
  order: index + 1,
  orderLabel: String(index + 1).padStart(2, '0'),
  title: getSlideManagerTitle(slide),
  summary: getSlideManagerSummary(slide),
  section: getSlideManagerSection(slide),
  tags: getSlideManagerTags(slide),
  subtitle: slide.subtitle || '',
  type: slide.type || 'content',
  audiences: Array.isArray(slide.audiences) && slide.audiences.length > 0
    ? [...slide.audiences]
    : [DEFAULT_AUDIENCE]
}));

export const slideManagerRegistry = buildSlideManagerRegistry(slides);
