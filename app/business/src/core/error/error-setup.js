import { ErrorGlobalEventHandler } from './error-global-event-handler';
import { ErrorPoster } from './error-poster';
import { ErrorPubSub } from './error-pub-sub';
import { ErrorUnhandledRejectionHandler } from './error-unhandled-rejection-handler';

function preSetup(objSetup) {
  if (!objSetup || objSetup.ignoreOnError !== true) {
    ErrorGlobalEventHandler.setup(ErrorPubSub);
  }

  if (!objSetup || objSetup.ignoreOnUnahndledRejection !== true) {
    ErrorUnhandledRejectionHandler.setup(ErrorPubSub);
  }
}

function setup(props, logFunc, context) {
  ErrorPubSub.addListener((nError) => {
    let e = context && context !== undefined ? context() : {};
    // Combine props and context properties
    let _props = {
      ...props,
      ...(e || {}),
    };

    ErrorPoster.postError(nError, _props, logFunc);
  });
}

export const ErrorSetup = {
  setup,
  preSetup,
};
