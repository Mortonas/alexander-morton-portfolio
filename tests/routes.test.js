import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import { projects } from '../src/data/projects.js';

const entries = [
  ['index.html', 'home', '/'],
  ['projects/online-retail/index.html', 'online-retail', '/projects/online-retail/'],
  ['projects/encounter-factory/index.html', 'encounter-factory', '/projects/encounter-factory/'],
  ['projects/character-estate-automation/index.html', 'character-estate', '/projects/character-estate-automation/'],
  ['projects/traveller-notes/index.html', 'traveller-notes', '/projects/traveller-notes/'],
];

for (const [file, page, canonical] of entries) {
  test(`${file} owns metadata for ${page}`, async () => {
    const html = await fs.readFile(file, 'utf8');
    assert.match(html, new RegExp(`data-page="${page}"`));
    assert.match(html, new RegExp(`rel="canonical" href="%VITE_SITE_ORIGIN%${canonical.replaceAll('/', '\\/')}"`));
    assert.match(html, /property="og:title"/);
    assert.match(html, /property="og:image"/);
    assert.match(html, /name="twitter:card"/);
  });
}

test('project registry provides stable clean routes', () => {
  assert.deepEqual(projects.map(({ href }) => href), [
    '/projects/online-retail/',
    '/projects/encounter-factory/',
    '/projects/character-estate-automation/',
    '/projects/traveller-notes/',
  ]);
});

test('project registry describes each project by its actual type', async () => {
  const encounter = projects.find(({ slug }) => slug === 'encounter-factory');
  assert.equal(encounter.label, 'Engineering case study');
  assert.equal(encounter.linkLabel, 'View Encounter Factory case study');
  assert.match(encounter.summary, /building a D&D tool/i);
  assert.equal(encounter.image, '/images/encounter-factory/briefing-intake.png');
  await fs.access('public/images/encounter-factory/briefing-intake.png');

  const characterEstate = projects.find(({ slug }) => slug === 'character-estate-automation');
  assert.equal(characterEstate.label, 'Estate management spreadsheet');
  assert.equal(characterEstate.linkLabel, 'View Character & Estate case study');
  assert.match(characterEstate.summary, /two property schedules feed one combined estate view/i);
  assert.equal(characterEstate.sourceDownloadUrl, null);
  assert.equal(characterEstate.demoUrl, 'https://docs.google.com/spreadsheets/d/1ccwO0CRXp3GgIX9eK9knxABlp-jBSh0P1N40G5VaaWo/edit?usp=sharing');
  assert.equal(characterEstate.demoLinkLabel, 'Try the workbook in Google Sheets');
  for (const project of projects.filter(({ repositoryUrl }) => repositoryUrl)) {
    assert.match(project.sourceDownloadUrl, new RegExp(`${project.repositoryUrl}/archive/refs/heads/main\\.zip`));
  }
  assert.equal(projects.filter(({ sourceDownloadUrl }) => sourceDownloadUrl).length, 3);
  assert.ok(projects.every(({ sourceDownloadUrl, downloadNote, demoUrl }) => sourceDownloadUrl || downloadNote || demoUrl));
  assert.equal(projects[0].label, 'Data analysis project');
  assert.equal(projects[0].image, '/images/online-retail/monthly-revenue-chart.svg');
  await fs.access('public/images/online-retail/monthly-revenue-chart.svg');
});

test('Netlify config has no global home-page fallback', async () => {
  const config = await fs.readFile('netlify.toml', 'utf8');
  assert.doesNotMatch(config, /from\s*=\s*"\/\*"[\s\S]*to\s*=\s*"\/index\.html"/);
  assert.match(config, /pretty_urls\s*=\s*true/);
  for (const slug of ['online-retail', 'encounter-factory', 'character-estate-automation', 'traveller-notes']) {
    assert.match(config, new RegExp(`/projects/${slug}\\.html`));
    assert.match(config, new RegExp(`/projects/${slug}/index\\.html`));
  }
});

test('dashboard errors cannot mount dashboard content', async () => {
  const page = await fs.readFile('src/pages/OnlineRetailPage.jsx', 'utf8');
  assert.match(page, /state\.status === 'error'/);
  assert.match(page, /state\.status === 'ready' && <DashboardContent/);
  assert.match(page, /role="alert"/);
  assert.match(page, /Try again/);
});

test('Encounter Factory ends with a clearly qualified existing HTML export', async () => {
  const page = await fs.readFile('src/pages/EncounterFactoryPage.jsx', 'utf8');
  assert.match(page, /Existing HTML export · work in progress/);
  assert.match(page, /The Sanctum of Shadows/);
  assert.match(page, /fictional export is from an unfinished system/);
  assert.match(page, /examples\/encounter-factory\/the-sanctum-of-shadows\.html/);

  const output = await fs.readFile('public/examples/encounter-factory/the-sanctum-of-shadows.html', 'utf8');
  assert.match(output, /Work-in-progress Encounter Factory export/);
  assert.match(output, /Encounter Analysis/);
  assert.match(output, /Stat Blocks/);
  assert.doesNotMatch(output, /fonts\.googleapis\.com/);
  assert.doesNotMatch(output, /<script/i);
  assert.doesNotMatch(output, /<form/i);
});

test('Encounter Factory exposes descriptive employer evidence links', async () => {
  const page = await fs.readFile('src/pages/EncounterFactoryPage.jsx', 'utf8');
  assert.match(page, />View Encounter Factory repository/);
  assert.match(page, />Read the project README/);
  assert.match(page, />Read the architecture overview/);
  assert.match(page, />View the generated encounter document/);
  assert.match(page, /unfinished system/i);
  assert.match(page, /Work in progress/);
});
