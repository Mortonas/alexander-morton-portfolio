import SiteLayout from '../components/SiteLayout.jsx';

export default function EncounterExamplePage() {
  return (
    <SiteLayout>
      <main id="main" tabIndex="-1" className="section example-viewer">
        <a className="text-link" href="/projects/encounter-factory/#example-output-title">Back to Encounter Factory case study</a>
        <p className="eyebrow">Historical captured output</p>
        <h1>The Sanctum of Shadows</h1>
        <p>This fictional encounter document came from an earlier test. It is not a fresh run of the currently linked source. Audit labels inside the document belong to the original artifact, not a current quality guarantee.</p>
        <p><a href="/examples/encounter-factory/the-sanctum-of-shadows.html" download>Download the original HTML artifact</a></p>
        <iframe title="Historical Encounter Factory document" src="/examples/encounter-factory/the-sanctum-of-shadows.html" sandbox="" loading="eager" />
      </main>
    </SiteLayout>
  );
}
