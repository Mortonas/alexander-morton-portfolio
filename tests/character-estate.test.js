import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import {
  annualUpdateSteps,
  automationSafeguards,
  caseStudyStages,
  characterEstateEvidence,
  interfaceCallouts,
  recordRelationships,
  reliabilityUpgrades,
  systemFlow,
  technicalEvidence,
  validationEvidence,
} from '../src/data/characterEstateEvidence.js';

test('audited workbook metrics and technical evidence reconcile exactly', () => {
  assert.deepEqual(characterEstateEvidence, {
    operationalWorksheets: 10,
    overviewWorksheets: 1,
    formulaCells: 974,
    validationObjects: 17,
    reviewedScripts: 2,
    trackingFormulaCells: 254,
    stableRecordBlocks: 14,
    estateOutcomePairs: 16,
    estateOutcomeMappings: 15,
    landholdingSchedules: 2,
  });
  assert.deepEqual(technicalEvidence.map(({ proof }) => proof), [
    '14 record blocks',
    '254 Tracking formulas',
    '15 of 16 pairs mapped',
    '2 linked schedules',
  ]);
  assert.equal(validationEvidence.length, 4);
});

test('Problem Data Process Outcome cards name records and expose clear skill signals', () => {
  assert.deepEqual(caseStudyStages.map(({ title }) => title), ['Problem', 'Data', 'Process', 'Outcome']);
  const copy = caseStudyStages.map(({ description, signal }) => `${description} ${signal}`).join(' ');
  for (const record of ['character', 'estate', 'landholding', 'resource', 'follower', 'history']) assert.match(copy, new RegExp(record, 'i'));
  for (const signal of ['requirements thinking', 'data modeling', 'calculation lineage', 'reliable recurring workflows']) assert.match(copy, new RegExp(signal, 'i'));
});

test('system flow and relationships preserve the workbook presentation mapping', () => {
  assert.deepEqual(systemFlow.map(({ title }) => title), [
    'Centralized reference data',
    'Validated operational records',
    'Calculation and tracking',
    'Views and controlled posting',
  ]);
  const sources = systemFlow.flatMap(({ sources }) => sources);
  for (const source of ['Lists', 'Front', 'Family & Followers', 'Stable1', 'Estate Landholding1', 'Estate Landholding2', 'Jousting Record', 'Tracking', 'Estate Overview', 'Back', 'code.gs', 'income.gs']) assert.ok(sources.includes(source), `${source} is represented in the presentation mapping`);
  assert.equal(recordRelationships.length, 4);
});

test('page contains seven focused sections and the requested analyst framing', async () => {
  const page = await fs.readFile('src/pages/CharacterEstatePage.jsx', 'utf8');
  const evidence = await fs.readFile('src/components/CharacterEstateEvidence.jsx', 'utf8');
  assert.equal((page.match(/<section\b/g) || []).length, 4);
  assert.equal((evidence.match(/<section\b/g) || []).length, 2);
  assert.match(page, /Problem · Data · Process · Outcome/);
  assert.match(page, /<strong>What this shows<\/strong>/);
  assert.match(page, /Excel or Google Sheets before results are surfaced through SQL or BI dashboards/);
  assert.equal(interfaceCallouts.length, 4);
  assert.match(page, /Front sheet combines the current character record/i);
  assert.match(page, /Comments and embedded artwork are omitted/);
  assert.match(page, /private workbook is not downloadable/);
});

test('technical depth translates formula behavior without claiming a migration', async () => {
  const component = await fs.readFile('src/components/CharacterEstateEvidence.jsx', 'utf8');
  assert.match(component, /lookup patterns map naturally to joins/i);
  assert.match(component, /SQL <code>CASE<\/code> logic or BI calculated columns/);
  assert.match(component, /has not been presented as a SQL or BI implementation/);
  assert.match(technicalEvidence[2].description, /explicitly maps 15 pairs/i);
  assert.match(technicalEvidence[2].description, /uncovered pair is a documented next step/i);
});

test('annual workflow follows reviewed sequence and remains documentation-only', async () => {
  assert.deepEqual(annualUpdateSteps, [
    'Capture landholding values and annual inputs.',
    'Calculate income, obligations, treasury, and resources.',
    'Validate the selected Goods, Libra, or Treasure target.',
    'Advance the stored year and accumulated totals.',
    'Synchronize annual values and post the entered transaction.',
    'Reset the documented entry fields for the next update.',
  ]);
  assert.deepEqual(automationSafeguards, ['Explicit worksheet names', 'Required-sheet errors', 'Numeric normalization', 'Fixed resource-to-target mapping']);
  const page = await fs.readFile('src/pages/CharacterEstatePage.jsx', 'utf8');
  assert.match(page, /does not execute the private scripts/i);
});

test('architecture is semantic and CSS never changes the sequence', async () => {
  const component = await fs.readFile('src/components/CharacterEstateEvidence.jsx', 'utf8');
  const styles = await fs.readFile('src/styles/character-estate.css', 'utf8');
  assert.match(component, /<ol className="system-flow"/);
  assert.match(component, /<li className="system-stage"/);
  assert.match(component, /className="stage-connector" aria-hidden="true"/);
  assert.doesNotMatch(component, /tabIndex/);
  assert.doesNotMatch(styles, /(?:^|[;{])\s*order\s*:/m);
  assert.doesNotMatch(styles, /row-reverse|column-reverse/);
});

test('only Front and Estate Overview workbook derivatives are referenced and public', async () => {
  const page = await fs.readFile('src/pages/CharacterEstatePage.jsx', 'utf8');
  const projects = await fs.readFile('src/data/projects.js', 'utf8');
  const references = [...`${page}\n${projects}`.matchAll(/\/images\/character-estate\/[^"']+/g)].map(([match]) => match).sort();
  assert.deepEqual(references, [
    '/images/character-estate/estate-overview.webp',
    '/images/character-estate/front-sheet.webp',
    '/images/character-estate/front-sheet.webp',
    '/images/character-estate/front-sheet.webp',
    '/images/character-estate/front-sheet.webp',
  ]);
  const files = await fs.readdir('public/images/character-estate');
  assert.deepEqual(files.sort(), ['estate-overview.webp', 'front-sheet.webp']);
  assert.doesNotMatch(`${page}\n${projects}`, /back-sheet|project-overview/i);
});

test('reflection labels reliability upgrades as proposed and preserves limitations', async () => {
  assert.deepEqual(reliabilityUpgrades.map(({ title }) => title), ['Transaction journal and rollback', 'Staging scenarios', 'Tests and lineage documentation']);
  const page = await fs.readFile('src/pages/CharacterEstatePage.jsx', 'utf8');
  assert.match(page, /proposed upgrades, not current capabilities/i);
  assert.match(page, /reliability and auditability/i);
  assert.match(page, /not a runnable spreadsheet demo/i);
  assert.match(page, /not measured business impact, adoption, or time savings/i);
});
