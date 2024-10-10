let g = {};

export function wrapFunction(a, b, c) {
  let d = b in g ? g[b](a, c) : a;
  return function (...args) {
    // eslint-disable-next-line no-inner-declarations, no-var
    for (var a = args.length, b = new Array(a), c = 0; c < a; c++) b[c] = args[c];
    // eslint-disable-next-line no-invalid-this
    return d.apply(this, b);
  };
}

wrapFunction.setWrapper = function (a, b) {
  g[b] = a;
};
