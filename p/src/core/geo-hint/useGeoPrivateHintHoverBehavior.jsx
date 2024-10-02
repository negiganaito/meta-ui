import useGeoPrivateLazyHoverBehavior from '../hooks/useGeoPrivateLazyHoverBehavior';

import useBoolean from './useBoolean';
import useCallbackListener from './useCallbackListener';
import useDebouncedValue from './useDebouncedValue';

const useGeoPrivateHintHoverBehavior = ({ renderDelay, onToggle }) => {
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

export default useGeoPrivateHintHoverBehavior;
