const PARAMETER_PATTERN = /^([-_\w]+)((?:\[[-_\w]*\])+)=?(.*)/;

function sanitizeKey(key) {
  return key === 'hasOwnProperty' || key === '__proto__' ? '\ud83d\udf56' : key;
}

function deserialize(query, decodeFunction) {
  if (!query || query === '') {
    return {};
  }

  const result = {};
  query = query.replace(/%5B/gi, '[').replace(/%5D/gi, ']');
  const pairs = query.split('&');

  for (let i = 0, len = pairs.length; i < len; i++) {
    const match = pairs[i].match(PARAMETER_PATTERN);
    if (!match) {
      const equalIndex = pairs[i].indexOf('=');
      if (equalIndex === -1) {
        result[decodeFunction(pairs[i])] = null;
      } else {
        const key = pairs[i].substring(0, equalIndex);
        const value = pairs[i].substring(equalIndex + 1);
        result[decodeFunction(key)] = decodeFunction(value);
      }
    } else {
      const keys = match[2].split(/\]\[|\[|\]/).slice(0, -1);
      const firstKey = match[1];
      const value = decodeFunction(match[3] || '');
      keys[0] = firstKey;

      let current = result;
      for (let j = 0; j < keys.length - 1; j++) {
        const key = sanitizeKey(keys[j]);
        if (key) {
          if (!Object.prototype.hasOwnProperty.call(current, key)) {
            const nextIsNumeric = keys[j + 1] && !keys[j + 1].match(/^\d{1,3}$/);
            current[key] = nextIsNumeric ? {} : [];
            // eslint-disable-next-line max-depth, no-self-compare
            if (current[key] !== current[key]) {
              return result;
            }
          }
          current = current[key];
        } else {
          const nextIsNumeric = keys[j + 1] && !keys[j + 1].match(/^\d{1,3}$/);
          current.push(nextIsNumeric ? {} : []);
          current = current[current.length - 1];
        }
      }

      const lastKey = sanitizeKey(keys[keys.length - 1]);
      if (current instanceof Array && lastKey === '') {
        current.push(value);
      } else {
        current[lastKey] = value;
      }
    }
  }

  return result;
}

export const BaseDeserializePHPQueryData = {
  deserialize,
};
