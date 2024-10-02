import { useMemo } from 'react';

export function useUnsafeRef_DEPRECATED(value) {
  return useMemo(() => {
    return {
      current: value,
    };
  }, []);
}
