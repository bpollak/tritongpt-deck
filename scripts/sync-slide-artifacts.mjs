import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { AUDIENCE_TYPES } from '../src/data/audiences.js';
import { baseSlides, slideManagerState, slides } from '../src/data/slideDeck.js';
import { validateSlideManagerState } from '../src/data/slideManagerStateUtils.js';
import { validateSlides, writeSlideArtifacts } from './lib/slideArtifacts.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const errors = [
  ...validateSlideManagerState(baseSlides, slideManagerState, { allowedAudiences: AUDIENCE_TYPES }),
  ...(await validateSlides(slides, { rootDir }))
];

if (errors.length > 0) {
  console.error('Slide sync failed:\n');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

const updatedArtifacts = await writeSlideArtifacts(rootDir, slides);

if (updatedArtifacts.length > 0) {
  console.log(`Synchronized slide artifacts: ${updatedArtifacts.join(', ')}`);
} else {
  console.log('Slide artifacts are already up to date.');
}
