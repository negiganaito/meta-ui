export function isSameOrigin(a, b) {
  return !a.getProtocol() || !a.getDomain() || !b.getProtocol() || !b.getDomain()
    ? !1
    : a.getOrigin() === b.getOrigin();
}
