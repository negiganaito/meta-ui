import { _$ } from './$';
import { StyleCore } from './style-core';

export const Style = {
  ...StyleCore,
  get: function (a, b) {
    typeof a === 'string' && (a = _$(a));
    return StyleCore.get(a, b);
  },
  getFloat: function (a, b) {
    typeof a === 'string' && (a = _$(a));
    return StyleCore.getFloat(a, b);
  },
};
