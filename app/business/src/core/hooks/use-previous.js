import { useEffect, useRef } from 'react';

export function usePrevious(val) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = val;
  });
  return ref.current;
}
