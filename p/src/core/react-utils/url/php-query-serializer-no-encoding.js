import { BaseDeserializePHPQueryData } from './base-deserialize-php-query-data';
import { flattenPHPQueryData } from './flattenphp-query-data';

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
  return str;
}

function deserialize(query) {
  return BaseDeserializePHPQueryData.deserialize(query, decodeComponent);
}

function decodeComponent(str) {
  return str;
}

export const PHPQuerySerializerNoEncoding = {
  decodeComponent,
  deserialize,
  encodeComponent,
  serialize,
};
