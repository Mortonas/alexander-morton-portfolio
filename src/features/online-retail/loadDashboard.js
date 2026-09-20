const REQUIRED = ['metadata', 'quality', 'kpis', 'monthly', 'countries', 'products', 'customers'];

export function validateDashboard(data) {
  if (!data || typeof data !== 'object') throw new Error('The dashboard response is not an object.');
  const missing = REQUIRED.filter((key) => !(key in data));
  if (missing.length) throw new Error(`Dashboard data is missing: ${missing.join(', ')}.`);
  const major = Number(String(data.metadata?.contract_version || '').split('.')[0]);
  if (major !== 1) throw new Error(`Unsupported dashboard contract version: ${data.metadata?.contract_version || 'unknown'}.`);
  for (const key of ['monthly', 'countries', 'products']) {
    if (!Array.isArray(data[key]) || data[key].length === 0) throw new Error(`${key} data is empty.`);
  }
  return data;
}

export async function loadDashboard(url = '/data/dashboard-v1.json') {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Dashboard request failed (${response.status}).`);
  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error('Dashboard data is not valid JSON.');
  }
  return validateDashboard(data);
}
