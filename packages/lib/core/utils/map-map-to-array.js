export function mapMapToArray(map, callback) {
  const result = [];
  let index = 0;

  for (const [key, value] of map) {
    result.push(callback(value, key, index, map));
    index++;
  }

  return result;
}
