import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import {
  analystSkills,
  annualUpdateSteps,
  characterEstateEvidence,
  formulaCountsBySheet,
  futureImprovements,
  validationExamples,
  workbookLayers,
  workbookRelationships,
} from '../src/data/characterEstateEvidence.js';

const expectedFormulaCounts = [
  ['Front', 53],
  ['Back', 52],
  ['Estate Overview', 27],
  ['Family & Followers', 56],
  ['Stable1', 462],
  ['Estate Landholding1', 24],
  ['Estate Landholding2', 25],
  ['Jousting Record', 2],
  ['Tracking', 254],
  ['Lists', 19],
  ['Project Overview', 0],
];

test('audited workbook metrics and per-sheet formula counts reconcile exactly', () => {
  assert.deepEqual(characterEstateEvidence, {
    operationalWorksheets: 10,
    overviewWorksheets: 1,
    formulaCells: 974,
    validationObjects: 17,
    reviewedScripts: 2,
  });
  assert.deepEqual(formulaCountsBySheet.map(({ sheet, count }) => [sheet, count]), expectedFormulaCounts);
  assert.equal(formulaCountsBySheet.reduce((total, { count }) => total + count, 0), 974);
});

test('presentation layers preserve the audited workbook structure', () => {
  assert.deepEqual(workbookLayers.map(({ title }) => title), [
    'Reference data',
    'Entry and records',
    'Calculation and tracking',
    'User-facing views',
    'Controlled automation',
  ]);
  const sources = workbookLayers.flatMap(({ sheets }) => sheets);
  for (const source of [...expectedFormulaCounts.map(([sheet]) => sheet).filter((sheet) => sheet !== 'Project Overview'), 'code.gs', 'income.gs']) {
    assert.ok(sources.includes(source), `${source} is represented in the presentation mapping`);
  }
  assert.equal(workbookRelationships.length, 5);
});

test('case-study copy includes the requested analyst framing and evidence caveats', async () => {
  const page = await fs.readFile('src/pages/CharacterEstatePage.jsx', 'utf8');
  for (const heading of ['Problem', 'Data and structure', 'Approach', 'Outcome']) assert.match(page, new RegExp(`title: '${heading}'`));
  assert.deepEqual(analystSkills.map(({ title }) => title), [
    'Spreadsheet data modeling',
    'Validation design',
    'Controlled automation',
    'Calculation lineage',
  ]);
  assert.equal(validationExamples.length, 4);
  assert.match(page, /17 validation objects/);
  assert.match(page, /not the number of covered cells/i);
  assert.match(page, /What I would improve next/);
  assert.match(page, /proposed improvements, not current capabilities/i);
  assert.equal(futureImprovements.length, 5);
});

test('annual update wording follows the reviewed sequence and remains documentation-only', async () => {
  assert.deepEqual(annualUpdateSteps, [
    'Advance the stored year and accumulated total.',
    'Synchronize the calculated annual estate value.',
    'Update the tracked annual balance.',
    'Apply the entered transaction to the selected Goods, Libra, or Treasure resource.',
    'Reset the documented entry fields for the next update.',
  ]);
  const page = await fs.readFile('src/pages/CharacterEstatePage.jsx', 'utf8');
  assert.match(page, /does not execute the private scripts/i);
  assert.match(page, /Explicit worksheet names, required-sheet errors, numeric normalization, and a fixed resource-to-target map/);
  assert.match(page, /do not publish a transaction journal or rollback workflow/i);
});

test('system diagram and formula chart expose semantics without changing sequence', async () => {
  const component = await fs.readFile('src/components/CharacterEstateEvidence.jsx', 'utf8');
  const styles = await fs.readFile('src/styles/character-estate.css', 'utf8');
  assert.match(component, /<ol className="workbook-layer-list"/);
  assert.match(component, /<li className="workbook-layer"/);
  assert.match(component, /className="layer-connector" aria-hidden="true"/);
  assert.match(component, /className="formula-bar-track" aria-hidden="true"/);
  assert.doesNotMatch(component, /tabIndex/);
  assert.doesNotMatch(styles, /(?:^|[;{])\s*order\s*:/m);
  assert.doesNotMatch(styles, /row-reverse|column-reverse/);
});

test('only the two approved workbook derivatives are referenced and public', async () => {
  const page = await fs.readFile('src/pages/CharacterEstatePage.jsx', 'utf8');
  const evidence = await fs.readFile('src/components/CharacterEstateEvidence.jsx', 'utf8');
  const references = [...`${page}\n${evidence}`.matchAll(/\/images\/character-estate\/[^"']+/g)].map(([match]) => match).sort();
  assert.deepEqual(references, [
    '/images/character-estate/estate-overview.webp',
    '/images/character-estate/project-overview.webp',
  ]);
  const files = await fs.readdir('public/images/character-estate');
  assert.deepEqual(files.sort(), ['estate-overview.webp', 'project-overview.webp']);
});
