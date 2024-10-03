import { useBoolean } from '@meta-core/hooks/use-boolean';
import { useCallbackListener } from '@meta-core/hooks/use-callback-listener';
import { useDebouncedValue } from '@meta-core/hooks/use-debounced-value';

import { useGeoPrivateLazyHoverBehavior } from './use-geo-private-lazy-hover-behavior';

export const useGeoPrivateHintHoverBehavior = ({ renderDelay, onToggle }) => {
  const { value: isVisible, setTrue: showLayer, setFalse: hideLayer } = useBoolean(false);

  const { onShow: lazyShowLayer, onHide: lazyHideLayer } = useGeoPrivateLazyHoverBehavior({
    renderDelay,
    onShow: showLayer,
    onHide: hideLayer,
  });

  const debouncedIsVisible = useDebouncedValue(isVisible, 50);

  useCallbackListener(onToggle, debouncedIsVisible);

  return {
    isLayerVisible: debouncedIsVisible,
    onShowLayer: lazyShowLayer,
    onHideLayer: lazyHideLayer,
  };
};
