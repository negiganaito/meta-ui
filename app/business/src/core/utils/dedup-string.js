export function dedupString(a) {
  let b;
  // eslint-disable-next-line no-return-assign
  return Object.keys(((b = {}), (b[a] = 0), b))[0];
}
