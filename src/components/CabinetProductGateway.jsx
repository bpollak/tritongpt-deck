import { Lock, ArrowLeftRight, ShieldCheck, Users, MessagesSquare, Cpu } from 'lucide-react';
import CabinetCanvas from './CabinetCanvas';
import './CabinetProductGateway.css';

// An AI product vs. the campus gateway. Left: one vendor's product holds the sign-in,
// the work, and the models in a single sealed stack. Right: campus tools, the gateway,
// and the models are separate layers, so the model layer can change on its own.
const layerIcons = { Users, MessagesSquare, Cpu };

export default function CabinetProductGateway({ slide }) {
  const d = slide.productGateway;
  return <CabinetCanvas className="cabinet-pg-canvas" section={slide.section} ask={slide.ask}>
    <section className="cabinet-pg" aria-label={slide.title}>
      <h1>{slide.title}</h1>
      <p className="cabinet-pg-lead">{slide.subtitle}</p>

      <div className="cabinet-pg-panel cabinet-pg-panel--product">
        <header><h2>{d.product.name}</h2></header>
        <div className="cabinet-pg-sealed">
          <span className="cabinet-pg-lock" aria-hidden="true"><Lock size={22} strokeWidth={2.4} /></span>
          <p className="cabinet-pg-sealed-label">{d.product.boxLabel}</p>
          {d.product.layers.map((layer) => {
            const Icon = layerIcons[layer.icon] || Cpu;
            return <div className="cabinet-pg-sealed-layer" key={layer.label}>
              <Icon size={26} strokeWidth={2} aria-hidden="true" />
              <strong>{layer.label}</strong>
            </div>;
          })}
        </div>
        <p className="cabinet-pg-verdict">{d.product.verdict}</p>
      </div>

      <div className="cabinet-pg-or" aria-hidden="true">or</div>

      <div className="cabinet-pg-panel cabinet-pg-panel--gateway">
        <header><h2>{d.gateway.name}</h2></header>
        <div className="cabinet-pg-layer cabinet-pg-layer--tools">
          <p>{d.gateway.toolsLabel}</p>
          <div className="cabinet-pg-chips">{d.gateway.tools.map((t) => <span key={t}>{t}</span>)}</div>
        </div>
        <i className="cabinet-pg-link" aria-hidden="true" />
        <div className="cabinet-pg-hub"><strong>{d.gateway.hub}</strong></div>
        <i className="cabinet-pg-link" aria-hidden="true" />
        <div className="cabinet-pg-layer cabinet-pg-layer--models">
          <p>{d.gateway.modelsLabel}<ArrowLeftRight size={18} strokeWidth={2.4} aria-hidden="true" /></p>
          {d.gateway.modelGroups.map((g) => <div key={g.label} className={`cabinet-pg-model-row${g.sovereign ? ' cabinet-pg-model-row--sovereign' : ''}`}>
            <small>{g.label}</small>
            <div className="cabinet-pg-chips cabinet-pg-chips--models">
              {g.models.map((m) => <span key={m}>{m}</span>)}
              {d.gateway.moreLabel && <span className="cabinet-pg-chip-next">{d.gateway.moreLabel}</span>}
            </div>
            {g.note && <em>{g.sovereign && <ShieldCheck size={18} strokeWidth={2.4} aria-hidden="true" />}{g.note}</em>}
          </div>)}
        </div>
        <p className="cabinet-pg-verdict">{d.gateway.verdict}</p>
      </div>

    </section>
  </CabinetCanvas>;
}
