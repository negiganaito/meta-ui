import { err } from '@meta-core/error/err';
import { invariant } from '@meta-core/error/invariant';
import camelize from 'fbjs/lib/camelize';
import containsNode from 'fbjs/lib/containsNode';
import getStyleProperty from 'fbjs/lib/getStyleProperty';
import hyphenate from 'fbjs/lib/hyphenate';

import { getOpacityStyleName } from './getOpacityStyleName';

function i(a, b) {
  a = StyleCore.get(a, b);
  return a === 'auto' || a === 'scroll';
}
// eslint-disable-next-line prefer-regex-literals
let j = new RegExp('\\s*([^\\s:]+)\\s*:\\s*([^;(\'"]*(?:(?:\\([^)]*\\)|"[^"]*"|\'[^\']*\')[^;(?:\'"]*)*)(?:;|$)', 'g');
function k(a) {
  let b = {};
  a.replace(j, (a, c, d) => {
    b[c] = d;
    return d;
  });
  return b;
}
function l(a) {
  let b = '';
  // eslint-disable-next-line guard-for-in
  for (let c in a) a[c] && (b += c + ':' + a[c] + ';');
  return b;
}
function m(a) {
  return a !== '' ? 'alpha(opacity=' + a * 100 + ')' : '';
}
function n(a, b, d) {
  switch (hyphenate(b)) {
    case 'font-weight':
    case 'line-height':
    case 'opacity':
    case 'z-index':
    case 'animation-iteration-count':
    case '-webkit-animation-iteration-count':
      break;
    case 'width':
    case 'height':
      // eslint-disable-next-line no-inner-declarations, no-var
      var e = parseInt(d, 10) < 0;
      e && invariant(0, 11849, a, b, d);
    // eslint-disable-next-line no-fallthrough
    default:
      isNaN(d) || !d || d === '0' || invariant(0, 11850, a, b, d, d + 'px');
      break;
  }
}

// eslint-disable-next-line no-var
export var StyleCore = {
  set: function (a, b, d) {
    n('Style.set', b, d);
    if (a === null) return;
    a = a.style;
    switch (b) {
      case 'opacity':
        getOpacityStyleName() === 'filter' ? (a.filter = m(d)) : (a.opacity = d);
        break;
      case 'float':
        a.cssFloat = a.styleFloat = d || '';
        break;
      default:
        try {
          a[camelize(b)] = d;
        } catch (a) {
          throw err('Style.set: "%s" argument is invalid: %s', b, d);
        }
    }
  },
  apply: function (a, b) {
    let d;
    // eslint-disable-next-line guard-for-in
    for (d in b) n('Style.apply', d, b[d]);
    'opacity' in b && getOpacityStyleName() === 'filter' && ((b.filter = m(b.opacity)), delete b.opacity);
    let e = k(a.style.cssText);
    // eslint-disable-next-line guard-for-in
    for (d in b) {
      let f = b[d];
      delete b[d];
      let g = hyphenate(d);
      // eslint-disable-next-line guard-for-in
      for (let h in e) (h === g || h.indexOf(g + '-') === 0) && delete e[h];
      b[g] = f;
    }
    Object.assign(e, b);
    a.style.cssText = l(e);
  },
  get: getStyleProperty,
  getFloat: function (a, b) {
    return parseFloat(StyleCore.get(a, b), 10);
  },
  getOpacity: function (a) {
    if (getOpacityStyleName() === 'filter') {
      let b = StyleCore.get(a, 'filter');
      if (b) {
        b = /(\d+(?:\.\d+)?)/.exec(b);
        if (b) return parseFloat(b.pop()) / 100;
      }
    }
    return StyleCore.getFloat(a, 'opacity') || 1;
  },
  isFixed: function (a) {
    while (containsNode(document.body, a)) {
      if (StyleCore.get(a, 'position') === 'fixed') return !0;
      a = a.parentNode;
    }
    return !1;
  },
  getScrollParent: function (a) {
    if (!a) return null;
    while (a && a !== document.body) {
      if (i(a, 'overflow') || i(a, 'overflowY') || i(a, 'overflowX')) return a;
      a = a.parentNode;
    }
    return window;
  },
};
