const canonicalize = (value) => {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonicalize(value[key])]));
  }
  return value;
};

// A content fingerprint, not a security boundary. Stable across JSON key order.
export const getSlideThumbnailKey = (slide) => {
  // Audience assignment is manager state, so retagging can reuse the content preview.
  const { audiences: _audiences, ...content } = slide;
  const text = JSON.stringify(canonicalize(content));
  let hash = 0xcbf29ce484222325n;
  for (let index = 0; index < text.length; index += 1) {
    hash = BigInt.asUintN(64, (hash ^ BigInt(text.charCodeAt(index))) * 0x100000001b3n);
  }
  return hash.toString(16).padStart(16, '0');
};
