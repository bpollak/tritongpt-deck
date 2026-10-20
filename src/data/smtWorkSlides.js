// Offline-export selection. Canonical slide content lives in slides.js.
import { slides } from './slides.js';
export const smtWorkSlides = slides.filter(s => s.audiences.includes('smt-work'));
