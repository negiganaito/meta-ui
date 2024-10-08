let g = {
  max: function (a, b) {
    return a <= b;
  },
  min: function (a, b) {
    return a >= b;
  },
};
let h = null;
let i = [];

function a(a) {
  // eslint-disable-next-line no-return-assign
  return a === 'width'
    ? // eslint-disable-next-line no-cond-assign
      (a = h)
      ? void 0
      : a.width_px
    : // eslint-disable-next-line no-cond-assign
    (a = h)
    ? void 0
    : a.height_px;
}

function b() {
  return h;
}

function c(a) {
  h = a;
}

// eslint-disable-next-line max-params
function d(a, b, c, d) {
  let e = i.findIndex((b) => {
    return b.dimension === a && b.operation === c && b.result === d;
  });
  if (e === -1)
    i.push({
      dimension: a,
      numPixels: b,
      operation: c,
      result: d,
    });
  else {
    let f = (c === 'min' && d === !0) || (c === 'max' && d === !1);
    let g = i[e].numPixels;
    i[e].numPixels = f ? Math.max(g, b) : Math.min(g, b);
  }
}
function e() {
  i.length = 0;
  h = null;
}

export const CometSSRViewportHints = {
  check: g,
  useMatchViewportResults: i,
  getDimension: a,
  getDimensionsGuess: b,
  setDimensions: c,
  addUseMatchViewportResult: d,
  clearUseMatchViewportResults: e,
};
