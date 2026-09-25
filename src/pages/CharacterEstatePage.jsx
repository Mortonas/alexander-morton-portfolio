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
          lede="I built this workbook to keep character and estate records connected. I designed the sheets, formulas, input checks, and Apps Script updates. The source stays private, but the examples below come from the reviewed workbook and scripts."
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
            <h2 id="case-study-title">Keeping related records in step</h2>
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
          <p className="transfer-note">This is spreadsheet work, but the same ideas—related records, input checks, and traceable calculations—also matter when reporting moves into SQL or a BI dashboard. I have not migrated this workbook to either one.</p>
        </section>

        <section className="section primary-interface" aria-labelledby="interface-title">
          <div className="section-heading">
            <p className="eyebrow">Primary interface</p>
            <h2 id="interface-title">The Front sheet is the main working view</h2>
            <p>It puts the character record beside calculated attributes, equipment, stable details, resources, and current status.</p>
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
          <p className="publication-note"><strong>About the image:</strong> This is a flattened image of a reviewed part of the sheet. I removed comments, embedded artwork, and file metadata. The workbook itself is not available for download.</p>
        </section>

        <CharacterEstateEvidence />

        <section className="section annual-workflow" aria-labelledby="annual-title">
          <div className="annual-intro">
            <p className="eyebrow">Annual posting workflow</p>
            <h2 id="annual-title">From estate totals to an annual update</h2>
            <p>The landholding sheets feed the estate totals. The script advances the year, updates the annual values, posts a transaction to the chosen resource, and clears the entry fields for next time.</p>
            <p className="documentation-boundary">I checked this sequence against the private scripts. The portfolio shows how they work; it does not run them.</p>
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
            <h2 id="reflection-title">What I would improve next</h2>
            <p>These would make updates easier to check and reverse. They are plans, not features already in the workbook.</p>
            <ul className="upgrade-list">
              {reliabilityUpgrades.map((item) => <li key={item.title}><strong>{item.title}</strong><span>{item.description}</span></li>)}
            </ul>
          </div>
          <aside className="boundary-panel" aria-labelledby="boundary-title">
            <h3 id="boundary-title">What remains private</h3>
            <p>The reviewed <code>.xlsx</code> export does not contain Apps Script, and this page is not a runnable spreadsheet demo. Script behavior was reviewed from two separate cleaned source files.</p>
            <p>The workbook and scripts contain comments, artwork, and unrelated material, so I have kept them private. The counts above show the size of the system; they do not measure its accuracy, use by others, or time saved.</p>
          </aside>
        </section>
      </main>
    </SiteLayout>
  );
}
