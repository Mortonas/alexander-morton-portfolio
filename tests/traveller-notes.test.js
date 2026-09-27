import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import { projects } from '../src/data/projects.js';
import { reginaShowcase } from '../src/data/reginaShowcase.js';
import { approvedTravellerImages, travellerPrivacyViolations, webpMetadataChunks, travellerPrivateContentViolations } from '../scripts/verify-traveller-privacy.mjs';

const pagePath = new URL('../src/pages/TravellerNotesPage.jsx', import.meta.url);

test('Traveller Notes card links the curated public code while keeping campaign data private', () => {
  const project = projects.find(({ slug }) => slug === 'traveller-notes');
  assert.equal(project.href, '/projects/traveller-notes/');
  assert.equal(project.image, '/images/traveller-notes/idle-menu.webp');
  assert.match(project.summary, /draft notes/i);
  assert.match(project.summary, /private/i);
  assert.equal(project.repositoryUrl, 'https://github.com/Mortonas/traveller-notes-showcase');
});

test('Traveller Notes social preview uses the reviewed idle terminal image', async () => {
  const html = await fs.readFile(new URL('../projects/traveller-notes/index.html', import.meta.url), 'utf8');
  assert.match(html, /property="og:image" content="%VITE_SITE_ORIGIN%\/images\/traveller-notes\/idle-menu\.webp"/);
  assert.match(html, /name="twitter:image" content="%VITE_SITE_ORIGIN%\/images\/traveller-notes\/idle-menu\.webp"/);
});

test('Traveller Notes explains source provenance and game-master review in plain language', async () => {
  const page = await fs.readFile(pagePath, 'utf8');
  for (const expected of [
    'My Python tool turns selected world records into linked draft notes',
    'A saved Regina test shows one master note linked to four details',
    'Two ways to use the tool',
    'Develop one world',
    'Prepare a region',
    'Find the linked names in the master note (written as <code>[[...]]</code> in the saved file).',
    'Regina demonstrates the one-world path.',
    'estimate the API cost of individual notes',
    'Record progress in a private file so a paused job can be reviewed and resumed.',
    'Starting with world records and short drafts reduces repeated lookup and blank-page work.',
    'Sources and creative work',
    'Traveller RPG Wiki</a> brings a large fictional universe together in one searchable place.',
    'A note can carry two creative layers before it reaches me',
    'These labels describe content categories, not a verified source for each sentence.',
    'Batch interface',
    'View command guide',
    'What this demonstrates',
    'Imported facts',
    'Lore context',
    'Generated prep notes',
    'a subsector is a smaller region of nearby worlds',
    'A separate feature uses map coordinates',
    'does not use UWP, trade codes',
    'I review the draft, change what does not fit, and add my own ideas before play.',
    'Completion time depends on the batch and outside services.',
    'AI suggestions are draft fiction, not verified setting facts.',
    'Traveller Notes menu in an empty demo vault (no generation run in this screenshot).',
    'This is the program’s idle menu.',
    'a saved test and the idle menu',
    'View Traveller Notes code',
    'I have not published evidence of a completed 100-world run.',
    'A “ledger” is an overview note; a “vault” is my private folder of linked notes.',
    'Generate Master Ledger for System',
    'Local BFS System Jump',
    'Build Sector / Subsector Archive',
    'Generate Sector Overview (Single File)',
    'Reformat Entire Vault to Latest Templates',
    '<strong>Exit</strong>',
    '0 — Resume',
    'It is absent from this idle-menu image.',
    'Traveller Notes brings together bulk data intake, linked records, AI drafting, cost checks',
  ]) assert.ok(page.includes(expected), `missing disclosure: ${expected}`);
  assert.match(page, /travellermap\.com\/doc\/about/);
  assert.match(page, /travellermap\.com\/doc\/api/);
  assert.match(page, /wiki\.travellerrpg\.com/);
  assert.match(page, /<ol className="traveller-stages">/);
  assert.match(page, /<ol>\s*<li>Select a world and draft its master note/);
  assert.match(page, /<ol>\s*<li>Select a sector or subsector and group its worlds/);
  assert.match(page, /<ol className="traveller-menu-list">/);
  assert.match(page, /<details className="traveller-fields">/);
  assert.match(page, /<details className="traveller-menu-guide">\s*<summary>View command guide<\/summary>/);
  assert.doesNotMatch(page, /traveller-scale-callout|traveller-batch-points|<section className="section traveller-intro"/);
  const sections = ['traveller-output', 'traveller-paths', 'traveller-flow-section', 'traveller-batch', 'traveller-limits'];
  const positions = sections.map((className) => page.indexOf(`<section className="section ${className}"`));
  assert.ok(positions.every((position) => position > -1), 'all planned sections must exist');
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b), 'Regina evidence must precede the regional workflow and later context');
  assert.ok(page.indexOf('<ProjectHero') < positions[0], 'Regina must be the first section after the hero');
  assert.match(page, /alt="Idle Traveller Notes terminal menu/);
  assert.doesNotMatch(page, /fictional-workflow\.svg|traveller-figure/);
});

