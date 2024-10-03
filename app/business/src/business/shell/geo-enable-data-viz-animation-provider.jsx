import { useMemo } from 'react';
import { GeoDataVizAnimationContext } from '@meta-ui/business/contexts';

export const GeoEnableDataVizAnimationProvider = ({ children, isAnimationEnabled = true }) => {
  const val = useMemo(() => {
    return {
      isAnimationEnabled,
    };
  }, [isAnimationEnabled]);

  return <GeoDataVizAnimationContext.Provider value={val}>{children}</GeoDataVizAnimationContext.Provider>;
};
