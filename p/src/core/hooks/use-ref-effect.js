import { useCallback, useRef } from 'react';

export function useRefEffect(effect, dependencies) {
  const cleanupRef = useRef(null);

  return useCallback((node) => {
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }

    if (node) {
      cleanupRef.current = effect(node);
    }
  }, dependencies);
}
