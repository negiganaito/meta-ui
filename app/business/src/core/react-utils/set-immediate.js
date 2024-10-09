import { TimeSlice } from '@meta-core/scheduler/time-slice';
import { setImmediateAcrossTransitions } from '@meta-core/utils/set-immediate-across-transitions';
import { TimerStorage } from '@meta-core/utils/timer-storage';

export function setImmediate(a) {
  let b;
  let d = function () {
    TimerStorage.unset(TimerStorage.IMMEDIATE, b);
    // eslint-disable-next-line no-inner-declarations, no-var
    for (var d = arguments.length, e = new Array(d), f = 0; f < d; f++) e[f] = arguments[f];
    // eslint-disable-next-line no-invalid-this
    Function.prototype.apply.call(a, this, e);
  };
  TimeSlice.copyGuardForWrapper(a, d);
  // eslint-disable-next-line no-inner-declarations, no-var
  for (var e = arguments.length, f = new Array(e > 1 ? e - 1 : 0), g = 1; g < e; g++) f[g - 1] = arguments[g];
  b = setImmediateAcrossTransitions.apply(void 0, [d].concat(f));
  TimerStorage.set(TimerStorage.IMMEDIATE, b);
  return b;
}
