export const characterEstateEvidence = {
  operationalWorksheets: 10,
  overviewWorksheets: 1,
  formulaCells: 974,
  validationObjects: 17,
  reviewedScripts: 2,
};

export const workbookLayers = [
  {
    title: 'Reference data',
    purpose: 'Owns reusable lookup values and controlled choices.',
    sheets: ['Lists'],
  },
  {
    title: 'Entry and records',
    purpose: 'Captures character, family, stable, landholding, and jousting information.',
    sheets: ['Family & Followers', 'Stable1', 'Estate Landholding1', 'Estate Landholding2', 'Jousting Record'],
  },
  {
    title: 'Calculation and tracking',
    purpose: 'Consolidates source records into derived values and operational totals.',
    sheets: ['Tracking', 'Estate Overview'],
  },
  {
    title: 'User-facing views',
    purpose: 'Presents current character, estate, and history information.',
    sheets: ['Front', 'Back'],
  },
  {
    title: 'Controlled automation',
    purpose: 'Posts annual and resource updates to explicit workbook targets.',
    sheets: ['code.gs', 'income.gs'],
  },
];

export const workbookRelationships = [
  '`Lists` supplies lookup and validation values to `Front`, `Stable1`, `Tracking`, and `Family & Followers`.',
  '`Front` supplies 126 audited cross-sheet formula references to `Tracking`.',
  '`Estate Landholding1` and `Estate Landholding2` supply revenue and expense values to `Estate Overview`.',
  '`Estate Overview` supplies consolidated values to `Back` and `Tracking`.',
  '`Jousting Record` supplies history to `Front`, while `Tracking` supplies derived values to `Back`.',
];

export const formulaCountsBySheet = [
  { sheet: 'Front', count: 53 },
  { sheet: 'Back', count: 52 },
  { sheet: 'Estate Overview', count: 27 },
  { sheet: 'Family & Followers', count: 56 },
  { sheet: 'Stable1', count: 462 },
  { sheet: 'Estate Landholding1', count: 24 },
  { sheet: 'Estate Landholding2', count: 25 },
  { sheet: 'Jousting Record', count: 2 },
  { sheet: 'Tracking', count: 254 },
  { sheet: 'Lists', count: 19 },
  { sheet: 'Project Overview', count: 0 },
];

export const analystSkills = [
  {
    title: 'Spreadsheet data modeling',
    description: 'Separate user views, operational records, reference data, calculations, and history so each layer has a clear responsibility.',
  },
  {
    title: 'Validation design',
    description: 'Constrain categorical and numeric inputs before those values enter dependent formulas and recurring processes.',
  },
  {
    title: 'Controlled automation',
    description: 'Turn a multi-cell annual update into a documented sequence with named targets, checks, and reset behavior.',
  },
  {
    title: 'Calculation lineage',
    description: 'Trace how landholding records and reference values flow into estate totals, balances, and user-facing views.',
  },
];

export const validationExamples = [
  { title: 'Centralized choices', description: 'List-backed controls reuse reference values rather than repeating free-text categories.' },
  { title: 'Numeric fields', description: 'Numeric-only controls protect selected quantities and balances before calculations use them.' },
  { title: 'Fixed outcomes', description: 'Success, Failure, Critical, and Fumble are captured as a controlled outcome set.' },
  { title: 'Resource selection', description: 'Goods, Treasure, or Libra determines the explicit balance target used by the annual update.' },
];

export const annualUpdateSteps = [
  'Advance the stored year and accumulated total.',
  'Synchronize the calculated annual estate value.',
  'Update the tracked annual balance.',
  'Apply the entered transaction to the selected Goods, Libra, or Treasure resource.',
  'Reset the documented entry fields for the next update.',
];

export const futureImprovements = [
  'Introduce a transaction journal before balances are updated.',
  'Add reversible posting or a documented rollback procedure.',
  'Separate staging and test scenarios from committed workbook history.',
  'Add a more detailed data dictionary and formula-lineage reference.',
  'Add controlled script tests for missing sheets, invalid resource choices, blank values, and repeated execution.',
];
