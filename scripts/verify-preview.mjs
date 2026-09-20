import { spawn } from 'node:child_process';
import path from 'node:path';

const origin = process.env.VITE_SITE_ORIGIN;
if (!origin) throw new Error('VITE_SITE_ORIGIN is required.');
const port = 4174;
const base = `http://127.0.0.1:${port}`;
const viteBin = path.resolve('node_modules/vite/bin/vite.js');
const child = spawn(process.execPath, [viteBin, 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], { stdio: 'ignore' });

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function waitForServer() {
  for (let index = 0; index < 40; index += 1) {
    try {
      const response = await fetch(base);
      if (response.ok) return;
    } catch { /* server is still starting */ }
    await delay(150);
  }
  throw new Error('production preview did not start');
}

const routes = [
  ['/', 'Alexander Morton | Entry-Level Data Analyst', `${origin}/`],
  ['/projects/online-retail/', 'Online Retail Performance Analysis | Alexander Morton', `${origin}/projects/online-retail/`],
  ['/projects/encounter-factory/', 'Encounter Factory | Alexander Morton', `${origin}/projects/encounter-factory/`],
  ['/projects/character-estate-automation/', 'Character &amp; Estate Automation | Alexander Morton', `${origin}/projects/character-estate-automation/`],
];

try {
  await waitForServer();
  for (const [route, title, canonical] of routes) {
    const response = await fetch(`${base}${route}`);
    const html = await response.text();
    if (!response.ok || !html.includes(`<title>${title}</title>`) || !html.includes(`href="${canonical}"`)) throw new Error(`direct request failed for ${route}`);
  }
  for (const asset of ['/data/dashboard-v1.json', '/data/dashboard-v1.sha256', '/artifacts/online-retail-case-study.xlsx']) {
    const response = await fetch(`${base}${asset}`);
    const bytes = await response.arrayBuffer();
    if (!response.ok || bytes.byteLength === 0) throw new Error(`asset request failed for ${asset}`);
  }
  console.log(`verified ${routes.length} canonical documents and 3 root-absolute evidence assets`);
} finally {
  child.kill();
}
