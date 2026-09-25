import { ExternalLink } from 'lucide-react';
import EncounterWorkflow from '../components/EncounterWorkflow.jsx';
import ProjectHero from '../components/ProjectHero.jsx';
import SiteLayout from '../components/SiteLayout.jsx';
import '../styles/encounter-document.css';

export default function EncounterFactoryPage() {
  return (
    <SiteLayout>
      <main id="main">
        <ProjectHero
          eyebrow="Engineering case study · Work in progress"
          title="Encounter Factory"
          subtitle="From a D&D party briefing to a usable encounter document"
          lede="I am building Encounter Factory for the people who run Dungeons & Dragons games. They describe the players' characters and the kind of scene they want. The application checks the encounter math, then uses AI to help draft a document they can review and run at the table. It is still in development."
          repositoryUrl="https://github.com/Mortonas/Encounter-Factory"
          repositoryLabel="View Encounter Factory repository"
          meta={['My role: product design and full-stack engineering', 'React + TypeScript', 'Express', 'Deterministic MathEngine', 'Local evaluation only']}
        />

        <section className="section encounter-overview" aria-labelledby="encounter-overview-title">
          <div className="section-heading">
            <p className="eyebrow">Problem → approach → outcome</p>
            <h2 id="encounter-overview-title">Why I split the work into stages</h2>
          </div>
          <div className="case-study-triad">
            <article>
              <span>01</span>
              <h3>Problem</h3>
              <p>A useful encounter needs to fit the players’ characters and give the game master a clear way to run it. One long AI response can mix up the numbers, the tactics, and the story.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Approach</h3>
              <p>The MathEngine handles the numbers. Separate AI stages work on the setting, tactics, and writing. Schemas and audits check the results, while saved checkpoints let an interrupted job continue.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Outcome</h3>
              <p>The current system can produce an encounter document with mechanical targets, notes for the game master, and HTML, VTT, and Obsidian-ready exports. It still needs testing and editorial review.</p>
            </article>
          </div>

          <aside className="why-it-matters" aria-labelledby="why-it-matters-title">
            <div>
              <p className="eyebrow">Why this project matters</p>
              <h3 id="why-it-matters-title">The safeguards matter as much as the writing</h3>
            </div>
            <p>A game master should be able to see the calculations, pick up where a stopped job left off, and edit the final document. That is why I built checks and saved stages around the AI writing instead of treating one response as the finished answer.</p>
          </aside>

          <nav className="encounter-evidence-links" aria-label="Encounter Factory evidence">
            <a href="https://github.com/Mortonas/Encounter-Factory" target="_blank" rel="noreferrer">View Encounter Factory repository <ExternalLink size={14} aria-hidden="true" /></a>
            <a href="https://github.com/Mortonas/Encounter-Factory#readme" target="_blank" rel="noreferrer">Read the project README <ExternalLink size={14} aria-hidden="true" /></a>
            <a href="https://github.com/Mortonas/Encounter-Factory/blob/main/docs/ARCHITECTURE.md" target="_blank" rel="noreferrer">Read the architecture overview <ExternalLink size={14} aria-hidden="true" /></a>
            <a href="#example-output-title">View the generated encounter document</a>
          </nav>
        </section>

        <EncounterWorkflow />

        <section className="section media-section lead-media" aria-labelledby="briefing-title">
          <div className="section-heading">
            <p className="eyebrow">Input evidence</p>
            <h2 id="briefing-title">The game master fills in one detailed briefing</h2>
            <p>The form captures the player characters, requested enemies and allies, the location, the win condition, the desired tone, and the story details that should shape the encounter. This example uses fictional mock data.</p>
          </div>
          <figure className="screenshot-frame">
            <img src="/images/encounter-factory/briefing-intake.png" alt="Encounter Factory briefing form filled with fictional information for a Dungeons and Dragons party, enemy, ally, setting, and narrative goals" />
            <figcaption>A filled fictional briefing shows the information used to calculate and write the encounter.</figcaption>
          </figure>
        </section>

        <section className="section media-section alt" aria-labelledby="operator-title">
          <div className="section-heading">
            <p className="eyebrow">Behind the form</p>
            <h2 id="operator-title">The operator reviews requests before generation</h2>
            <p>Submitting a briefing does not start AI generation straight away. It puts the request in a queue so a local operator can inspect and claim it first.</p>
          </div>
          <figure className="screenshot-frame">
            <img src="/images/encounter-factory/encounter-builder.png" alt="Encounter Factory local operator console showing the incoming briefing queue" loading="lazy" />
            <figcaption>The local operator view keeps submitted briefings, generation jobs, and recovery state visible.</figcaption>
          </figure>
        </section>

        <section className="section media-section" aria-labelledby="advisor-title">
          <div className="section-heading">
            <p className="eyebrow">Second workflow</p>
            <h2 id="advisor-title">GM Advisor offers a faster tactical review</h2>
            <p>GM Advisor uses the same party information to prepare shorter tactical notes when a full encounter document would be more than the game master needs.</p>
          </div>
          <figure className="screenshot-frame">
            <img src="/images/encounter-factory/gm-advisor.png" alt="GM Advisor interface showing a tactical review generated from fictional party information" loading="lazy" />
            <figcaption>GM Advisor is a shorter review path built on the same calculation and validation boundaries.</figcaption>
          </figure>
        </section>

        <section className="section limitation" aria-labelledby="encounter-limit-title">
          <div><p className="eyebrow">Current status</p><h2 id="encounter-limit-title">Useful work in progress, not a finished product</h2></div>
          <p>Encounter Factory is still being tested locally. The repository shows the interface, MathEngine, validation, background jobs, recovery, and exports. This portfolio does not run the service or accept submissions.</p>
        </section>

        <section className="section example-output-section" aria-labelledby="example-output-title">
          <div className="section-heading">
            <p className="eyebrow">Existing HTML export · work in progress</p>
            <h2 id="example-output-title">An encounter document from an earlier test</h2>
            <p>This saved export shows what the current system can produce: scene-setting, tactical zones, calculated targets, enemy statistics, a round-by-round run sheet, and design notes. It is an actual generated output, not the hand-written test fixture in the repository.</p>
          </div>

          <aside className="output-warning" aria-label="Work-in-progress output notice">
            <strong>Work in progress</strong>
            <p>This fictional export is from an unfinished system. The mechanics and writing may still need corrections.</p>
          </aside>

          <div className="output-preview-shell">
            <div className="output-preview-toolbar">
              <div><span>Encounter Factory export</span><strong>The Sanctum of Shadows</strong></div>
              <a className="text-link" href="/examples/encounter-factory/the-sanctum-of-shadows.html" target="_blank" rel="noreferrer">Open full document <ExternalLink size={15} aria-hidden="true" /></a>
            </div>
            <iframe
              className="encounter-output-frame"
              src="/examples/encounter-factory/the-sanctum-of-shadows.html"
              title="Work-in-progress Encounter Factory export: The Sanctum of Shadows"
              sandbox=""
              loading="lazy"
            />
          </div>

          <p className="output-provenance">Privacy review: the portfolio copy contains fictional encounter material only. The external font request was removed, the preview is sandboxed, and no scripts, forms, client contact details, or provider credentials are included.</p>
        </section>
      </main>
    </SiteLayout>
  );
}
