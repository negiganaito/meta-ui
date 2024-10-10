import { isTextNode } from './is-text-node';

export function containsNode(a, b) {
  if (!a || !b) return !1;
  else if (a === b) return !0;
  else if (isTextNode(a)) return !1;
  else if (isTextNode(b)) return containsNode(a, b.parentNode);
  else if ('contains' in a) return a.contains(b);
  else if (a.compareDocumentPosition) return !!(a.compareDocumentPosition(b) & 16);
  else return !1;
}
