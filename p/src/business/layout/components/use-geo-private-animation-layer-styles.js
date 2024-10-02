import { useContext } from 'react';
import { GeoPrivateAnimationLayerContext } from '@meta-ui/business/contexts';
import { useGeoTheme } from '@meta-ui/business/theme';
import { BaseContextualLayerOrientationContext } from '@meta-ui/core/contexts';
import stylex from '@stylexjs/stylex';
import Locale from 'fbjs/lib/Locale';

const isRTL = Locale.isRTL();

export function useGeoPrivateAnimationLayerStyles({ elevation }) {
  const { isAnimated, isEntered, isLeaving } = useContext(GeoPrivateAnimationLayerContext);
  const { position } = useContext(BaseContextualLayerOrientationContext);

  const theme = useGeoTheme();
  const transition = theme.selectTransition({
    duration: isEntered ? 'short' : 'extraExtraShort',
    timing: isLeaving ? 'fade' : 'quickMove',
  });

  const baseStyles = [transition, styles.base, getPositionStyles(position, elevation)];
  const animationStyles = [isLeaving && styles.leave, isEntered && styles.enter];

  return isAnimated ? [baseStyles, animationStyles] : null;
}

function getPositionStyles(position, elevation) {
  const stylesForElevation = elevation === 2 ? elevatedPositionStyles : defaultPositionStyles;

  switch (position) {
    case 'above':
      return stylesForElevation.above;
    case 'below':
      return stylesForElevation.below;
    case 'start':
      return isRTL ? stylesForElevation.right : stylesForElevation.left;
    case 'end':
      return isRTL ? stylesForElevation.left : stylesForElevation.right;
    default:
      return {};
  }
}

const styles = stylex.create({
  base: {
    opacity: '0',
  },
  enter: {
    opacity: '1',
    transform: 'translate(0,0)',
  },
  leave: {
    opacity: '0',
    transform: 'translate(0,0)',
  },
});

const elevatedPositionStyles = stylex.create({
  above: {
    transform: 'translate(0,4px)',
  },
  below: {
    transform: 'translate(0,-4px)',
  },
  left: {
    transform: 'translate(4px,0)',
  },
  right: {
    transform: 'translate(-4px,0)',
  },
});

const defaultPositionStyles = stylex.create({
  above: {
    transform: 'translate(0,8px)',
  },
  below: {
    transform: 'translate(0,-8px)',
  },
  left: {
    transform: 'translate(8px,0)',
  },
  right: {
    transform: 'translate(-8px,0)',
  },
});
