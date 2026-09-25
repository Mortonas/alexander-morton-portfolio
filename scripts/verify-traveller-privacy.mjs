import { execFileSync } from 'node:child_process';

export const approvedTravellerImages = [
  'images/traveller-notes/fictional-workflow.svg',
  'images/traveller-notes/idle-menu.webp',
  'images/traveller-notes/new-trade-route-note.webp',
];
const approvedImageSet = new Set(approvedTravellerImages);
const approvedJson = new Set(['data/dashboard-v1.json', 'data/dashboard-v1.schema.json']);
const privateSegment = /(?:^|\/)(?:vault|custom_vault|notes|test_output|raw[-_ ]?imports?|wiki[-_ ]?pulls?|sector[-_ ]?exports?|world[-_ ]?exports?|[^/]*_backup_[^/]*)(?:\/|$)/i;
const privateState = /(?:^|\/)(?:zettel_state(?:\.[^/]*)?|\.env(?:\.[^/]*)?)(?:$|\/)/i;
const rawDataExtension = /\.(?:md|json|csv|tsv|txt)$/i;

export function travellerPrivacyViolations(paths, root) {
  const files = paths.map((file) => file.replaceAll('\\', '/').replace(/^\.\//, ''));
  const violations = [];
  const publicRoot = root === 'dist' ? 'dist/' : 'public/';
  const travellerFiles = [];

  for (const file of files) {
    const relative = file.startsWith(publicRoot) ? file.slice(publicRoot.length) : null;
    const isEnvTemplate = file === '.env.example' || file.endsWith('/.env.example');
    if (privateSegment.test(file) || (privateState.test(file) && !isEnvTemplate)) violations.push(file);
    if (/(?:^|\/)(?:traveller[-_ ]?notes|travellermap|traveller[-_ ]?wiki)[^/]*\.(?:md|json|csv|tsv|txt)$/i.test(file)) violations.push(file);

    if (relative !== null) {
      if (relative.startsWith('images/traveller-notes/')) travellerFiles.push(relative);
      if (/(?:^|\/)(?:traveller[-_ ]?notes|travellermap|traveller[-_ ]?wiki)/i.test(relative) && !approvedImageSet.has(relative) && /\.(?:svg|png|webp|jpe?g|gif|pdf)$/i.test(relative)) violations.push(file);
      if (/\.(?:md|csv|tsv|txt)$/i.test(relative)) violations.push(file);
      if (relative.endsWith('.json') && !approvedJson.has(relative) && relative !== '.vite/manifest.json') violations.push(file);
    } else if (rawDataExtension.test(file) && /(?:traveller|sector[-_ ]?(?:world|data)|wiki[-_ ]?pull)/i.test(file)) {
      violations.push(file);
    }
  }

  if (JSON.stringify(travellerFiles.sort()) !== JSON.stringify([...approvedTravellerImages].sort())) {
    violations.push(`${publicRoot}images/traveller-notes/: expected only ${approvedTravellerImages.join(', ')}`);
  }
  return [...new Set(violations)];
}

export function trackedAndCandidateFiles() {
  return execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard', '-z'], { encoding: 'utf8' })
    .split('\0').filter(Boolean);
}

export function webpMetadataChunks(bytes) {
  if (bytes.toString('ascii', 0, 4) !== 'RIFF' || bytes.toString('ascii', 8, 12) !== 'WEBP') {
    throw new Error('Traveller screenshot is not a WebP file');
  }
  const found = [];
  for (let offset = 12; offset < bytes.length;) {
    if (offset + 8 > bytes.length) throw new Error('Traveller screenshot has a truncated WebP chunk');
    const type = bytes.toString('ascii', offset, offset + 4);
    const length = bytes.readUInt32LE(offset + 4);
    offset += 8 + length + (length % 2);
    if (offset > bytes.length) throw new Error('Traveller screenshot has an invalid WebP chunk length');
    if (['EXIF', 'XMP ', 'ICCP'].includes(type)) found.push(type);
  }
  return found;
}

export function verifyTravellerPrivacy(builtFiles) {
  const sourceViolations = travellerPrivacyViolations(trackedAndCandidateFiles(), 'public');
  const buildViolations = travellerPrivacyViolations(builtFiles, 'dist');
  if (sourceViolations.length || buildViolations.length) {
    throw new Error(`Traveller Notes private material or an unapproved asset was found:\n${[...sourceViolations, ...buildViolations].join('\n')}`);
  }
}
