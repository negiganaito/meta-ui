import { invariant } from '@meta-ui/core/error';

import { lastx } from './lastx';

let i = typeof WeakMap === 'function';

export class MultiKeyMap {
  constructor() {
    this.$1 = this.$2();
    this.$3 = null;
  }

  set = (a, b) => {
    this.$4(a);
    let c = this.$1;
    for (let d = 0; d < a.length - 1; d++) {
      // eslint-disable-next-line no-inner-declarations, no-var
      var e = a[d];
      let f = this.$5(c, e).get(e);
      !f && ((f = this.$2()), this.$5(c, e).set(e, f));
      f.type === 'map' || invariant(0, 1732);
      c = f;
    }
    e = a[a.length - 1];
    this.$5(c, e).set(e, {
      type: 'value',
      value: b,
    });
  };

  get = (a) => {
    this.$4(a);
    let b = this.$6(a);
    b = b && b.get(lastx(a));
    return !b || b.type !== 'value' ? void 0 : b.value;
  };

  delete = (a) => {
    this.$4(a);
    let b = this.$6(a);
    return b ? b['delete'](lastx(a)) : !1;
  };

  $5 = (a, b) => {
    return j(b) ? a.cache : a.weakCache;
  };
  $6 = (a) => {
    let b = this.$1;
    for (let d = 0; d < a.length - 1; d++) {
      // eslint-disable-next-line no-inner-declarations, no-var
      var e;
      // eslint-disable-next-line no-inner-declarations, no-var
      var f = a[d];
      if ((!(e = b) ? void 0 : e.type) === 'map') b = this.$5(b, f).get(f);
      else return void 0;
    }
    e = lastx(a);
    f = b && this.$5(b, e);
    return f;
  };

  $2 = () => {
    return {
      type: 'map',
      cache: new Map(),
      weakCache: i ? new WeakMap() : new Map(),
    };
  };

  $4 = (a) => {
    !this.$3 && (this.$3 = a.length);
    if (this.$3 !== a.length) throw new Error('MultiKeyMap called with different number of keys');
    if (a.length < 1) throw new Error('MultiKeyMap called with empty array of keys');
  };
}

function j(a) {
  let b = typeof a;
  return b === 'number' || b === 'string' || b === 'boolean' || !a;
}
