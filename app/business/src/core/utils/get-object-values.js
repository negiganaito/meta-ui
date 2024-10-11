export function getObjectValues(a) {
  let b = [];
  // eslint-disable-next-line guard-for-in
  for (let c in a) b.push(a[c]);
  return b;
}
