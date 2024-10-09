export function guid() {
  if (
    typeof crypto === 'object' &&
    typeof crypto.getRandomValues === 'function' &&
    typeof String.prototype.padStart === 'function'
  ) {
    let a = crypto.getRandomValues(new Uint32Array(2));
    return 'f' + a[0].toString(16).padStart(8, '0') + a[1].toString(16).padStart(8, '0');
  }
  return 'f' + (Math.random() * (1 << 30)).toString(16).replace('.', '');
}
