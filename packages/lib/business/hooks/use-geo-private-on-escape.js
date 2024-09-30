import { useCallback } from 'react';
import { useRefEffect } from '@meta-ui/core/hooks';
import { Keys } from '@meta-ui/core/utils';

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
