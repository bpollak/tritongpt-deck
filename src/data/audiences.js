export const DEFAULT_AUDIENCE = 'all';

export const AUDIENCE_TYPES = ['all', 'technical', 'executive', 'internal', 'public', 'ASU-GSV'];

export const AUDIENCE_COLORS = {
  all: 'bg-gray-500',
  technical: 'bg-blue-500',
  executive: 'bg-purple-500',
  internal: 'bg-green-500',
  public: 'bg-orange-500',
  'ASU-GSV': 'bg-amber-500'
};

const findCanonicalAudience = (audienceType) => {
  if (!audienceType) return null;

  return AUDIENCE_TYPES.find((candidate) => (
    candidate.toLowerCase() === String(audienceType).trim().toLowerCase()
  )) || null;
};

export const normalizeAudienceType = (audienceType) => (
  findCanonicalAudience(audienceType) || DEFAULT_AUDIENCE
);

export const getEffectiveAudiences = (slide) => (
  Array.isArray(slide?.audiences) && slide.audiences.length > 0
    ? slide.audiences
    : [DEFAULT_AUDIENCE]
);

export const isSlideVisibleForAudience = (slide, audienceType) => {
  const targetAudience = normalizeAudienceType(audienceType);
  const audiences = getEffectiveAudiences(slide);

  return audiences.some((audience) => findCanonicalAudience(audience) === targetAudience);
};
