import { setTimeoutAcrossTransitions } from './set-timeout-across-transitions';
import { TimeSliceInteractionSV } from './time-slice-interaction-sv';

const { TimeSlice } = require('@meta-core/scheduler/time-slice');

export function throttle(a, b, d) {
  return h(a, b, d, setTimeout, !1);
}

Object.assign(throttle, {
  acrossTransitions: function (a, b, d) {
    return h(a, b, d, setTimeoutAcrossTransitions, !1);
  },
  withBlocking: function (a, b, d) {
    return h(a, b, d, setTimeout, !0);
  },
  acrossTransitionsWithBlocking: function (a, b, d) {
    return h(a, b, d, setTimeoutAcrossTransitions, !0);
  },
});

// eslint-disable-next-line max-params
function h(a, b, d, e, f) {
  let g = b === null ? 100 : b;
  let h;
  let i = null;
  let j = 0;
  let k = null;
  let l = [];
  // eslint-disable-next-line no-var
  var m = TimeSlice.guard(
    () => {
      j = Date.now();
      if (i) {
        let b = function (b) {
          a.apply(h, b);
        }.bind(null, i);
        let c = l.length;
        while (--c >= 0) b = l[c].bind(null, b);
        l = [];
        b();
        i = null;
        k = e(m, g);
      } else k = null;
    },
    'throttle_' + g + '_ms',
    {
      propagationType: TimeSlice.PropagationType.EXECUTION,
      registerCallStack: !0,
    },
  );
  m.__SMmeta = a.__SMmeta;
  return function (...args) {
    TimeSliceInteractionSV.ref_counting_fix && l.push(TimeSlice.getGuardedContinuation('throttleWithContinuation'));
    // eslint-disable-next-line no-inner-declarations, no-var
    for (var a = args.length, b = new Array(a), n = 0; n < a; n++) b[n] = args[n];
    i = b;
    // eslint-disable-next-line no-invalid-this
    h = this;
    d !== void 0 && (h = d);
    (k === null || Date.now() - j > g) && (f === !0 ? m() : (k = e(m, 0)));
  };
}
