import { flattenPHPQueryData } from './flattenphp-query-data';
import { PHPQuerySerializer } from './php-query-serializer';

function serialize(data) {
  const result = [];
  const flattenedData = flattenPHPQueryData(data);

  for (const key in flattenedData) {
    if (Object.prototype.hasOwnProperty.call(flattenedData, key)) {
      const encodedKey = encodeComponent(key);
      if (flattenedData[key] === undefined) {
        result.push(encodedKey);
      } else {
        result.push(`${encodedKey}=${encodeComponent(String(flattenedData[key]))}`);
      }
    }
  }

  return result.join('&');
}

function encodeComponent(str) {
  return encodeURIComponent(str);
}

export const PHPStrictQuerySerializer = {
  serialize,
  encodeComponent,
  deserialize: PHPQuerySerializer.deserialize,
  decodeComponent: PHPQuerySerializer.decodeComponent,
};
