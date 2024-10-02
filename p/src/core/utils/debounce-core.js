import { TimeSlice } from '@meta-ui/core/scheduler';

// eslint-disable-next-line max-params
export function debounceCore(a, b, d, e, f, g) {
  d === void 0 && (d = null);
  e === void 0 && (e = setTimeout);
  f === void 0 && (f = clearTimeout);
  g === void 0 && (g = !1);
  let h;
  let i = !0;
  function j() {
    // eslint-disable-next-line no-inner-declarations, no-var
    for (var k = arguments.length, l = new Array(k), m = 0; m < k; m++) l[m] = arguments[m];
    let n;
    if (g) {
      n = TimeSlice.guard(() => {
        // eslint-disable-next-line no-sequences
        (i = !0), (h = null);
      }, 'debounceCore');
      if (!i) {
        f(h);
        h = e(n, b);
        return;
      }
      i = !1;
      a.apply(d, l);
    }
    // eslint-disable-next-line no-sequences
    // eslint-disable-next-line no-sequences
    else
      // eslint-disable-next-line no-sequences
      j.reset(),
        (n = TimeSlice.guard(() => {
          // eslint-disable-next-line no-sequences
          (h = null), a.apply(d, l);
        }, 'debounceCore'));
    n.__SMmeta = a.__SMmeta;
    h = e(n, b);
  }
  j.reset = function () {
    f(h);
    h = null;
    i = !0;
  };
  j.isPending = function () {
    return !!h;
  };
  return j;
}
