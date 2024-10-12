import { JSScheduler } from '@meta-core/scheduler/jss-scheduler';

import { setTimeoutCometInternals } from './set-timeout-comet-internals';

export function setTimeoutComet(a, b) {
  let c =
    JSScheduler.getCurrentPriorityLevel() === JSScheduler.priorities.unstable_Idle
      ? JSScheduler.priorities.unstable_Idle
      : JSScheduler.priorities.unstable_Low;
  // eslint-disable-next-line no-inner-declarations, no-var
  for (var e = arguments.length, f = new Array(e > 2 ? e - 2 : 0), g = 2; g < e; g++) f[g - 2] = arguments[g];
  return setTimeoutCometInternals.setTimeoutAtPriority_DO_NOT_USE.apply(setTimeoutCometInternals, [c, a, b].concat(f));
}
