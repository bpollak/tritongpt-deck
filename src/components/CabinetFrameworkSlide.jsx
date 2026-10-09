import './CabinetFrameworkSlide.css';
import CabinetCanvas from './CabinetCanvas';

// Authoring placeholders use no old footage. Once a recording is approved, set
// type to "video" and add videoSrc/poster/captionsSrc to use the existing player.
export default function CabinetFrameworkSlide({ slide, staticPreview = false }) {
  const isDemo = slide.layout === 'cabinet-demo';

  return (
    <CabinetCanvas className="cabinet-framework-canvas" section={slide.section} ask={slide.ask}><section className={`cabinet-framework-slide${slide.sources?.length || slide.sourceNote ? ' cabinet-framework-slide--cited' : ''}`} aria-label={slide.title}>
      <h1>{slide.title}</h1>
      {isDemo ? (
        <div className="cabinet-framework-demo">
          {slide.videoSrc ? (
            <video
              className="cabinet-framework-video"
              src={slide.videoSrc}
              poster={slide.poster}
              autoPlay={!staticPreview}
              preload={staticPreview ? 'metadata' : undefined}
              controls
              muted
              playsInline
            />
          ) : (
            <div className="cabinet-framework-recording" aria-label="Recording placeholder">
              <p>{slide.recording?.pendingLabel || 'New recording pending'}</p>
              <h2>{slide.recording?.label || slide.title}</h2>
              <span>{slide.recording?.format || 'Screen capture'}</span>
            </div>
          )}
          <div className="cabinet-framework-copy">
            <p className="cabinet-framework-takeaway">{slide.subtitle}</p>
            <ol>
              {slide.content.map((item) => (
                <li key={item.heading}>
                  <h2>{item.heading}</h2>
                  <p>{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      ) : (
        <div className="cabinet-framework-outline">
          <p className="cabinet-framework-takeaway">{slide.subtitle}</p>
          <div className="cabinet-framework-rows">
            {slide.content.map((item, index) => (
              <div className="cabinet-framework-row" key={item.heading}>
                <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h2>{item.heading}</h2>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {slide.pendingNote && <p className="cabinet-framework-pending">{slide.pendingNote}</p>}
      {slide.sourceNote && <p className="cabinet-framework-sources">{slide.sourceNote}</p>}
      {slide.sources?.length > 0 && (
        <p className="cabinet-framework-sources">
          Sources: {slide.sources.map((source, index) => (
            <span key={source.href}>
              {index > 0 && ' · '}
              <a href={source.href} target="_blank" rel="noopener noreferrer">[{index + 1}] {source.label}</a>
            </span>
          ))}
        </p>
      )}
      {slide.actionLink && <a className="cabinet-framework-action" href={slide.actionLink.href} target="_blank" rel="noopener noreferrer">{slide.actionLink.label} <span aria-hidden="true">↗</span></a>}
    </section></CabinetCanvas>
  );
}
