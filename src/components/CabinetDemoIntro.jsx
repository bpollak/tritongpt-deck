import { Play } from 'lucide-react';
import CabinetCanvas from './CabinetCanvas';
import './CabinetDemoIntro.css';

// Title card shown before a recording plays, so the room knows what it is about
// to see and what to look for. A standalone slide (no imagery behind it) that waits
// until the presenter clicks or advances.
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
      <CabinetCanvas className="cabinet-demo-intro__canvas" section={slide.section} ask={slide.ask}>
        <div className="cabinet-demo-intro__body">
          <div className="cabinet-demo-intro__main">
            {intro.kicker && <p className="cabinet-demo-intro__kicker">{intro.kicker}</p>}
            <h1>{intro.title}</h1>
            {intro.setup && <p className="cabinet-demo-intro__setup">{intro.setup}</p>}
          </div>
          <aside className="cabinet-demo-intro__side">
            <span className="cabinet-demo-intro__play" aria-hidden="true"><Play size={46} strokeWidth={2.2} /></span>
            {intro.watchFor && (
              <p className="cabinet-demo-intro__watch"><strong>Watch for</strong>{intro.watchFor}</p>
            )}
          </aside>
        </div>
      </CabinetCanvas>
    </button>
  );
}
