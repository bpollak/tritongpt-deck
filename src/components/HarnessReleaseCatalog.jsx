import { useRef, useState } from 'react';
import CabinetCanvas from './CabinetCanvas';
import './HarnessReleaseCatalog.css';

const labels = { both: 'Stable', nightly: 'Nightly', stable: 'Stable only' };

function Availability({ availability }) {
  return <span className={`hrc-badge hrc-badge--${availability}`}>{labels[availability]}</span>;
}

export default function HarnessReleaseCatalog({ slide }) {
  const catalog = slide.releaseCatalog;
  const [selected, setSelected] = useState('features');
  const buttons = useRef([]);
  const panel = useRef(null);
  const tabs = [
    { id: 'features', label: 'Features', count: catalog.features.reduce((n, g) => n + g.items.length, 0) },
    { id: 'plugins', label: 'Plugins', count: catalog.plugins.length },
    { id: 'skills', label: 'Skills', count: catalog.skills.reduce((n, g) => n + g.items.length, 0) }
  ];
  const selectTab = (id) => {
    setSelected(id);
    if (panel.current) panel.current.scrollTop = 0;
  };
  const handleKey = (event, index) => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    event.stopPropagation();
    selectTab(tabs[next].id);
    buttons.current[next]?.focus();
  };
  return <CabinetCanvas className="hrc-canvas" section={slide.section}>
    <section className="hrc-slide" aria-label={slide.title}>
      <header className="hrc-header">
        <h1>{slide.title}</h1>
        <p>{slide.subtitle}</p>
      </header>
      <div className="hrc-legend" aria-label="Release availability">
        <span><Availability availability="both" /> In both releases</span>
        <span><Availability availability="nightly" /> Testing in Nightly</span>
        <span><Availability availability="stable" /> In Stable, absent from Nightly</span>
      </div>
      <div className="hrc-tabs" role="tablist" aria-label="Harness inventory">
        {tabs.map((tab, index) => <button key={tab.id} type="button" role="tab"
          id={`hrc-tab-${tab.id}`} aria-controls="hrc-panel" aria-selected={selected === tab.id}
          tabIndex={selected === tab.id ? 0 : -1} ref={el => { buttons.current[index] = el; }}
          onClick={() => selectTab(tab.id)} onKeyDown={event => handleKey(event, index)}>
          {tab.label} <span>{tab.count}</span>
        </button>)}
        <span className="hrc-version">Stable {catalog.stableVersion} · Nightly {catalog.nightlyDate}</span>
      </div>
      <div ref={panel} id="hrc-panel" className={`hrc-panel hrc-panel--${selected}`} role="tabpanel"
        aria-labelledby={`hrc-tab-${selected}`} tabIndex={0}>
        {selected === 'plugins' ? <div className="hrc-plugin-grid">
          {catalog.plugins.map(item => <article key={item.id} className="hrc-plugin" data-availability={item.availability}>
            <div><h2>{item.name}</h2><Availability availability={item.availability} /></div>
            <p>{item.description}</p>
            <small>{item.skillCount} included {item.skillCount === 1 ? 'skill' : 'skills'}</small>
          </article>)}
        </div> : selected === 'skills' ? <div className="hrc-skill-groups">
          {catalog.skills.map(group => <section key={group.name} className="hrc-skill-group" aria-label={group.name}>
            <h2>{group.name} <small>{group.note}</small></h2>
            <ul>{group.items.map(item => <li key={item.id} data-availability={item.availability} title={item.description}>
              <span>{item.name}</span><Availability availability={item.availability} />
            </li>)}</ul>
          </section>)}
        </div> : <div className="hrc-feature-grid">
          {catalog.features.map(group => <section key={group.name} className="hrc-feature-group" aria-label={group.name}>
            <h2>{group.name}</h2>
            <ul>{group.items.map(item => <li key={item.id} data-availability={item.availability} title={item.description}>
              <span>{item.name}</span><Availability availability={item.availability} />
            </li>)}</ul>
          </section>)}
        </div>}
      </div>
      <footer className="hrc-footer">
        <span>Nightly features are for testing and may change before a Stable release.</span>
        <span>Checked {catalog.checkedDate} · <a href={catalog.sources.stable} target="_blank" rel="noreferrer">Stable notes</a> · <a href={catalog.sources.nightly} target="_blank" rel="noreferrer">Nightly notes</a> · <a href={catalog.sources.commons} target="_blank" rel="noreferrer">Commons skills</a></span>
      </footer>
    </section>
  </CabinetCanvas>;
}
