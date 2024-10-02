import { isNullish } from './is-nullish';

// export function shallowArrayEqual(a, b) {
//   if (a === b) return !0;
//   if (isNullish(a) || isNullish(b) || a.length !== b.length) return !1;
//   for (let d = 0, e = a.length; d < e; d++) if (a[d] !== b[d]) return !1;
//   return !0;
// }

export function shallowArrayEqual(a, b) {
  if (a === b) return true;
  if (isNullish(a) || isNullish(b) || a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}
