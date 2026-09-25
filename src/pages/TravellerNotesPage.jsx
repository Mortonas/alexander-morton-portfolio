import ProjectHero from '../components/ProjectHero.jsx';
import SiteLayout from '../components/SiteLayout.jsx';
import '../styles/traveller-notes.css';

const stages = [
  {
    title: 'Imported facts',
    copy: 'Traveller Map provides the world list. I use names and subsector identifiers to choose and group worlds; a subsector is a smaller region of nearby worlds. A separate feature uses map coordinates to find possible routes between them.',
  },
  {
    title: 'Lore context',
    copy: 'When a Traveller RPG Wiki article exists, the tool can use it for background. The wiki is community written, so I treat it as optional context, not a rules authority.',
  },
  {
    title: 'Generated prep notes',
    copy: 'Python organizes the work, and AI helps draft short linked notes about people, places, and possible stories. The game master—the person running the game—reviews and edits them before a session. The program does not approve its own output.',
  },
];

export default function TravellerNotesPage() {
  return (
    <SiteLayout>
      <main id="main">
        <ProjectHero
          eyebrow="Data and campaign preparation · Work in progress"
          title="Traveller Notes"
          subtitle="From a galaxy of world records to notes for game night"
          lede="Traveller is a space role-playing game with a huge map of fictional worlds. I built a Python tool to turn selected world records into short, linked draft notes. A game master can use those notes as a starting point, then decide what belongs in the game."
          repositoryUrl="https://github.com/Mortonas/traveller-notes-showcase"
          repositoryLabel="View Traveller Notes public code showcase"
          meta={['My role: Python workflow and data organization', 'Bulk world import', 'Linked Markdown notes', 'Private campaign notes']}
        />

        <section className="section traveller-intro" aria-labelledby="traveller-why-title">
          <div className="section-heading">
            <p className="eyebrow">Why I built it</p>
            <h2 id="traveller-why-title">A large setting needs more than a long list</h2>
          </div>
          <p>Preparing every world by hand would be a lot of repetitive work. The tool gathers a sector—a large region of space—and organizes its worlds into notes that can be searched, linked, and expanded later.</p>
          <div className="traveller-scale-callout">
            <h3>What if a region has 100 worlds?</h3>
            <p>I can select a region once instead of entering a separate prompt for every world. The tool groups the worlds, estimates the cost, and asks before queuing individual starting notes. It is designed for a batch this large; I have not published evidence of a completed 100-world run.</p>
            <p>Those notes are starting points, not 100 finished adventures. I can spend more time on the worlds the players actually visit. Short notes keep the first pass focused, though token use and cost still depend on the sources and batch size.</p>
          </div>
        </section>

        <section className="section traveller-output" aria-labelledby="traveller-output-title">
          <div className="section-heading">
            <p className="eyebrow">Example output</p>
            <h2 id="traveller-output-title">A draft a game master can work with</h2>
          </div>
          <div className="traveller-output-grid">
            <figure className="traveller-capture">
              <a href="/images/traveller-notes/new-trade-route-note.webp" target="_blank" rel="noreferrer" aria-label="Open the full-size New Trade Route example note screenshot">
                <img src="/images/traveller-notes/new-trade-route-note.webp" alt="Archived New Trade Route test note in Obsidian, with a short shipping-lane concept, practical implications, linked names, and three game-master plot hooks" />
              </a>
              <figcaption>Example prep note — “New Trade Route” (excerpt from a past test run, shown in an isolated demo vault). <a href="/images/traveller-notes/new-trade-route-note.webp" target="_blank" rel="noreferrer">Open full-size example note</a></figcaption>
            </figure>
            <div className="traveller-output-copy">
              <h3>What this shows</h3>
              <p>The note turns a trade-route idea into a short summary, consequences for the setting, and three possible situations for play. Linked names connect it to other notes in the private workspace.</p>
              <p>This excerpt came from an earlier AI-assisted test. It is not a new run, a live campaign note, or copied Traveller Map or wiki text. The game master still decides what to keep.</p>
            </div>
          </div>
        </section>

        <section className="section traveller-flow-section" aria-labelledby="traveller-flow-title">
          <div className="section-heading">
            <p className="eyebrow">From world data to draft notes</p>
            <h2 id="traveller-flow-title">Three kinds of information, kept distinct</h2>
          </div>
          <ol className="traveller-stages">
            {stages.map((stage, index) => (
              <li key={stage.title}>
                <span className="traveller-stage-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <div><h3>{stage.title}</h3><p>{stage.copy}</p></div>
              </li>
            ))}
          </ol>

          <details className="traveller-fields">
            <summary>What else is in a world record?</summary>
            <p>A Traveller Map record may also include a hex location (its position on the map), UWP (a short world profile), bases, trade remarks, a travel zone, PBG (population multiplier, belts, and gas giants), allegiance, and star details. The bulk note-writing prompt does not use UWP, trade codes, or all the other fields.</p>
          </details>

          <figure className="traveller-figure">
            <img src="/images/traveller-notes/fictional-workflow.svg" alt="Fictional example: an imported world name and region, optional background, then a draft linked story hook" />
            <figcaption>The three labeled bands show imported facts, optional lore context, and generated prep notes. This example is wholly fictional; it is not copied source material or live campaign output.</figcaption>
          </figure>
        </section>

        <section className="section traveller-batch" aria-labelledby="traveller-batch-title">
          <div className="section-heading">
            <p className="eyebrow">Handling a large batch</p>
            <h2 id="traveller-batch-title">Choose a region, then build in stages</h2>
          </div>
          <figure className="traveller-capture traveller-menu-capture">
            <a href="/images/traveller-notes/idle-menu.webp" target="_blank" rel="noreferrer" aria-label="Open the full-size Traveller Notes idle menu image">
              <img src="/images/traveller-notes/idle-menu.webp" alt="Idle Traveller Notes terminal menu offering system lookup, jump exploration, sector or subsector archive creation, and exit" loading="lazy" />
            </a>
            <figcaption>Traveller Notes menu in an empty demo vault (no generation run in this screenshot). This is the program’s idle menu. <a href="/images/traveller-notes/idle-menu.webp" target="_blank" rel="noreferrer">Open full-size menu image</a></figcaption>
          </figure>
          <div className="traveller-menu-guide">
            <h3>What the numbered choices mean</h3>
            <p>You choose an action by typing its number. A “ledger” is an overview note; a “vault” is my private folder of linked notes.</p>
            <ol className="traveller-menu-list">
              <li><strong>Generate Master Ledger for System</strong><span>Choose one star system. The tool drafts its main overview note and smaller linked notes about relevant people, places, or ideas.</span></li>
              <li><strong>Local BFS System Jump</strong><span>Find nearby star systems within a chosen number of travel hops (“jumps”). Breadth-first search (BFS) checks each nearby connection in turn; writing notes for the selected starting system requires a separate yes.</span></li>
              <li><strong>Build Sector / Subsector Archive</strong><span>Choose a large map region (sector) or a smaller part of it (subsector). The tool groups its worlds, makes region overviews, estimates the cost, and asks before drafting notes for individual worlds.</span></li>
              <li><strong>Generate Sector Overview (Single File)</strong><span>Make one starting overview for a whole region without running the deeper world-by-world batch.</span></li>
              <li><strong>Reformat Entire Vault to Latest Templates</strong><span>Update existing notes to newer layouts. This edits private files and uses AI credits, so the tool warns and asks first.</span></li>
              <li><strong>Exit</strong><span>Close the program without starting another task.</span></li>
            </ol>
            <p>If a regional job is paused, a separate <strong>0 — Resume</strong> choice appears so it can continue from recorded progress. It is absent from this idle-menu image.</p>
          </div>
          <h3 className="traveller-batch-subheading">How the batch stays manageable</h3>
          <ul className="traveller-batch-points">
            <li>The operator chooses a system or a larger region. For a sector batch, the program groups world names by subsector and prepares an overview.</li>
            <li>Before writing individual notes, it estimates the remaining work and likely API cost, then asks whether to continue. The estimate is not a measured time-saving claim.</li>
            <li>After bulk data loads and the user opts in, it works through the remaining worlds and shows progress. Completion time depends on the number of worlds and external services; API use grows with the work performed.</li>
            <li>A progress file helps resume an interrupted job. The file that tracks which worlds have been processed lives only in my private notes workspace and is excluded from the public site.</li>
          </ul>
        </section>

        <section className="section traveller-limits" aria-labelledby="traveller-limits-title">
          <div>
            <p className="eyebrow">Limits and sources</p>
            <h2 id="traveller-limits-title">Draft material still needs a human decision</h2>
          </div>
          <div>
            <p><a href="https://travellermap.com/doc/about" target="_blank" rel="noreferrer">Traveller Map</a> combines official survey data with unofficial contributions and custom sectors. Its <a href="https://travellermap.com/doc/api" target="_blank" rel="noreferrer">data API</a> provides the world list. <a href="https://wiki.travellerrpg.com/" target="_blank" rel="noreferrer">Traveller RPG Wiki</a> is a community-maintained encyclopedia used for optional background.</p>
            <p>The notes combine sources with generated fiction. They are drafts, not a verified account of the setting. The game master checks and edits them before using anything in a session.</p>
            <p>The <a href="https://github.com/Mortonas/traveller-notes-showcase" target="_blank" rel="noreferrer">public code showcase</a> includes the implementation and tests. Real campaign notes, raw imports, and progress records remain private. The images here show a past-test excerpt, an idle menu, and a fictional workflow illustration.</p>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
