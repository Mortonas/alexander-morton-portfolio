import { Bot, Calculator, CheckCircle2, ExternalLink, FileText, ListChecks } from 'lucide-react';
import ProjectHero from '../components/ProjectHero.jsx';
import SiteLayout from '../components/SiteLayout.jsx';
import '../styles/encounter-document.css';

export default function EncounterFactoryPage() {
  return (
    <SiteLayout>
      <main id="main">
        <ProjectHero
          eyebrow="Application in progress"
          title="Encounter Factory"
          subtitle="From a D&D party briefing to a usable encounter document"
          lede="Encounter Factory is an unfinished system I am building for Dungeon Masters—the people who run Dungeons & Dragons games. They describe their party, setting, objective, and preferences; the application checks the encounter math and uses AI to help write an interesting, structured encounter document."
          repositoryUrl="https://github.com/Mortonas/Encounter-Factory"
          meta={['React + TypeScript', 'Express', 'Deterministic MathEngine', 'AI-assisted generation', 'Work in progress']}
        />

        <section className="section media-section lead-media" aria-labelledby="briefing-title">
          <div className="section-heading">
            <p className="eyebrow">The starting point</p>
            <h2 id="briefing-title">The game master fills in one detailed briefing</h2>
            <p>The form captures the player characters, requested enemies and allies, the location, the win condition, the desired tone, and the story details that should shape the encounter. This example uses fictional mock data.</p>
          </div>
          <figure className="screenshot-frame">
            <img src="/images/encounter-factory/briefing-intake.png" alt="Encounter Factory briefing form filled with fictional information for a Dungeons and Dragons party, enemy, ally, setting, and narrative goals" />
            <figcaption>A filled fictional briefing shows the information used to calculate and write the encounter.</figcaption>
          </figure>
        </section>

        <section className="section metric-strip" aria-label="Project status and design highlights">
          <article><strong>In progress</strong><span>unfinished local application</span></article>
          <article><strong>1 briefing</strong><span>party, scenario, and story inputs</span></article>
          <article><strong>Math + AI</strong><span>separate responsibilities</span></article>
          <article><strong>Document</strong><span>reviewable encounter output</span></article>
        </section>

        <section className="section split narrative-section" aria-labelledby="encounter-flow-title">
          <div>
            <p className="eyebrow">What I am building</p>
            <h2 id="encounter-flow-title">AI handles the creative work, not the trusted numbers</h2>
            <p>The application is designed to keep two responsibilities separate. Code calculates measurable targets such as encounter pressure, durability, damage, pacing, and action balance. AI works inside those boundaries to propose the situation, tactics, complications, and presentation.</p>
            <p>That separation is important: generated writing can make the encounter more imaginative, but it cannot silently change the mechanical targets owned by the MathEngine.</p>
          </div>
          <ol className="process-list">
            <li><ListChecks aria-hidden="true" /><div><strong>Collect the briefing</strong><span>The game master describes the party, mission, opposition, tone, and constraints.</span></div></li>
            <li><Calculator aria-hidden="true" /><div><strong>Calculate the pressure</strong><span>Deterministic code establishes encounter targets from the submitted party information.</span></div></li>
            <li><Bot aria-hidden="true" /><div><strong>Generate within boundaries</strong><span>AI turns the checked inputs into creative encounter material without owning the core math.</span></div></li>
            <li><CheckCircle2 aria-hidden="true" /><div><strong>Validate and recover</strong><span>Typed schemas, retries, checkpoints, and visible job state make failures reviewable.</span></div></li>
            <li><FileText aria-hidden="true" /><div><strong>Review the document</strong><span>The result is packaged for the game master to inspect and export before using it at the table.</span></div></li>
          </ol>
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
            <p className="eyebrow">Example output · work in progress</p>
            <h2 id="example-output-title">What an encounter document can look like</h2>
            <p>This existing fictional example is included with the Encounter Factory repository. It demonstrates the intended human-readable result, but the application and document structure are still being developed.</p>
          </div>

          <article className="encounter-document" aria-label="Example work-in-progress encounter document">
            <header>
              <div>
                <span>Encounter Factory · Fictional example</span>
                <h3>The Bell Beneath Ashfall</h3>
              </div>
              <strong>Work in progress</strong>
            </header>

            <p className="document-intro">The party enters a leaning bell chamber while a survey crew shelters behind a cracked stone screen. Every heavy impact shakes more ash through the rafters.</p>

            <div className="document-grid">
              <section aria-labelledby="example-objective-title">
                <h4 id="example-objective-title">Objective</h4>
                <p>Release two jammed counterweights and lead the crew through the western arch before the fourth structural shift.</p>
              </section>

              <section aria-labelledby="example-pressure-title">
                <h4 id="example-pressure-title">Tactical pressure</h4>
                <ul>
                  <li>Ashbound sentinels guard separate counterweights and try to divide rescuers from defenders.</li>
                  <li>A character can spend an action to clear, brace, or release a mechanism instead of attacking.</li>
                  <li>At the end of each round, mark one structural shift. A braced support cancels the next shift.</li>
                  <li>The sentinels withdraw when both counterweights are released; defeating them is optional.</li>
                </ul>
              </section>

              <section aria-labelledby="example-outcomes-title">
                <h4 id="example-outcomes-title">Possible outcomes</h4>
                <p>Fast coordination rescues everyone and preserves the tower’s survey records. A slower victory can still save the crew while losing equipment or access to the lower archive. Retreat leaves the site unstable but does not dictate what the group does next.</p>
              </section>
            </div>

            <footer>
              <p>Original fictional evaluation material. No client submission or private campaign content.</p>
              <a className="text-link" href="https://github.com/Mortonas/Encounter-Factory/blob/main/examples/fictional-encounter/encounter.md" target="_blank" rel="noreferrer">View the source example <ExternalLink size={15} aria-hidden="true" /></a>
            </footer>
          </article>
        </section>
      </main>
    </SiteLayout>
  );
}
