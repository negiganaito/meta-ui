import stylex from '@stylexjs/stylex';

import { useGeoTheme } from './use-geo-theme';

const styles = stylex.create({
  animationStyles: {
    transitionProperty: 'background-color',
  },
});

export function useGeoPrivateAnimationPressableStyle({ hasAnimation, isActive }) {
  const theme = useGeoTheme();
  const selectTransition = theme.selectTransition;

  return hasAnimation
    ? [
        selectTransition({
          duration: isActive ? 'extraShort' : 'extraExtraShort',
          timing: 'fade',
        }),
        styles.animationStyles,
      ]
    : null;
}
