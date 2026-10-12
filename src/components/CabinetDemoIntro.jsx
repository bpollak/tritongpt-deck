import CabinetCanvas from './CabinetCanvas';
import './CabinetDemoIntro.css';

// Title card shown before a recording plays, so the room knows what it is about
// to see and what to look for. It waits until the presenter clicks or advances.
export default function CabinetDemoIntro({ slide, onDone, staticPreview }) {
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
          {intro.kicker && <p className="cabinet-demo-intro__kicker">{intro.kicker}</p>}
          <h1>{intro.title}</h1>
          {intro.setup && <p className="cabinet-demo-intro__setup">{intro.setup}</p>}
          {intro.watchFor && (
            <p className="cabinet-demo-intro__watch"><strong>Watch for</strong>{intro.watchFor}</p>
          )}
        </div>
      </CabinetCanvas>
    </button>
  );
}
