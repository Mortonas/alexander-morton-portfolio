import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import { projects } from '../src/data/projects.js';
import { travellerPrivacyViolations } from '../scripts/verify-traveller-privacy.mjs';

const pagePath = new URL('../src/pages/TravellerNotesPage.jsx', import.meta.url);
const svgPath = new URL('../public/images/traveller-notes/fictional-workflow.svg', import.meta.url);

test('Traveller Notes card presents a fourth, private project', () => {
  const project = projects.find(({ slug }) => slug === 'traveller-notes');
  assert.equal(project.href, '/projects/traveller-notes/');
  assert.equal(project.image, '/images/traveller-notes/fictional-workflow.svg');
  assert.match(project.summary, /draft notes/i);
  assert.match(project.summary, /private/i);
});

test('Traveller Notes explains source provenance and game-master review in plain language', async () => {
  const page = await fs.readFile(pagePath, 'utf8');
  for (const expected of [
    'This project shows how I can take a huge list of fictional worlds',
    'Why I built it',
    'From world data to draft notes',
    'Handling a large batch',
    'Limits and sources',
    'Imported facts',
    'Lore context',
    'Generated prep notes',
    'A subsector is simply a smaller region of space',
    'Map coordinates support a separate feature',
    'does not pass UWP, trade codes',
    'reviews, edits, and approves',
    'completion time depends on the number of worlds and external services',
    'The file that tracks which worlds have been processed lives only in my private notes workspace',
    'mixed sources and generated fiction',
    'not copied source material or live campaign output',
  ]) assert.ok(page.includes(expected), `missing disclosure: ${expected}`);
  assert.match(page, /travellermap\.com\/doc\/about/);
  assert.match(page, /travellermap\.com\/doc\/api/);
  assert.match(page, /wiki\.travellerrpg\.com/);
  assert.match(page, /<ol className="traveller-stages">/);
  assert.match(page, /<details className="traveller-fields">/);
});

test('the only public Traveller evidence asset is clearly fictional and self-contained', async () => {
  const svg = await fs.readFile(svgPath, 'utf8');
  assert.match(svg, /Imported facts/i);
  assert.match(svg, /Lore context/i);
  assert.match(svg, /Generated prep notes/i);
  assert.match(svg, /fictional/i);
  assert.doesNotMatch(svg, /<script|<foreignObject|<image|(?:href|src)="https?:\/\//i);
  const entries = await fs.readdir(new URL('../public/images/traveller-notes/', import.meta.url));
  assert.deepEqual(entries, ['fictional-workflow.svg']);
});

test('publication privacy guard rejects vault, raw import, state, and extra evidence paths', () => {
  const base = [
    'public/images/traveller-notes/fictional-workflow.svg',
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
    'dist/data/dashboard-v1.json',
    'dist/data/dashboard-v1.schema.json',
  ], 'dist'), []);
});
