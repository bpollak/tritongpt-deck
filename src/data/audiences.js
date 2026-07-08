export const DEFAULT_AUDIENCE = 'all';

export const AUDIENCE_TYPES = ['all', 'technical', 'executive', 'cabinet', 'citizen', 'internal', 'public', 'conference', 'PK', 'regent', 'LMU'];

export const AUDIENCE_COLORS = {
  all: 'bg-gray-500',
  technical: 'bg-blue-500',
  executive: 'bg-purple-500',
  cabinet: 'bg-rose-500',
  'citizen': 'bg-pink-600',
  internal: 'bg-green-500',
  public: 'bg-orange-500',
  conference: 'bg-amber-500',
  'PK': 'bg-teal-500',
  'regent': 'bg-indigo-500',
  'LMU': 'bg-red-700'
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
