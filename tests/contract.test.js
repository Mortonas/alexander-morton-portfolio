import assert from 'node:assert/strict';
import { Buffer } from 'node:buffer';
import { readFile } from 'node:fs/promises';
import { createHash, webcrypto } from 'node:crypto';
import test from 'node:test';
import { loadDashboard, validateDashboard } from '../src/features/online-retail/loadDashboard.js';
import { DERIVATION_RULES, selectFindings } from '../src/features/online-retail/dashboardFindings.js';

if (!globalThis.crypto) globalThis.crypto = webcrypto;
const root = new URL('../', import.meta.url);
const schema = JSON.parse(await readFile(new URL('public/data/dashboard-v1.schema.json', root), 'utf8'));
const current = JSON.parse(await readFile(new URL('public/data/dashboard-v1.json', root), 'utf8'));

test('accepts complete contract 1.1 and derives reviewed findings', () => {
  assert.equal(validateDashboard(structuredClone(current), schema).metadata.contract_version, '1.1.0');
  const findings = selectFindings(current);
  assert.equal(findings.highestCompleteMonth.month, '2011-11');
  assert.equal(findings.highestCompleteMonth.net_revenue_pence, 145614580);
  assert.equal(findings.ukShareTenthsPercent, 840);
  assert.equal(findings.sixPlusCustomerShareTenthsPercent, 201);
  assert.equal(findings.sixPlusNetShareTenthsPercent, 686);
  assert.equal(findings.sensitivityDeltaPence, 29872477);
  assert.equal(findings.sensitivityDeltaBps, 306);
  assert.deepEqual(Object.values(DERIVATION_RULES), ['highest_complete_month@1','country_net_share_tenths_pct@1','customer_band_share_tenths_pct@1','customer_band_net_share_tenths_pct@1','sensitivity_delta@1']);
});

test('accepts legacy contract 1.0 without additive fields', async () => {
  const legacy = JSON.parse(await readFile(new URL('../Chart example/tests/fixtures/v1.0/dashboard-v1.json', root), 'utf8').catch(async () =>
    readFile('C:/Projects/Chart example/tests/fixtures/v1.0/dashboard-v1.json', 'utf8')));
  assert.equal(validateDashboard(legacy, schema).metadata.contract_version, '1.0.0');
});

test('rejects unsupported major before schema validation', () => {
  const data = { metadata: { contract_version: '2.0.0' } };
  assert.throws(() => validateDashboard(data, schema), /Unsupported dashboard contract version: 2\.0\.0/);
});

test('rejects missing 1.1 additions and monthly flags', () => {
  const missingProducts = structuredClone(current); delete missingProducts.merchandise_products;
  assert.throws(() => validateDashboard(missingProducts, schema), /missing merchandise_products/);
  const missingFlag = structuredClone(current); delete missingFlag.monthly[0].is_complete_month;
  assert.throws(() => validateDashboard(missingFlag, schema), /is_complete_month/);
  const badDate = structuredClone(current); badDate.metadata.period_end = '2011-02-30';
  assert.throws(() => validateDashboard(badDate, schema), /format/);
});

test('rejects ordering and reconciliation failures', () => {
  const unordered = structuredClone(current); unordered.monthly.reverse();
  assert.throws(() => validateDashboard(unordered, schema), /canonical order/);
  const falseGate = structuredClone(current); falseGate.quality.reconciliation.python_sql_kpis = false;
  assert.throws(() => validateDashboard(falseGate, schema), /did not all pass/);
});

test('verifies exact bytes before parsing', async () => {
  const bytes = await readFile(new URL('public/data/dashboard-v1.json', root));
  const checksum = await readFile(new URL('public/data/dashboard-v1.sha256', root), 'utf8');
  const schemaText = JSON.stringify(schema);
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    if (String(url).includes('sha256')) return new Response(checksum);
    if (String(url).includes('schema')) return new Response(schemaText);
    return new Response(bytes);
  };
  try { assert.equal((await loadDashboard()).metadata.contract_version, '1.1.0'); }
  finally { globalThis.fetch = originalFetch; }
});

test('rejects checksum, network, and malformed JSON failures', async () => {
  const bytes = await readFile(new URL('public/data/dashboard-v1.json', root));
  const schemaText = JSON.stringify(schema);
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => String(url).includes('sha256') ? new Response('0'.repeat(64)) : String(url).includes('schema') ? new Response(schemaText) : new Response(bytes);
  await assert.rejects(() => loadDashboard(), /checksum verification failed/);
  globalThis.fetch = async () => new Response('', { status: 404 });
  await assert.rejects(() => loadDashboard(), /request failed \(404\)/);
  const malformed = Buffer.from('{broken');
  const malformedHash = createHash('sha256').update(malformed).digest('hex');
  globalThis.fetch = async (url) => String(url).includes('sha256') ? new Response(malformedHash) : String(url).includes('schema') ? new Response(schemaText) : new Response(malformed);
  await assert.rejects(() => loadDashboard(), /not valid UTF-8 JSON/);
  globalThis.fetch = originalFetch;
});
