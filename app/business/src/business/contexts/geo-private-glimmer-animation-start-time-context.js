import React from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';

export const GeoPrivateGlimmerAnimationStartTimeContext = React.createContext({
  animationStartTime: undefined,
  setAnimationStartTime: emptyFunction,
});
