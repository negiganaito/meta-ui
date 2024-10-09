let g = [];
let h = [];
export function areEqual(a, b) {
  let c = g.length ? g.pop() : [];
  let d = h.length ? h.pop() : [];
  a = i(a, b, c, d);
  c.length = 0;
  d.length = 0;
  g.push(c);
  h.push(d);
  return a;
}

// eslint-disable-next-line complexity, max-params
function i(a, b, c, d) {
  if (a === b) return a !== 0 || 1 / a === 1 / b;
  if (a === null || b === null) return !1;
  if (typeof a !== 'object' || typeof b !== 'object') return !1;
  // eslint-disable-next-line no-var
  var e = Object.prototype.toString;
  let f = e.call(a);
  if (f !== e.call(b)) return !1;
  switch (f) {
    case '[object String]':
      return a === String(b);
    case '[object Number]':
      return isNaN(a) || isNaN(b) ? !1 : a === Number(b);
    case '[object Date]':
    case '[object Boolean]':
      return Number(a) === Number(b);
    case '[object RegExp]':
      return (
        a.source === b.source && a.global === b.global && a.multiline === b.multiline && a.ignoreCase === b.ignoreCase
      );
  }
  e = c.length;
  while (e--) if (c[e] === a) return d[e] === b;
  c.push(a);
  d.push(b);
  try {
    e = 0;
    if (f === '[object Array]') {
      e = a.length;
      if (e !== b.length) return !1;
      while (e--) if (!i(a[e], b[e], c, d)) return !1;
    } else if (a instanceof Set) {
      if (a.size !== b.size) return !1;
      f = Array.from(b.values());
      for (
        // eslint-disable-next-line no-inner-declarations, no-var
        var e = a,
          g = Array.isArray(e),
          h = 0,
          e = g ? e : e[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator']();
        ;

      ) {
        // eslint-disable-next-line no-inner-declarations, no-var
        var j;
        if (g) {
          if (h >= e.length) break;
          j = e[h++];
        } else {
          h = e.next();
          if (h.done) break;
          j = h.value;
        }
        // eslint-disable-next-line no-self-assign
        j = j;
        // eslint-disable-next-line no-inner-declarations, no-var
        var k = !1;
        // eslint-disable-next-line no-inner-declarations, no-var
        for (var l = 0; l < f.length; l++) {
          // eslint-disable-next-line no-var, no-inner-declarations
          var m = f[l];
          if (i(j, m, c, d)) {
            k = !0;
            f.splice(l, 1);
            break;
          }
        }
        if (k === !1) return !1;
      }
      return !0;
    } else if (a instanceof Map) {
      if (a.size !== b.size) return !1;
      m = Array.from(b);
      for (
        j = a,
          l = Array.isArray(j),
          k = 0,
          j = l ? j : j[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator']();
        ;

      ) {
        if (l) {
          if (k >= j.length) break;
          h = j[k++];
        } else {
          k = j.next();
          if (k.done) break;
          h = k.value;
        }
        g = h;
        e = !1;
        for (f = 0; f < m.length; f++) {
          h = m[f];
          if (i(g, h, c, d)) {
            e = !0;
            m.splice(f, 1);
            break;
          }
        }
        if (e === !1) return !1;
      }
      return !0;
    } else {
      if (a.constructor !== b.constructor) return !1;
      if (Object.prototype.hasOwnProperty.call(a, 'valueOf') && Object.prototype.hasOwnProperty.call(b, 'valueOf'))
        return a.valueOf() === b.valueOf();
      h = Object.keys(a);
      if (h.length !== Object.keys(b).length) return !1;
      for (f = 0; f < h.length; f++) {
        if (h[f] === '_owner') continue;
        if (!Object.prototype.hasOwnProperty.call(b, h[f]) || !i(a[h[f]], b[h[f]], c, d)) return !1;
      }
    }
    return !0;
  } finally {
    // eslint-disable-next-line no-sequences
    c.pop(), d.pop();
  }
}
