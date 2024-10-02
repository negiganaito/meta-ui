import { useEffect } from 'react';

import useUnsafeRef_DEPRECATED from './useUnsafeRef_DEPRECATED';

function useCustomEqualityMemo(value, isEqual) {
  const ref = useUnsafeRef_DEPRECATED(value);
  const memoizedValue = isEqual(ref.current, value) ? ref.current : value;

  useEffect(() => {
    ref.current = memoizedValue;
  }, [memoizedValue]);

  return memoizedValue;
}

export default useCustomEqualityMemo;
