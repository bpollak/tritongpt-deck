import { DEFAULT_AUDIENCE } from './audiences.js';

export const EMPTY_SLIDE_MANAGER_STATE = Object.freeze({
  order: [],
  removed: [],
  audiences: {}
});

export const getSlideKey = (slide) => {
  const slug = typeof slide?.slug === 'string' ? slide.slug.trim() : '';
  return slug || String(slide?.id ?? '').trim();
};

const asArray = (value) => (Array.isArray(value) ? value : []);

const uniqueValues = (values) => [...new Set(values.filter(Boolean))];

export const normalizeAudienceList = (audiences, fallback = [DEFAULT_AUDIENCE]) => {
  const normalized = uniqueValues(asArray(audiences).map((audience) => String(audience).trim()));
  return normalized.length > 0 ? normalized : fallback;
};

export const normalizeSlideManagerState = (state = EMPTY_SLIDE_MANAGER_STATE) => ({
  order: uniqueValues(asArray(state.order).map((key) => String(key).trim())),
  removed: uniqueValues(asArray(state.removed).map((key) => String(key).trim())),
  audiences: Object.fromEntries(
    Object.entries(state.audiences || {})
      .map(([key, audiences]) => [
        String(key).trim(),
        normalizeAudienceList(audiences)
      ])
      .filter(([key]) => Boolean(key))
  )
});

export const buildSlideManagerStateFromSlides = (baseSlides, managedSlides) => {
  const baseKeys = new Set(baseSlides.map(getSlideKey).filter(Boolean));
  const order = managedSlides.map(getSlideKey).filter(Boolean);
  const visibleKeys = new Set(order);
  const removed = [...baseKeys].filter((key) => !visibleKeys.has(key));

  const audiences = Object.fromEntries(
    managedSlides
      .map((slide) => [
        getSlideKey(slide),
        normalizeAudienceList(slide.audiences)
      ])
      .filter(([key]) => Boolean(key))
  );

  return normalizeSlideManagerState({ order, removed, audiences });
};

export const applySlideManagerState = (baseSlides, state) => {
  const normalizedState = normalizeSlideManagerState(state);
  const baseByKey = new Map(baseSlides.map((slide) => [getSlideKey(slide), slide]));
  const removedKeys = new Set(normalizedState.removed);
  const emittedKeys = new Set();
  const mergedSlides = [];

  normalizedState.order.forEach((key) => {
    if (removedKeys.has(key) || emittedKeys.has(key)) return;

    const slide = baseByKey.get(key);
    if (!slide) return;

    emittedKeys.add(key);
    mergedSlides.push({
      ...slide,
      audiences: normalizeAudienceList(normalizedState.audiences[key], slide.audiences || [DEFAULT_AUDIENCE])
    });
  });

  baseSlides.forEach((slide) => {
    const key = getSlideKey(slide);
    if (!key || removedKeys.has(key) || emittedKeys.has(key)) return;

    mergedSlides.push({
      ...slide,
      audiences: normalizeAudienceList(normalizedState.audiences[key], slide.audiences || [DEFAULT_AUDIENCE])
    });
  });

  return mergedSlides;
};

export const validateSlideManagerState = (
  baseSlides,
  state,
  { allowedAudiences, strictCoverage = true } = {}
) => {
  const errors = [];
  const normalizedState = normalizeSlideManagerState(state);
  const allowedAudienceSet = allowedAudiences ? new Set(allowedAudiences) : null;
  const baseKeys = baseSlides.map(getSlideKey);
  const baseKeySet = new Set();

  baseKeys.forEach((key, index) => {
    if (!key) {
      errors.push(`slides[${index}] is missing a stable slug/id key.`);
      return;
    }

    if (baseKeySet.has(key)) {
      errors.push(`Duplicate slide manager key "${key}" in src/data/slides.js.`);
    }

    baseKeySet.add(key);
  });

  const orderSet = new Set();
  normalizedState.order.forEach((key) => {
    if (orderSet.has(key)) {
      errors.push(`Duplicate key "${key}" in slide manager order.`);
    }
    orderSet.add(key);

    if (!baseKeySet.has(key)) {
      errors.push(`Slide manager order references unknown slide "${key}".`);
    }
  });

  const removedSet = new Set();
  normalizedState.removed.forEach((key) => {
    if (removedSet.has(key)) {
      errors.push(`Duplicate key "${key}" in removed slides.`);
    }
    removedSet.add(key);

    if (!baseKeySet.has(key)) {
      errors.push(`Removed slides reference unknown slide "${key}".`);
    }

    if (orderSet.has(key)) {
      errors.push(`Slide "${key}" cannot be both ordered and removed.`);
    }
  });

  Object.entries(normalizedState.audiences).forEach(([key, audiences]) => {
    if (!baseKeySet.has(key)) {
      errors.push(`Audience settings reference unknown slide "${key}".`);
      return;
    }

    if (allowedAudienceSet) {
      const unknownAudiences = audiences.filter((audience) => !allowedAudienceSet.has(audience));
      if (unknownAudiences.length > 0) {
        errors.push(`Slide "${key}" has unsupported audiences: ${unknownAudiences.join(', ')}.`);
      }
    }
  });

  if (strictCoverage) {
    const missingKeys = [...baseKeySet].filter((key) => !orderSet.has(key) && !removedSet.has(key));
    if (missingKeys.length > 0) {
      errors.push(`Slide manager state is missing slides: ${missingKeys.join(', ')}.`);
    }
  }

  return errors;
};

export const createSlideManagerStateModuleContent = (state) => {
  const normalizedState = normalizeSlideManagerState(state);
  return `export const slideManagerState = ${JSON.stringify(normalizedState, null, 2)};\n\nexport default slideManagerState;\n`;
};
