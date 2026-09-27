import {
  calculationLineage,
  characterEstateEvidence,
  dataOrigins,
  estateFlow,
} from '../data/characterEstateEvidence.js';
import '../styles/character-estate.css';

export default function CharacterEstateEvidence() {
  return (
    <section className="section estate-model-section" aria-labelledby="estate-model-title">
      <div className="section-heading">
        <p className="eyebrow">The data model</p>
        <h2 id="estate-model-title">From property records to one estate view</h2>
        <p>A landholding is a property. The workbook gives each of two properties its own schedule, then brings selected results into a combined estate view.</p>
      </div>

      <ol className="estate-flow" aria-label="How property information moves through the workbook">
        {estateFlow.map((stage, index) => (
          <li key={stage.title}>
            <article>
              <span className="estate-flow-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <h3>{stage.title}</h3>
              <p>{stage.description}</p>
              <p className="estate-flow-output"><strong>Result:</strong> {stage.output}</p>
            </article>
          </li>
        ))}
      </ol>

      <div className="lineage-section">
        <div className="lineage-heading">
          <p className="eyebrow">Calculation lineage</p>
          <h3>Follow a value from entry to result</h3>
          <p>These examples show where the workbook gets a value and where its formulas carry it next.</p>
        </div>
        <div className="lineage-grid">
          {calculationLineage.map((example) => (
            <article key={example.title}>
              <h4>{example.title}</h4>
              <ol>{example.steps.map((step) => <li key={step}>{step}</li>)}</ol>
            </article>
          ))}
        </div>
        <p className="reconciliation-note"><strong>Comparing totals:</strong> The estate view provides a combined result that can be compared with property-level values. The workbook does not implement a separate automated reconciliation check. Directly held and vassal values stay in separate columns; miscellaneous income and additional expenses can be entered at estate level.</p>
      </div>

      <section className="data-origin-section" aria-labelledby="data-origin-title">
        <div>
          <p className="eyebrow">Where each value comes from</p>
          <h3 id="data-origin-title">Four kinds of workbook data</h3>
        </div>
        <dl className="data-origin-grid">
          {dataOrigins.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.description}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="scope-note">Across the full workbook, the audited structure is {characterEstateEvidence.operationalWorksheets} working sheets plus one overview, {characterEstateEvidence.formulaCells.toLocaleString('en-US')} formula cells, and {characterEstateEvidence.validationObjects} validation objects. Those counts describe scope; they do not prove calculation quality.</p>
    </section>
  );
}
