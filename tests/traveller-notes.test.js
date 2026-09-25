import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import { projects } from '../src/data/projects.js';
import { approvedTravellerImages, travellerPrivacyViolations, webpMetadataChunks } from '../scripts/verify-traveller-privacy.mjs';

const pagePath = new URL('../src/pages/TravellerNotesPage.jsx', import.meta.url);
const svgPath = new URL('../public/images/traveller-notes/fictional-workflow.svg', import.meta.url);

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
    'I built a Python tool to turn selected world records into short, linked draft notes',
    'Why I built it',
    'From world data to draft notes',
    'Handling a large batch',
    'Limits and sources',
    'Imported facts',
    'Lore context',
    'Generated prep notes',
    'a subsector is a smaller region of nearby worlds',
    'A separate feature uses map coordinates',
    'does not use UWP, trade codes',
    'reviews and edits them before a session',
    'Completion time depends on the number of worlds and external services',
    'The file that tracks which worlds have been processed lives only in my private notes workspace',
    'combine sources with generated fiction',
    'not copied source material or live campaign output',
    'Example prep note — “New Trade Route” (excerpt from a past test run, shown in an isolated demo vault).',
    'Traveller Notes menu in an empty demo vault (no generation run in this screenshot).',
    'This is the program’s idle menu.',
    'not a new run, a live campaign note, or copied Traveller Map or wiki text',
    'estimates the remaining work and likely API cost',
    'not a measured time-saving claim',
    'View Traveller Notes public code showcase',
    'What if a region has 100 worlds?',
    'not published evidence of a completed 100-world run',
    'token use and cost still depend on the sources and batch size',
    'What the numbered choices mean',
    'A “ledger” is an overview note; a “vault” is my private folder of linked notes.',
    'Generate Master Ledger for System',
    'Local BFS System Jump',
    'Build Sector / Subsector Archive',
    'Generate Sector Overview (Single File)',
    'Reformat Entire Vault to Latest Templates',
    '<strong>Exit</strong>',
    '0 — Resume',
    'It is absent from this idle-menu image.',
    'How the batch stays manageable',
  ]) assert.ok(page.includes(expected), `missing disclosure: ${expected}`);
  assert.match(page, /travellermap\.com\/doc\/about/);
  assert.match(page, /travellermap\.com\/doc\/api/);
  assert.match(page, /wiki\.travellerrpg\.com/);
  assert.match(page, /<ol className="traveller-stages">/);
  assert.match(page, /<ol className="traveller-menu-list">/);
  assert.match(page, /<details className="traveller-fields">/);
  assert.ok(page.indexOf('new-trade-route-note.webp') < page.indexOf('fictional-workflow.svg'), 'the example note must appear before the diagram');
  assert.match(page, /alt="Archived New Trade Route test note/);
  assert.match(page, /alt="Idle Traveller Notes terminal menu/);
});

test('the fictional illustration is self-contained and the only public evidence assets are reviewed', async () => {
  const svg = await fs.readFile(svgPath, 'utf8');
  assert.match(svg, /Imported facts/i);
  assert.match(svg, /Lore context/i);
  assert.match(svg, /Generated prep notes/i);
  assert.match(svg, /fictional/i);
  assert.doesNotMatch(svg, /<script|<foreignObject|<image|(?:href|src)="https?:\/\//i);
  const entries = await fs.readdir(new URL('../public/images/traveller-notes/', import.meta.url));
  assert.deepEqual(entries.sort(), approvedTravellerImages.map((file) => file.split('/').at(-1)).sort());
  for (const name of ['idle-menu.webp', 'new-trade-route-note.webp']) {
    const bytes = await fs.readFile(new URL(`../public/images/traveller-notes/${name}`, import.meta.url));
    assert.deepEqual(webpMetadataChunks(bytes), [], `${name} must have no EXIF, XMP, or ICC metadata`);
  }
});

test('publication privacy guard rejects vault, raw import, state, and extra evidence paths', () => {
  const base = [
    'public/images/traveller-notes/fictional-workflow.svg',
    'public/images/traveller-notes/idle-menu.webp',
    'public/images/traveller-notes/new-trade-route-note.webp',
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
    'dist/images/traveller-notes/fictional-workflow.svg',
    'dist/images/traveller-notes/idle-menu.webp',
    'dist/images/traveller-notes/new-trade-route-note.webp',
    'dist/data/dashboard-v1.json',
    'dist/data/dashboard-v1.schema.json',
  ], 'dist'), []);
});
