import { useMemo } from 'react';
import { GeoDataVizAnimationContext } from '@meta-business/contexts/geo-data-viz-animation-context';

export const GeoEnableDataVizAnimationProvider = ({ children, isAnimationEnabled = true }) => {
  const val = useMemo(() => isAnimationEnabled, [isAnimationEnabled]);

  return <GeoDataVizAnimationContext.Provider value={val}>{children}</GeoDataVizAnimationContext.Provider>;
};
