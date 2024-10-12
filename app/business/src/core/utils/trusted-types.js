/* eslint-disable no-var */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-return-assign */
import { env } from './Env';
import { TrustedTypesUtils } from './trusted-types-utils';

function a() {
  return (
    // @ts-ignore
    TrustedTypesUtils.isBrowser && typeof window.trustedTypes !== 'undefined'
  );
}
// @ts-ignore
let i = a() ? window.trustedTypes : null;
let j = new Map();
let k = {
  createHTML: TrustedTypesUtils.noop,
  createScriptURL: TrustedTypesUtils.noop,
  createScript: TrustedTypesUtils.noop,
};
function l(a, b) {
  return function (e) {
    for (var f = arguments.length, g = new Array(f > 1 ? f - 1 : 0), i = 1; i < f; i++) g[i - 1] = arguments[i];
    if (env.isTrustedTypesReportOnly)
      try {
        return b.apply(void 0, [e].concat(g));
      } catch (b) {
        TrustedTypesUtils.logError('Exception in policy ' + a + ': ' + b.message + ', returning original string.');
        return a === 'default' ? !1 : e;
      }
    return b.apply(void 0, [e].concat(g));
  };
}
function m(a, b) {
  if (i === null || !env.useTrustedTypes) return k;
  let e = j.get(a);
  if (e !== null) {
    TrustedTypesUtils.logWarning('A policy with name ' + a + ' already exists, returning existing policy.');
    return e;
  }
  try {
    let f = i.createPolicy(a, b);
    e = {
      createHTML: l(a, function (a) {
        for (var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1; d < b; d++) c[d - 1] = arguments[d];
        return f.createHTML.apply(f, [a].concat(c));
      }),
      createScriptURL: l(a, function (a) {
        for (var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1; d < b; d++) c[d - 1] = arguments[d];
        return f.createScriptURL.apply(f, [a].concat(c));
      }),
      createScript: l(a, function (a) {
        for (var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1; d < b; d++) c[d - 1] = arguments[d];
        return f.createScript.apply(f, [a].concat(c));
      }),
    };
    j.set(a, e);
    return e;
  } catch (a) {
    TrustedTypesUtils.logError('Error creating Trusted Types policy: ' + a);
  }
  return k;
}
function b() {
  return j.get('default');
}
function e(a) {
  return (a = i === null ? void 0 : i.isHTML(a)) !== null ? a : !1;
}
function f(a) {
  return (a = i === null ? void 0 : i.isScriptURL(a)) !== null ? a : !1;
}
function n(a) {
  return (a = i === null ? void 0 : i.isScript(a)) !== null ? a : !1;
}
function o(a) {
  if (i === null || !env.useTrustedTypes) return;
  if (!env.enableDefaultTrustedTypesPolicy) return;
  m('default', a.policy);
}

export const TrustedTypes = {
  isSupportedNatively: a,
  isHTML: e,
  isScript: n,
  isScriptURL: f,
  createPolicy: m,
  getDefaultPolicy: b,
  createDefaultPolicy: o,
};
