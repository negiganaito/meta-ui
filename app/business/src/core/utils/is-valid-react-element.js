let g = (typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element')) || 60103;

export function isValidReactElement(a) {
  return !!(typeof a === 'object' && a !== null && a.$$typeof === g);
}
