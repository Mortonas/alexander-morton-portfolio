import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

export const DASHBOARD_URL = '/data/dashboard-v1.json';
export const CHECKSUM_URL = '/data/dashboard-v1.sha256';
export const SCHEMA_URL = '/data/dashboard-v1.schema.json';
const CATEGORY_ORDER = ['merchandise', 'fulfilment_service', 'adjustment_fee', 'voucher'];

function unsupportedVersion(data) {
  const version = data?.metadata?.contract_version || 'unknown';
  if (Number(String(version).split('.')[0]) !== 1) throw new Error(`Unsupported dashboard contract version: ${version}.`);
}

function validationMessage(errors = []) {
  return errors.slice(0, 4).map((error) => {
    const path = error.instancePath || '$';
    if (error.keyword === 'required') return `${path}: missing ${error.params.missingProperty}`;
    return `${path}: ${error.message || error.keyword}`;
  }).join('; ');
}

function assertSemantics(data) {
  const months = data.monthly.map((row) => row.month);
  if (months.some((month, index) => index && month <= months[index - 1])) throw new Error('Dashboard monthly data is not in canonical order.');
  if (data.countries.some((row, index) => row.rank !== index + 1)) throw new Error('Dashboard country ranks are not canonical.');
  if (data.products.some((row, index) => row.rank !== index + 1)) throw new Error('Dashboard product ranks are not canonical.');
  if (Object.values(data.quality.reconciliation).some((value) => value !== true)) throw new Error('Dashboard reconciliation checks did not all pass.');
  if (data.metadata.contract_version !== '1.1.0') return;
  if (data.merchandise_products.some((row, index) => row.rank !== index + 1)) throw new Error('Dashboard merchandise ranks are not canonical.');
  if (data.product_categories.map((row) => row.category).join('|') !== CATEGORY_ORDER.join('|')) throw new Error('Dashboard product categories are not in canonical order.');
  const totals = data.product_categories.reduce((sum, row) => ({ gross: sum.gross + row.gross_sales_pence, cancellation: sum.cancellation + row.cancellation_value_pence, net: sum.net + row.net_revenue_pence }), { gross: 0, cancellation: 0, net: 0 });
  if (totals.gross !== data.kpis.gross_sales_pence || totals.cancellation !== data.kpis.cancellation_value_pence || totals.net !== data.kpis.net_revenue_pence) throw new Error('Dashboard product categories do not reconcile to the published KPIs.');
  const sensitivity = data.quality.sensitivity;
  if (sensitivity.reported_net_revenue_pence - sensitivity.net_revenue_excluding_flagged_pence !== sensitivity.flagged_line_net_revenue_delta_pence) throw new Error('Dashboard sensitivity values do not reconcile.');
}

export function validateDashboard(data, schema) {
  unsupportedVersion(data);
  const ajv = new Ajv2020({ allErrors: true, strict: true, strictRequired: false });
  addFormats(ajv, ['date']);
  let validate;
  try { validate = ajv.compile(schema); }
  catch { throw new Error('Dashboard contract schema could not be compiled.'); }
  if (!validate(data)) throw new Error(`Dashboard contract validation failed: ${validationMessage(validate.errors)}.`);
  assertSemantics(data);
  return data;
}

async function requireResponse(response, label) {
  if (!response.ok) throw new Error(`${label} request failed (${response.status}).`);
  return response;
}

export async function loadDashboard({ dataUrl = DASHBOARD_URL, checksumUrl = CHECKSUM_URL, schemaUrl = SCHEMA_URL } = {}) {
  const [dataResponse, checksumResponse, schemaResponse] = await Promise.all([
    fetch(dataUrl).then((response) => requireResponse(response, 'Dashboard')),
    fetch(checksumUrl).then((response) => requireResponse(response, 'Checksum')),
    fetch(schemaUrl).then((response) => requireResponse(response, 'Schema')),
  ]);
  const [dataBytes, checksumText, schemaText] = await Promise.all([dataResponse.arrayBuffer(), checksumResponse.text(), schemaResponse.text()]);
  const checksumMatch = checksumText.trim().match(/^([a-f0-9]{64})(?:\s+dashboard-v1\.json)?$/i);
  if (!checksumMatch) throw new Error('Dashboard checksum file is invalid.');
  const digest = Array.from(new Uint8Array(await globalThis.crypto.subtle.digest('SHA-256', dataBytes))).map((byte) => byte.toString(16).padStart(2, '0')).join('');
  if (digest !== checksumMatch[1].toLowerCase()) throw new Error('Dashboard checksum verification failed.');
  let data;
  try { data = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(dataBytes)); }
  catch { throw new Error('Dashboard data is not valid UTF-8 JSON.'); }
  unsupportedVersion(data);
  let schema;
  try { schema = JSON.parse(schemaText); }
  catch { throw new Error('Dashboard contract schema is not valid JSON.'); }
  return validateDashboard(data, schema);
}
