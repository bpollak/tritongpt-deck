import fs from 'node:fs/promises';
import path from 'node:path';

import { AUDIENCE_TYPES } from '../../src/data/audiences.js';
import { SLIDE_SLUG_PATTERN } from '../../src/data/slidePermalinks.js';
import { buildSlideManagerRegistry } from '../../src/data/slideRegistry.js';

const allowedAudiences = new Set(AUDIENCE_TYPES);

const collectLocalMediaReferences = (value, trail = 'slides', refs = []) => {
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectLocalMediaReferences(item, `${trail}[${index}]`, refs));
    return refs;
  }

  if (!value || typeof value !== 'object') {
    return refs;
  }

  for (const [key, child] of Object.entries(value)) {
    const nextTrail = `${trail}.${key}`;

    if (typeof child === 'string' && child.startsWith('/media/')) {
      refs.push({ trail: nextTrail, assetPath: child });
      continue;
    }

    collectLocalMediaReferences(child, nextTrail, refs);
  }

  return refs;
};

const writeIfChanged = async (targetPath, content) => {
  let currentContent = null;

  try {
    currentContent = await fs.readFile(targetPath, 'utf8');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  if (currentContent === content) {
    return false;
  }

  await fs.mkdir(path.dirname(targetPath), { recursive: true });
  await fs.writeFile(targetPath, content, 'utf8');
  return true;
};

export const createSlidesModuleContent = (slides) => `export const slides = ${JSON.stringify(slides, null, 2)};\n`;

export const validateSlides = async (slides, { rootDir }) => {
  const errors = [];

  if (!Array.isArray(slides) || slides.length === 0) {
    return ['The merged slide deck must contain a non-empty `slides` array.'];
  }

  const seenSlideIds = new Set();
  const seenSlideSlugs = new Set();

  slides.forEach((slide, index) => {
    const location = `slides[${index}]`;

    if (!slide || typeof slide !== 'object') {
      errors.push(`${location} must be an object.`);
      return;
    }

    if (slide.id === undefined || slide.id === null || slide.id === '') {
      errors.push(`${location} is missing an id.`);
    } else {
      const idKey = String(slide.id);
      if (seenSlideIds.has(idKey)) {
        errors.push(`Duplicate slide id "${slide.id}" found at ${location}.`);
      }
      seenSlideIds.add(idKey);
    }

    if (typeof slide.slug !== 'string' || !slide.slug.trim()) {
      errors.push(`Slide ${slide.id ?? index + 1} is missing a stable slug.`);
    } else {
      const slug = slide.slug.trim();

      if (!SLIDE_SLUG_PATTERN.test(slug)) {
        errors.push(`Slide ${slide.id ?? index + 1} has invalid slug "${slide.slug}". Use lowercase letters, numbers, and hyphens only.`);
      }

      if (seenSlideSlugs.has(slug)) {
        errors.push(`Duplicate slide slug "${slug}" found at ${location}.`);
      }

      seenSlideSlugs.add(slug);
    }

    if (!Array.isArray(slide.audiences) || slide.audiences.length === 0) {
      errors.push(`Slide ${slide.id ?? index + 1} must declare at least one audience.`);
    } else {
      const unknownAudiences = slide.audiences.filter((audience) => !allowedAudiences.has(audience));
      if (unknownAudiences.length > 0) {
        errors.push(`Slide ${slide.id} has unsupported audiences: ${unknownAudiences.join(', ')}.`);
      }
    }
  });

  const mediaRefs = collectLocalMediaReferences(slides);

  await Promise.all(
    mediaRefs.map(async ({ trail, assetPath }) => {
      const absoluteAssetPath = path.join(rootDir, 'public', assetPath.replace(/^\//, ''));

      try {
        await fs.access(absoluteAssetPath);
      } catch {
        errors.push(`${trail} points to missing asset ${assetPath}.`);
      }
    })
  );

  return errors;
};

export const writeSlideArtifacts = async (rootDir, slides) => {
  const publicDir = path.join(rootDir, 'public');
  const slideJsonContent = `${JSON.stringify(slides, null, 2)}\n`;
  const registryJsonContent = `${JSON.stringify(buildSlideManagerRegistry(slides), null, 2)}\n`;

  const [slidesUpdated, registryUpdated] = await Promise.all([
    writeIfChanged(path.join(publicDir, 'slides.json'), slideJsonContent),
    writeIfChanged(path.join(publicDir, 'slide-manager-registry.json'), registryJsonContent)
  ]);

  return [
    slidesUpdated ? 'public/slides.json' : null,
    registryUpdated ? 'public/slide-manager-registry.json' : null
  ].filter(Boolean);
};