test('Regina showcase keeps four linked choices in a stable order and discloses archival limits', async () => {
  const page = await fs.readFile(pagePath, 'utf8');
  const styles = await fs.readFile(new URL('../src/styles/traveller-notes.css', import.meta.url), 'utf8');
  const dataSource = await fs.readFile(new URL('../src/data/reginaShowcase.js', import.meta.url), 'utf8');
  assert.deepEqual(reginaShowcase.notes.map(({ id }) => id), [
    'captain-eva-rostova', 'regina-starport', 'regina-system-authority', 'vargr-infiltration',
  ]);
  assert.deepEqual(reginaShowcase.notes.map(({ kind }) => kind), ['Character', 'Location', 'Faction', 'Story lead']);
  assert.deepEqual(reginaShowcase.layers.map(({ heading }) => heading), [
    'Orbital arrival', 'Power and politics', 'Current state',
  ]);
  assert.match(page, /<dl className="regina-layers">/);
  assert.equal(new Set(reginaShowcase.notes.map(({ id }) => id)).size, 4);
  for (const phrase of ['Reviewed, abridged', 'AI-assisted', 'not verified Traveller canon', 'a live campaign', 'regional batch']) {
    assert.ok(reginaShowcase.disclaimer.includes(phrase), `missing archival disclosure: ${phrase}`);
  }
  assert.match(page, /\{reginaShowcase\.disclaimer\}/);
  assert.match(page, /aria-label="Choose a linked Regina note"/);
  assert.match(page, /aria-pressed=\{selectedNote\.id === note\.id\}/);
  assert.match(page, /onClick=\{\(\) => setSelectedNoteId\(note\.id\)\}/);
  assert.match(page, /data-note-id=\{selectedNote\.id\}/);
  assert.match(page, /useState\(reginaShowcase\.notes\[0\]\.id\)/);
  assert.ok(page.indexOf('regina-master') < page.indexOf('regina-connections'));
  assert.ok(page.indexOf('regina-connections') < page.indexOf('regina-detail'));
  assert.ok(page.indexOf('regina-detail') < page.indexOf('traveller-paths'));
  assert.ok(page.indexOf('regina-connections') < page.indexOf('regina-master-image'), 'choices must precede the tall master screenshot');
  assert.match(page, /<details className="regina-master-image">\s*<summary>View the master-note screenshot<\/summary>/);
  assert.match(page, /\{selectedNote\.excerpt\.map/);
  assert.match(page, /View archival character-note screenshot|selectedNote\.image\.linkLabel/);
  assert.match(page, /reginaShowcase\.image\.src/);
  assert.match(page, /Complete image of the reviewed master-note excerpt, not the private raw file/);
  assert.match(page, /Complete image of the reviewed note excerpt, not an untouched export/);
  assert.match(styles, /\.regina-archival-image img\{[^}]*height:auto/);
  assert.doesNotMatch(styles, /\.regina-archival-image img\{[^}]*object-fit:cover/);
  assert.doesNotMatch(dataSource, /(?:from ['"]node:|import\(|test_output|C:\\Projects|https?:\/\/)/);
  assert.deepEqual(reginaShowcase.notes.map(({ image }) => image?.src), [
    '/images/traveller-notes/captain-eva-rostova-note.webp',
    '/images/traveller-notes/regina-starport-note.webp',
    '/images/traveller-notes/regina-system-authority-note.webp',
    '/images/traveller-notes/vargr-infiltration-note.webp',
  ]);
  assert.equal(reginaShowcase.image.src, '/images/traveller-notes/regina-master-note.webp');
  assert.ok(reginaShowcase.notes.every(({ image }) => image.alt && image.linkLabel));
});

test('only approved Traveller Notes evidence assets are public', async () => {
  const entries = await fs.readdir(new URL('../public/images/traveller-notes/', import.meta.url));
  assert.deepEqual(entries.sort(), approvedTravellerImages.map((file) => file.split('/').at(-1)).sort());
  for (const name of ['idle-menu.webp', 'captain-eva-rostova-note.webp', 'regina-master-note.webp', 'regina-starport-note.webp', 'regina-system-authority-note.webp', 'vargr-infiltration-note.webp']) {
    const bytes = await fs.readFile(new URL(`../public/images/traveller-notes/${name}`, import.meta.url));
    assert.deepEqual(webpMetadataChunks(bytes), [], `${name} must have no EXIF, XMP, or ICC metadata`);
  }
});

test('publication privacy guard rejects vault, raw import, state, and extra evidence paths', () => {
  const base = [
    'public/images/traveller-notes/idle-menu.webp',
    'public/images/traveller-notes/captain-eva-rostova-note.webp',
    'public/images/traveller-notes/regina-master-note.webp',
    'public/images/traveller-notes/regina-starport-note.webp',
    'public/images/traveller-notes/regina-system-authority-note.webp',
    'public/images/traveller-notes/vargr-infiltration-note.webp',
    'public/data/dashboard-v1.json',
    'public/data/dashboard-v1.schema.json',
    '.env.example',
  ];
  assert.deepEqual(travellerPrivacyViolations(base, 'public'), []);
  for (const privateFile of [
    'vault/worlds/secret.md',
    'test_output/world.md',
    'raw-imports/sector.csv',
    'wiki-pulls/world.txt',
    'backups/traveller-notes.json',
    'zettel_state.json',
    '.env.local',
    'public/data/traveller-worlds.json',
    'public/images/traveller-notes/real-output.svg',
  ]) {
    assert.notDeepEqual(travellerPrivacyViolations([...base, privateFile], 'public'), [], privateFile);
  }
  assert.deepEqual(travellerPrivacyViolations([
    'dist/images/traveller-notes/idle-menu.webp',
    'dist/images/traveller-notes/captain-eva-rostova-note.webp',
    'dist/images/traveller-notes/regina-master-note.webp',
    'dist/images/traveller-notes/regina-starport-note.webp',
    'dist/images/traveller-notes/regina-system-authority-note.webp',
    'dist/images/traveller-notes/vargr-infiltration-note.webp',
    'dist/data/dashboard-v1.json',
    'dist/data/dashboard-v1.schema.json',
  ], 'dist'), []);
});

test('built-text privacy scan rejects private source and review markers', () => {
  assert.deepEqual(travellerPrivateContentViolations([{ path: 'dist/assets/page.js', contents: 'Reviewed, abridged archival example' }]), []);
  for (const contents of ['test_output', 'regina-showcase-map.json', 'C:\\Projects\\Traveller Notes', 'origin_url: https://example.test', 'processed_splinters: {}', 'type: master_ledger']) {
    assert.deepEqual(travellerPrivateContentViolations([{ path: 'dist/assets/page.js', contents }]), ['dist/assets/page.js']);
  }
});
