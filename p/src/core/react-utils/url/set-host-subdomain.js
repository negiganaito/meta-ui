export function setHostSubdomain(a, b) {
  a = a.split('.');
  a.length < 3 ? a.unshift(b) : (a[0] = b);
  return a.join('.');
}
