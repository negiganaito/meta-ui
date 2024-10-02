const getDefaultViewForNode = (a) => {
  a = a === document ? document : a.ownerDocument;
  return a.defaultView;
};

export function getComputedStyle(a, b) {
  let d = getDefaultViewForNode(a);
  return !d ? null : d.getComputedStyle(a, b);
}
