export const characterEstateEvidence = {
  operationalWorksheets: 10,
  overviewWorksheets: 1,
  formulaCells: 974,
  validationObjects: 17,
  reviewedScripts: 2,
  landholdingSchedules: 2,
};

export const estateFlow = [
  {
    title: 'Property records',
    description: 'Each of the two property sheets holds details, recurring income, improvements, upkeep, obligations, and history.',
    output: 'Entered property information',
  },
  {
    title: 'Property calculations',
    description: 'Formulas total improvements, free income, assumed expenses, additional expenses, and the annual result for each property.',
    output: 'A yearly result for each property',
  },
  {
    title: 'Estate consolidation',
    description: 'The Estate Overview draws values from both property sheets and keeps directly held land and vassal values in separate columns.',
    output: 'One combined estate view',
  },
  {
    title: 'Annual update',
    description: 'A reviewed script advances the year, updates stored totals, applies an entered resource change, and clears selected entry fields.',
    output: 'Updated year and balances',
  },
  {
    title: 'Resource and character views',
    description: 'The Back and Tracking sheets display or use selected estate results alongside the wider character record.',
    output: 'Linked character-facing values',
  },
];

export const calculationLineage = [
  {
    title: 'Improvements become property income',
    steps: [
      'A user records improvement income and maintenance on a property sheet.',
      'The sheet totals those entries and includes them in free income and assumed expenses.',
      'The annual property result is calculated, then selected values feed the estate overview.',
    ],
  },
  {
    title: 'Two properties feed one estate view',
    steps: [
      'Each property calculates its own customary revenue, additional income, expenses, and annual result.',
      'The estate overview brings the two schedules together.',
      'Directly held and vassal amounts remain separate so the reader can compare their contributions.',
    ],
  },
  {
    title: 'Property features contribute to a score',
    steps: [
      'Improvement and fortification values are totaled on each property sheet.',
      'The estate overview adds those values into the estate-glory summary.',
    ],
  },
];

export const dataOrigins = [
  {
    label: 'User-entered',
    description: 'Property details, customary revenue, improvement entries, extra income, expenses, and transaction amount.',
  },
  {
    label: 'Reference',
    description: 'Shared lookup lists and dropdown choices, including result options and the Goods, Treasure, or Libra selector.',
  },
  {
    label: 'Calculated',
    description: 'Formula totals for improvement income, expenses, property results, obligations, and the estate summary.',
  },
  {
    label: 'Script-written',
    description: 'The year, stored annual totals, selected resource balance, and cleared entry fields changed by Apps Script.',
  },
];

export const inputControls = [
  {
    label: 'Result dropdowns',
    description: 'Stewardship and Weather choices use a shared list of Success, Failure, Critical, or Fumble.',
  },
  {
    label: 'Resource dropdown',
    description: 'The transaction selector offers Goods, Treasure, or Libra.',
  },
  {
    label: 'Shared reference lists',
    description: 'The Lists sheet supplies lookup choices used by other workbook areas.',
  },
];

export const annualUpdate = {
  reads: 'The current annual total, year, transaction amount, and selected resource.',
  changes: [
    'Adds the current passive total to a stored glory entry and advances the year by one.',
    'Copies the estate’s yearly discretionary value into the tracked Libra balance and adds it to an accumulation cell.',
    'Subtracts the entered amount from Goods, Treasure, or Libra when the selector matches a configured target.',
  ],
  clears: 'Resets the annual glory and adjustment inputs, transaction amount, and estate-level additional income and expense entries.',
  separateFunction: 'A separate income function copies the yearly discretionary value into the Goods balance. The source does not establish when it runs relative to the annual update.',
};

export const knownLimits = [
  'The dropdown limits normal choices, but the script does not stop the whole update when the stored resource value is unexpected.',
  'The script writes several cells in sequence. It has no all-or-nothing transaction, rollback, or transaction journal.',
  'The Treasure display is calculated from listed items, while the script can write a spending adjustment into that same cell.',
  'The two result dropdowns create 16 combinations; the current outcome formula maps 15.',
];

export const proposedImprovements = [
  {
    title: 'Check inputs before changing balances',
    description: 'Reject unsupported resource choices and test every result combination before any annual values are written.',
  },
  {
    title: 'Make annual posting recoverable',
    description: 'Record each transaction and add a documented way to reverse or safely retry a partially completed update.',
  },
  {
    title: 'Separate inventory from spendable balance',
    description: 'Keep the Treasure item total separate from any balance that the script can reduce.',
  },
];

export const supportingMetrics = [
  '974 formula cells',
  '17 validation objects',
  '2 reviewed scripts',
];
