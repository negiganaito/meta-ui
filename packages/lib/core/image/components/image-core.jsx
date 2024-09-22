import { URI } from '@meta-core/react-utils';

function isValidStringValue(value) {
  // return value && typeof value === 'string' && value !== '' && value !== '[object Object]';

  return value instanceof URI ? value.toString() : value;
}
