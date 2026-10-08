import { useState } from 'react';
import './CabinetHarnessOverview.css';

export default function CabinetHarnessOverview({ slide }) {
  const [selected, setSelected] = useState(0);
  const { views, captureNote } = slide.harnessOverview;
  const view = views[selected];
  return (
    <section className="cabinet-harness-overview" aria-label={slide.title}>
      <header>
        <h1>{slide.title}</h1>
        <div className="cabinet-harness-switcher" role="group" aria-label="Harness screenshots">
          {views.map((item, index) => (
            <button key={item.label} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>{item.label}</button>
          ))}
        </div>
      </header>
      <h2>{view.heading}</h2>
      <figure className="cabinet-harness-capture">
        <img src={`${import.meta.env.BASE_URL}cabinet-harness/${view.src}`} alt={view.alt} />
        <figcaption>{view.note}</figcaption>
      </figure>
      <p className="cabinet-harness-version">{captureNote}</p>
    </section>
  );
}
