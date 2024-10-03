import { useCallback } from 'react';
import { useRefEffect } from '@meta-core/hooks/use-ref-effect';
import { Keys } from '@meta-core/utils/keys';

export const useGeoPrivateOnEscape = (onEscape, options) => {
  const contain = options?.contain === true;

  const handleKeyDown = useCallback(
    (event) => {
      if (event.keyCode === Keys.ESC) {
        if (contain) {
          event.stopPropagation();
        }
        onEscape();
      }
    },
    [contain, onEscape],
  );

  return useRefEffect(
    (node) => {
      const target = contain ? node : window;
      target.addEventListener('keydown', handleKeyDown);
      return () => {
        target.removeEventListener('keydown', handleKeyDown);
      };
    },
    [contain, handleKeyDown],
  );
};
