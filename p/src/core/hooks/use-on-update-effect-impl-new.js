import { useEffect, useRef } from 'react';

export function useOnUpdateEffectImplNew(callback, dependencies) {
  // Use useRef to track whether it's the first render or not
  const isInitialRender = useRef(false);

  // Set the ref to true after the first render
  useEffect(() => {
    isInitialRender.current = true;
    // Clean up: set the ref to false when the component unmounts
    return () => {
      isInitialRender.current = false;
    };
  }, []);

  // UseEffect to run the callback only on updates (not the first render)
  useEffect(() => {
    // If it's the first render, skip running the callback
    const shouldSkipFirstRender = !isInitialRender.current;
    isInitialRender.current = false;
    if (shouldSkipFirstRender) {
      return callback();
    }
  }, dependencies);
}
