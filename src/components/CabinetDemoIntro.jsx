import CabinetCanvas from './CabinetCanvas';
import './CabinetDemoIntro.css';

// Title card shown before a recording plays, so the room knows what it is about
// to see and what to look for. Click to start the recording early.
export default function CabinetDemoIntro({ slide, seconds, onDone, staticPreview }) {
  const intro = slide.intro;
  return (
    <button
      type="button"
      className="cabinet-demo-intro"
      onClick={onDone}
      disabled={staticPreview}
      aria-label={`${intro.title}. Start the recording`}
    >
      {slide.poster && <img className="cabinet-demo-intro__poster" src={slide.poster} alt="" />}
      <CabinetCanvas className="cabinet-demo-intro__canvas" section={slide.section} ask={slide.ask}>
        <div className="cabinet-demo-intro__body">
          <p className="cabinet-demo-intro__kicker">{intro.kicker || 'Demonstration'}</p>
          <h1>{intro.title}</h1>
          {intro.setup && <p className="cabinet-demo-intro__setup">{intro.setup}</p>}
          {intro.watchFor && (
            <p className="cabinet-demo-intro__watch"><strong>Watch for</strong>{intro.watchFor}</p>
          )}
        </div>
      </CabinetCanvas>
      {!staticPreview && <span className="cabinet-demo-intro__timer" style={{ animationDuration: `${seconds}s` }} />}
    </button>
  );
}
