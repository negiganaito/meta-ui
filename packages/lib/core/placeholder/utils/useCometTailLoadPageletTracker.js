import { useCallback, useRef } from 'react';
import { intersectionObserverEntryIsIntersecting } from '@meta-core/utils';

export function useCometTailLoadPageletTracker(markerName, pageletName, shouldTrack) {
  const elementRef = useRef(null);
  const hasLogged = useRef(false);
  const cleanupRef = useRef(null);
  // const tracePolicy = useCometRouteTracePolicy();

  return useCallback(
    (element) => {
      if (!element) {
        if (cleanupRef.current) {
          cleanupRef.current();
        }
        cleanupRef.current = null;
        return;
      }

      if (shouldTrack === true && markerName && pageletName && elementRef.current !== element) {
        elementRef.current = element;

        const observerCallback = (entries) => {
          Array.prototype.forEach.call(entries, (entry) => {
            if (intersectionObserverEntryIsIntersecting(entry) && !hasLogged.current) {
              hasLogged.current = true;
              if (cleanupRef.current) {
                cleanupRef.current();
              }
              cleanupRef.current = null;
              // CometTailLoadLogger.logMarkerEnd(markerName, pageletName, entry.time, 2, tracePolicy);
            }
          });
        };

        const observer = new IntersectionObserver(observerCallback);
        observer.observe(element);

        cleanupRef.current = () => {
          elementRef.current = null;
          observer.disconnect();
        };
      }
    },
    [markerName, pageletName, shouldTrack],
  );
}
