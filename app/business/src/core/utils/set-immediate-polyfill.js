import { invariant } from '@meta-ui/core/error';

import { ImmediateImplementation } from './immediate-implementation';

let h = window.setImmediate;

const PromiseUsePolyfillSetImmediateGK = {
  www_always_use_polyfill_setimmediate: false,
};

if (PromiseUsePolyfillSetImmediateGK.www_always_use_polyfill_setimmediate || !h) {
  const d = ImmediateImplementation;
  h = d.setImmediate;
}

export function setImmediatePolyfill(a) {
  typeof a === 'function' || invariant(0, 5912);
  for (
    // eslint-disable-next-line no-inner-declarations, no-var
    var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1;
    d < b;
    d++
  )
    c[d - 1] = arguments[d];
  return h.apply(void 0, [a].concat(c));
}
