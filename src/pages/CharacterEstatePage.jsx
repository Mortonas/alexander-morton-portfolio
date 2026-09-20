import CharacterEstateEvidence from '../components/CharacterEstateEvidence.jsx';
import ProjectHero from '../components/ProjectHero.jsx';
import SiteLayout from '../components/SiteLayout.jsx';
import {
  annualUpdateSteps,
  automationSafeguards,
  caseStudyStages,
  interfaceCallouts,
  reliabilityUpgrades,
} from '../data/characterEstateEvidence.js';

export default function CharacterEstatePage() {
  return (
    <SiteLayout>
      <main id="main">
        <ProjectHero
          eyebrow="Spreadsheet systems case study"
          title="Character & Estate Automation"
          subtitle="Linked records, controlled inputs, and repeatable annual updates"
          lede="I designed the workbook architecture, formula logic, validation rules, and Apps Script workflows behind this private, evidence-reviewed system."
          meta={[
            '10 operational worksheets + 1 overview',
            '974 formula cells',
            '17 validation objects',
            '2 reviewed automation scripts',
          ]}
        />

        <section className="section case-study-overview" aria-labelledby="case-study-title">
          <div className="section-heading">
            <p className="eyebrow">Problem · Data · Process · Outcome</p>
            <h2 id="case-study-title">A structured system for records that must stay in agreement</h2>
          </div>
          <ol className="case-study-grid">
            {caseStudyStages.map((item, index) => (
              <li key={item.title}>
                <article>
                  <span className="case-number">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p className="skill-signal"><strong>What this shows</strong>{item.signal}</p>
                </article>
              </li>
            ))}
          </ol>
          <p className="transfer-note">The same modeling, validation, lineage, and automation concepts apply in Excel or Google Sheets before results are surfaced through SQL or BI dashboards.</p>
        </section>

        <section className="section primary-interface" aria-labelledby="interface-title">
          <div className="section-heading">
            <p className="eyebrow">Primary interface</p>
            <h2 id="interface-title">One working view brings inputs and calculated results together</h2>
            <p>The Front sheet combines the current character record with derived attributes, linked equipment, stable details, resources, and status information.</p>
          </div>
          <div className="interface-layout">
            <figure className="interface-figure">
              <a className="interface-image" href="/images/character-estate/front-sheet.webp" target="_blank" rel="noreferrer" aria-label="Open the full-size Front worksheet render">
                <img src="/images/character-estate/front-sheet.webp" alt="Front worksheet showing character details, calculated characteristics, skills, resources, stable information, and equipment" />
              </a>
              <figcaption><a className="text-link" href="/images/character-estate/front-sheet.webp" target="_blank" rel="noreferrer">Open full-size Front worksheet</a></figcaption>
            </figure>
            <ol className="interface-callouts" aria-label="Front worksheet design evidence">
              {interfaceCallouts.map((callout, index) => (
                <li key={callout.title}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <div><h3>{callout.title}</h3><p>{callout.description}</p></div>
                </li>
              ))}
            </ol>
          </div>
          <p className="publication-note"><strong>Publication note:</strong> This is a flattened, metadata-free render of an approved worksheet range. Comments and embedded artwork are omitted, and the private workbook is not downloadable.</p>
        </section>

        <CharacterEstateEvidence />

        <section className="section annual-workflow" aria-labelledby="annual-title">
          <div className="annual-intro">
            <p className="eyebrow">Annual posting workflow</p>
            <h2 id="annual-title">Calculation and automation meet in one controlled sequence</h2>
            <p>Landholding records feed the estate calculation view. The reviewed script then advances the stored period, synchronizes annual values, posts one selected resource transaction, and resets its entry fields.</p>
            <p className="documentation-boundary">The portfolio documents this behavior from reviewed source evidence; it does not execute the private scripts.</p>
          </div>
          <div className="annual-layout">
            <figure className="screenshot-frame workbook">
              <img src="/images/character-estate/estate-overview.webp" alt="Estate Overview worksheet showing land details, annual obligations, income, expenses, treasury, and resource calculations" />
              <figcaption>The Estate Overview consolidates the values used by the annual posting workflow.</figcaption>
            </figure>
            <ol className="annual-update-list">
              {annualUpdateSteps.map((step) => <li key={step}>{step}</li>)}
            </ol>
          </div>
          <aside className="safeguard-panel" aria-labelledby="safeguards-title">
            <h3 id="safeguards-title">Verified safeguards</h3>
            <ul>{automationSafeguards.map((item) => <li key={item}>{item}</li>)}</ul>
          </aside>
        </section>

        <section className="section reflection-section" aria-labelledby="reflection-title">
          <div className="reflection-copy">
            <p className="eyebrow">Reflection and evidence boundary</p>
            <h2 id="reflection-title">Next steps focus on reliability and auditability</h2>
            <p>These are proposed upgrades, not current capabilities or assumptions about production use.</p>
            <ul className="upgrade-list">
              {reliabilityUpgrades.map((item) => <li key={item.title}><strong>{item.title}</strong><span>{item.description}</span></li>)}
            </ul>
          </div>
          <aside className="boundary-panel" aria-labelledby="boundary-title">
            <h3 id="boundary-title">What remains private</h3>
            <p>The reviewed <code>.xlsx</code> export does not contain Apps Script, and this page is not a runnable spreadsheet demo. Script behavior was reviewed from two separate cleaned source files.</p>
            <p>The workbook and scripts remain private because they contain comments, artwork, and unrelated material. Structural counts describe scope, not measured business impact, adoption, or time savings.</p>
          </aside>
        </section>
      </main>
    </SiteLayout>
  );
}
