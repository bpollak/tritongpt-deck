import { useLayoutEffect, useRef, useState } from 'react';
import './CabinetCanvas.css';

// Keep presentation typography and the complete composition together when the
// deck is projected or shown in a short preview pane. Phones retain a reading view.
export default function CabinetCanvas({ children, className = '' }) {
  const frame = useRef(null);
  const [placement, setPlacement] = useState({ scale: 1, left: 0, top: 0, reading: false });
  useLayoutEffect(() => {
    const fit = () => {
      const { width, height } = frame.current.getBoundingClientRect();
      if (!width || !height) return;
      const reading = width < 600 && height > width;
      const scale = Math.min(width / 1280, height / 720);
      setPlacement({ scale, left: (width - 1280 * scale) / 2, top: (height - 720 * scale) / 2, reading });
    };
    const observer = new ResizeObserver(fit);
    observer.observe(frame.current);
    fit();
    return () => observer.disconnect();
  }, []);

  return <div ref={frame} className={`cabinet-canvas ${className}`} data-reading={placement.reading || undefined}>
    <div className="cabinet-canvas-content" style={placement.reading ? undefined : {
      transform: `translate(${placement.left}px, ${placement.top}px) scale(${placement.scale})`
    }}>{children}</div>
  </div>;
}
