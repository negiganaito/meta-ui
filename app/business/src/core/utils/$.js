import { fbErrorLite } from '@meta-core/error/fb-error-lite';

function a(a) {
  return h(a, typeof a === 'string' ? document.getElementById(a) : a);
}

function b(a) {
  return h(a, typeof a === 'string' ? document.getElementById(a) : a);
}

function h(a, b) {
  if (!b) {
    a = fbErrorLite.err('Tried to get element with id of "%s" but it is not present on the page', String(a));
    a.taalOpcodes = a.taalOpcodes || [];
    a.taalOpcodes = [fbErrorLite.TAALOpcode.PREVIOUS_FILE];
    throw a;
  }
  return b;
}

export const _$ = {
  fromIDOrElement: b,
};
