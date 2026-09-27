import { useState } from 'react';
import ProjectHero from '../components/ProjectHero.jsx';
import SiteLayout from '../components/SiteLayout.jsx';
import { reginaShowcase } from '../data/reginaShowcase.js';
import '../styles/traveller-notes.css';

const stages = [
  {
    title: 'Imported facts',
    copy: 'Traveller Map provides the world list. I use names and subsector identifiers to choose and group worlds; a subsector is a smaller region of nearby worlds. A separate feature uses map coordinates to find possible routes between them.',
  },
  {
    title: 'Lore context',
    copy: 'When a Traveller RPG Wiki article exists, the tool can use it for background. Coverage varies, so this is optional context rather than a rules authority.',
  },
  {
    title: 'Generated prep notes',
    copy: 'Python organizes the work, and AI suggests short linked notes about people, places, and possible stories. These are drafts for a game master—the person running the game—to review.',
  },
];

export default function TravellerNotesPage() {
  const [selectedNoteId, setSelectedNoteId] = useState(reginaShowcase.notes[0].id);
  const selectedNote = reginaShowcase.notes.find(({ id }) => id === selectedNoteId) ?? reginaShowcase.notes[0];

  return (
    <SiteLayout>
      <main id="main" className="traveller-page">
        <ProjectHero
          eyebrow="Data and campaign preparation · Work in progress"
          title="Traveller Notes"
          subtitle="From a galaxy of world records to notes for game night"
          lede="Traveller is a space role-playing game with more fictional worlds than I could prepare one by one. My Python tool turns selected world records into linked draft notes for a game master."
          proof="A saved Regina test shows one master note linked to four details. A separate regional workflow handles large batches, cost approval, and resumable progress."
          repositoryUrl="https://github.com/Mortonas/traveller-notes-showcase"
          repositoryLabel="View Traveller Notes code"
          downloads={[{ url: 'https://github.com/Mortonas/traveller-notes-showcase/archive/refs/heads/main.zip', label: 'Download public code showcase ZIP' }]}
          meta={['My role: Python workflow and data organization']}
        />

        <section className="section traveller-output" aria-labelledby="traveller-output-title">
          <div className="section-heading">
            <p className="eyebrow">One world, many layers</p>
            <h2 id="traveller-output-title">A world note that opens into usable details</h2>
            <p>The saved Regina test began with one master note. It named people, places, an institution, and a rumor. Choose a highlighted connection to see how an optional linked note develops it.</p>
          </div>
          <p className="regina-disclaimer">{reginaShowcase.disclaimer}</p>
          <div className="regina-explorer">
            <article className="regina-master" aria-labelledby="regina-master-title">
              <p className="eyebrow">Master world note · Reviewed excerpt</p>
              <h3 id="regina-master-title">{reginaShowcase.title}</h3>
              <p>{reginaShowcase.summary}</p>
              <dl className="regina-layers">
                {reginaShowcase.layers.map((layer) => <div key={layer.heading}><dt>{layer.heading}</dt><dd>{layer.text}</dd></div>)}
              </dl>
              <h4>Four connections from this world note</h4>
              <div role="group" aria-label="Choose a linked Regina note">
                <ol className="regina-connections">
                  {reginaShowcase.notes.map((note) => (
                    <li key={note.id}>
                      <span className="regina-kind">{note.kind}</span>
                      <button
                        type="button"
                        aria-pressed={selectedNote.id === note.id}
                        aria-controls="regina-note-detail"
                        onClick={() => setSelectedNoteId(note.id)}
                      >{note.title}</button>
                      <p>{note.masterExcerpt}</p>
                    </li>
                  ))}
                </ol>
              </div>
              <details className="regina-master-image">
                <summary>View the master-note screenshot</summary>
                <figure className="regina-archival-image">
                  <img src={reginaShowcase.image.src} alt={reginaShowcase.image.alt} loading="lazy" />
                  <figcaption>Complete image of the reviewed master-note excerpt, not the private raw file. <a href={reginaShowcase.image.src} target="_blank" rel="noreferrer">{reginaShowcase.image.linkLabel}</a></figcaption>
                </figure>
              </details>
            </article>
            <article className="regina-detail" id="regina-note-detail" data-note-id={selectedNote.id} aria-labelledby="regina-detail-title">
              <p className="eyebrow">Linked {selectedNote.kind.toLowerCase()} note · Reviewed excerpt</p>
              <h3 id="regina-detail-title">{selectedNote.title}</h3>
              <p className="regina-selection-status" role="status">Showing {selectedNote.kind.toLowerCase()} note: {selectedNote.title}</p>
              <ul className="regina-excerpt">
                {selectedNote.excerpt.map((line) => <li key={line}>{line}</li>)}
              </ul>
              <p className="regina-annotation"><strong>What this adds:</strong> {selectedNote.annotation}</p>
              {selectedNote.image && (
                <figure className="regina-archival-image">
                  <img src={selectedNote.image.src} alt={selectedNote.image.alt} />
                  <figcaption>Complete image of the reviewed note excerpt, not an untouched export. The text above remains available without this image. <a href={selectedNote.image.src} target="_blank" rel="noreferrer">{selectedNote.image.linkLabel}</a></figcaption>
                </figure>
              )}
            </article>
          </div>
        </section>

        <section className="section traveller-paths" aria-labelledby="traveller-paths-title">
          <div className="section-heading">
            <p className="eyebrow">Two ways to use the tool</p>
            <h2 id="traveller-paths-title">Go deep on one world, or start with a region</h2>
            <p>Regina demonstrates the one-world path. The regional path is designed to prepare short starting notes across many worlds.</p>
          </div>
          <div className="traveller-path-grid">
            <article>
              <h3>Develop one world</h3>
              <ol>
                <li>Select a world and draft its master note.</li>
                <li>Find the linked names in the master note (written as <code>[[...]]</code> in the saved file).</li>
                <li>Request and save related detail notes for those links.</li>
                <li>Review and edit useful material before a game session.</li>
              </ol>
            </article>
            <article>
              <h3>Prepare a region</h3>
              <ol>
                <li>Select a sector or subsector and group its worlds.</li>
                <li>Create a regional overview and estimate the API cost of individual notes.</li>
                <li>Ask for approval, then draft starting notes for selected worlds.</li>
                <li>Record progress in a private file so a paused job can be reviewed and resumed.</li>
              </ol>
            </article>
          </div>
          <p className="traveller-path-note"><strong>Why this helps:</strong> Starting with world records and short drafts reduces repeated lookup and blank-page work. The game master chooses which worlds to develop further. Completion time depends on the batch and outside services.</p>
        </section>

        <section className="section traveller-flow-section" aria-labelledby="traveller-flow-title">
          <div className="section-heading">
            <p className="eyebrow">Sources and creative work</p>
            <h2 id="traveller-flow-title">From a reference to your own ideas</h2>
            <p><a href="https://wiki.travellerrpg.com/" target="_blank" rel="noreferrer">Traveller RPG Wiki</a> brings a large fictional universe together in one searchable place. It gives players and game masters an easier way to explore the setting. Articles are community maintained, and some worlds have far more detail than others.</p>
          </div>
          <ol className="traveller-stages">
            {stages.map((stage, index) => (
              <li key={stage.title}>
                <span className="traveller-stage-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <div><h3>{stage.title}</h3><p>{stage.copy}</p></div>
              </li>
            ))}
          </ol>
          <div className="traveller-creative-context">
            <h3>Where my own ideas come in</h3>
            <p>A note can carry two creative layers before it reaches me: ideas from official setting writers or wiki contributors, then AI suggestions that connect details or fill gaps. I review the draft, change what does not fit, and add my own ideas before play.</p>
            <p>These labels describe content categories, not a verified source for each sentence. <a href="https://travellermap.com/doc/about" target="_blank" rel="noreferrer">Traveller Map</a> combines official and unofficial contributions; its <a href="https://travellermap.com/doc/api" target="_blank" rel="noreferrer">API</a> supplies the world list. AI suggestions are draft fiction, not verified setting facts.</p>
          </div>

          <details className="traveller-fields">
            <summary>What else is in a world record?</summary>
            <p>A Traveller Map record may also include a hex location (its position on the map), UWP (a short world profile), bases, trade remarks, a travel zone, PBG (population multiplier, belts, and gas giants), allegiance, and star details. The bulk note-writing prompt does not use UWP, trade codes, or all the other fields.</p>
          </details>
        </section>

        <section className="section traveller-batch" aria-labelledby="traveller-batch-title">
          <div className="section-heading">
            <p className="eyebrow">Batch interface</p>
            <h2 id="traveller-batch-title">A real menu for choosing the next task</h2>
            <p>This terminal menu offers single-world notes, region preparation, and a way to reformat existing notes.</p>
          </div>
          <figure className="traveller-capture traveller-menu-capture">
            <a href="/images/traveller-notes/idle-menu.webp" target="_blank" rel="noreferrer" aria-label="Open the full-size Traveller Notes idle menu image">
              <img src="/images/traveller-notes/idle-menu.webp" alt="Idle Traveller Notes terminal menu offering system lookup, jump exploration, sector or subsector archive creation, and exit" loading="lazy" />
            </a>
            <figcaption>Traveller Notes menu in an empty demo vault (no generation run in this screenshot). This is the program’s idle menu. <a href="/images/traveller-notes/idle-menu.webp" target="_blank" rel="noreferrer">Open full-size menu image</a></figcaption>
          </figure>
          <details className="traveller-menu-guide">
            <summary>View command guide</summary>
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
          </details>
        </section>

        <section className="section traveller-limits" aria-labelledby="traveller-limits-title">
          <div>
            <p className="eyebrow">What this demonstrates</p>
            <h2 id="traveller-limits-title">Useful drafts, with clear limits</h2>
          </div>
          <div>
            <p>Traveller Notes brings together bulk data intake, linked records, AI drafting, cost checks, and progress that can be reviewed after an interruption.</p>
            <p><strong>Current limits:</strong> I have not published evidence of a completed 100-world run. Source material varies in detail and authority, and every generated note needs a game master’s review before play.</p>
            <p>The <a href="https://github.com/Mortonas/traveller-notes-showcase" target="_blank" rel="noreferrer">public code showcase</a> includes the implementation and tests. Real campaign notes, raw imports, and progress records remain private. This page shows reviewed excerpts from a saved test and the idle menu.</p>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
