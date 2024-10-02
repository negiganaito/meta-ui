export function getImageSourceURLFromImageish(a) {
  if (typeof a === 'string') return a;
  return a && typeof a === 'object' && !a.sprited && a.uri && typeof a.uri === 'string' ? a.uri : '';
}
