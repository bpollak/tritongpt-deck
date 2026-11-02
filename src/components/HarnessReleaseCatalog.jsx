import { Lightbulb, Brain, Users, Calendar, MousePointer2, Smartphone, Mail, FileSpreadsheet, Network, Globe, ShieldCheck, BarChart3, Compass, Link2, Layers, Plug, Blocks, Github, ClipboardList, FileCheck, Workflow, GraduationCap, CheckCircle2, Video, ArrowRight } from 'lucide-react';
import CabinetCanvas from './CabinetCanvas';
import './HarnessReleaseCatalog.css';

const icons = { Lightbulb, Brain, Users, Calendar, MousePointer2, Smartphone, Mail, FileSpreadsheet, Network, Globe, ShieldCheck, BarChart3, Compass, Link2, Layers };
const pluginIcons = {
  'microsoft-365': [Layers, '#2563b8'],
  'google-workspace': [FileSpreadsheet, '#18844b'],
  github: [Github, '#29364a'],
  'jira-data-center': [ClipboardList, '#145ac9'],
  'kuali-build': [FileCheck, '#bd5b16'],
  n8n: [Workflow, '#bd3657'],
  lucid: [Network, '#ad4d17'],
  tableau: [BarChart3, '#24578a'],
  'ucsd-assistant': [GraduationCap, '#00629b']
};

function Availability({ availability }) {
  if (availability === 'both') return <span className="hrc-stable-check" role="img" aria-label="Available in Stable and Nightly" title="Available in Stable and Nightly"><CheckCircle2 size={18} aria-hidden="true" /></span>;
  return <span className={`hrc-badge hrc-badge--${availability}`}>{availability === 'nightly' ? 'Nightly' : 'Stable only'}</span>;
}

export default function HarnessReleaseCatalog({ slide }) {
  const catalog = slide.releaseCatalog;
  const highlights = slide.releaseHighlights;
  const features = Object.fromEntries(catalog.features.flatMap(g => g.items).map(item => [item.id, item]));
  const skills = Object.fromEntries(catalog.skills.flatMap(g => g.items).map(item => [item.id, item]));
  return <CabinetCanvas className="hrc-canvas" section={slide.section}>
    <section className="hrc-slide" aria-label={slide.title}>
      <header className="hrc-header">
        <h1>{slide.title}</h1>
        <p>{slide.subtitle}</p>
      </header>
      <div className="hrc-legend" aria-label="Release availability">
        <span><Availability availability="both" /> Stable + Nightly</span>
        <span><Availability availability="nightly" /> Testing in Nightly</span>
        <span><Availability availability="stable" /> Stable bundle only</span>
      </div>
      <div className="hrc-overview">
        <section className="hrc-card hrc-features-card" aria-label="Key features">
          <h2><Layers size={25} aria-hidden="true" /> Features</h2>
          <ul className="hrc-feature-list">
            {highlights.features.map(item => {
              const Icon = icons[item.icon];
              return <li key={item.id}>
                <span className="hrc-component-icon"><Icon size={29} aria-hidden="true" /></span>
                <div><div className="hrc-item-heading"><h3>{item.name}</h3><Availability availability={features[item.id].availability} /></div><p>{item.detail}</p></div>
              </li>;
            })}
          </ul>
        </section>
        <section className="hrc-card hrc-plugins-card" aria-label="Connected plugins">
          <h2><Plug size={25} aria-hidden="true" /> Plugins</h2>
          <div className="hrc-plugin-grid">
            {highlights.plugins.map(id => {
              const item = catalog.plugins.find(plugin => plugin.id === id);
              const [Icon, color] = pluginIcons[id];
              return <article key={id} className="hrc-plugin-tile" aria-label={item.name}>
                <span className="hrc-plugin-icon" style={{ color }}><Icon size={29} aria-hidden="true" /></span>
                <h3>{item.name}</h3>
                <Availability availability={item.availability} />
              </article>;
            })}
          </div>
        </section>
        <section className="hrc-card hrc-skills-card" aria-label="Reusable skills">
          <h2><Blocks size={25} aria-hidden="true" /> Skills</h2>
          <ul className="hrc-skill-list">
            {highlights.skills.map(item => {
              const Icon = icons[item.icon];
              const availability = item.ids.some(id => skills[id].availability === 'nightly') ? 'nightly' : 'both';
              return <li key={item.name}><Icon size={25} className="hrc-skill-icon" aria-hidden="true" /><h3>{item.name}</h3><Availability availability={availability} /></li>;
            })}
          </ul>
          <div className="hrc-record-skill">
            <span className="hrc-record-graphic" aria-hidden="true"><Video size={25} /><ArrowRight size={18} /><Blocks size={25} /></span>
            <div><div className="hrc-item-heading"><h3>Record your own skill</h3><Availability availability={features.record.availability} /></div><p>Demonstrate a task, then reuse it.</p></div>
          </div>
        </section>
      </div>
      <div className="hrc-nightly-strip" aria-label="Nightly feature previews">
        <strong>Nightly previews</strong>
        {highlights.previews.map(item => {
          const Icon = icons[item.icon];
          return <span key={item.id}><Icon size={19} aria-hidden="true" />{item.name}</span>;
        })}
      </div>
      <footer className="hrc-footer">
        <span>Skill examples come from plugins and the optional Commons library.</span>
        <span>Stable {catalog.stableVersion} · Nightly {catalog.nightlyDate} · Checked {catalog.checkedDate} · <a href={catalog.sources.stable} target="_blank" rel="noreferrer">Release notes</a></span>
      </footer>
    </section>
  </CabinetCanvas>;
}
