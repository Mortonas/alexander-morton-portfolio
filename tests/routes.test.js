import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import { projects } from '../src/data/projects.js';

const entries = [
  ['index.html', 'home', '/'],
  ['projects/online-retail/index.html', 'online-retail', '/projects/online-retail/'],
  ['projects/encounter-factory/index.html', 'encounter-factory', '/projects/encounter-factory/'],
  ['projects/character-estate-automation/index.html', 'character-estate', '/projects/character-estate-automation/'],
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
  ]);
});

test('Netlify config has no global home-page fallback', async () => {
  const config = await fs.readFile('netlify.toml', 'utf8');
  assert.doesNotMatch(config, /from\s*=\s*"\/\*"[\s\S]*to\s*=\s*"\/index\.html"/);
  assert.match(config, /pretty_urls\s*=\s*true/);
  for (const slug of ['online-retail', 'encounter-factory', 'character-estate-automation']) {
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
