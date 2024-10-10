import CSSCore from 'fbjs/lib/CSSCore';

import { _$ } from './$';

let h = typeof window !== 'undefined' ? window.CSS : null;
let i = 'hidden_elem';
h = h && h.supports.bind(h);
function a(a, b) {
  _$.fromIDOrElement(a).className = b || '';
  return a;
}
function j(a, b) {
  return a instanceof Document || a instanceof Text ? !1 : CSSCore.hasClass(_$.fromIDOrElement(a), b);
}
function b(a, b) {
  return a instanceof Document || a instanceof Text ? !1 : CSSCore.matchesSelector(_$.fromIDOrElement(a), b);
}
function k(a, b) {
  return CSSCore.addClass(_$.fromIDOrElement(a), b);
}
function l(a, b) {
  return CSSCore.removeClass(_$.fromIDOrElement(a), b);
}
function m(a, b, e) {
  return CSSCore.conditionClass(_$.fromIDOrElement(a), b, !!e);
}
function n(a, b) {
  return m(a, b, !j(a, b));
}
function e(a) {
  return !j(a, i);
}
function f(a) {
  return k(a, i);
}
function o(a) {
  return l(a, i);
}
function p(a) {
  return n(a, i);
}
function q(a, b) {
  return m(a, i, !b);
}

export const CSS = {
  supports: h,
  setClass: a,
  hasClass: j,
  matchesSelector: b,
  addClass: k,
  removeClass: l,
  conditionClass: m,
  toggleClass: n,
  shown: e,
  hide: f,
  show: o,
  toggle: p,
  conditionShow: q,
};
