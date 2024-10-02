import React from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';

export const GeoBaseHintSingletonContext = React.createContext({
  groups: null,
  setLastHintLayerForGroup: emptyFunction,
});
