import { useCallback, useRef } from 'react';
import { useGeoPrivateLayerBehavior } from '@meta-ui/business/hooks';

export function GeoBaseLayerExitBehavior({ children, delay = 0, onExit }) {
  const timeoutRef = useRef(null);
  const cleanupRef = useRef(null);

  const clearTimeout = useCallback(() => {
    window.clearTimeout(timeoutRef.current);
  }, []);

  const setExitTimeout = useCallback(() => {
    timeoutRef.current = window.setTimeout(onExit, delay);
  }, [delay, onExit]);

  const layerRef = useCallback(
    (node) => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
      if (node) {
        node.addEventListener('mouseenter', clearTimeout);
        node.addEventListener('mouseleave', setExitTimeout);
        cleanupRef.current = () => {
          node.removeEventListener('mouseenter', clearTimeout);
          node.removeEventListener('mouseleave', setExitTimeout);
        };
      }
    },
    [clearTimeout, setExitTimeout],
  );

  return useGeoPrivateLayerBehavior({
    ref: layerRef,
  })(children);
}
