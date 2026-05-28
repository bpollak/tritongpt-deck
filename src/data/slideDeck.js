import { slides as baseSlides } from './slides.js';
import { slideManagerState } from './slideManagerState.js';
import { applySlideManagerState } from './slideManagerStateUtils.js';

export { baseSlides, slideManagerState };

export const slides = applySlideManagerState(baseSlides, slideManagerState);
