export const characterEstateEvidence = {
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
};

export const caseStudyStages = [
  {
    title: 'Problem',
    description: 'Character, estate, landholding, resource, follower, and history records must stay consistent across several working views. Manual updates can leave balances mismatched or history incomplete.',
    signal: 'Requirements thinking and recognition of operational risk.',
  },
  {
    title: 'Data',
    description: 'Reference lists and controlled inputs feed character, family and follower, stable, landholding, jousting, resource, and historical records.',
    signal: 'Data modeling and organization of related record types.',
  },
  {
    title: 'Process',
    description: 'Formulas and lookup rules consolidate records into Tracking, Estate Overview, Front, and Back; reviewed scripts handle the annual posting sequence.',
    signal: 'Calculation lineage, validation design, and controlled automation.',
  },
  {
    title: 'Outcome',
    description: 'Linked working views, traceable calculations, structured history, and a repeatable annual update process.',
    signal: 'Design for reliable recurring workflows.',
  },
];

export const interfaceCallouts = [
  {
    title: 'Controlled inputs',
    description: 'List-backed and numeric controls constrain selected fields before dependent calculations use them.',
  },
  {
    title: 'Calculated characteristics',
    description: 'Formula-driven attributes and skills turn stored inputs and reference values into usable results.',
  },
  {
    title: 'Linked operational records',
    description: 'Equipment and stable records flow into the main working view without being manually re-entered there.',
  },
  {
    title: 'Current status in one view',
    description: 'Resources, condition, combat values, and equipment remain visible beside the character record.',
  },
];

export const systemFlow = [
  {
    title: 'Centralized reference data',
    purpose: 'Reusable categories and lookup values constrain inputs and support calculations.',
    sources: ['Lists'],
  },
  {
    title: 'Validated operational records',
    purpose: 'Users capture character, follower, stable, landholding, jousting, and resource information.',
    sources: ['Front', 'Family & Followers', 'Stable1', 'Estate Landholding1', 'Estate Landholding2', 'Jousting Record'],
  },
  {
    title: 'Calculation and tracking',
    purpose: 'Rules, lookups, rollups, and historical calculations turn operational records into derived values.',
    sources: ['Tracking', 'Estate Overview'],
  },
  {
    title: 'Views and controlled posting',
    purpose: 'Working views present current and historical results while reviewed scripts post annual updates.',
    sources: ['Front', 'Back', 'code.gs', 'income.gs'],
  },
];

export const recordRelationships = [
  '`Lists` constrains operational inputs and supplies reusable lookup values.',
  '`Estate Landholding1` and `Estate Landholding2` feed revenue and expense values into `Estate Overview`.',
  'Character, follower, stable, and jousting records feed `Tracking` and the user-facing workbook views.',
  'Calculated annual values feed the controlled posting workflow and historical totals.',
];

export const technicalEvidence = [
  {
    title: 'Reusable stable-record logic',
    proof: '14 record blocks',
    description: 'List-backed selections reuse VLOOKUP and MATCH patterns to derive stable attributes instead of repeating manual rule entry.',
  },
  {
    title: 'Dedicated rules layer',
    proof: '254 Tracking formulas',
    description: 'Conditional checks and reference lookups centralize derived values that support the working views.',
  },
  {
    title: 'Explicit outcome rules',
    proof: '15 of 16 pairs mapped',
    description: 'Two validated four-value selectors create a 4×4 outcome space. The reviewed formula explicitly maps 15 pairs; completing the uncovered pair is a documented next step.',
  },
  {
    title: 'Consolidated estate model',
    proof: '2 linked schedules',
    description: 'Two landholding sheets roll revenue and expense values into one estate calculation and resource view.',
  },
];

export const validationEvidence = [
  'Centralized list-backed choices',
  'Numeric-only fields',
  'Fixed success and failure outcomes',
  'Controlled Goods, Treasure, or Libra selection',
];

export const annualUpdateSteps = [
  'Capture landholding values and annual inputs.',
  'Calculate income, obligations, treasury, and resources.',
  'Validate the selected Goods, Libra, or Treasure target.',
  'Advance the stored year and accumulated totals.',
  'Synchronize annual values and post the entered transaction.',
  'Reset the documented entry fields for the next update.',
];

export const automationSafeguards = [
  'Explicit worksheet names',
  'Required-sheet errors',
  'Numeric normalization',
  'Fixed resource-to-target mapping',
];

export const reliabilityUpgrades = [
  {
    title: 'Transaction journal and rollback',
    description: 'Make balance changes traceable and reversible before they update committed values.',
  },
  {
    title: 'Staging scenarios',
    description: 'Separate testing and what-if work from committed workbook history.',
  },
  {
    title: 'Tests and lineage documentation',
    description: 'Cover missing sheets, invalid choices, repeated execution, and the uncovered outcome pair while making dependencies easier to review.',
  },
];
