import { FBLogger } from '@meta-core/error/fb-logger';
import { ge } from '@meta-core/react-utils/ge';
import containsNode from 'fbjs/lib/containsNode';

import { createArrayFromMixed } from './create-array-from-mixed';
import { createObjectFrom } from './create-object-from';
import { CSS } from './CSS';
import { isElementNode } from './is-element-node';
import { isNode } from './is-node';

let h = /^\.-?[_a-zA-Z]+[\w-]*$/;
function i(a, b) {
  return a.hasAttribute ? a.hasAttribute(b) : a.getAttribute(b) !== null;
}
function a(a, b) {
  a = j(a, b);
  return a[0];
}
function b(a, b, c) {
  b = j(a, b);
  a = j(a, c);
  b.length === 1 && a.length === 1 && b[0] === a[0] ? (c = b) : (c = b.concat(a));
  return c[0];
}
// eslint-disable-next-line complexity
function j(a, b) {
  if (!a || !a.getElementsByTagName) return [];
  b = b.split(' ');
  let e = [a];
  for (let f = 0; f < b.length; f++) {
    if (e.length === 0) break;
    if (b[f] === '') continue;
    let g = b[f];
    let j = b[f];
    let k = [];
    let l = !1;
    if (g.charAt(0) === '^')
      if (f === 0)
        // eslint-disable-next-line no-sequences
        (l = !0), (g = g.slice(1));
      else return [];
    g = g.replace(/\[(?:[^=\]]*=(?:\"[^\"]*\"|\'[^\']*\'))?|[.#]/g, ' $&');
    g = g.split(' ');
    let m = g[0] || '*';
    let n = m === '*';
    let o = g[1] && g[1].charAt(0) === '#';
    if (o) {
      o = ge(g[1].slice(1), a, m);
      if (o && (n || o.tagName.toLowerCase() === m))
        // eslint-disable-next-line no-inner-declarations, no-var
        for (var p = 0; p < e.length; p++)
          if (l && containsNode(o, e[p])) {
            k = [o];
            break;
          } else if (document === e[p] || (containsNode(e[p], o) && e[p] !== o)) {
            k = [o];
            break;
          }
    } else {
      o = [];
      p = e.length;
      // eslint-disable-next-line no-inner-declarations, no-var
      var q;
      let r = !l && j.indexOf('[') < 0 && document.querySelectorAll;
      // eslint-disable-next-line no-inner-declarations, no-var
      for (var s = 0; s < p; s++) {
        if (l) {
          q = [];
          // eslint-disable-next-line no-inner-declarations, no-var
          var t = e[s].parentNode;
          // eslint-disable-next-line no-sequences
          while (isElementNode(t)) (n || t.tagName.toLowerCase() === m) && q.push(t), (t = t.parentNode);
        } else
          r
            ? h.test(j)
              ? (q = e[s].getElementsByClassName(j.substring(1)))
              : (q = e[s].querySelectorAll(j))
            : (q = e[s].getElementsByTagName(m));
        t = q.length;
        // eslint-disable-next-line no-inner-declarations, no-var
        for (var u = 0; u < t; u++) o.push(q[u]);
      }
      if (!r)
        for (q = 1; q < g.length; q++) {
          t = g[q];
          u = t.charAt(0) === '.';
          n = t.substring(1);
          for (s = 0; s < o.length; s++) {
            p = o[s];
            if (!p || p.nodeType !== 1) continue;
            if (u) {
              CSS.hasClass(p, n) || delete o[s];
              continue;
            } else {
              j = t.slice(1, t.length - 1);
              m = j.indexOf('=');
              if (m < 0) {
                // eslint-disable-next-line max-depth
                if (!i(p, j)) {
                  delete o[s];
                  continue;
                }
              } else {
                r = j.substr(0, m);
                j = j.substr(m + 1);
                j = j.slice(1, j.length - 1);
                // eslint-disable-next-line max-depth
                if (p.getAttribute(r) !== j) {
                  delete o[s];
                  continue;
                }
              }
            }
          }
        }
      for (s = 0; s < o.length; s++)
        if (o[s]) {
          k.push(o[s]);
          if (l) break;
        }
    }
    e = k;
  }
  return e;
}
function e() {
  let a = window.getSelection;
  if (a) return String(a());
  else {
    a = document.selection;
    if (a) return a.createRange().text;
  }
  return null;
}
function f(a, b) {
  (typeof a === 'string' || typeof b === 'string') &&
    FBLogger('dom_query').info('Support for node IDs is deprecated. Use containsNode(ge(<id1>), ge(<id2>)) instead');
  return containsNode(ge(a), ge(b));
}
function k() {
  // let a = c('ifRequired')('Quickling', (a) => {
  //   return a.isActive() ? ge('content') : null;
  // });
  // return a || document.body;

  return document.body;
}
function l(a, b) {
  b = createArrayFromMixed(b).join('|').toUpperCase().split('|');
  b = createObjectFrom(b);
  return isNode(a) && a.nodeName in b;
}
function m(a) {
  return l(a, ['input', 'textarea']) || a.contentEditable === 'true';
}

export const DOMQuery = {
  find: a,
  findPushSafe: b,
  scry: j,
  getSelection: e,
  contains: f,
  getRootElement: k,
  isNodeOfType: l,
  isInputNode: m,
};
