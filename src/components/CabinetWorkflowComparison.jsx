import { useId, useState } from 'react';
import { Server, FolderOpen, Archive, Plug, Eye, ShieldCheck } from 'lucide-react';
import './CabinetWorkflowComparison.css';
import CabinetCanvas from './CabinetCanvas';

const rowIcons = { Server, FolderOpen, Archive, Plug, Eye, ShieldCheck };

// The website-style matrix is the entry view; the original animation stays intact.
export default function CabinetWorkflowComparison({ comparison, children }) {
  const [view, setView] = useState('matrix');
  const panelId = useId();
  const choices = [
    ['matrix', 'Comparison'],
    ['tasks', 'Use cases'],
    ['graphic', 'Website animation']
  ];

  return (
    <CabinetCanvas className="cabinet-workflow-canvas" section={comparison.section}><div className="cabinet-workflow-comparison">
      <div id={`${panelId}-graphic`} className="cabinet-workflow-original" hidden={view !== 'graphic'}>
        {children}
      </div>
      {['matrix', 'tasks'].map(mode => (
        <section key={mode} id={`${panelId}-${mode}`} className={`cabinet-workflow-adaptation cabinet-workflow-adaptation--${mode}`} hidden={view !== mode}>
          <header>
            <p className="cabinet-workflow-kicker">{comparison.kicker || 'Choose by task'}</p>
            <h2>{mode === 'matrix' ? comparison.matrixTitle : comparison.title}</h2>
            <p className="cabinet-workflow-lead">{mode === 'matrix' ? comparison.matrixLead : comparison.lead}</p>
          </header>
          <table className="cabinet-workflow-detail-table" role="table">
            <caption className="sr-only">TritonGPT and TritonAI Harness {mode === 'matrix' ? 'capabilities, access, and review' : 'use cases and results'} compared row by row</caption>
            <thead role="rowgroup">
              <tr role="row">
                <th scope="col" role="columnheader">{mode === 'matrix' ? 'Capabilities' : 'Your task'}</th>
                <th scope="col" role="columnheader"><div className="cabinet-workflow-product"><strong>TritonGPT</strong><span className="cabinet-workflow-badge">Web platform</span></div></th>
                <th scope="col" role="columnheader"><div className="cabinet-workflow-product"><strong>TritonAI Harness</strong><span className="cabinet-workflow-badge cabinet-workflow-badge-gold">Agent workspace</span></div></th>
              </tr>
            </thead>
            <tbody role="rowgroup">
              {(mode === 'matrix' ? comparison.matrixRows : comparison.taskRows).map(row => {
                const RowIcon = rowIcons[row.icon];
                return (
                  <tr key={row.label} role="row">
                    <th scope="row" role="rowheader"><span className="cabinet-workflow-row-label">{RowIcon && <RowIcon size={20} aria-hidden="true" />}<span>{row.label}</span></span></th>
                    {['tritongpt', 'harness'].map(key => (
                      <td key={key} role="cell">
                        <span className="cabinet-workflow-mobile-label" aria-hidden="true">{key === 'tritongpt' ? 'TritonGPT' : 'TritonAI Harness'}</span>
                        {typeof row[key] === 'string' ? <span>{row[key]}</span> : <><strong className="cabinet-workflow-cell-title">{row[key].title}</strong><span className="cabinet-workflow-cell-detail">{row[key].detail}</span></>}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <footer className="cabinet-workflow-evidence">
            {mode === 'tasks' && <>
              <p className="cabinet-workflow-data-rule"><strong>Data use, both workspaces:</strong> {comparison.dataRule}</p>
              <p className="cabinet-workflow-access-rule">{comparison.accessRule}</p>
            </>}
            {comparison.sources?.length > 0 && <p className="cabinet-workflow-sources">Cabinet adaptation · Verified {comparison.verifiedDate} · {comparison.sources.map((source, index) => (
              <span key={source.href}>{index > 0 && ' · '}<a href={source.href} target="_blank" rel="noopener noreferrer">{source.label}</a></span>
            ))}</p>}
          </footer>
        </section>
      ))}
      <nav className="cabinet-workflow-switcher" aria-label="Comparison views">
        {choices.map(([key, label]) => (
          <button key={key} type="button" aria-pressed={view === key} aria-controls={`${panelId}-${key}`} onClick={() => setView(key)}>{label}</button>
        ))}
      </nav>
    </div></CabinetCanvas>
  );
}
