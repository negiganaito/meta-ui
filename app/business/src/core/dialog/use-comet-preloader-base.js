import { useCallback, useEffect, useRef } from 'react';
import { JSScheduler } from '@meta-core/scheduler/jss-scheduler';
import { setTimeoutCometInternals } from '@meta-core/utils/set-timeout-comet-internals';

const HOVER_IN = 'onhoverin';
const PRESS_IN = 'onpressin';
const HIGH_INTENT = 'onhighintent';
const TIMEOUT_DELAY = 50;

// eslint-disable-next-line max-params
export function useCometPreloaderBase(triggerType, lowIntentCallback, highIntentCallback, onHoverOutCallback, options) {
  const lowTimeoutRef = useRef(null);
  const highTimeoutRef = useRef(null);
  const onHoverOutClearRef = useRef(null);
  const onHighIntentClearRef = useRef(null);

  const scheduleLowPriorityTimeout = (callback) => {
    lowTimeoutRef.current = setTimeoutCometInternals.setTimeoutAtPriority_DO_NOT_USE(
      JSScheduler.priorities.unstable_UserBlocking,
      callback,
      TIMEOUT_DELAY,
    );
  };

  const scheduleHighPriorityTimeout = (callback) => {
    highTimeoutRef.current = setTimeout(callback, TIMEOUT_DELAY);
  };

  options = options ?? {};
  const { highSignalPreloaderCallback, lowSignalPreloaderCallback } = options;

  const handleHoverInPreloader = useCallback(() => {
    if (
      triggerType === 'tooltip' ||
      ((triggerType === 'button' || triggerType === 'button_aggressive') && lowIntentCallback)
    ) {
      const callback = () => {
        if (triggerType === 'tooltip') {
          highIntentCallback?.();
          highSignalPreloaderCallback?.(HOVER_IN);
          lowIntentCallback?.();
        } else if (triggerType === 'button' || triggerType === 'button_aggressive') {
          lowIntentCallback?.();
        }
        lowSignalPreloaderCallback?.(HOVER_IN);
      };
      scheduleLowPriorityTimeout(callback);
    }
    if (triggerType === 'button_aggressive') {
      const callback = () => {
        highIntentCallback?.();
        highSignalPreloaderCallback?.(HOVER_IN);
      };
      scheduleHighPriorityTimeout(callback);
    }
  }, [highIntentCallback, highSignalPreloaderCallback, lowIntentCallback, lowSignalPreloaderCallback, triggerType]);

  const handleHoverOutPreloader = useCallback(() => {
    clearTimeout(lowTimeoutRef.current);
    clearTimeout(highTimeoutRef.current);
    lowTimeoutRef.current = null;
    highTimeoutRef.current = null;
    onHoverOutCallback?.();
    onHoverOutClearRef.current?.();
    onHighIntentClearRef.current?.();
  }, [onHoverOutCallback]);

  const handlePressInPreloader = useCallback(() => {
    if (triggerType === 'button' || triggerType === 'button_aggressive') {
      highIntentCallback?.();
      highSignalPreloaderCallback?.(PRESS_IN);
    }
  }, [highIntentCallback, highSignalPreloaderCallback, triggerType]);

  const handleHighIntentPreloader = useCallback(
    (immediate) => {
      JSScheduler.scheduleSpeculativeCallback(() => {
        if (immediate === true) {
          highIntentCallback?.();
          lowIntentCallback?.();
          lowSignalPreloaderCallback?.(HIGH_INTENT);
          highSignalPreloaderCallback?.(HIGH_INTENT);
        }
      });
    },
    [highIntentCallback, highSignalPreloaderCallback, lowIntentCallback, lowSignalPreloaderCallback],
  );

  const handleHoverMovePreloader = useCallback(() => {
    const callback = () => {
      highIntentCallback?.();
      highSignalPreloaderCallback?.(HOVER_IN);
    };
    clearTimeout(highTimeoutRef.current);
    scheduleHighPriorityTimeout(callback);
  }, [highIntentCallback, highSignalPreloaderCallback]);

  useEffect(() => {
    return () => {
      onHoverOutClearRef.current?.();
      onHighIntentClearRef.current?.();
      clearTimeout(lowTimeoutRef.current);
    };
  }, []);

  return {
    onHighIntentPreloader: handleHighIntentPreloader,
    onHoverInPreloader: handleHoverInPreloader,
    onHoverMovePreloader: handleHoverMovePreloader,
    onHoverOutPreloader: handleHoverOutPreloader,
    onPressInPreloader: handlePressInPreloader,
  };
}
