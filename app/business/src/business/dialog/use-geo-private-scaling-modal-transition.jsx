import { useGeoTheme } from '@meta-business/theme/use-geo-theme';
import { useStyleXTransitionSingle } from '@meta-core/react-utils/use-stylex-transition-single';
import stylex from '@stylexjs/stylex';

const durationOut = 280;
const durationIn = 400;
const gkx24835 = true; // gkx24835;

const styles = stylex.create({
  base: {
    transform: 'scale(.9)',
  },
  enter: {
    transform: 'scale(1)',
  },
  leave: {
    transform: 'scale(.9)',
  },
});

export const useGeoPrivateScalingModalTransition = (state, onEnterComplete) => {
  const { selectTransition } = useGeoTheme();

  const transitionEnterStyle = selectTransition({
    duration: 'slow',
    timing: 'enter',
  });

  const transitionLeaveStyle = selectTransition({
    duration: 'short',
    timing: 'exit',
  });

  const style = useStyleXTransitionSingle(state || null, {
    base: styles.base,
    enter: [styles.enter, transitionEnterStyle],
    leave: [styles.leave, transitionLeaveStyle],
    durationIn: durationIn,
    durationOut: durationOut,
    onEnterComplete: onEnterComplete,
  });

  return gkx24835 ? style : null;
};
