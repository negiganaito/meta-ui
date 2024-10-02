import stylex from '@stylexjs/stylex';

import { GeoPrivateDefaultAnimationGeneratedStyles } from './geo-private-default-animation-generated-styles';

let styles = stylex.create({
  root: {
    animationDuration: {
      default: null,
      '@media (prefers-reduced-motion: reduce)': '0s',
    },
  },
});

function selectAnimation(animationProps) {
  let duration = animationProps.duration;
  let timing = animationProps.timing;

  duration = duration === 'extraShort' ? 'fast' : duration;

  return [
    GeoPrivateDefaultAnimationGeneratedStyles.animationDurationStyles[duration],
    GeoPrivateDefaultAnimationGeneratedStyles.animationTimingStyles[timing],
    styles.root,
  ];
}

export const GeoPrivateAnimationSelectors = {
  selectAnimation,
};
