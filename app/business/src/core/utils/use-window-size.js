import { useCallback } from 'react';

import { executionEnvironment } from './executionEnvironment';
import { throttle } from './throttle';
import { useSubscriptionValue } from './use-subscription-value';

function getCurrentValue() {
  return !executionEnvironment.canUseDOM
    ? {
        innerHeight: 0,
        innerWidth: 0,
        outerHeight: 0,
        outerWidth: 0,
      }
    : {
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth,
        outerHeight: window.outerHeight,
        outerWidth: window.outerWidth,
      };
}

export function useWindowSize(timeout) {
  timeout === void 0 && (timeout = 500);
  let b = useCallback(
    (b) => {
      let d = throttle(b, timeout);
      window.addEventListener('resize', d);
      return function () {
        window.removeEventListener('resize', d);
      };
    },
    [timeout],
  );
  return useSubscriptionValue({
    getCurrentValue: getCurrentValue,
    subscribe: b,
  });
}
