import { useEffect } from 'react';
import { useShallowArrayEqualMemo } from '@meta-core/hooks/use-shallow-array-equal-memo';
import { ContextualThing } from '@meta-core/react-utils/contextual-thing';

function isMouseEventOutside(event, ref) {
  const target = event.target;
  const isOutside =
    target instanceof Node &&
    ref.current instanceof Node &&
    !ContextualThing.containsIncludingLayers(ref.current, target);
  return isOutside;
}

export const useGeoPrivateOnMouseEventOutside = (handler, refs, eventType) => {
  const memoizedRefs = useShallowArrayEqualMemo(refs);

  useEffect(() => {
    if (handler === null) return;

    const eventListener = (event) => {
      const isOutside = memoizedRefs.every((ref) => isMouseEventOutside(event, ref));
      if (isOutside) handler();
    };

    window.addEventListener(eventType, eventListener, true);
    return () => {
      window.removeEventListener(eventType, eventListener, true);
    };
  }, [eventType, memoizedRefs, handler]);
};
