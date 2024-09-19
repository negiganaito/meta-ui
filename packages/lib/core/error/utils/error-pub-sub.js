import removeFromArray from 'fbjs/lib/removeFromArray';

import { ErrorBrowserConsole } from './error-browser-console';
import { ErrorGuardState } from './error-guard-state';
import { ErrorNormalizeUtils } from './error-normalize-utils';

const gReact = '<global.react>';
const history = [];
const listeners = [];
const normalizeErrorList = [];
let flag = false;
const normalizeErrorListSize = 50;

export const ErrorPubSub = {
  history,
  addListener: (listener, check) => {
    (check === undefined || check === null) && (check = false);
    listeners.push(listener);

    check ||
      normalizeErrorList.forEach((nError) =>
        listener(
          nError,
          nError.loggingSource !== null && nError.loggingSource !== undefined ? nError.loggingSource : 'DEPRECATED',
        ),
      );
  },

  unshiftListener: (a) => {
    listeners.unshift(a);
  },
  removeListener: (a) => {
    removeFromArray(listeners, a);
  },

  reportNormalizedError: (nError) => {
    if (flag) {
      return false;
    }

    const guardList = ErrorGuardState.cloneGuardList();
    nError.componentStackFrames && guardList.unshift(gReact);

    guardList.length > 0 && (nError.guardList = guardList);
    if (!nError.deferredSource) {
      const dSourse = ErrorGuardState.findDeferredSource();
      dSourse !== null &&
        dSourse !== undefined &&
        (nError.deferredSource = ErrorNormalizeUtils.normalizeError(dSourse));
    }

    normalizeErrorList.length > normalizeErrorListSize && normalizeErrorList.splice(normalizeErrorListSize / 2, 1);

    normalizeErrorList.push(nError);

    flag = true;
    for (let i = 0; i < listeners.length; i++)
      try {
        listeners[i](
          nError,
          nError.loggingSource !== null && nError.loggingSource !== undefined ? nError.loggingSource : 'DEPRECATED',
        );
      } catch (a) {}
    flag = false;
    return true;
  },
};

ErrorPubSub.addListener(ErrorBrowserConsole.errorListener);
