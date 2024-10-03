import { TimeSlice } from '@meta-ui/core/scheduler';

import { setImmediatePolyfill } from './set-immediate-polyfill';

export function setImmediateAcrossTransitions(callback, ...args) {
  const guardedCallback = TimeSlice.guard(callback, 'setImmediate', {
    propagationType: TimeSlice.PropagationType.CONTINUATION,
    registerCallStack: true,
  });

  return setImmediatePolyfill(guardedCallback, ...args);
}
