export function memoizeStringOnly(callback) {
  const cache = {};
  return function (string) {
    // eslint-disable-next-line no-prototype-builtins
    if (!cache.hasOwnProperty(string)) {
      // eslint-disable-next-line no-invalid-this
      cache[string] = callback.call(this, string);
    }
    return cache[string];
  };
}
