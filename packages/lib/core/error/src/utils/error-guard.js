/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { ErrorGuardState } from "./error-guard-state";
import { ErrorNormalizeUtils } from "./error-normalize-utils";
import { ErrorPubSub } from "./error-pub-sub";
import { ErrorSerializer } from "./error-serializer";
import { getErrorSafe } from "./get-error-safe";

const oa = "<anonymous guard>";
let guardGlobalFlag = !1;

// eslint-disable-next-line complexity, max-params
function applyWithGuard(a, b, c, nError) {
  ErrorGuardState.pushGuard({
    name:
      // eslint-disable-next-line no-eq-null
      ((nError === null || nError === void 0 ? void 0 : nError.name) != null
        ? nError.name
        : null) ||
      (a.name ? "func_name:" + a.name : null) ||
      oa,
    deferredSource:
      nError === null || nError === void 0 ? void 0 : nError.deferredSource,
  });
  if (guardGlobalFlag)
    try {
      return a.apply(b, c);
    } finally {
      ErrorGuardState.popGuard();
    }
  try {
    return Function.prototype.apply.call(a, b, c);
  } catch (h) {
    try {
      b = nError !== null && nError !== void 0 ? nError : {};
      let e = b.deferredSource;
      const f = b.onError;
      b = b.onNormalizedError;
      const sError = getErrorSafe(h);
      e = {
        deferredSource: e,
        loggingSource: "GUARDED",
        project:
          (e =
            nError === null || nError === void 0 ? void 0 : nError.project) !==
            null && e !== void 0
            ? e
            : "ErrorGuard",
        type: nError === null || nError === void 0 ? void 0 : nError.errorType,
      };
      ErrorSerializer.aggregateError(sError, e);
      nError = ErrorNormalizeUtils.normalizeError(sError);
      sError === null &&
        a &&
        ((nError.extra[a.toString().substring(0, 100)] = "function"),
        c !== null &&
          c.length &&
          (nError.extra[Array.from(c).toString().substring(0, 100)] = "args"));
      nError.guardList = ErrorGuardState.cloneGuardList();
      f && f(sError);
      b && b(nError);
      ErrorPubSub.reportNormalizedError(nError);
    } catch (a) {}
  } finally {
    ErrorGuardState.popGuard();
  }
}

function guard(a, b) {
  function c(...args) {
    // eslint-disable-next-line no-invalid-this
    return applyWithGuard(a, this, args, b);
  }
  a.__SMmeta && (c.__SMmeta = a.__SMmeta);
  return c;
}

function inGuard() {
  return ErrorGuardState.inGuard();
}

function skipGuardGlobal(flag) {
  guardGlobalFlag = flag;
}

export const ErrorGuard = {
  skipGuardGlobal,
  inGuard,
  guard,
  applyWithGuard,
};
