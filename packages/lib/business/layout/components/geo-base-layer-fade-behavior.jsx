import { useGeoPrivateLayerBehavior } from '@meta-ui/business/hooks';
import { useGeoTheme } from '@meta-ui/business/theme';
import { useStyleXTransitionSingle } from '@meta-ui/core/react-utils';
import stylex from '@stylexjs/stylex';

const FADE_IN_DURATION = 400;
const FADE_OUT_DURATION = 200;

const styles = stylex.create({
  base: {
    transitionProperty: 'opacity',
    transitionDuration: '.4s',
    opacity: 0,
  },
  enter: {
    opacity: 1,
  },
  leave: {
    opacity: 0,
    transitionDuration: '.2s',
    pointerEvents: 'none',
  },
});

export function GeoBaseLayerFadeBehavior({ children, isShown }) {
  const theme = useGeoTheme();
  const transition = theme.selectTransition({
    duration: 'slow',
    timing: 'soft',
  });

  const transitionStyles = useStyleXTransitionSingle(isShown ? children : null, {
    base: [transition, styles.base],
    enter: styles.enter,
    leave: styles.leave,
    durationIn: FADE_IN_DURATION,
    durationOut: FADE_OUT_DURATION,
  });

  const applyLayerBehavior = useGeoPrivateLayerBehavior({
    xstyle: transitionStyles?.xstyle,
  });

  const isVisible = transitionStyles !== null;
  return applyLayerBehavior(isVisible ? children : null);
}
