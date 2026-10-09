import { useState } from 'react';
import './CabinetHarnessOverview.css';

export default function CabinetHarnessOverview({ slide }) {
  const [selected, setSelected] = useState(0);
  const { views } = slide.harnessOverview;
  const [selectedScene, setSelectedScene] = useState(() => views[0].initialScene || 0);
  const view = views[selected];
  const scene = view.scenes[selectedScene];
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
      <figure className="cabinet-harness-capture">
        <img src={`${import.meta.env.BASE_URL}cabinet-harness/${scene.src}`} alt={scene.alt} />
        <figcaption>{scene.note}</figcaption>
      </figure>
    </section>
  );
}
