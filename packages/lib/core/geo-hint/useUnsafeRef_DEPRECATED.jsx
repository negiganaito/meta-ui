import { useMemo } from 'react';

function useUnsafeRef_DEPRECATED(value) {
  return useMemo(() => ({ current: value }), []);
}

export default useUnsafeRef_DEPRECATED;
