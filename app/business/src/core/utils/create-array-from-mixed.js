import { invariant } from '@meta-core/error/invariant';

function i(a) {
  let b = a.length;
  (!Array.isArray(a) && (typeof a === 'object' || typeof a === 'function')) || invariant(0, 3914);
  typeof b === 'number' || invariant(0, 3915);
  b === 0 || b - 1 in a || invariant(0, 3916);
  typeof a.callee !== 'function' || invariant(0, 3917);
  if (a.hasOwnProperty)
    try {
      return Array.prototype.slice.call(a);
    } catch (a) {}
  let c = Array(b);
  for (let d = 0; d < b; d++) c[d] = a[d];
  return c;
}
function j(a) {
  return (
    !!a &&
    (typeof a === 'object' || typeof a === 'function') &&
    'length' in a &&
    !('setInterval' in a) &&
    typeof a.nodeType !== 'number' &&
    (Array.isArray(a) || 'callee' in a || 'item' in a)
  );
}

export function createArrayFromMixed(a) {
  if (!j(a)) return [a];
  else if (Array.isArray(a)) return a.slice();
  else return i(a);
}
