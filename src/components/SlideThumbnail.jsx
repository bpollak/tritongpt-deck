import { useState } from 'react';
import manifest from '../data/slideThumbnails.json';
import { getSlideThumbnailKey } from '../data/slideThumbnailKey';

const SlideThumbnail = ({ slide }) => {
  const [failedSrc, setFailedSrc] = useState(null);
  const entry = manifest.slides[slide?.slug];
  const src = slide && entry?.contentKey === getSlideThumbnailKey(slide) ? entry.src : null;

  if (!src || failedSrc === src) {
    return <span className="slide-library-thumbnail slide-library-thumbnail--missing">Open slide preview</span>;
  }

  return (
    <img
      className="slide-library-thumbnail"
      src={src}
      width="1600"
      height="900"
      alt=""
      loading="lazy"
      decoding="async"
      onError={() => setFailedSrc(src)}
    />
  );
};

export default SlideThumbnail;
