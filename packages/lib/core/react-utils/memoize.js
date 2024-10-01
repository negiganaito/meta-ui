import { invariant } from '@meta-ui/core/error';

export function memoize(a) {
  let b = a;
  let c;
  return function () {
    arguments.length && invariant(0, 4494);
    b && ((c = b()), (b = null));
    return c;
  };
}
