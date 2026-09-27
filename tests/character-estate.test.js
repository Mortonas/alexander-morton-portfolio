import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import {
  annualUpdate,
  calculationLineage,
  characterEstateEvidence,
  dataOrigins,
  estateFlow,
  inputControls,
  knownLimits,
  proposedImprovements,
  supportingMetrics,
} from '../src/data/characterEstateEvidence.js';
import { projects } from '../src/data/projects.js';

test('estate evidence keeps audited metrics in a supporting role', () => {
  assert.deepEqual(characterEstateEvidence, {
    operationalWorksheets: 10,
    overviewWorksheets: 1,
    formulaCells: 974,
    validationObjects: 17,
    reviewedScripts: 2,
    landholdingSchedules: 2,
  });
  assert.deepEqual(supportingMetrics, ['974 formula cells', '17 validation objects', '2 reviewed scripts']);
});

test('estate flow explains property records through downstream views in source order', async () => {
  assert.deepEqual(estateFlow.map(({ title }) => title), [
    'Property records',
    'Property calculations',
    'Estate consolidation',
    'Annual update',
    'Resource and character views',
  ]);
  const page = await fs.readFile('src/components/CharacterEstateEvidence.jsx', 'utf8');
  assert.match(page, /<ol className="estate-flow"/);
  assert.match(page, /directly held and vassal values stay in separate columns/i);
  assert.match(page, /does not implement a separate automated reconciliation check/i);
  assert.match(page, /miscellaneous income and additional expenses can be entered at estate level/i);
});

test('calculation lineage shows property inputs flowing into calculated and consolidated results', () => {
  const copy = calculationLineage.flatMap(({ title, steps }) => [title, ...steps]).join(' ');
  for (const concept of ['improvement income', 'maintenance', 'free income', 'assumed expenses', 'annual result', 'two schedules', 'fortification values', 'estate-glory summary']) {
    assert.match(copy, new RegExp(concept, 'i'));
  }
});

test('data origins and input controls distinguish entry, reference, calculation, and script changes', async () => {
  assert.deepEqual(dataOrigins.map(({ label }) => label), ['User-entered', 'Reference', 'Calculated', 'Script-written']);
  assert.equal(inputControls.length, 3);
  const content = JSON.stringify([...dataOrigins, ...inputControls]);
  for (const term of ['customary revenue', 'lookup lists', 'formula totals', 'Apps Script', 'Success', 'Goods', 'Treasure', 'Libra']) {
    assert.match(content, new RegExp(term, 'i'));
  }
  const page = await fs.readFile('src/pages/CharacterEstatePage.jsx', 'utf8');
  assert.match(page, /do not validate every numeric value/i);
});

test('annual script wording separates reads, changes, resets, and the separate income function', async () => {
  assert.match(annualUpdate.reads, /transaction amount.*selected resource/i);
  assert.equal(annualUpdate.changes.length, 3);
  assert.match(annualUpdate.changes.join(' '), /advances the year/i);
  assert.match(annualUpdate.changes.join(' '), /subtracts the entered amount/i);
  assert.match(annualUpdate.clears, /additional income and expense entries/i);
  assert.match(annualUpdate.separateFunction, /separate income function/i);
  const page = await fs.readFile('src/pages/CharacterEstatePage.jsx', 'utf8');
  assert.match(page, /does not execute it/i);
});

test('script limitations and proposed reliability work are stated without claiming features exist', () => {
  const content = [...knownLimits, ...proposedImprovements.map(({ title, description }) => `${title} ${description}`)].join(' ');
  for (const term of ['resource value is unexpected', 'rollback', 'transaction journal', 'same cell', 'maps 15']) assert.match(content, new RegExp(term, 'i'));
  assert.match(proposedImprovements.map(({ description }) => description).join(' '), /proposed|add a documented way|separate/i);
});

test('page puts estate evidence before the optional Front character context', async () => {
  const page = await fs.readFile('src/pages/CharacterEstatePage.jsx', 'utf8');
  assert.ok(page.indexOf('estate-visual-evidence') < page.indexOf('annual-process-section'));
  assert.ok(page.indexOf('estate-visual-evidence') < page.indexOf('character-context'));
  assert.match(page, /How the estate connects to the character sheet/);
  assert.match(page, /supporting context, not the focus/i);
  assert.match(page, /This project demonstrates structured multi-record data modeling, calculation lineage, controlled data entry, consolidation, reconciliation, and automation of a recurring update process/);
});

