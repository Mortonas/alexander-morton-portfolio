import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import {
  encounterWorkflowPhases,
  encounterWorkflowSource,
  workflowLegend,
  workflowSafeguards,
} from '../src/data/encounterWorkflow.js';

const canonicalStages = [
  'Briefing Officer',
  'Party Profiler',
  'Balance Analyst',
  'Lead Mechanist',
  'Tactical Cartographer',
  'Narrative Architect',
  'Editor / Auditor',
  'Tactical Summarist',
  'Desktop Publisher',
  'Cinematic Stylist',
];

test('workflow presentation pins the authoritative pipeline definition and commit', () => {
  assert.deepEqual(encounterWorkflowSource, {
    repository: 'Mortonas/Encounter-Factory',
    sourcePath: 'server/services/orchestrator.ts',
    definition: 'PIPELINE_SEQUENCE',
    verifiedCommit: 'a41c3f2eb15c0159dcd67c0c3500fd728f3735f9',
    sourceUrl: 'https://github.com/Mortonas/Encounter-Factory/blob/a41c3f2eb15c0159dcd67c0c3500fd728f3735f9/server/services/orchestrator.ts#L44-L55',
  });
});

test('workflow preserves six employer-facing phases and all ten canonical stages in order', () => {
  assert.deepEqual(encounterWorkflowPhases.map(({ title }) => title), [
    'Intake and structure',
    'Model the party',
    'Ground the mechanics',
    'Design the encounter',
    'Verify and summarize',
    'Publish and export',
  ]);
  assert.deepEqual(encounterWorkflowPhases.flatMap(({ stages }) => stages.map(({ name }) => name)), canonicalStages);
  for (const phase of encounterWorkflowPhases) {
    assert.ok(phase.problem);
    assert.ok(phase.input);
    assert.ok(phase.output);
    assert.ok(phase.categories.length > 0);
    assert.ok(phase.stages.length > 0);
  }
});

test('workflow legend exposes every category as visible explanatory text', () => {
  assert.deepEqual(workflowLegend.map(({ label }) => label), [
    'Deterministic code',
    'Bounded AI',
    'Validation',
    'Persistence',
    'Export',
  ]);
  for (const item of workflowLegend) assert.ok(item.description.length > 20);
});

test('portfolio documentation explains audit repair, checkpoints, resumption, and stylist fallback without exercising live orchestration', () => {
  const documentation = workflowSafeguards.map(({ title, description }) => `${title} ${description}`).join(' ');
  assert.match(documentation, /failed Editor \/ Auditor review returns the job to Balance Analysis/i);
  assert.match(documentation, /Every successful pipeline stage persists a checkpoint/i);
  assert.match(documentation, /reused when a job resumes/i);
  assert.match(documentation, /Cinematic Stylist fails.*Desktop Publisher output/i);
});

test('workflow markup nests stage lists in phase list items and hides decorative marks', async () => {
  const component = await fs.readFile('src/components/EncounterWorkflow.jsx', 'utf8');
  assert.match(component, /<ol className="workflow-phase-list"/);
  assert.match(component, /<li key=\{phase\.id\} className="workflow-phase">[\s\S]*<ol className="workflow-stage-list"/);
  assert.match(component, /className="workflow-connector" aria-hidden="true"/);
  assert.match(component, /className=\{`legend-swatch category-\$\{item\.id\}`\} aria-hidden="true"/);
  assert.match(component, /className="category-swatch" aria-hidden="true"/);
  assert.doesNotMatch(component, /tabIndex/);
  assert.match(component, /href="#example-output-title">View the generated encounter document/);
});

test('workflow responsive CSS cannot reorder the documented sequence', async () => {
  const css = await fs.readFile('src/styles/encounter-workflow.css', 'utf8');
  assert.doesNotMatch(css, /(^|[\s;{])order\s*:/m);
  assert.doesNotMatch(css, /row-reverse|column-reverse/);
});
