import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { slides } from '../src/data/slides.js';
import { validateSlides, writeSlideArtifacts } from './lib/slideArtifacts.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const errors = await validateSlides(slides, { rootDir });

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
