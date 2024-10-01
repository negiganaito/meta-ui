export function nullthrows(a, b) {
  b === void 0 && (b = 'Got unexpected null or undefined');
  if (a) return a;
  a = new Error(b);
  a.framesToPop = 1;
  throw a;
}
