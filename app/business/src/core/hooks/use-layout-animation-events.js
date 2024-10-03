import { useContext, useEffect, useRef } from 'react';
import { LayoutAnimationEvent } from '@meta-core/constant/layout-animation-event';
import { LayoutAnimationBoundaryContext } from '@meta-core/contexts/layout-animation-boundary-context';

export function useLayoutAnimationEvents(a) {
  const b = useContext(LayoutAnimationBoundaryContext);
  const e = useRef([]);

  useEffect(() => {
    const c = (!b ? void 0 : b.animationEventTargets) || [];
    c.forEach((b) => {
      b = b.addListener(LayoutAnimationEvent.LAYOUT_ANIMATION_EVENT, a);
      // @ts-ignore
      e.current = [].concat(e.current, [b]);
    });
    return function () {
      e.current.forEach((a) => {
        a.remove();
      });
      e.current = [];
    };
  }, [a, b]);
}
