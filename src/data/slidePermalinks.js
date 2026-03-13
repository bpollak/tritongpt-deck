export const SLIDE_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const normalizeValue = (value) => String(value ?? '').trim();

const normalizeSlug = (value) => normalizeValue(value).toLowerCase();

export const getSlideSlug = (slide) => {
  const slug = slide?.slug;
  return typeof slug === 'string' ? slug.trim() : '';
};

export const getSlidePermalinkValue = (slide) => {
  const slug = getSlideSlug(slide);
  if (slug) return slug;

  if (slide?.id === undefined || slide?.id === null || slide?.id === '') {
    return '';
  }

  return String(slide.id);
};

export const doesSlideMatchPermalink = (slide, permalink) => {
  const candidate = normalizeValue(permalink);
  if (!candidate) return false;

  const slideSlug = getSlideSlug(slide);
  if (slideSlug && normalizeSlug(slideSlug) === normalizeSlug(candidate)) {
    return true;
  }

  return String(slide?.id ?? '') === candidate;
};

export const findSlideIndexByPermalink = (slides, permalink) => {
  if (!Array.isArray(slides) || slides.length === 0) return -1;

  return slides.findIndex((slide) => doesSlideMatchPermalink(slide, permalink));
};
