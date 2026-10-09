import { useLayoutEffect, useRef, useState } from 'react';
import { cabinetWebsiteVisuals } from '../data/cabinetWebsiteVisuals';
import CabinetWorkflowComparison from './CabinetWorkflowComparison';
import './CabinetWebsiteVisual.css';

// These are local copies of the selected website graphics, not reconstructed
// illustrations or an iframe. Scale the entire source composition uniformly.
export default function CabinetWebsiteVisual({ slide, staticPreview }) {
  const frameRef = useRef(null);
  const sourceRef = useRef(null);
  const [placement, setPlacement] = useState({ scale: 1, left: 0, top: 0 });

  useLayoutEffect(() => {
    const fit = () => {
      const frame = frameRef.current;
      const source = sourceRef.current;
      if (!frame || !source) return;
      if (!frame.clientWidth || !frame.clientHeight) return;
      // Fit the visible composition. The site's outer section padding is blank
      // space, so it need not shrink the unchanged graphic on a projected slide.
      const sectionStyle = window.getComputedStyle(source.firstElementChild);
      const paddingTop = parseFloat(sectionStyle.paddingTop) || 0;
      const paddingBottom = parseFloat(sectionStyle.paddingBottom) || 0;
      const contentHeight = source.offsetHeight - paddingTop - paddingBottom;
      const scale = Math.min(frame.clientWidth / 1170, frame.clientHeight / contentHeight);
      setPlacement({ scale, left: (frame.clientWidth - 1170 * scale) / 2, top: -paddingTop * scale });
    };
    const observer = new ResizeObserver(fit);
    observer.observe(frameRef.current);
    observer.observe(sourceRef.current);
    document.fonts.ready.then(fit);
    fit();
    return () => observer.disconnect();
  }, [slide.websiteVisual]);

  const visual = (
    <div className="cabinet-website-slide" data-static-preview={staticPreview || undefined}>
      <div className="cabinet-website-frame" ref={frameRef}>
        <div
          ref={sourceRef}
          className="cabinet-website-source"
          style={{ transform: `translate(${placement.left}px, ${placement.top}px) scale(${placement.scale})` }}
          dangerouslySetInnerHTML={{ __html: cabinetWebsiteVisuals[slide.websiteVisual] }}
        />
      </div>
    </div>
  );

  return slide.workflowComparison ? (
    <CabinetWorkflowComparison comparison={{ ...slide.workflowComparison, section: slide.section }}>{visual}</CabinetWorkflowComparison>
  ) : visual;
}
