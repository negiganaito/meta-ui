import { FBLogger } from '@meta-core/error/fb-logger';

let isBrowser = typeof window !== 'undefined';

export const noop = function (a) {
  return a;
};

export function noopAndLog(a) {
  let b = isBrowser && typeof window.origin !== 'undefined' ? window.origin : 'undefined';
  FBLogger('saf_web_trusted_types_rollout', b).blameToPreviousFrame().blameToPreviousFrame().warn(a);
  return a;
}
export function logInfo(a) {
  FBLogger('saf_web').info(
    '[Trusted-Types][%s]: %s',
    isBrowser && typeof window.origin !== 'undefined' ? window.origin : 'undefined',
    a,
  );
}
export function logWarning(a) {
  FBLogger('saf_web').warn(
    '[Trusted-Types][%s]: %s',
    isBrowser && typeof window.origin !== 'undefined' ? window.origin : 'undefined',
    a,
  );
}
export function logError(a) {
  FBLogger('saf_web').mustfix(
    '[Trusted-Types][%s]: %s',
    isBrowser && typeof window.origin !== 'undefined' ? window.origin : 'undefined',
    a,
  );
}
export function logDefaultPolicySanitization(a, b) {
  logWarning(
    "String '" +
      a.toString().slice(0, 15) +
      "' is flowing to DOM XSS sink. Default Trusted Type policy was executed and removed dangerous elements. " +
      ("Returned string is: '" + b.toString().slice(0, 15) + "' If this is breaking your feature, post in ") +
      'Security Infra group.',
  );
}

export const TrustedTypesUtils = {
  isBrowser,
  noop,
  noopAndLog,
  logError,
  logWarning,
  logDefaultPolicySanitization,
};
