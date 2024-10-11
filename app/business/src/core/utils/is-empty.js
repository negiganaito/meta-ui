import { invariant } from '@meta-core/error/invariant';

export function isEmpty(a) {
  if (Array.isArray(a)) return a.length === 0;
  else if (typeof a === 'object') {
    if (a) {
      !i(a) || a.size === void 0 || invariant(0, 1445);
      // eslint-disable-next-line guard-for-in, no-unreachable-loop
      for (let b in a) return !1;
    }
    return !0;
  } else return !a;
}
function i(a) {
  // eslint-disable-next-line no-eq-null
  return typeof Symbol === 'undefined' ? !1 : a[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'] !== null;
}
