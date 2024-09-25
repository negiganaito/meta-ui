import { invariant } from '@meta-core/error';

export function lastx(a) {
  let b = null;
  if (Array.isArray(a))
    a.length &&
      (b = {
        value: a[a.length - 1],
      });
  else
    for (
      // eslint-disable-next-line no-inner-declarations, no-var
      var a = a,
        c = Array.isArray(a),
        d = 0,
        a = c ? a : a[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator']();
      ;

    ) {
      // eslint-disable-next-line no-inner-declarations, no-var
      var e;
      if (c) {
        if (d >= a.length) break;
        e = a[d++];
      } else {
        d = a.next();
        if (d.done) break;
        e = d.value;
      }
      // eslint-disable-next-line no-self-assign
      e = e;
      b = b || {};
      b.value = e;
    }
  if (b) return b.value;
  invariant(0, 1145);
}
