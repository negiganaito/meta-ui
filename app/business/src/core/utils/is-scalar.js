export function isScalar(a) {
  return /string|number|boolean/.test(typeof a);
}
