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
          lede="Encounter Factory is an unfinished system I am building for Dungeon Masters—the people who run Dungeons & Dragons games. They describe their party, setting, objective, and preferences; the application checks the encounter math and uses AI to help write an interesting, structured encounter document."
          repositoryUrl="https://github.com/Mortonas/Encounter-Factory"
          repositoryLabel="View Encounter Factory repository"
          meta={['My role: product design and full-stack engineering', 'React + TypeScript', 'Express', 'Deterministic MathEngine', 'Local evaluation only']}
        />

        <section className="section encounter-overview" aria-labelledby="encounter-overview-title">
          <div className="section-heading">
            <p className="eyebrow">Problem → approach → outcome</p>
            <h2 id="encounter-overview-title">A structured answer to an unreliable generation problem</h2>
          </div>
          <div className="case-study-triad">
            <article>
              <span>01</span>
              <h3>Problem</h3>
              <p>A useful D&D encounter has to combine party capabilities, balance, tactics, terrain, story, and clear instructions. A single unstructured AI response can blur trusted calculations with creative suggestions.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Approach</h3>
              <p>I separated deterministic math and service controls from bounded AI stages, then added typed schemas, mechanical audits, a repair path, and persistent checkpoints.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Outcome</h3>
              <p>The unfinished system can turn one detailed briefing into a reviewable encounter package with mechanical targets, game-master guidance, and HTML, VTT, and Obsidian-ready exports.</p>
            </article>
          </div>

          <aside className="why-it-matters" aria-labelledby="why-it-matters-title">
            <div>
              <p className="eyebrow">Why this project matters</p>
              <h3 id="why-it-matters-title">Creative AI work becomes easier to inspect and recover</h3>
            </div>
            <p>The design makes complex generation more structured, reviewable, recoverable, and reusable across sessions. Its safeguards preserve completed work, keep important calculations visible, and produce practical formats a game master can inspect before using.</p>
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
            <h2 id="operator-title">Submissions enter a reviewable local queue</h2>
            <p>A public briefing does not immediately start AI generation. It creates a queued session that a local operator can inspect and claim, keeping intake separate from execution.</p>
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
            <p>The companion workflow reviews the same structured party information and returns concise preparation notes when a full encounter document is not needed.</p>
          </div>
          <figure className="screenshot-frame">
            <img src="/images/encounter-factory/gm-advisor.png" alt="GM Advisor interface showing a tactical review generated from fictional party information" loading="lazy" />
            <figcaption>GM Advisor is a shorter review path built on the same calculation and validation boundaries.</figcaption>
          </figure>
        </section>

        <section className="section limitation" aria-labelledby="encounter-limit-title">
          <div><p className="eyebrow">Current status</p><h2 id="encounter-limit-title">Useful work in progress, not a finished product</h2></div>
          <p>Encounter Factory is still being developed and evaluated locally. The repository demonstrates the current interface, data flow, MathEngine, validation, background jobs, recovery, and exports. This portfolio does not run the server, accept real submissions, or present the system as ready for public hosting.</p>
        </section>

        <section className="section example-output-section" aria-labelledby="example-output-title">
          <div className="section-heading">
            <p className="eyebrow">Existing HTML export · work in progress</p>
            <h2 id="example-output-title">A fuller encounter document produced by the system</h2>
            <p>I found this existing Encounter Factory export saved locally on this computer. Unlike the earlier hand-written repository fixture, it contains a complete styled encounter with scene-setting, tactical zones, calculated targets, enemy statistics, a round-by-round run sheet, and design notes.</p>
          </div>

          <aside className="output-warning" aria-label="Work-in-progress output notice">
            <strong>Work in progress</strong>
            <p>This is an existing fictional output from the unfinished system, not a promise of final quality or format. It may contain mechanical or editorial issues that still need review.</p>
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
