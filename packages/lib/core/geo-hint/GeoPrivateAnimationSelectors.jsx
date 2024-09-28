import { animationDurationStyles, animationTimingStyles } from './GeoPrivateDefaultAnimationGeneratedStyles';

const root = {
  root: {
    '@media (prefers-reduced-motion: reduce)_animationDuration': 'x1u6grsq',
  },
};

function selectAnimation({ duration, timing }) {
  const durationKey = duration === 'extraShort' ? 'fast' : duration;
  return [animationDurationStyles[durationKey], animationTimingStyles[timing], root.root];
}

export { selectAnimation };
