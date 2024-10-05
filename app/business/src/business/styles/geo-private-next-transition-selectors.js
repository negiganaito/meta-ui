import stylex from '@stylexjs/stylex';

import { GeoPrivateNextTransitionGeneratedStyles } from './geo-private-next-transition-generated-styles';

const styles = stylex.create({
  properties: {
    transitionProperty: 'opacity,transform',
  },
});

const styles1 = stylex.create({
  root: {
    // eslint-disable-next-line @stylexjs/valid-styles
    '@media (prefers-reduced-motion: reduce)': {
      transitionDuration: '0s',
    },
  },
});

function selectTransition(a) {
  const { duration, timing } = a;
  const adjustedDuration = duration === 'extraShort' ? 'fast' : duration;

  return [
    GeoPrivateNextTransitionGeneratedStyles.transitionDurationStyles[adjustedDuration],
    styles.properties,
    GeoPrivateNextTransitionGeneratedStyles.transitionTimingStyles[timing],
    styles1.root,
  ];
}

export const GeoPrivateNextTransitionSelectors = { selectTransition };
