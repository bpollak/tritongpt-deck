import CabinetCanvas from './CabinetCanvas';
import './CabinetCashReceipts.css';

export default function CabinetCashReceipts({ slide }) {
  const data = slide.cashReceipts;
  return <CabinetCanvas className="cabinet-cash-canvas" section={slide.section} ask={slide.ask}>
    <section className="cabinet-cash" aria-label={slide.title}>
      <h1>{slide.title}</h1>
      <p className="cabinet-cash-lead">{slide.subtitle}</p>
      <div className="cabinet-cash-metrics">
        {data.metrics.map(metric => <div key={metric.label}>
          <strong>{metric.value}</strong><h2>{metric.label}</h2><p>{metric.note}</p>
        </div>)}
      </div>
      <div className="cabinet-cash-phases" aria-label="Four planned development phases">
        {data.phases.map((phase, index) => <div key={phase.title}>
          <span>{index + 1}</span><h2>{phase.title}</h2><p>{phase.text}</p>
        </div>)}
      </div>
      <p className="cabinet-cash-status">{data.status}</p>
      <p className="cabinet-cash-drivers">{data.financialDrivers}</p>
      <p className="cabinet-cash-sources">Sources: {slide.sources.map((s, index) => <span key={s.href}>
        {index > 0 && ' · '}<a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
      </span>)}</p>
    </section>
  </CabinetCanvas>;
}
