export const mixin = (...args) => {
  let a = function () {};
  let b = 0;
  let c;

  while (b < 0 || args.length <= b ? void 0 : args[b]) {
    c = b < 0 || args.length <= b ? void 0 : args[b];
    // eslint-disable-next-line guard-for-in
    for (let d in c) Object.prototype.hasOwnProperty.call(c, d) && (a.prototype[d] = c[d]);
    b += 1;
  }
  return a;
};
