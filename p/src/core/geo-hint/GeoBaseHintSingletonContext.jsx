import React from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';

const GeoBaseHintSingletonContext = React.createContext({
  groups: null,
  setLastHintLayerForGroup: emptyFunction,
});

export default GeoBaseHintSingletonContext;
