export function mapSet(set, callback) {
  const result = new Set();

  for (const item of set) {
    result.add(callback(item));
  }

  return result;
}
