import { useCallback, useLayoutEffect, useRef } from 'react';

export function useDynamicCallbackDANGEROUS(a) {
  let b = useRef(a);
  useLayoutEffect(() => {
    b.current = a;
  }, [a]);
  return useCallback(() => {
    return b.current.apply(b, arguments);
  }, []);
}
