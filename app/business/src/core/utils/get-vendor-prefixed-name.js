import { invariant } from '@meta-core/error/invariant';
import camelize from 'fbjs/lib/camelize';
import UserAgent from 'fbjs/lib/UserAgent';

import { executionEnvironment } from './executionEnvironment';

let j = {};
let k = ['Webkit', 'ms', 'Moz', 'O'];
let l = new RegExp('^(' + k.join('|') + ')');
let m = executionEnvironment.canUseDOM ? document.createElement('div').style : {};
function n(a) {
  for (let b = 0; b < k.length; b++) {
    let c = k[b] + a;
    if (c in m) return c;
  }
  return null;
}
function o(a) {
  switch (a) {
    case 'lineClamp':
      return UserAgent.isEngine_DEPRECATED_DANGEROUS('WebKit >= 315.14.2') || UserAgent.isEngine('Blink')
        ? 'WebkitLineClamp'
        : null;
    default:
      return null;
  }
}

export function getVendorPrefixedName(a) {
  let b = camelize(a);
  if (j[b] === void 0) {
    let d = b.charAt(0).toUpperCase() + b.slice(1);
    l.test(d) && invariant(0, 957, a);
    executionEnvironment.canUseDOM ? (j[b] = b in m ? b : n(d)) : (j[b] = o(b));
  }
  return j[b];
}
