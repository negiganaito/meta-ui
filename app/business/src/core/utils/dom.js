import { FBLogger } from '@meta-core/error/fb-logger';
import { TAAL } from '@meta-core/error/taal';

import { _$ } from './$';
import { createArrayFromMixed } from './create-array-from-mixed';
import { DOMQuery } from './dom-query';
import { ee as Event } from './event';
import { HTML } from './html';
import { isNode } from './is-node';
import { isTextNode } from './is-text-node';
import { UserAgent_DEPRECATED } from './user-agent_DEPRECATED';

const a = function (a, b, c) {
  a = document.createElement(a);
  b && h.setAttributes(a, b);
  c !== null && h.setContent(a, c);
  return a;
};

let b;

// eslint-disable-next-line no-var
var h = {
  find: (b = DOMQuery).find,
  findPushSafe: b.findPushSafe,
  scry: b.scry,
  getSelection: b.getSelection,
  contains: b.contains,
  getRootElement: b.getRootElement,
  isNodeOfType: b.isNodeOfType,
  isInputNode: b.isInputNode,
  create: a,
  setAttributes: function (a, b) {
    b.type && (a.type = b.type);
    // eslint-disable-next-line guard-for-in
    for (let d in b) {
      let e = b[d];
      let f = /^on/i.test(d);
      f &&
        typeof e !== 'function' &&
        FBLogger('dom').warn(
          'Handlers passed to DOM.setAttributes must be functions. Handler passed for %s was %s',
          d,
          typeof e,
        );
      if (d == 'type') continue;
      else
        d == 'style'
          ? typeof e === 'string'
            ? (a.style.cssText = e)
            : Object.assign(a.style, e)
          : f
          ? Event.listen(a, d.substr(2), e)
          : d in a
          ? (a[d] = e)
          : a.setAttribute && a.setAttribute(d, e);
    }
  },
  prependContent: function (a, b) {
    if (!a) throw TAAL.blameToPreviousFile(new Error('reference element is not a node'));
    return j(b, a, (b) => {
      a.firstChild ? a.insertBefore(b, a.firstChild) : a.appendChild(b);
    });
  },
  insertAfter: function (a, b) {
    if (!a || !a.parentNode) throw TAAL.blameToPreviousFile(new Error('reference element does not have a parent'));
    let d = a.parentNode;
    return j(b, d, (b) => {
      a.nextSibling ? d.insertBefore(b, a.nextSibling) : d.appendChild(b);
    });
  },
  insertBefore: function (a, b) {
    if (!a || !a.parentNode) throw TAAL.blameToPreviousFile(new Error('reference element does not have a parent'));
    let d = a.parentNode;
    return j(b, d, (b) => {
      d.insertBefore(b, a);
    });
  },
  setContent: function (a, b) {
    if (!a) throw TAAL.blameToPreviousFile(new Error('reference element is not a node'));
    while (a.firstChild) i(a.firstChild);
    return h.appendContent(a, b);
  },
  appendContent: function (a, b) {
    if (!a) throw TAAL.blameToPreviousFile(new Error('reference element is not a node'));
    return j(b, a, (b) => {
      a.appendChild(b);
    });
  },
  replace: function (a, b) {
    if (!a || !a.parentNode) throw TAAL.blameToPreviousFile(new Error('reference element does not have a parent'));
    let d = a.parentNode;
    return j(b, d, (b) => {
      d.replaceChild(b, a);
    });
  },
  remove: function (a) {
    i(typeof a === 'string' ? _$(a) : a);
  },
  empty: function (a) {
    a = typeof a === 'string' ? _$(a) : a;
    while (a.firstChild) i(a.firstChild);
  },
};
function i(a) {
  a.parentNode && a.parentNode.removeChild(a);
}
// eslint-disable-next-line complexity
function j(a, b, e) {
  a = HTML.replaceJSONWrapper(a);
  if (a instanceof HTML && b.firstChild === null && a.toString().indexOf('<script') === -1) {
    // eslint-disable-next-line no-inner-declarations, no-var
    var f = UserAgent_DEPRECATED.ie();
    if (!f || (f > 7 && !DOMQuery.isNodeOfType(b, ['table', 'tbody', 'thead', 'tfoot', 'tr', 'select', 'fieldset']))) {
      // eslint-disable-next-line no-inner-declarations, no-var
      var g = f ? '<em style="display:none;">&nbsp;</em>' : '';
      b.innerHTML = c('TrustedTypesIEFixDOMPolicy').createHTML(g + a);
      f && b.removeChild(b.firstChild);
      return Array.from(b.childNodes);
    }
  } else if (isTextNode(b)) {
    b.data = a;
    return [a];
  }
  g = document.createDocumentFragment();
  let h;
  f = [];
  b = [];
  let i = !1;
  a = createArrayFromMixed(a);
  a.length === 1 && a[0] instanceof c('FbtResultBase') && (a = a[0].getContents());
  for (let j = 0; j < a.length; j++) {
    h = HTML.replaceJSONWrapper(a[j]);
    if (h instanceof HTML) {
      b.push(h.getAction());
      let k = h.getNodes();
      !i &&
        h.hasInlineJs() &&
        (FBLogger('staticresources').warn('DOM: adding HTML which contains inline JS'), (i = !0));
      // eslint-disable-next-line no-sequences, no-inner-declarations, no-var
      for (var l = 0; l < k.length; l++) f.push(k[l]), g.appendChild(k[l]);
    } else if (c('isScalar')(h) || h instanceof c('FbtResultBase')) {
      l = document.createTextNode(h);
      f.push(l);
      g.appendChild(l);
    } else
      isNode(h)
        ? (f.push(h), g.appendChild(h))
        : (Array.isArray(h) && FBLogger('dom').warn('Nest arrays not supported'),
          h !== null && FBLogger('dom').warn('No way to set content %s', h));
  }
  e(g);
  b.forEach((a) => {
    a();
  });
  return f;
}
