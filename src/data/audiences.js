export const DEFAULT_AUDIENCE = 'all';

export const AUDIENCE_TYPES = ['all', 'technical', 'executive', 'internal', 'public', 'CCW'];

export const AUDIENCE_COLORS = {
  all: 'bg-gray-500',
  technical: 'bg-blue-500',
  executive: 'bg-purple-500',
  internal: 'bg-green-500',
  public: 'bg-orange-500',
  CCW: 'bg-rose-500'
};

export const getEffectiveAudiences = (slide) => (
  Array.isArray(slide?.audiences) && slide.audiences.length > 0
    ? slide.audiences
    : [DEFAULT_AUDIENCE]
);

export const isSlideVisibleForAudience = (slide, audienceType) => {
  const targetAudience = audienceType || DEFAULT_AUDIENCE;

  if (targetAudience === DEFAULT_AUDIENCE) {
    return true;
  }

  const audiences = getEffectiveAudiences(slide);
  return audiences.includes(DEFAULT_AUDIENCE) || audiences.includes(targetAudience);
};
