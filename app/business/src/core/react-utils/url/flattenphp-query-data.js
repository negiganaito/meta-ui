import { invariant } from '@meta-core/error/invariant';

export function flattenPHPQueryData(data) {
  return flattenObject(data, '', {});
}

function flattenObject(obj, prefix, result) {
  if (!obj) {
    result[prefix] = undefined;
  } else if (typeof obj === 'object') {
    typeof obj.appendChild !== 'function' || invariant(0, 2616);

    for (const key in obj) {
      if (key !== '$$typeof' && Object.prototype.hasOwnProperty.call(obj, key) && obj[key] !== undefined) {
        const newPrefix = prefix ? `${prefix}[${key}]` : key;
        flattenObject(obj[key], newPrefix, result);
      }
    }
  } else {
    result[prefix] = obj;
  }

  return result;
}
