import { useEffect, useRef } from 'react';

import { useOnUpdateEffect } from './use-on-update-effect';
import { useShallowArrayEqualMemo } from './use-shallow-array-equal-memo';

export function useCallbackListener(callback, ...dependencies) {
  // useRef to store the latest version of the callback
  const callbackRef = useRef();

  // Memoizing the dependencies using shallow comparison
  const memoizedDependencies = useShallowArrayEqualMemo(dependencies);

  // Store the latest callback in the ref
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Trigger the callback when the dependencies update
  useOnUpdateEffect(() => {
    callbackRef.current?.apply(callbackRef, memoizedDependencies);
  }, [memoizedDependencies]);
}
