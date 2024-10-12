import { useEffect, useRef } from 'react';

export function useResizeObserverLoopLimitSafeCallbackWrapper(a) {
  let b = useRef(null);
  let c = function (c, d, e) {
    // eslint-disable-next-line no-sequences
    b.current && window.cancelAnimationFrame(b.current),
      (b.current = window.requestAnimationFrame(() => {
        a(c, d, e);
      }));
  };
  useEffect(() => {
    return function () {
      b.current && window.cancelAnimationFrame(b.current);
    };
  }, []);
  return c;
}
