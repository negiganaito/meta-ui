import { TimeSlice } from '@meta-core/scheduler/time-slice';

import { setImmediatePolyfill } from './set-immediate-polyfill';

export function setImmediateAcrossTransitions(callback, ...args) {
  const guardedCallback = TimeSlice.guard(callback, 'setImmediate', {
    propagationType: TimeSlice.PropagationType.CONTINUATION,
    registerCallStack: true,
  });

  return setImmediatePolyfill(guardedCallback, ...args);
}
