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
    description: 'Character, estate, landholding, resource, follower, and history records appear in several places. Updating them by hand can leave balances out of step or history unfinished.',
    signal: 'I identified where manual changes could cause problems.',
  },
  {
    title: 'Data',
    description: 'Shared lists supply choices for character, family and follower, stable, landholding, jousting, resource, and history records.',
    signal: 'I organized related information instead of repeating it across sheets.',
  },
  {
    title: 'Process',
    description: 'Formulas bring those records into Tracking, Estate Overview, Front, and Back. The scripts handle the yearly update.',
    signal: 'I can explain where the calculated values come from and how updates are applied.',
  },
  {
    title: 'Outcome',
    description: 'The workbook gives users linked views, historical records, and a repeatable way to make annual updates.',
    signal: 'I designed for a task that has to be done more than once.',
  },
];

export const interfaceCallouts = [
  {
    title: 'Controlled inputs',
    description: 'Lists and number checks limit what can be entered in fields used by later calculations.',
  },
  {
    title: 'Calculated characteristics',
    description: 'Formulas combine entered values with reference lists to calculate attributes and skills.',
  },
  {
    title: 'Linked operational records',
    description: 'Equipment and stable details appear here without having to enter them again.',
  },
  {
    title: 'Current status in one view',
    description: 'Resources, condition, combat values, and equipment remain visible beside the character record.',
  },
];

export const systemFlow = [
  {
    title: 'Centralized reference data',
    purpose: 'One shared list supplies choices and lookup values to other sheets.',
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
    description: 'The 14 stable-record blocks use the same VLOOKUP and MATCH pattern to calculate attributes from selected values.',
  },
  {
    title: 'Dedicated rules layer',
    proof: '254 Tracking formulas',
    description: 'Tracking uses conditions and reference lookups to calculate values shown elsewhere in the workbook.',
  },
  {
    title: 'Explicit outcome rules',
    proof: '15 of 16 pairs mapped',
    description: 'Two four-choice inputs make 16 possible outcomes. The reviewed formula covers 15 of them; I have listed the missing pair as work to do.',
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
