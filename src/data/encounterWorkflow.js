export const encounterWorkflowSource = {
  repository: 'Mortonas/Encounter-Factory',
  sourcePath: 'server/services/orchestrator.ts',
  definition: 'PIPELINE_SEQUENCE',
  verifiedCommit: 'a41c3f2eb15c0159dcd67c0c3500fd728f3735f9',
  sourceUrl: 'https://github.com/Mortonas/Encounter-Factory/blob/a41c3f2eb15c0159dcd67c0c3500fd728f3735f9/server/services/orchestrator.ts#L44-L55',
};

export const workflowLegend = [
  {
    id: 'deterministic',
    label: 'Deterministic code',
    description: 'Handles the calculations, queue, data checks, simulations, and export rules.',
  },
  {
    id: 'ai',
    label: 'Bounded AI',
    description: 'Drafts material using checked inputs and mechanical targets.',
  },
  {
    id: 'validation',
    label: 'Validation',
    description: 'Checks whether stage outputs fit the expected structure and agree with the rules.',
  },
  {
    id: 'persistence',
    label: 'Persistence',
    description: 'Saves completed stages so an interrupted job can continue.',
  },
  {
    id: 'export',
    label: 'Export',
    description: 'Creates HTML, VTT, and Obsidian-ready files from the checked result.',
  },
];

export const encounterWorkflowPhases = [
  {
    id: 'intake',
    title: 'Intake and structure',
    problem: 'Turn an open-ended request into a consistent contract before generation begins.',
    input: 'Submitted party and scenario briefing, queued session, and authenticated operator claim.',
    stages: [
      { name: 'Briefing Officer', categories: ['ai', 'validation'] },
    ],
    supportingSystem: 'Queue ownership and typed setup validation are deterministic service controls.',
    output: 'Normalized master-context document.',
    categories: ['deterministic', 'ai', 'validation', 'persistence'],
  },
  {
    id: 'party',
    title: 'Model the party',
    problem: 'Translate character details into capabilities the encounter can reason about.',
    input: 'Normalized briefing and submitted character profiles.',
    stages: [
      { name: 'Party Profiler', categories: ['ai', 'validation'] },
    ],
    output: 'Structured party power profile with tactical strengths and constraints.',
    categories: ['ai', 'validation', 'persistence'],
  },
  {
    id: 'mechanics',
    title: 'Ground the mechanics',
    problem: 'Keep trusted encounter numbers outside unconstrained creative generation.',
    input: 'Master context and party power profile.',
    stages: [
      { name: 'Balance Analyst', categories: ['ai', 'validation'] },
    ],
    supportingSystem: 'The deterministic MathEngine owns durability, damage, pacing, and action-economy targets.',
    output: 'Auditable mechanical targets and balance context.',
    categories: ['deterministic', 'ai', 'validation', 'persistence'],
  },
  {
    id: 'design',
    title: 'Design the encounter',
    problem: 'Build creative actors, spaces, tactics, and story around checked constraints.',
    input: 'Mechanical targets, briefing constraints, and party model.',
    stages: [
      { name: 'Lead Mechanist', categories: ['ai', 'validation'] },
      { name: 'Tactical Cartographer', categories: ['ai', 'validation'] },
      { name: 'Narrative Architect', categories: ['ai', 'validation'] },
    ],
    supportingSystem: 'Deterministic actor and environmental simulation audits add warnings to the shared state.',
    output: 'Structured actors, zones, hazards, tactics, and narrative material.',
    categories: ['deterministic', 'ai', 'validation', 'persistence'],
  },
  {
    id: 'verify',
    title: 'Verify and summarize',
    problem: 'Catch inconsistent output and turn a complex encounter into usable table instructions.',
    input: 'Assembled encounter state and simulation warnings.',
    stages: [
      { name: 'Editor / Auditor', categories: ['ai', 'validation'] },
      { name: 'Tactical Summarist', categories: ['ai', 'validation'] },
    ],
    output: 'Validation report, repair feedback when needed, and game-master run sheet.',
    categories: ['ai', 'validation', 'persistence'],
  },
  {
    id: 'publish',
    title: 'Publish and export',
    problem: 'Convert validated state into documents a game master can review and use.',
    input: 'Validated encounter state and tactical summary.',
    stages: [
      { name: 'Desktop Publisher', categories: ['ai', 'export'] },
      { name: 'Cinematic Stylist', categories: ['ai', 'export'] },
    ],
    supportingSystem: 'Deterministic sanitization and export handlers prepare the final artifacts.',
    output: 'HTML, VTT, and Obsidian-ready encounter documents.',
    categories: ['deterministic', 'ai', 'persistence', 'export'],
  },
];

export const workflowSafeguards = [
  {
    title: 'Audit repair',
    description: 'A failed Editor / Auditor review returns the job to Balance Analysis with feedback for one repair pass.',
  },
  {
    title: 'Per-stage checkpoints',
    description: 'Every successful pipeline stage persists a checkpoint before the next stage begins.',
  },
  {
    title: 'Safe resumption',
    description: 'Valid completed stage data is reused when a job resumes instead of repeating finished work.',
  },
  {
    title: 'Publisher fallback',
    description: 'If Cinematic Stylist fails, the system keeps the Desktop Publisher output rather than discarding the document.',
  },
];
