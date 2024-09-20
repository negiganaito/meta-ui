function isValidStringValue(value) {
  return value && typeof value === 'string' && value !== '' && value !== '[object Object]';
}
