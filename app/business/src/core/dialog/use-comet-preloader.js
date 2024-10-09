import { useCallback, useMemo } from 'react';

import { useCometPreloaderBase } from './use-comet-preloader-base';

function isMouseEvent(event) {
  return event.pointerType === 'mouse';
}

// eslint-disable-next-line max-params
export function useCometPreloader(
  preloadTriggerType,
  lowIntentCallback,
  highIntentCallback,
  pressIntentCallback,
  preloaderOptions,
) {
  const preloaderCallbacks = useMemo(() => {
    const lowSignalPreloaderCallback = (event) => {
      // Bootloader.forceFlush();
      preloaderOptions?.lowSignalPreloaderCallback?.(event);
    };

    const highSignalPreloaderCallback = (event) => {
      // Bootloader.forceFlush();
      preloaderOptions?.highSignalPreloaderCallback?.(event);
    };

    return {
      highSignalPreloaderCallback,
      lowSignalPreloaderCallback,
    };
  }, [preloaderOptions]);

  const preloader = useCometPreloaderBase(
    preloadTriggerType,
    lowIntentCallback,
    highIntentCallback,
    pressIntentCallback,
    preloaderCallbacks,
  );

  const { onHighIntentPreloader, onHoverInPreloader, onHoverMovePreloader, onHoverOutPreloader, onPressInPreloader } =
    preloader;

  const handlePressInPreloader = useCallback(
    (event) => {
      if (!isMouseEvent(event)) return;
      onPressInPreloader(event);
    },
    [onPressInPreloader],
  );

  return {
    onHighIntentPreloader,
    onHoverInPreloader,
    onHoverMovePreloader,
    onHoverOutPreloader,
    onPressInPreloader: handlePressInPreloader,
  };
}
