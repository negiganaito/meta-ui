import React from 'react';
import { FBLogger } from '@meta-core/error/fb-logger';
import emptyFunction from 'fbjs/lib/emptyFunction';

export const CometTriggerAccessibilityAlertContext = React.createContext(() => {
  FBLogger('comet_ax').blameToPreviousFrame().mustfix('CometTriggerAccessibilityAlertContext was not provided.');
  return emptyFunction;
});
