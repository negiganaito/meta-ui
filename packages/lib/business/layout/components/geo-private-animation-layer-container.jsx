import { useCallback, useState } from 'react';
import { GeoPrivateAnimationLayerContext } from '@meta-ui/business/contexts';
import { useShallowEqualMemo } from '@meta-ui/business/utils';
import { useStyleXTransitionSingle } from '@meta-ui/core/react-utils';
import stylex from '@stylexjs/stylex';

const ENTER_DURATION = 100;
const LEAVE_DURATION = 50;
const TRANSITION_DURATION = 50;

export function GeoPrivateAnimationLayerContainer({ children, isLayerShown, position }) {
  const [isLeaving, setIsLeaving] = useState(false);
  const [isEntered, setIsEntered] = useState(false);

  const onEnter = useCallback(() => {
    setIsLeaving(false);
  }, []);

  const onEnterComplete = useCallback(() => {
    setIsEntered(true);
  }, []);

  const onLeave = useCallback(() => {
    setIsLeaving(true);
    setIsEntered(false);
  }, []);

  const onLeaveComplete = useCallback(() => {
    setIsLeaving(false);
  }, []);

  const transition = useStyleXTransitionSingle(isLayerShown || null, {
    base: [],
    enter: styles.transitionPlaceholder,
    leave: styles.transitionPlaceholder,
    durationIn: TRANSITION_DURATION,
    durationOut: ENTER_DURATION + LEAVE_DURATION,
    onEnter,
    onEnterComplete,
    onLeave,
    onLeaveComplete,
  });

  const contextValue = useShallowEqualMemo({
    isAnimated: true,
    isLeaving,
    isEntered,
  });

  return transition ? (
    <GeoPrivateAnimationLayerContext.Provider value={contextValue}>{children}</GeoPrivateAnimationLayerContext.Provider>
  ) : null;
}

GeoPrivateAnimationLayerContainer.displayName = GeoPrivateAnimationLayerContainer.name + ' [from ' + module.id + ']';

const styles = stylex.create({
  transitionPlaceholder: {},
});
