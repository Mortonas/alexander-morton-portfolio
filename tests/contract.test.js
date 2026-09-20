import assert from 'node:assert/strict';
import test from 'node:test';
import { loadDashboard, validateDashboard } from '../src/features/online-retail/loadDashboard.js';

const valid = () => ({ metadata: { contract_version: '1.0.0' }, quality: {}, kpis: {}, monthly: [{}], countries: [{}], products: [{}], customers: {} });

test('accepts contract major version 1', () => assert.equal(validateDashboard(valid()).metadata.contract_version, '1.0.0'));
test('keeps unsupported-contract error observable', () => {
  const data = valid();
  data.metadata.contract_version = '2.0.0';
  assert.throws(() => validateDashboard(data), /Unsupported dashboard contract version: 2\.0\.0/);
});
test('rejects missing fields', () => {
  const data = valid();
  delete data.kpis;
  assert.throws(() => validateDashboard(data), /missing: kpis/);
});
test('rejects empty published arrays', () => {
  const data = valid();
  data.monthly = [];
  assert.throws(() => validateDashboard(data), /monthly data is empty/);
});
test('reports failed requests', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response('', { status: 404 });
  try { await assert.rejects(() => loadDashboard(), /request failed \(404\)/); }
  finally { globalThis.fetch = originalFetch; }
});
test('reports malformed JSON', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response('{broken', { status: 200, headers: { 'content-type': 'application/json' } });
  try { await assert.rejects(() => loadDashboard(), /not valid JSON/); }
  finally { globalThis.fetch = originalFetch; }
});
