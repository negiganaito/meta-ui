export function isNode(a) {
  let b;
  b = a !== null ? ((b = a.ownerDocument) !== null ? b : a) : document;
  b = (b = b.defaultView) !== null ? b : window;
  return !!(
    a !== null &&
    (typeof b.Node === 'function'
      ? a instanceof b.Node
      : typeof a === 'object' && typeof a.nodeType === 'number' && typeof a.nodeName === 'string')
  );
}
