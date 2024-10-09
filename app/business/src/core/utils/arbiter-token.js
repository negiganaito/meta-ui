/* eslint-disable no-sequences */

import { invariant } from '@meta-core/error/invariant';

/* eslint-disable no-invalid-this */
export const ArbiterToken = (function () {
  function a(a, b) {
    (this.unsubscribe = function () {
      for (let a = 0; a < this.$2.length; a++) this.$2[a].remove();
      this.$2.length = 0;
    }),
      (this.$1 = a),
      (this.$2 = b);
  }
  let b = a.prototype;
  b.isForArbiterInstance = function (a) {
    this.$1 || invariant(0, 2506);
    return this.$1 === a;
  };
  return a;
})();
