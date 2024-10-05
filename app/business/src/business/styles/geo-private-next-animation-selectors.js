import stylex from '@stylexjs/stylex';

import { GeoPrivateNextAnimationGeneratedStyles } from './geo-private-next-animation-generated-styles';

const styles = stylex.create({
  root: {
    // eslint-disable-next-line @stylexjs/valid-styles
    '@media (prefers-reduced-motion: reduce)': {
      animationDuration: '0s',
    },
  },
});

const selectAnimation = ({ duration, timing }) => {
  const _duration = duration === 'extraShort' ? 'fast' : duration;

  return [
    GeoPrivateNextAnimationGeneratedStyles.animationDurationStyles[_duration],
    GeoPrivateNextAnimationGeneratedStyles.animationTimingStyles[timing],
    styles.root,
  ];
};

export const GeoPrivateNextAnimationSelectors = { selectAnimation };
