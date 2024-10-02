import React from 'react';

const defaultContextValue = {
  isAnimated: false,
  isLeaving: false,
  isEntered: false,
};

const GeoPrivateAnimationLayerContext = React.createContext(defaultContextValue);

export default GeoPrivateAnimationLayerContext;
