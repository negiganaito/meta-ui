import { TimeSlice } from '@meta-core/scheduler';

import { setImmediateAcrossTransitions } from './set-immediate-across-transitions';
import { TimerStorage } from './timer-storage';

export function setImmediate(callback, ...args) {
  const wrappedCallback = function (...callbackArgs) {
    TimerStorage.unset(TimerStorage.IMMEDIATE, handle);
    // eslint-disable-next-line no-invalid-this
    Function.prototype.apply.call(callback, this, callbackArgs);
  };

  TimeSlice.copyGuardForWrapper(callback, wrappedCallback);

  const handle = setImmediateAcrossTransitions(wrappedCallback, ...args);
  TimerStorage.set(TimerStorage.IMMEDIATE, handle);

  return handle;
}