test('home card uses the estate view as an uncropped project preview', async () => {
  const project = projects.find(({ slug }) => slug === 'character-estate-automation');
  assert.equal(project.image, '/images/character-estate/estate-overview.webp');
  assert.equal(project.imageFit, 'contain');
  assert.match(project.summary, /two property schedules feed one combined estate view/i);
  const card = await fs.readFile('src/components/ProjectCard.jsx', 'utf8');
  assert.match(card, /objectFit: project.imageFit/);
});

test('only the reviewed and explicitly provisional workbook image set is referenced and present', async () => {
  const page = await fs.readFile('src/pages/CharacterEstatePage.jsx', 'utf8');
  const projectCard = await fs.readFile('src/data/projects.js', 'utf8');
  const references = [...new Set([...`${page}\n${projectCard}`.matchAll(/\/images\/character-estate\/[^"']+/g)].map(([match]) => match))].sort();
  assert.deepEqual(references, [
    '/images/character-estate/estate-overview-full.webp',
    '/images/character-estate/estate-overview.webp',
    '/images/character-estate/front-sheet.webp',
    '/images/character-estate/landholding-finances.webp',
    '/images/character-estate/landholding-improvements.webp',
  ]);
  const files = await fs.readdir('public/images/character-estate');
  assert.deepEqual(files.sort(), ['estate-overview-full.webp', 'estate-overview.webp', 'front-sheet.webp', 'landholding-finances.webp', 'landholding-improvements.webp']);
  for (const file of files) assert.match(file, /\.webp$/);
  assert.doesNotMatch(`${page}\n${projectCard}`, /back-sheet|project-overview/i);
});

test('screenshots have text alternatives and the content remains clear without them', async () => {
  const page = await fs.readFile('src/pages/CharacterEstatePage.jsx', 'utf8');
  for (const alt of ['improvement year, building or benefit, glory, income, and maintenance', 'directly held and vassal customary revenue', 'estate overview finance area consolidating customary revenue']) assert.match(page, new RegExp(alt, 'i'));
  assert.match(page, /blank or zero example entries/i);
  assert.match(page, /The script applies a sequence of updates across named sheets/);
  assert.match(page, /Full Estate Overview worksheet/);
  assert.match(page, /Open full-size worksheet image/);
  assert.match(page, /full Estate Overview worksheet showing land details/i);
});

test('project pages surface source downloads and link the estate workbook demo prominently', async () => {
  const hero = await fs.readFile('src/components/ProjectHero.jsx', 'utf8');
  const card = await fs.readFile('src/components/ProjectCard.jsx', 'utf8');
  const characterPage = await fs.readFile('src/pages/CharacterEstatePage.jsx', 'utf8');
  assert.match(hero, /downloads\.map/);
  assert.match(hero, /downloadNote/);
  assert.match(card, /project-card-download/);
  assert.match(characterPage, /Try the workbook in Google Sheets/);
  assert.match(characterPage, /selected cells have comments with extra detail/i);
  assert.match(characterPage, /Make your own copy before testing changes/i);
  assert.match(hero, /item\.external \? <ExternalLink/);
  assert.match(card, /project\.demoUrl/);
  for (const [file, label] of [
    ['src/pages/OnlineRetailPage.jsx', 'Download source ZIP'],
    ['src/pages/EncounterFactoryPage.jsx', 'Download source ZIP'],
    ['src/pages/TravellerNotesPage.jsx', 'Download public code showcase ZIP'],
  ]) assert.match(await fs.readFile(file, 'utf8'), new RegExp(label));
});

test('responsive flow preserves DOM order and visible focus remains available', async () => {
  const component = await fs.readFile('src/components/CharacterEstateEvidence.jsx', 'utf8');
  const styles = await fs.readFile('src/styles/character-estate.css', 'utf8');
  assert.match(component, /<ol className="estate-flow"/);
  assert.match(component, /<li key=\{stage.title\}/);
  assert.doesNotMatch(styles, /(?:^|[;{])\s*order\s*:/m);
  assert.doesNotMatch(styles, /row-reverse|column-reverse/);
});

test('image alt text and source captions do not imply populated results or an automated reconciliation gate', async () => {
  const page = await fs.readFile('src/pages/CharacterEstatePage.jsx', 'utf8');
  assert.match(page, /blank or zero example entries/);
  assert.match(page, /This is a comparison view, not an automated reconciliation check/);
  assert.match(page, /The workbook does not run an automated reconciliation control/);
  assert.match(page, /not reports of known data loss or failed updates/);
});
