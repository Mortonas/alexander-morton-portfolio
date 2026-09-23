import ProjectHero from '../components/ProjectHero.jsx';
import SiteLayout from '../components/SiteLayout.jsx';
import '../styles/traveller-notes.css';

const stages = [
  {
    title: 'Imported facts',
    copy: 'Traveller Map provides a large list of worlds. I use world names and subsector identifiers to choose and group them. A subsector is simply a smaller region of space containing nearby worlds. Map coordinates support a separate feature for exploring possible jumps between worlds.',
  },
  {
    title: 'Lore context',
    copy: 'When an article is available, Traveller RPG Wiki supplies optional background for that world. Its community-written text gives the draft more context, but it is not a rules authority.',
  },
  {
    title: 'Generated prep notes',
    copy: 'Python organizes the work and AI helps draft linked notes with people, places, and story hooks. A game master—the person running the game—reviews, edits, and approves those drafts before a session. That review is a human responsibility, not an approval button in this program.',
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
          lede="This project shows how I can take a huge list of fictional worlds, organize them, and turn them into structured draft notes a game master can actually use. Traveller is a space role-playing game; the game master prepares its setting and runs each session."
          meta={['My role: Python workflow and data organization', 'Bulk world import', 'Linked Markdown notes', 'Private source and notes']}
        />

        <section className="section traveller-intro" aria-labelledby="traveller-why-title">
          <div className="section-heading">
            <p className="eyebrow">Why I built it</p>
            <h2 id="traveller-why-title">A large setting needs more than a long list</h2>
          </div>
          <p>A galaxy-sized game can contain far more worlds than one person can comfortably research and organize by hand. I built Traveller Notes to gather worlds in a sector—a large region of space—and turn selected entries into connected preparation material. The useful part is the path from scattered source records to notes a game master can search, follow, and adapt.</p>
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
            <p>Traveller Map sector records can also include a hex location (a position on its hexagonal map), UWP (a shorthand world profile), bases, trade remarks, a travel zone, PBG (population multiplier, belts, and gas giants), allegiance, and star details. The current bulk workflow does not pass UWP, trade codes, or every other available field into its note-writing prompts.</p>
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
          <p>The program groups worlds into subsectors, prepares an overview, and shows the expected extraction scope before asking whether to continue. After bulk data is loaded and the user opts in, the workflow begins creating drafts automatically; completion time depends on the number of worlds and external services.</p>
          <p>It records which worlds have been processed so an interrupted job can resume. The file that tracks which worlds have been processed lives only in my private notes workspace and is excluded from the public site.</p>
        </section>

        <section className="section traveller-limits" aria-labelledby="traveller-limits-title">
          <div>
            <p className="eyebrow">Limits and sources</p>
            <h2 id="traveller-limits-title">Draft material still needs a human decision</h2>
          </div>
          <div>
            <p><a href="https://travellermap.com/doc/about" target="_blank" rel="noreferrer">Traveller Map</a> combines official survey data with unofficial contributions and custom sectors. Its <a href="https://travellermap.com/doc/api" target="_blank" rel="noreferrer">data API</a> provides the world list. <a href="https://wiki.travellerrpg.com/" target="_blank" rel="noreferrer">Traveller RPG Wiki</a> is a community-maintained encyclopedia used for optional background.</p>
            <p>The resulting notes are built from mixed sources and generated fiction. They are preparation drafts, not a single verified account of the setting. The game master reviews, edits, and decides what belongs in a session.</p>
            <p>The source code, real campaign notes, raw imports, and progress records remain private. This portfolio page shows only the fictional illustration of the workflow.</p>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
