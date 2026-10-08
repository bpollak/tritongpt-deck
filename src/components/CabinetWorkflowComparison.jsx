import { useId, useState } from 'react';
import './CabinetWorkflowComparison.css';

// Cabinet interpretation is separate from the unchanged website animation.
export default function CabinetWorkflowComparison({ comparison, children }) {
  const [view, setView] = useState('graphic');
  const panelId = useId();
  const choices = [
    ['graphic', 'Website animation'],
    ['tasks', 'Choose by task'],
    ['details', 'Access & review']
  ];

  return (
    <div className="cabinet-workflow-comparison">
      <div id={`${panelId}-graphic`} className="cabinet-workflow-original" hidden={view !== 'graphic'}>
        {children}
      </div>
      {['tasks', 'details'].map(mode => (
        <section key={mode} id={`${panelId}-${mode}`} className="cabinet-workflow-adaptation" hidden={view !== mode}>
          <header>
            <p className="cabinet-workflow-kicker">Complementary ways to use campus AI</p>
            <h2>{comparison.title}</h2>
            <p className="cabinet-workflow-lead">{comparison.lead}</p>
          </header>
          {mode === 'tasks' ? (
            <div className="cabinet-workflow-task-cards">
              {[
                ['tritongpt', 'TritonGPT'],
                ['harness', 'TritonAI Harness']
              ].map(([key, name]) => (
                <article key={key} className={`cabinet-workflow-task-card cabinet-workflow-${key}`}>
                  <h3>{name}</h3>
                  <dl>
                    {comparison.taskRows.map(row => (
                      <div key={row.label}>
                        <dt>{row.label}</dt>
                        <dd>{row[key]}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>
          ) : (
            <table className="cabinet-workflow-detail-table">
              <caption className="sr-only">TritonGPT and TritonAI Harness access, history, and review</caption>
              <thead>
                <tr><th scope="col">What to consider</th><th scope="col">TritonGPT</th><th scope="col">TritonAI Harness</th></tr>
              </thead>
              <tbody>
                {comparison.detailRows.map(row => (
                  <tr key={row.label}><th scope="row">{row.label}</th><td>{row.tritongpt}</td><td>{row.harness}</td></tr>
                ))}
              </tbody>
            </table>
          )}
          <footer className="cabinet-workflow-evidence">
            <p className="cabinet-workflow-data-rule"><strong>Data use, both workspaces:</strong> {comparison.dataRule}</p>
            <p className="cabinet-workflow-access-rule">{comparison.accessRule}</p>
            <p className="cabinet-workflow-sources">Cabinet adaptation · Verified {comparison.verifiedDate} · {comparison.sources.map((source, index) => (
              <span key={source.href}>{index > 0 && ' · '}<a href={source.href} target="_blank" rel="noopener noreferrer">{source.label}</a></span>
            ))}</p>
          </footer>
        </section>
      ))}
      <nav className="cabinet-workflow-switcher" aria-label="Comparison views">
        {choices.map(([key, label]) => (
          <button key={key} type="button" aria-pressed={view === key} aria-controls={`${panelId}-${key}`} onClick={() => setView(key)}>{label}</button>
        ))}
      </nav>
    </div>
  );
}
