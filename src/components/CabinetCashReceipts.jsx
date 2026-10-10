import CabinetCanvas from './CabinetCanvas';
import './CabinetCashReceipts.css';

export default function CabinetCashReceipts({ slide }) {
  const data = slide.cashReceipts;
  return <CabinetCanvas className="cabinet-cash-canvas" section={slide.section} ask={slide.ask}>
    <section className={`cabinet-cash${data.metrics?.length ? '' : ' cabinet-cash--simple'}`} aria-label={slide.title}>
      <h1>{slide.title}</h1>
      <p className="cabinet-cash-lead">{slide.subtitle}</p>
      {data.metrics?.length > 0 && <div className="cabinet-cash-metrics">
        {data.metrics.map(metric => <div key={metric.label}>
          <strong>{metric.value}</strong><h2>{metric.label}</h2><p>{metric.note}</p>
        </div>)}
      </div>}
      <div className="cabinet-cash-phases" aria-label="Development phases">
        {data.phases.map((phase, index) => <div key={phase.title}>
          <span>Phase {index + 1}{phase.when && <em>{phase.when}</em>}</span><h2>{phase.title}</h2>{phase.text && <p>{phase.text}</p>}
        </div>)}
      </div>
      {data.status && <p className="cabinet-cash-status">{data.status}</p>}
      {data.financialDrivers && <p className="cabinet-cash-drivers">{data.financialDrivers}</p>}
      {slide.sources?.length > 0 && <p className="cabinet-cash-sources">Sources: {slide.sources.map((s, index) => <span key={s.href}>
        {index > 0 && ' · '}<a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
      </span>)}</p>}
    </section>
  </CabinetCanvas>;
}
