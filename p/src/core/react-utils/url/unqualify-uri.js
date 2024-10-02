export function unqualifyURI(a) {
  return a.setProtocol('').setDomain('').setPort('');
}
