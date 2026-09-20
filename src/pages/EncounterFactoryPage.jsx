import { CheckCircle2, Database, GitBranch, ShieldCheck } from 'lucide-react';
import ProjectHero from '../components/ProjectHero.jsx';
import SiteLayout from '../components/SiteLayout.jsx';

export default function EncounterFactoryPage() {
  return (
    <SiteLayout>
      <main id="main">
        <ProjectHero
          eyebrow="Application case study"
          title="Encounter Factory"
          subtitle="Structured Encounter Builder"
          lede="A local application that turns a game master's briefing into structured inputs, deterministic calculations, validated workflow state, and reviewable exports."
          repositoryUrl="https://github.com/Mortonas/Encounter-Factory"
          meta={['React + TypeScript', 'Express', 'Zod validation', 'Local evaluation release']}
        />

        <section className="section metric-strip" aria-label="Project highlights">
          <article><strong>2</strong><span>guided workflows</span></article>
          <article><strong>Typed</strong><span>schemas at system boundaries</span></article>
          <article><strong>Persistent</strong><span>job and recovery state</span></article>
        </section>

        <section className="section split narrative-section">
          <div>
            <p className="eyebrow">Problem</p>
            <h2>Turn an open-ended briefing into a traceable workflow</h2>
            <p>A briefing begins as qualitative information. The application normalizes it into structured fields, calculates measurable targets, validates generated material, and keeps intermediate state available for review and recovery.</p>
          </div>
          <ol className="process-list">
            <li><Database aria-hidden="true" /><div><strong>Structure the request</strong><span>Typed setup data creates a consistent starting point.</span></div></li>
            <li><GitBranch aria-hidden="true" /><div><strong>Calculate targets</strong><span>A deterministic MathEngine owns mechanical results.</span></div></li>
            <li><ShieldCheck aria-hidden="true" /><div><strong>Validate boundaries</strong><span>Schemas reject malformed output before it enters the workflow.</span></div></li>
            <li><CheckCircle2 aria-hidden="true" /><div><strong>Preserve evidence</strong><span>Jobs, progress, and exports retain reviewable state.</span></div></li>
          </ol>
        </section>

        <section className="section media-section" aria-labelledby="encounter-builder-title">
          <div className="section-heading"><p className="eyebrow">Encounter Builder</p><h2 id="encounter-builder-title">Full structured generation workflow</h2><p>The main workflow exposes the briefing, calculated targets, job progress, and export path as separate steps.</p></div>
          <figure className="screenshot-frame"><img src="/images/encounter-factory/encounter-builder.png" alt="Encounter Builder interface showing a structured encounter form" /><figcaption>Encounter Builder provides the full creation and export path.</figcaption></figure>
        </section>

        <section className="section media-section alt" aria-labelledby="advisor-title">
          <div className="section-heading"><p className="eyebrow">GM Advisor</p><h2 id="advisor-title">A shorter diagnostic path</h2><p>The second workflow gives a faster review while retaining the same calculation and validation boundaries.</p></div>
          <figure className="screenshot-frame"><img src="/images/encounter-factory/gm-advisor.png" alt="GM Advisor interface showing a diagnostic review form" /><figcaption>GM Advisor focuses on review before play.</figcaption></figure>
        </section>

        <section className="section limitation" aria-labelledby="encounter-limit-title">
          <div><p className="eyebrow">Release boundary</p><h2 id="encounter-limit-title">A case study, not a public service</h2></div>
          <p>The public repository is a local, source-visible evaluation release. This portfolio does not run the server, collect submissions, call an AI provider, or imply approval for public-network deployment.</p>
        </section>
      </main>
    </SiteLayout>
  );
}
