export function createObjectFrom(a, b) {
  if (b === void 0) return createObjectFrom(a, !0);
  let c = {};
  // eslint-disable-next-line no-inner-declarations, no-var
  if (Array.isArray(b)) for (var d = a.length - 1; d >= 0; d--) c[a[d]] = b[d];
  else for (d = a.length - 1; d >= 0; d--) c[a[d]] = b;
  return c;
}
