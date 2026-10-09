import './CabinetSectionMark.css';

// Footer that keeps the Cabinet story's parts visible: which part we are in,
// and when the slide carries one of the closing asks.
export default function CabinetSectionMark({ section, ask }) {
  if (!section && !ask) return null;
  return (
    <div className="cabinet-section-mark">
      {section && (
        <p className="cabinet-section-mark__part">
          <span className="cabinet-section-mark__steps" aria-hidden="true">
            {Array.from({ length: section.total || 4 }, (_, i) => i + 1).map(step => <i key={step} data-active={step === section.part || undefined} />)}
          </span>
          Part {section.part} · {section.label}
        </p>
      )}
      {ask && <p className="cabinet-section-mark__ask"><strong>Ask</strong> {ask}</p>}
    </div>
  );
}
