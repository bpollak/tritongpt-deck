import CabinetCanvas from './CabinetCanvas';
import { gatewayMonthly } from '../data/gatewayUsage.js';
import './CabinetSovereignGateway.css';

// Hub diagram: models flow into the campus-run gateway, which serves UC San Diego
// and other UC campuses. Monthly bars use the same public aggregates as the usage slide.
const HUB = { x: 450, w: 300, mid: 410 };
const CAMPUS_TOP = 205, CAMPUS_H = 86, CAMPUS_GAP = 22;
const MODEL_TOPS = [215, 425], MODEL_H = 180;

const curve = (x1, y1, x2, y2) => {
  const dx = (x2 - x1) / 2;
  return `M${x1},${y1} C${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}`;
};

export default function CabinetSovereignGateway({ slide }) {
  const g = slide.gatewayMap;
  const peak = Math.max(...gatewayMonthly.map(m => m.selfHostedTokens + m.cloudTokens));
  const campusY = (i) => CAMPUS_TOP + i * (CAMPUS_H + CAMPUS_GAP) + CAMPUS_H / 2;
  return <CabinetCanvas className="cabinet-gw-canvas" section={slide.section} ask={slide.ask}>
    <section className="cabinet-gw" aria-label={slide.title}>
      <h1>{slide.title}</h1>
      <p className="cabinet-gw-lead">{slide.subtitle}</p>

      <svg className="cabinet-gw-lines" viewBox="0 0 1280 720" aria-hidden="true">
        {MODEL_TOPS.map((top, i) => <path key={`m${i}`} className="cabinet-gw-flow cabinet-gw-flow--in"
          d={curve(350, top + MODEL_H / 2, HUB.x, HUB.mid)} />)}
        {g.campuses.map((c, i) => <path key={c.name} className={`cabinet-gw-flow cabinet-gw-flow--${c.tone}`}
          d={curve(HUB.x + HUB.w, HUB.mid, 850, campusY(i))} />)}
      </svg>

      <div className="cabinet-gw-col-label cabinet-gw-col-label--models">{g.modelsLabel}</div>
      {g.models.map((m, i) => <div key={m.name} className="cabinet-gw-model" style={{ top: MODEL_TOPS[i], height: MODEL_H }}>
        <span>{m.tag}</span><h2>{m.name}</h2><p>{m.text}</p>
      </div>)}

      <div className="cabinet-gw-hub" style={{ left: HUB.x, width: HUB.w }}>
        <span className="cabinet-gw-hub-kicker">{g.hub.name}</span>
        <strong>{g.hub.value}</strong>
        <p>{g.hub.detail}</p>
        <div className="cabinet-gw-bars" role="img" aria-label="Monthly gateway tokens, January to September 2026">
          {gatewayMonthly.map(m => {
            const total = m.selfHostedTokens + m.cloudTokens;
            return <div key={m.month} className="cabinet-gw-bar" title={`${m.label}: ${(total / 1e9).toFixed(1)}B tokens`}>
              <i style={{ height: `${(total / peak) * 100}%` }}>
                <b style={{ height: `${(m.cloudTokens / total) * 100}%` }} />
              </i>
              <small>{m.label[0]}</small>
            </div>;
          })}
        </div>
        <p className="cabinet-gw-hub-foot">{g.hub.foot}</p>
      </div>

      <div className="cabinet-gw-col-label cabinet-gw-col-label--campuses">{g.campusesLabel}</div>
      {g.campuses.map((c, i) => <div key={c.name} className={`cabinet-gw-campus cabinet-gw-campus--${c.tone}`}
        style={{ top: CAMPUS_TOP + i * (CAMPUS_H + CAMPUS_GAP), height: CAMPUS_H }}>
        <div><h2>{c.name}</h2><p>{c.text}</p></div>
        <span>{c.status}</span>
      </div>)}
    </section>
  </CabinetCanvas>;
}
