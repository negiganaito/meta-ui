import { useEffect, useRef } from 'react';

import useOnUpdateEffect from '../hooks/useOnUpdateEffect';

import useShallowArrayEqualMemo from './useShallowArrayEqualMemo';

function useCallbackListener(callback, ...dependencies) {
  const callbackRef = useRef(null);
  const memoizedDependencies = useShallowArrayEqualMemo(dependencies);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useOnUpdateEffect(() => {
    callbackRef.current?.(...memoizedDependencies);
  }, [memoizedDependencies]);
}

export default useCallbackListener;
