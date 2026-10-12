import { Play } from 'lucide-react';
import CabinetCanvas from './CabinetCanvas';
import './CabinetDemoIntro.css';

// Title card shown before a recording plays, so the room knows what it is about
// to see and what to look for. A standalone slide (no imagery behind it) that waits
// until the presenter clicks or advances.
export default function CabinetDemoIntro({ slide, onDone, staticPreview, sideVideo }) {
  const intro = slide.intro;
  const Wrapper = sideVideo ? 'div' : 'button';
  const wrapperProps = sideVideo
    ? { className: `cabinet-demo-intro cabinet-demo-intro--side-video${intro.videoWide ? ' cabinet-demo-intro--video-wide' : ''}` }
    : { type: 'button', className: 'cabinet-demo-intro', onClick: onDone, disabled: staticPreview, 'aria-label': `${intro.title}. Start the recording` };
  return (
    <Wrapper {...wrapperProps}>
      <CabinetCanvas className="cabinet-demo-intro__canvas" section={slide.section} ask={slide.ask}>
        <div className="cabinet-demo-intro__body">
          <div className="cabinet-demo-intro__main">
            {intro.kicker && <p className="cabinet-demo-intro__kicker">{intro.kicker}</p>}
            <h1>{intro.title}</h1>
            {intro.setup && <p className="cabinet-demo-intro__setup">{intro.setup}</p>}
            {intro.impact?.length > 0 && (
              <dl className="cabinet-demo-intro__impact">
                {intro.impact.map(item => (
                  <div key={item.value}><dt>{item.value}</dt><dd>{item.label}</dd></div>
                ))}
              </dl>
            )}
          </div>
          {sideVideo ? (
            <aside className="cabinet-demo-intro__side cabinet-demo-intro__side--video">
              <video
                className="cabinet-demo-intro__video"
                src={slide.videoSrc}
                poster={slide.poster}
                autoPlay={!staticPreview}
                preload={staticPreview ? 'metadata' : 'auto'}
                muted
                loop
                playsInline
                aria-label={`${intro.title} recording`}
              />
              {intro.watchFor && <p className="cabinet-demo-intro__caption">{intro.watchFor}</p>}
            </aside>
          ) : (
            <aside className="cabinet-demo-intro__side">
              <span className="cabinet-demo-intro__play" aria-hidden="true"><Play size={46} strokeWidth={2.2} /></span>
              {intro.watchFor && (
                <p className="cabinet-demo-intro__watch"><strong>Watch for</strong>{intro.watchFor}</p>
              )}
            </aside>
          )}
        </div>
      </CabinetCanvas>
    </Wrapper>
  );
}
