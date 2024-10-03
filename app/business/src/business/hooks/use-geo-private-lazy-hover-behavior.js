import { useCallback, useContext } from 'react';
import { GeoLazyContext } from '@meta-business/contexts/geo-lazy-context';
import { useDebounced } from '@meta-core/hooks/use-debounced';

const DEFAULT_DELAY = 500;

export const useGeoPrivateLazyHoverBehavior = ({ renderDelay = 0, onHide, onShow }) => {
  const isLazy = useContext(GeoLazyContext);
  const delay = isLazy ? DEFAULT_DELAY : renderDelay;
  const debouncedShow = useDebounced(onShow, delay);

  const handleHide = useCallback(() => {
    debouncedShow.reset();
    onHide();
  }, [debouncedShow, onHide]);

  const handleShow = delay === 0 ? onShow : debouncedShow;
  const handleDelayedHide = delay === 0 ? onHide : handleHide;

  return {
    onShow: handleShow,
    onHide: handleDelayedHide,
  };
};
