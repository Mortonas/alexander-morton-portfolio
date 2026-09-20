import fs from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';

const origin = process.env.VITE_SITE_ORIGIN;
if (!origin) throw new Error('VITE_SITE_ORIGIN is required.');

const routes = [
  ['index.html', 'Alexander Morton | Entry-Level Data Analyst', `${origin}/`, 'home'],
  ['projects/online-retail/index.html', 'Online Retail Performance Analysis | Alexander Morton', `${origin}/projects/online-retail/`, 'online-retail'],
  ['projects/encounter-factory/index.html', 'Encounter Factory | Alexander Morton', `${origin}/projects/encounter-factory/`, 'encounter-factory'],
  ['projects/character-estate-automation/index.html', 'Character &amp; Estate Automation | Alexander Morton', `${origin}/projects/character-estate-automation/`, 'character-estate'],
];

for (const [relative, title, canonical, page] of routes) {
  const html = await fs.readFile(path.join('dist', relative), 'utf8');
  if (!html.includes(`<title>${title}</title>`)) throw new Error(`${relative} has the wrong title`);
  if (!html.includes(`rel="canonical" href="${canonical}"`)) throw new Error(`${relative} has the wrong canonical URL`);
  if (!html.includes(`property="og:url" content="${canonical}"`)) throw new Error(`${relative} has the wrong Open Graph URL`);
  if (!html.includes(`data-page="${page}"`)) throw new Error(`${relative} has the wrong page identifier`);
}

await fs.access(path.join('dist', '404.html'));

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const target = path.join(directory, entry.name);
    files.push(...(entry.isDirectory() ? await walk(target) : [target]));
  }
  return files;
}

const files = await walk('dist');
const normalized = files.map((file) => file.replaceAll('\\', '/'));
const allowedWorkbook = 'dist/artifacts/online-retail-case-study.xlsx';
for (const file of normalized) {
  const lower = file.toLowerCase();
  if (lower.includes('ultimate_character')) throw new Error(`private source name reached build: ${file}`);
  if (/\.(zip|gs|xlsm)$/.test(lower)) throw new Error(`private source type reached build: ${file}`);
  if (lower.endsWith('.xlsx') && file !== allowedWorkbook) throw new Error(`unapproved workbook reached build: ${file}`);
  if (lower.includes('release-audit') || lower.includes('evidence-map')) throw new Error(`internal evidence file reached build: ${file}`);
}

const approvedCharacterImages = [
  'dist/images/character-estate/estate-overview.webp',
  'dist/images/character-estate/front-sheet.webp',
];
const builtCharacterImages = normalized.filter((file) => file.startsWith('dist/images/character-estate/')).sort();
if (JSON.stringify(builtCharacterImages) !== JSON.stringify([...approvedCharacterImages].sort())) {
  throw new Error(`unapproved character workbook image set: ${builtCharacterImages.join(', ')}`);
}
for (const image of approvedCharacterImages) {
  const bytes = await fs.readFile(image);
  if (bytes.includes(Buffer.from('EXIF')) || bytes.includes(Buffer.from('XMP '))) throw new Error(`metadata chunk found in ${image}`);
}

const encounterExportPath = 'dist/examples/encounter-factory/the-sanctum-of-shadows.html';
const encounterExport = await fs.readFile(encounterExportPath, 'utf8');
for (const prohibited of [
  /fonts\.googleapis\.com/i,
  /<script/i,
  /<form/i,
  /mailto:/i,
  /discord/i,
  /api[_ -]?key/i,
  /password/i,
  /bearer\s/i,
]) {
  if (prohibited.test(encounterExport)) throw new Error(`unsafe content reached ${encounterExportPath}: ${prohibited}`);
}
if (!encounterExport.includes('Work-in-progress Encounter Factory export')) {
  throw new Error(`${encounterExportPath} is missing its work-in-progress disclosure`);
}

const manifest = JSON.parse(await fs.readFile('dist/.vite/manifest.json', 'utf8'));
const selected = new Set();
function addChunk(key) {
  if (!key || selected.has(key)) return;
  const chunk = manifest[key];
  if (!chunk) return;
  selected.add(key);
  for (const imported of chunk.imports || []) addChunk(imported);
}
addChunk('index.html');
addChunk('src/pages/HomePage.jsx');
let actualGzipBytes = 0;
for (const key of selected) {
  const file = manifest[key].file;
  if (file?.endsWith('.js')) actualGzipBytes += gzipSync(await fs.readFile(path.join('dist', file))).length;
}
if (actualGzipBytes >= 175 * 1024) throw new Error(`home JavaScript is ${actualGzipBytes} gzip bytes`);

const homeFiles = [...selected].map((key) => manifest[key].file).filter(Boolean);
for (const file of homeFiles) {
  const contents = await fs.readFile(path.join('dist', file), 'utf8');
  if (contents.includes('chart.js/auto') || contents.includes('CategoryScale')) throw new Error('Chart.js entered the home bundle');
}

console.log(JSON.stringify({ routes: routes.length, files: files.length, homeGzipBytes: actualGzipBytes, encounterExportVerified: true }, null, 2));
