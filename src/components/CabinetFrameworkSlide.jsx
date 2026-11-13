import { Brain, Bot, CalendarClock, MousePointerClick, Smartphone, Lightbulb, Mail, FolderOpen, GraduationCap, ClipboardList, ListChecks, Github, Network, Shapes, FileSpreadsheet, Globe, Tags, Server, CircleDot, ShieldCheck, MessageSquare, BookOpen, Database, Clock, BarChart3, Scale, Users, Ban } from 'lucide-react';
import './CabinetFrameworkSlide.css';

// Icons for column slides that list many items (optional `icon` on an item or chip).
const columnIcons = { Brain, Bot, CalendarClock, MousePointerClick, Smartphone, Lightbulb, Mail, FolderOpen, GraduationCap, ClipboardList, ListChecks, Github, Network, Shapes, FileSpreadsheet, Globe, Tags, Server, CircleDot, ShieldCheck, MessageSquare, BookOpen, Database, Clock, BarChart3, Scale, Users, Ban };
const ColumnIcon = ({ name, size = 22 }) => {
  const Icon = columnIcons[name];
  return Icon ? <Icon size={size} strokeWidth={2} aria-hidden="true" /> : null;
};
const chipOf = (chip) => (typeof chip === 'string' ? { label: chip } : chip);
import CabinetCanvas from './CabinetCanvas';
import CabinetFigure from './CabinetFigure';

// Authoring placeholders use no old footage. Once a recording is approved, set
// type to "video" and add videoSrc/poster/captionsSrc to use the existing player.
export default function CabinetFrameworkSlide({ slide, staticPreview = false }) {
  const isDemo = slide.layout === 'cabinet-demo';

  return (
    slide.divider ? (
      <CabinetCanvas className="cabinet-framework-canvas" section={slide.section}>
        <section className="cabinet-divider" aria-label={slide.title}>
          <p className="cabinet-divider__part">Part {slide.divider.part}</p>
          <h1>{slide.title}</h1>
          {slide.subtitle && <p className="cabinet-divider__question">{slide.subtitle}</p>}
        </section>
      </CabinetCanvas>
    ) :
    <CabinetCanvas className="cabinet-framework-canvas" section={slide.section} ask={slide.ask}><section className={`cabinet-framework-slide${slide.sources?.length || slide.sourceNote ? ' cabinet-framework-slide--cited' : ''}${slide.compact ? ' cabinet-framework-slide--compact' : ''}`} aria-label={slide.title}>
      <h1>{slide.title}</h1>
      {isDemo ? (
        <div className="cabinet-framework-demo">
          {slide.videoSrc ? (
            <video
              className="cabinet-framework-video"
              src={slide.videoSrc}
              poster={slide.poster}
              autoPlay={!staticPreview}
              preload={staticPreview ? 'metadata' : undefined}
              controls
              muted
              playsInline
            />
          ) : (
            <div className="cabinet-framework-recording" aria-label="Recording placeholder">
              <p>{slide.recording?.pendingLabel || 'New recording pending'}</p>
              <h2>{slide.recording?.label || slide.title}</h2>
              <span>{slide.recording?.format || 'Screen capture'}</span>
            </div>
          )}
          <div className="cabinet-framework-copy">
            <p className="cabinet-framework-takeaway">{slide.subtitle}</p>
            <ol>
              {slide.content.map((item) => (
                <li key={item.heading}>
                  <h2>{item.heading}</h2>
                  <p>{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      ) : slide.figure ? (
        <div className="cabinet-figure">
          {slide.subtitle && <p className="cabinet-framework-takeaway">{slide.subtitle}</p>}
          <CabinetFigure figure={slide.figure} title={slide.title} />
        </div>
      ) : slide.impactTable ? (
        <div className="cabinet-impact">
          <p className="cabinet-framework-takeaway">{slide.subtitle}</p>
          <table className="cabinet-impact-table">
            <thead>
              <tr>{(slide.impactTable.headers || ['Solution', 'Status', 'Impact']).map(h => <th key={h} scope="col">{h}</th>)}</tr>
            </thead>
            <tbody>
              {slide.impactTable.rows.map(row => (
                <tr key={row.name}>
                  <th scope="row"><strong>{row.name}</strong>{row.what && <span>{row.what}</span>}</th>
                  <td><span className={`cabinet-impact-status cabinet-impact-status--${row.tone || 'live'}`}>{row.status}</span></td>
                  <td><strong className="cabinet-impact-figure">{row.impact}</strong><span>{row.basis}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : slide.columns ? (
        <div className="cabinet-columns">
          <p className="cabinet-framework-takeaway">{slide.subtitle}</p>
          <div className={`cabinet-columns__grid${slide.columns.length === 2 ? ' cabinet-columns__grid--2' : ''}`}>
            {slide.columns.map((column) => (
              <section className="cabinet-columns__col" key={column.label}>
                <p className="cabinet-columns__label">{column.label}</p>
                {column.chips ? (
                  <div className={`cabinet-columns__chips${column.chipColumns === 1 ? ' cabinet-columns__chips--1' : ''}${column.dense ? ' cabinet-columns__chips--dense' : ''}`}>
                    {column.chips.map(chipOf).map((chip) => <span key={chip.label}><ColumnIcon name={chip.icon} size={20} />{chip.label}</span>)}
                    {column.chipExtra && <span className="cabinet-columns__chip-extra"><ColumnIcon name={chipOf(column.chipExtra).icon} size={20} />{chipOf(column.chipExtra).label}</span>}
                  </div>
                ) : (
                  <ul className={column.compact ? 'cabinet-columns__compact' : undefined}>
                    {column.items.map((item) => (
                      <li key={item.heading} className={item.icon ? 'cabinet-columns__with-icon' : undefined}>
                        {item.icon && <i className="cabinet-columns__icon"><ColumnIcon name={item.icon} size={24} /></i>}
                        <div>
                          <h3>{item.heading}</h3>
                          <p>{item.text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                {column.footnote && <p className={`cabinet-columns__footnote${column.footnoteIcon ? ' cabinet-columns__footnote--icon' : ''}`}><ColumnIcon name={column.footnoteIcon} size={22} />{column.footnote}</p>}
              </section>
            ))}
          </div>
          {slide.note && <p className="cabinet-columns__note">{slide.note}</p>}
        </div>
      ) : (
        <div className="cabinet-framework-outline">
          <p className="cabinet-framework-takeaway">{slide.subtitle}</p>
          <div className="cabinet-framework-rows">
            {slide.content.map((item, index) => (
              <div className="cabinet-framework-row" key={item.heading}>
                <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h2>{item.heading}</h2>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {slide.pendingNote && <p className="cabinet-framework-pending">{slide.pendingNote}</p>}
      {slide.sourceNote && <p className="cabinet-framework-sources">{slide.sourceNote}</p>}
      {slide.sources?.length > 0 && (
        <p className="cabinet-framework-sources">
          Sources: {slide.sources.map((source, index) => (
            <span key={source.href}>
              {index > 0 && ' · '}
              <a href={source.href} target="_blank" rel="noopener noreferrer">[{index + 1}] {source.label}</a>
            </span>
          ))}
        </p>
      )}
      {slide.actionLink && <a className="cabinet-framework-action" href={slide.actionLink.href} target="_blank" rel="noopener noreferrer">{slide.actionLink.label} <span aria-hidden="true">↗</span></a>}
    </section></CabinetCanvas>
  );
}
