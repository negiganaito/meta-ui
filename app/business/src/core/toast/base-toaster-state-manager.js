import { JSScheduler } from '@meta-core/scheduler/jss-scheduler';

import { XPlatReactToasterStateManager } from './XPlat-react-toaster-state-manager';

function callbackScheduler(fn) {
  JSScheduler.scheduleNormalPriCallback(() => {
    fn();
  });
}

const CometMaxEnqueuedToastsSitevarConfig = {
  max: 2,
};

export const BaseToasterStateManager = {
  getInstance: () => {
    return XPlatReactToasterStateManager.getInstance({
      callbackScheduler,
      maxQueuedToasts: CometMaxEnqueuedToastsSitevarConfig.max,
    });
  },
  resetInstance_DO_NOT_USE: () => {
    XPlatReactToasterStateManager.resetInstance_DO_NOT_USE();
  },
};
