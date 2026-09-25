import {
  characterEstateEvidence,
  recordRelationships,
  systemFlow,
  technicalEvidence,
  validationEvidence,
} from '../data/characterEstateEvidence.js';
import '../styles/character-estate.css';

function formatRelationship(text) {
  return text.split(/(`[^`]+`)/).map((part, index) => (
    part.startsWith('`') && part.endsWith('`')
      ? <code key={`${part}-${index}`}>{part.slice(1, -1)}</code>
      : part
  ));
}

export default function CharacterEstateEvidence() {
  return (
    <>
      <section className="section workbook-system-section" aria-labelledby="workbook-system-title">
        <div className="section-heading">
          <p className="eyebrow">System architecture</p>
          <h2 id="workbook-system-title">How the sheets connect</h2>
          <p>Lists supply shared choices. Other sheets hold the records, calculate results, and show the current view or post an annual update.</p>
        </div>

        <ol className="system-flow" aria-label="Workbook system flow">
          {systemFlow.map((stage, index) => (
            <li className="system-stage" key={stage.title}>
              <article>
                <span className="stage-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <h3>{stage.title}</h3>
                <p>{stage.purpose}</p>
                <ul aria-label={`${stage.title} sources`}>
                  {stage.sources.map((source) => <li key={source}><code>{source}</code></li>)}
                </ul>
              </article>
              {index < systemFlow.length - 1 && <span className="stage-connector" aria-hidden="true">→</span>}
            </li>
          ))}
        </ol>

        <aside className="relationship-summary" aria-labelledby="relationship-summary-title">
          <h3 id="relationship-summary-title">How the records connect</h3>
          <ul>
            {recordRelationships.map((relationship) => <li key={relationship}>{formatRelationship(relationship)}</li>)}
          </ul>
        </aside>
      </section>

      <section className="section technical-section" aria-labelledby="technical-title">
        <div className="section-heading technical-heading">
          <p className="eyebrow">Technical depth</p>
          <h2 id="technical-title">What the formulas actually do</h2>
          <p>The workbook has {characterEstateEvidence.formulaCells.toLocaleString('en-US')} formula cells. The number shows its size, but the more useful question is what those formulas connect and calculate.</p>
        </div>

        <div className="technical-evidence-grid">
          {technicalEvidence.map((item) => (
            <article key={item.title}>
              <span>{item.proof}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>

        <div className="validation-bridge">
          <div>
            <h3>Input controls used in the model</h3>
            <p>The workbook has {characterEstateEvidence.validationObjects} validation rules, including checks for choices, numbers, outcomes, and resource types.</p>
          </div>
          <ul aria-label="Validation examples">
            {validationEvidence.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>

        <p className="analytics-bridge"><strong>In analyst terms:</strong> lookups resemble joins; conditional formulas resemble SQL <code>CASE</code> logic; and the outcome matrix could become a business-rules table. That is a comparison, not a claim that I rebuilt this project in SQL or BI.</p>
      </section>
    </>
  );
}
