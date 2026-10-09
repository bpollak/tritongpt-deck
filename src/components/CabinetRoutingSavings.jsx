import CabinetCanvas from './CabinetCanvas';
import './CabinetRoutingSavings.css';

export default function CabinetRoutingSavings({ slide }) {
  const { assumptions, scenarios, baselineHours } = slide.routingSavings;
  return <CabinetCanvas className="cabinet-routing-canvas">
    <section className="cabinet-routing-slide" aria-label={slide.title}>
      <h1>{slide.title}</h1>
      <p className="cabinet-routing-scope">Illustrative scenario · {assumptions.eligibleCases.toLocaleString()} eligible cases · {assumptions.accuracy * 100}% correct routing assumed</p>
      <div className="cabinet-routing-results">
        {scenarios.map(scenario => <article key={scenario.label}>
          <h2>{scenario.label}</h2>
          <p className="cabinet-routing-number">~{Math.round(baselineHours - scenario.hours)} <span>hours freed</span></p>
          <p className="cabinet-routing-detail">{scenario.description}</p>
        </article>)}
      </div>
      <figure className="cabinet-routing-chart" aria-label="Estimated routing effort in staff hours per ten thousand eligible cases">
        <figcaption>Routing effort · staff hours per 10,000 eligible cases</figcaption>
        {[{ label: 'Manual routing', hours: baselineHours }, ...scenarios].map(row => <div className="cabinet-routing-bar-row" key={row.label}>
          <span>{row.label}</span><div className="cabinet-routing-bar-track"><div className="cabinet-routing-bar" style={{ width: `${row.hours / baselineHours * 100}%` }} /></div><strong>{Math.round(row.hours)} h</strong>
        </div>)}
        <p className="cabinet-routing-zero">Bars start at zero. Both assisted scenarios include correcting every incorrect assignment.</p>
      </figure>
      <p className="cabinet-routing-assumptions">Assumptions: {assumptions.manualSeconds}s to route manually · {assumptions.correctionSeconds}s per incorrect assignment · {assumptions.reviewSeconds}s review per case in the staff-reviewed scenario.</p>
      <p className="cabinet-routing-qualification">Potential staff capacity, not measured savings. The demo shows staff-reviewed suggestions; automatic routing is an operating scenario to evaluate.</p>
    </section>
  </CabinetCanvas>;
}
