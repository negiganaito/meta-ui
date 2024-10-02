import { transitionDurationStyles, transitionTimingStyles } from './GeoPrivateDefaultTransitionGeneratedStyles';

const properties = { transitionProperty: 'x6o7n8i' };
const root = {
  '@media (prefers-reduced-motion: reduce)_transitionDuration': 'x12w9bfk',
};

function selectTransition({ duration, timing }) {
  const adjustedDuration = duration === 'extraShort' ? 'fast' : duration;
  return [transitionDurationStyles[adjustedDuration], properties, transitionTimingStyles[timing], root];
}

export { selectTransition };
