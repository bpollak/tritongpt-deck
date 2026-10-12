import { FileText, CheckCircle, ClipboardList, RotateCw } from 'lucide-react';
import CabinetCanvas from './CabinetCanvas';
import './CabinetHarnessAround.css';

// Chat app vs. Harness: the same model with and without the workspace around it.
// The fact rows under each panel carry the useful parts of the earlier comparison matrix.
const outputIcons = { FileText, CheckCircle, ClipboardList };

const Model = ({ loop }) => (
  <div className={`cabinet-ha-model${loop ? ' cabinet-ha-model--loop' : ''}`} aria-label="AI model">
    {loop && <span className="cabinet-ha-ring" aria-hidden="true"><i /></span>}
    <span className="cabinet-ha-m">M</span>
    {loop && <span className="cabinet-ha-loop" aria-hidden="true"><RotateCw size={13} strokeWidth={3} /></span>}
  </div>
);

const Facts = ({ rows }) => (
  <dl className="cabinet-ha-facts">
    {rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
  </dl>
);

export default function CabinetHarnessAround({ slide }) {
  const d = slide.harnessAround;
  return <CabinetCanvas className="cabinet-workflow-canvas cabinet-ha-canvas" section={slide.section}>
    <section className="cabinet-ha" aria-label={slide.title}>
      <header className="cabinet-ha-header">
        <p className="cabinet-ha-kicker">{d.kicker}</p>
        <h1>{slide.title}</h1>
        <p className="cabinet-ha-lead">{d.lead}</p>
        <p className="cabinet-ha-key"><strong>M</strong> = the AI model</p>
      </header>

      <div className="cabinet-ha-panels">
        <article className="cabinet-ha-panel cabinet-ha-panel--chat">
          <div className="cabinet-ha-head">
            <div>
              <p className="cabinet-ha-product">{d.chat.product}</p>
              <h2>{d.chat.name}</h2>
              <p className="cabinet-ha-tag">{d.chat.tagline}</p>
            </div>
            <div className="cabinet-ha-chips"><span className="is-fill">Prompt</span><em aria-hidden="true">→</em><span>Answer</span></div>
          </div>
          <div className="cabinet-ha-stage cabinet-ha-stage--chat">
            <span className="cabinet-ha-box is-fill">user asks</span>
            <Model />
            <span className="cabinet-ha-box">answer returns</span>
            <span className="cabinet-ha-track" aria-hidden="true"><b /></span>
          </div>
          <div className="cabinet-ha-gets">
            <span className="cabinet-ha-gets-label">You get</span>
            <span className="cabinet-ha-out">“Here’s a summary…”</span>
            <span className="cabinet-ha-gets-label">End of turn</span>
          </div>
          <Facts rows={d.chat.facts} />
        </article>

        <article className="cabinet-ha-panel cabinet-ha-panel--harness">
          <div className="cabinet-ha-head">
            <div>
              <p className="cabinet-ha-product">{d.harness.product}</p>
              <h2>{d.harness.name}</h2>
              <p className="cabinet-ha-tag">{d.harness.tagline}</p>
            </div>
            <div className="cabinet-ha-chips"><span>Context</span><span>Tools</span><span>Loop</span></div>
          </div>
          <div className="cabinet-ha-stage cabinet-ha-stage--harness">
            <div className="cabinet-ha-col">{d.harness.inputs.map(x => <span key={x} className="cabinet-ha-box is-muted">{x}</span>)}</div>
            <Model loop />
            <div className="cabinet-ha-col">{d.harness.actions.map(x => <span key={x} className="cabinet-ha-box">{x}</span>)}</div>
          </div>
          <div className="cabinet-ha-gets">
            <span className="cabinet-ha-gets-label">You get</span>
            {d.harness.outputs.map(o => {
              const Icon = outputIcons[o.icon];
              return <span key={o.label} className="cabinet-ha-out">{Icon && <Icon size={15} strokeWidth={2.5} aria-hidden="true" />}{o.label}</span>;
            })}
          </div>
          <Facts rows={d.harness.facts} />
        </article>
      </div>
    </section>
  </CabinetCanvas>;
}
