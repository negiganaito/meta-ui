import { MultiKeyMap } from './multi-key-map';

export function memoizeWithArgsWeak(a, b) {
  b === void 0;
  let d = new MultiKeyMap();
  return function () {
    // eslint-disable-next-line no-inner-declarations, no-var
    for (var b = arguments.length, c = new Array(b), e = 0; e < b; e++) c[e] = arguments[e];
    let f = d.get(c);
    if (f !== void 0) return f;
    let g = a.apply(void 0, c);
    d.set(c, g);
    return g;
  };
}
