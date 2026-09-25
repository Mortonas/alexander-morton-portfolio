import { ArrowDown, ExternalLink } from 'lucide-react';
import {
  encounterWorkflowPhases,
  encounterWorkflowSource,
  workflowLegend,
  workflowSafeguards,
} from '../data/encounterWorkflow.js';
import '../styles/encounter-workflow.css';

const legendById = Object.fromEntries(workflowLegend.map((item) => [item.id, item]));
const stagePositionByName = new Map(
  encounterWorkflowPhases.flatMap(({ stages }) => stages.map(({ name }) => name)).map((name, index) => [name, index + 1]),
);

function CategoryList({ categories, label }) {
  return (
    <ul className="workflow-categories" aria-label={label}>
      {categories.map((categoryId) => (
        <li key={categoryId} className={`workflow-category category-${categoryId}`}>
          <span className="category-swatch" aria-hidden="true" />
          {legendById[categoryId].label}
        </li>
      ))}
    </ul>
  );
}

export default function EncounterWorkflow() {
  return (
    <section id="workflow" className="section workflow-case-study" aria-labelledby="workflow-title">
      <div className="workflow-heading">
        <div>
          <p className="eyebrow">System workflow</p>
          <h2 id="workflow-title">How one briefing becomes an encounter document</h2>
        </div>
        <p>Here is how a submitted briefing becomes a document. The numbered stages show where the system checks the math, writes material, saves progress, and prepares the export.</p>
      </div>

      <aside className="workflow-legend-panel" aria-labelledby="workflow-legend-title">
        <h3 id="workflow-legend-title">How to read the workflow</h3>
        <ul className="workflow-legend-list">
          {workflowLegend.map((item) => (
            <li key={item.id}>
              <span className={`legend-swatch category-${item.id}`} aria-hidden="true" />
              <div><strong>{item.label}</strong><span>{item.description}</span></div>
            </li>
          ))}
        </ul>
      </aside>

      <ol className="workflow-phase-list" aria-label="Encounter document production phases">
        {encounterWorkflowPhases.map((phase, phaseIndex) => (
          <li key={phase.id} className="workflow-phase">
            <article>
              <header className="workflow-phase-header">
                <span className="workflow-phase-number" aria-hidden="true">{String(phaseIndex + 1).padStart(2, '0')}</span>
                <div>
                  <p>Phase {phaseIndex + 1}</p>
                  <h3>{phase.title}</h3>
                </div>
                <CategoryList categories={phase.categories} label={`${phase.title} system categories`} />
              </header>

              <dl className="workflow-contract">
                <div><dt>Problem solved</dt><dd>{phase.problem}</dd></div>
                <div><dt>Input</dt><dd>{phase.input}</dd></div>
                <div className="workflow-stage-contract">
                  <dt>Pipeline stages</dt>
                  <dd>
                    <ol className="workflow-stage-list" aria-label={`${phase.title} pipeline stages`}>
                      {phase.stages.map((stage) => (
                        <li key={stage.name}>
                          <span className="stage-position" aria-hidden="true">{stagePositionByName.get(stage.name)}</span>
                          <strong>{stage.name}</strong>
                          <CategoryList categories={stage.categories} label={`${stage.name} categories`} />
                        </li>
                      ))}
                    </ol>
                    {phase.supportingSystem && <p className="workflow-supporting-system"><strong>Supporting system:</strong> {phase.supportingSystem}</p>}
                  </dd>
                </div>
                <div><dt>Output</dt><dd>{phase.output}</dd></div>
              </dl>
            </article>
            {phaseIndex < encounterWorkflowPhases.length - 1 && (
              <span className="workflow-connector" aria-hidden="true"><ArrowDown size={22} /></span>
            )}
          </li>
        ))}
      </ol>

      <aside className="workflow-safeguards" aria-labelledby="workflow-safeguards-title">
        <div>
          <p className="eyebrow">Reliability controls</p>
          <h3 id="workflow-safeguards-title">Safeguards and control paths</h3>
          <p>These safeguards are documented from the application code. This portfolio page explains them; it does not run or test the service itself.</p>
        </div>
        <ul>
          {workflowSafeguards.map((safeguard) => (
            <li key={safeguard.title}><strong>{safeguard.title}</strong><span>{safeguard.description}</span></li>
          ))}
        </ul>
      </aside>

      <div className="workflow-outcome">
        <div><span>Input</span><strong>Structured party briefing</strong></div>
        <span className="workflow-outcome-arrow" aria-hidden="true">→</span>
        <div><span>Outcome</span><strong>Encounter document ready for the game master to review</strong></div>
        <a className="button primary" href="#example-output-title">View the generated encounter document</a>
      </div>

      <p className="workflow-source-note">
        Presentation mapping verified against <a href={encounterWorkflowSource.sourceUrl} target="_blank" rel="noreferrer"><code>{encounterWorkflowSource.definition}</code> at commit {encounterWorkflowSource.verifiedCommit.slice(0, 8)} <ExternalLink size={13} aria-hidden="true" /></a>.
      </p>
    </section>
  );
}
