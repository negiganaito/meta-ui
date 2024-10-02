import { useEffect, useMemo, useRef } from 'react';
import { debounce } from '@meta-ui/core/utils';

export function useDebounced(callback, delay = 100, immediate = false) {
  // Store the latest version of the callback using useRef
  const callbackRef = useRef(callback);

  // Track whether the component is mounted
  const isMountedRef = useRef(true);

  // Store a reference to the debounced cleanup function
  const cleanupRef = useRef(null);

  // Set up the effect to manage the mounted state and cleanup
  useEffect(() => {
    // Mark the component as mounted
    isMountedRef.current = true;

    // Run any pending debounced function when the component mounts
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }

    // Cleanup function for when the component unmounts
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Keep the callback reference up to date
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Memoize the debounced version of the callback
  const debouncedCallback = useMemo(() => {
    return debounce(
      function () {
        const args = arguments;

        // If the component is mounted, invoke the callback with the latest arguments
        if (isMountedRef.current) {
          callbackRef.current.apply(callbackRef, args);
        } else {
          // Otherwise, store a cleanup function to invoke the callback when the component mounts again
          cleanupRef.current = function () {
            callbackRef.current.apply(callbackRef, args);
          };
        }
      },
      delay,
      null,
      false,
      immediate,
    );
  }, [delay, immediate]);

  return debouncedCallback;
}
