import { useState } from 'react';
import './CabinetHarnessOverview.css';

export default function CabinetHarnessOverview({ slide }) {
  const [selected, setSelected] = useState(0);
  const { views, captureNote } = slide.harnessOverview;
  const [selectedScene, setSelectedScene] = useState(() => views[0].initialScene || 0);
  const view = views[selected];
  const scene = view.scenes[selectedScene];
  const release = view.releaseAvailability;
  return (
    <section className="cabinet-harness-overview" aria-label={slide.title}>
      <header>
        <h1>{slide.title}</h1>
        <div className="cabinet-harness-switcher" role="group" aria-label="Harness screenshots">
          {views.map((item, index) => (
            <button key={item.label} type="button" aria-pressed={selected === index} onClick={() => { setSelected(index); setSelectedScene(item.initialScene || 0); }}>{item.label}</button>
          ))}
        </div>
      </header>
      <div className="cabinet-harness-scene-heading">
        <h2>{view.heading}</h2>
        <div className="cabinet-harness-stages" role="group" aria-label={`${view.label} screenshot stages`}>
          {view.scenes.map((item, index) => (
            <button key={item.label} type="button" aria-pressed={selectedScene === index} onClick={() => setSelectedScene(index)}>{item.label}</button>
          ))}
        </div>
      </div>
      <div className={`cabinet-harness-release cabinet-harness-release-${release?.channel || 'unverified'}`} role="status" aria-label="Feature availability">
        <strong>{release?.label || 'Release availability unverified'}</strong>
        {release?.source && <a href={release.source} target="_blank" rel="noopener noreferrer">Release evidence</a>}
      </div>
      <figure className="cabinet-harness-capture">
        <img src={`${import.meta.env.BASE_URL}cabinet-harness/${scene.src}`} alt={scene.alt} />
        <figcaption>{scene.note}</figcaption>
      </figure>
      <p className="cabinet-harness-version"><strong>Capture build:</strong> {captureNote}</p>
    </section>
  );
}
