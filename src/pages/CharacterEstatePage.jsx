import CharacterEstateEvidence from '../components/CharacterEstateEvidence.jsx';
import ProjectHero from '../components/ProjectHero.jsx';
import SiteLayout from '../components/SiteLayout.jsx';
import {
  analystSkills,
  annualUpdateSteps,
  futureImprovements,
  validationExamples,
} from '../data/characterEstateEvidence.js';

const caseStudy = [
  {
    title: 'Problem',
    description: 'Character, estate, landholding, resource, follower, and history records must stay consistent across several views. Manual updates across related cells can create mismatched balances and incomplete history.',
  },
  {
    title: 'Data and structure',
    description: 'Character and family records sit alongside stable, landholding, jousting, income, expense, obligation, treasury, resource, and reference fields. Controlled inputs feed operational records; those records feed calculations and tracking views.',
  },
  {
    title: 'Approach',
    description: 'Centralize lookup data, validate key inputs, calculate derived values with linked formulas, and automate the annual and resource posting sequence with explicit scripts.',
  },
  {
    title: 'Outcome',
    description: 'A reviewable management system with linked user views, traceable calculations, structured history, and repeatable annual updates.',
  },
];

const calculationLineage = [
  { title: 'Landholding records', description: 'Two landholding sheets provide revenue and expense values.' },
  { title: 'Estate consolidation', description: 'Estate Overview brings those records into one calculation view.' },
  { title: 'Calculated results', description: 'Linked formulas produce income, obligations, treasury, and resource results.' },
  { title: 'Annual posting', description: 'The reviewed script advances the period, synchronizes annual values, updates the selected resource, and resets the entry fields.' },
];

export default function CharacterEstatePage() {
  return (
    <SiteLayout>
      <main id="main">
        <ProjectHero
          eyebrow="Spreadsheet systems case study"
          title="Character & Estate Automation"
          subtitle="Linked records, controlled inputs, and repeatable annual updates"
          lede="A private, evidence-reviewed spreadsheet system that connects operational records, reference data, formula-driven calculations, input controls, and two reviewed Apps Script workflows."
          meta={[
            'Role: workbook architecture, formula design, validation, and Apps Script automation',
            'Private source · Evidence reviewed',
            '10 operational worksheets + 1 overview',
            '974 formula cells',
            '17 validation objects',
            '2 reviewed automation scripts',
          ]}
        />

        <section className="section case-study-overview" aria-labelledby="case-study-title">
          <div className="section-heading">
            <p className="eyebrow">Case study overview</p>
            <h2 id="case-study-title">From scattered updates to a structured workbook system</h2>
          </div>
          <ol className="case-study-grid">
            {caseStudy.map((item, index) => (
              <li key={item.title}>
                <article>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <section className="section dark-section analyst-skills" aria-labelledby="why-matters-title">
          <div className="section-heading">
            <p className="eyebrow">Why this project matters</p>
            <h2 id="why-matters-title">The workbook demonstrates analyst habits beyond formulas</h2>
            <p>These skills transfer to operational reporting, data-quality work, recurring spreadsheet processes, and clear analyst documentation.</p>
          </div>
          <ul className="analyst-skill-list">
            {analystSkills.map((skill) => (
              <li key={skill.title}><strong>{skill.title}</strong><span>{skill.description}</span></li>
            ))}
          </ul>
        </section>

        <CharacterEstateEvidence />

        <section className="section split lineage-section" aria-labelledby="lineage-title">
          <div>
            <p className="eyebrow">Calculation lineage</p>
            <h2 id="lineage-title">Follow one path from source records to a posted update</h2>
            <p>The sequence makes the handoff between records, formulas, and automation visible instead of treating the workbook as a black box.</p>
            <ol className="lineage-list">
              {calculationLineage.map((step) => <li key={step.title}><strong>{step.title}</strong><span>{step.description}</span></li>)}
            </ol>
            <div className="evidence-note"><strong>Evidence boundary</strong><p>The published image uses placeholder labels and zero-value examples. It does not feed calculations on this site.</p></div>
          </div>
          <figure className="screenshot-frame workbook">
            <img src="/images/character-estate/estate-overview.webp" alt="Estate overview worksheet with land details, annual obligations, income, expenses, and treasury calculations" />
            <figcaption>The approved estate view shows the calculation structure without publishing the workbook.</figcaption>
          </figure>
        </section>

        <section className="section quality-section" aria-labelledby="validation-title">
          <div className="section-heading">
            <p className="eyebrow">Input controls</p>
            <h2 id="validation-title">Seventeen validation objects protect selected inputs</h2>
            <p>The count refers to validation rules, not the number of covered cells. Validation narrows avoidable input variation; it does not prove that every formula is correct.</p>
          </div>
          <div className="validation-grid">
            {validationExamples.map((example) => <article key={example.title}><h3>{example.title}</h3><p>{example.description}</p></article>)}
          </div>
        </section>

        <section className="section character-automation" aria-labelledby="automation-title">
          <div className="automation-layout">
            <div>
              <p className="eyebrow">Reviewed automation</p>
              <h2 id="automation-title">The annual update is an explicit posting sequence</h2>
              <p>The portfolio documents the reviewed script behavior; it does not execute the private scripts.</p>
            </div>
            <div>
              <ol className="annual-update-list">
                {annualUpdateSteps.map((step) => <li key={step}>{step}</li>)}
              </ol>
              <div className="automation-notes">
                <article><h3>Separate income copy</h3><p>A second function copies calculated annual income into the Goods balance on an explicitly named worksheet.</p></article>
                <article><h3>Verified safeguards</h3><p>Explicit worksheet names, required-sheet errors, numeric normalization, and a fixed resource-to-target map keep the write targets bounded.</p></article>
              </div>
            </div>
          </div>
        </section>

        <section className="section future-section" aria-labelledby="future-title">
          <div>
            <p className="eyebrow">Reflection</p>
            <h2 id="future-title">What I would improve next</h2>
            <p>These are proposed improvements, not current capabilities or confirmed defects.</p>
          </div>
          <ul>
            {futureImprovements.map((improvement) => <li key={improvement}>{improvement}</li>)}
          </ul>
        </section>

        <section className="section limitation" aria-labelledby="sheet-limit-title">
          <div><p className="eyebrow">Evidence and limitations</p><h2 id="sheet-limit-title">Private sources, carefully scoped claims</h2></div>
          <div>
            <p>The reviewed <code>.xlsx</code> export does not contain Apps Script, and this page is not a runnable spreadsheet demo. Script behavior was reviewed from two separate cleaned source files.</p>
            <p>The workbook and scripts remain private because they contain comments, artwork, and unrelated workbook material. The reviewed scripts do not publish a transaction journal or rollback workflow. Structural counts demonstrate scope, not measured business impact.</p>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
