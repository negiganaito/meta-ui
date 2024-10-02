import { GeoPrivateAnimationLayerContext } from '@meta-ui/business/contexts';

const val = {
  isAnimated: !1,
  isLeaving: !1,
  isEntered: !1,
};

export const GeoPrivateResetAnimationLayer = ({ children }) => {
  return <GeoPrivateAnimationLayerContext.Provider value={val}>{children}</GeoPrivateAnimationLayerContext.Provider>;
};
