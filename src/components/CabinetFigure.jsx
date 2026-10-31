import toolsLandscape from '../assets/figures/tools-landscape.svg?raw';
import parasolTransition from '../assets/figures/parasol-transition.svg?raw';
import parasolReservations from '../assets/figures/parasol-reservations.svg?raw';
import getStarted from '../assets/figures/get-started.svg?raw';
import computeAndModels from '../assets/figures/compute-and-models.svg?raw';
import apiAndRecharge from '../assets/figures/api-and-recharge.svg?raw';

// Diagrams are inlined (not <img>) so they render in the deck's Teko and Roboto fonts.
const FIGURES = {
  'tools-landscape': toolsLandscape,
  'parasol-transition': parasolTransition,
  'parasol-reservations': parasolReservations,
  'get-started': getStarted,
  'compute-and-models': computeAndModels,
  'api-and-recharge': apiAndRecharge
};

export default function CabinetFigure({ figure, title }) {
  const svg = FIGURES[figure?.id];
  if (!svg) return null;

  return (
    <div
      className="cabinet-figure__art"
      role="img"
      aria-label={figure.alt || title}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
