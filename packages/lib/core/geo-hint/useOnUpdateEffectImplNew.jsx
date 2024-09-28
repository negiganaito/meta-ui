import { useEffect, useRef } from 'react';

function useOnUpdateEffect(effect, deps) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    isFirstRender.current = false;
    return () => {
      isFirstRender.current = true;
    };
  }, []);

  useEffect(() => {
    if (!isFirstRender.current) {
      return effect();
    }
    isFirstRender.current = false;
  }, deps);
}

export default useOnUpdateEffect;
