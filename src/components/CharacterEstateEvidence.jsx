import {
  formulaCountsBySheet,
  workbookLayers,
  workbookRelationships,
} from '../data/characterEstateEvidence.js';
import '../styles/character-estate.css';

const maxFormulaCount = Math.max(...formulaCountsBySheet.map(({ count }) => count));

function formatRelationship(text) {
  return text.split(/(`[^`]+`)/).map((part) => (
    part.startsWith('`') && part.endsWith('`')
      ? <code key={part}>{part.slice(1, -1)}</code>
      : part
  ));
}

export default function CharacterEstateEvidence() {
  return (
    <>
      <section className="section workbook-system-section" aria-labelledby="workbook-system-title">
        <div className="section-heading">
          <p className="eyebrow">Workbook architecture</p>
          <h2 id="workbook-system-title">A layered system, not a single oversized sheet</h2>
          <p>Reference values and controlled inputs feed operational records. Those records feed calculation and tracking views, which then support the user-facing workbook and controlled updates.</p>
        </div>

        <ol className="workbook-layer-list" aria-label="Workbook system layers">
          {workbookLayers.map((layer, index) => (
            <li className="workbook-layer" key={layer.title}>
              <article>
                <span className="layer-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <h3>{layer.title}</h3>
                <p>{layer.purpose}</p>
                <ul aria-label={`${layer.title} sources`}>
                  {layer.sheets.map((sheet) => <li key={sheet}><code>{sheet}</code></li>)}
                </ul>
              </article>
              {index < workbookLayers.length - 1 && <span className="layer-connector" aria-hidden="true">→</span>}
            </li>
          ))}
        </ol>

        <div className="system-evidence-grid">
          <aside className="relationship-panel" aria-labelledby="relationships-title">
            <h3 id="relationships-title">Important cross-sheet relationships</h3>
            <ul>
              {workbookRelationships.map((relationship) => (
                <li key={relationship}>{formatRelationship(relationship)}</li>
              ))}
            </ul>
          </aside>
          <figure className="screenshot-frame workbook">
            <img src="/images/character-estate/project-overview.webp" alt="Workbook project overview describing sheets, calculation logic, validation, and automation" />
            <figcaption>The approved overview image documents the workbook’s separation of responsibilities.</figcaption>
          </figure>
        </div>
      </section>

      <section className="section formula-section" aria-labelledby="formula-title">
        <div className="formula-copy">
          <p className="eyebrow">Formula distribution</p>
          <h2 id="formula-title">Calculation work is concentrated in two operational layers</h2>
          <p><code>Stable1</code> and <code>Tracking</code> contain most of the formula network. <code>Project Overview</code> is documentation rather than a calculation sheet.</p>
          <p className="evidence-caution"><strong>What this shows:</strong> formula volume describes the workbook’s scope and architecture. It does not, by itself, prove that every formula is correct.</p>
        </div>
        <figure className="formula-chart" aria-labelledby="formula-chart-caption">
          <ol aria-label="Formula cells by worksheet">
            {formulaCountsBySheet.map(({ sheet, count }) => (
              <li key={sheet}>
                <span className="formula-label">{sheet}</span>
                <span className="formula-bar-track" aria-hidden="true"><span style={{ width: `${(count / maxFormulaCount) * 100}%` }} /></span>
                <strong>{count}</strong>
              </li>
            ))}
          </ol>
          <figcaption id="formula-chart-caption">Audited total: <strong>974 formula cells</strong> across all 11 worksheets.</figcaption>
        </figure>
      </section>
    </>
  );
}
