import { MotionConfig } from 'framer-motion';
import Slide from '../components/Slide';
import { slides } from '../data/slideDeck';

// Development-only capture route. It never mounts the manager or its save APIs.
const ThumbnailPage = () => {
  const slug = new URLSearchParams(window.location.search).get('slide');
  const slide = slides.find((candidate) => candidate.slug === slug);
  if (!slide) return <p>Unknown slide</p>;

  return (
    <MotionConfig reducedMotion="always">
      <style>{'[data-thumbnail-slide] * { opacity: 1 !important; animation: none !important; transition: none !important; } .cabinet-harness-overview--demo-only header, .cabinet-harness-overview--demo-only .cabinet-harness-scene-heading { opacity: 0 !important; }'}</style>
      <div className="tritonai-slide-stage" data-thumbnail-slide={slide.slug} style={{ width: 1600, height: 900, position: 'relative', overflow: 'hidden' }}>
        <Slide slide={slide} staticPreview />
      </div>
    </MotionConfig>
  );
};

export default ThumbnailPage;
