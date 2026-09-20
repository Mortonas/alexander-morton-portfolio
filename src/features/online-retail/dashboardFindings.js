export const DERIVATION_RULES = Object.freeze({
  highestCompleteMonth: 'highest_complete_month@1',
  countryNetShareTenthsPct: 'country_net_share_tenths_pct@1',
  customerBandShareTenthsPct: 'customer_band_share_tenths_pct@1',
  customerBandNetShareTenthsPct: 'customer_band_net_share_tenths_pct@1',
  sensitivityDelta: 'sensitivity_delta@1',
});

export function roundHalfUp(numerator, denominator, scale = 1) {
  if (!denominator) return 0;
  const scaled = numerator * scale;
  return Math.floor(scaled / denominator) + (2 * (scaled % denominator) >= denominator ? 1 : 0);
}

export function selectFindings(data) {
  const highestCompleteMonth = data.monthly.filter((row) => row.is_complete_month).reduce((best, row) => !best || row.net_revenue_pence > best.net_revenue_pence ? row : best, null);
  const uk = data.countries.find((row) => row.country === 'United Kingdom');
  const sixPlus = data.customers.frequency_bands.find((row) => row.band === '6+');
  const identifiedNet = data.customers.frequency_bands.reduce((sum, row) => sum + row.net_revenue_pence, 0);
  const sensitivity = data.quality.sensitivity;
  return {
    highestCompleteMonth,
    ukShareTenthsPercent: roundHalfUp(uk.net_revenue_pence, data.kpis.net_revenue_pence, 1000),
    sixPlusCustomerShareTenthsPercent: roundHalfUp(sixPlus.customer_count, data.customers.identified_customers, 1000),
    sixPlusNetShareTenthsPercent: roundHalfUp(sixPlus.net_revenue_pence, identifiedNet, 1000),
    sensitivityDeltaPence: sensitivity.flagged_line_net_revenue_delta_pence,
    sensitivityDeltaBps: sensitivity.flagged_line_net_revenue_delta_bps,
  };
}
