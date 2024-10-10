import { invariant } from '@meta-core/error/invariant';
import { passiveEventListenerUtil } from '@meta-core/event-interaction/passive-event-listener-util';
import emptyFunction from 'fbjs/lib/emptyFunction';

import { dedupString } from './dedup-string';
import { wrapFunction } from './wrap-function';

const isPassiveEventListenerSupported = passiveEventListenerUtil.isPassiveEventListenerSupported;

let addEventListener;
let removeEventListener;

if (window.addEventListener) {
  // eslint-disable-next-line max-params
  addEventListener = function (target, eventType, listener, options = false) {
    listener.wrapper = wrapFunction(listener, 'entry', dedupString(`DOMEventListener.add ${eventType}`));
    target.addEventListener(eventType, listener.wrapper, isPassiveEventListenerSupported ? options : false);
  };

  // eslint-disable-next-line max-params
  removeEventListener = function (target, eventType, listener, options = false) {
    target.removeEventListener(eventType, listener.wrapper, isPassiveEventListenerSupported ? options : false);
  };
} else if (window.attachEvent) {
  addEventListener = function (target, eventType, listener) {
    listener.wrapper = wrapFunction(listener, 'entry', `DOMEventListener.add ${eventType}`);
    if (!target.attachEvent) {
      invariant(false, 'Target does not support attachEvent');
    }
    target.attachEvent(`on${eventType}`, listener.wrapper);
  };

  removeEventListener = function (target, eventType, listener) {
    if (!target.detachEvent) {
      invariant(false, 'Target does not support detachEvent');
    }
    target.detachEvent(`on${eventType}`, listener.wrapper);
  };
} else {
  addEventListener = emptyFunction;
  removeEventListener = emptyFunction;
}

export const DOMEventListener = {
  // eslint-disable-next-line max-params
  add: function (target, eventType, listener, options = false) {
    addEventListener(target, eventType, listener, options);
    return {
      remove: function () {
        removeEventListener(target, eventType, listener, options);
      },
    };
  },
  remove: removeEventListener,
};
