/* eslint-disable no-self-assign */

import { CSS } from './CSS';

/* eslint-disable camelcase */
function byTag(a, b) {
  b = b.toUpperCase();
  a = find(a, (a) => {
    return a.nodeName === b;
  });
  return a instanceof Element ? a : null;
}

function byClass(a, b) {
  a = find(a, (a) => {
    return a instanceof Element && CSS.hasClass(a, b);
  });
  return a instanceof Element ? a : null;
}

function bySelector(a, b) {
  a = a;
  if (typeof a.matches === 'function') {
    while (a && a !== document && !a.matches(b)) a = a.parentNode;
    return a instanceof Element ? a : null;
  } else if (typeof a.msMatchesSelector === 'function') {
    while (a && a !== document && !a.msMatchesSelector(b)) a = a.parentNode;
    return a instanceof Element ? a : null;
  } else return bySelector_SLOW(a, b);
}

function bySelector_SLOW(a, b) {
  a = a;
  let c = a;
  while (c.parentNode) c = c.parentNode;
  if (!(c instanceof Element) && !(c instanceof Document)) return null;
  c = c.querySelectorAll(b);
  while (a) {
    if (Array.prototype.indexOf.call(c, a) !== -1) return a instanceof Element ? a : null;
    a = a.parentNode;
  }
  return a instanceof Element ? a : null;
}

function byAttribute(a, b) {
  a = find(a, (a) => {
    return a instanceof Element && !!a.getAttribute(b);
  });
  return a instanceof Element ? a : null;
}

function find(a, b) {
  a = a;
  while (a) {
    if (b(a)) return a;
    a = a.parentNode;
  }
  return null;
}

export const parent = {
  find,
  byAttribute,
  bySelector_SLOW,
  bySelector,
  byClass,
  byTag,
};
