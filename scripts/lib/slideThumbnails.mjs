import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const rendererFiles = [
  'src/components/Slide.jsx',
  'src/components/CabinetSlide.jsx',
  'src/components/CabinetFrameworkSlide.jsx',
  'src/components/CabinetFrameworkSlide.css',
  'src/components/CabinetWebsiteVisual.jsx',
  'src/components/CabinetWebsiteVisual.css',
  'src/components/CabinetHarnessOverview.jsx',
  'src/components/CabinetHarnessOverview.css',
  'src/data/cabinetWebsiteVisuals.js',
  'src/components/HarnessDefinitionVariants.jsx',
  'src/components/EmbeddedVideo.jsx',
  'src/pages/ThumbnailPage.jsx',
  'src/index.css',
  'tailwind.config.js'
];

export const getRendererKey = async () => {
  const hash = createHash('sha256');
  for (const filename of rendererFiles) hash.update(await readFile(filename));
  return hash.digest('hex');
};
