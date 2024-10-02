import stylex from '@stylexjs/stylex';

import { GeoPrivateDefaultTransitionGeneratedStyles } from './geo-private-default-transition-generated-styles';

const transitionProperties = stylex.create({
  properties: {
    transitionProperty: 'x6o7n8i',
  },
});

const transitionStyles = stylex.create({
  root: {
    transitionDuration: {
      default: null,
      '@media (prefers-reduced-motion: reduce)': '0s',
    },
  },
});

function selectTransition({ duration, timing }) {
  const selectedDuration = duration === 'extraShort' ? 'fast' : duration;

  return [
    GeoPrivateDefaultTransitionGeneratedStyles.transitionDurationStyles[selectedDuration],
    transitionProperties.properties,
    GeoPrivateDefaultTransitionGeneratedStyles.transitionTimingStyles[timing],
    transitionStyles.root,
  ];
}

export const GeoTransitionSelectors = { selectTransition };
