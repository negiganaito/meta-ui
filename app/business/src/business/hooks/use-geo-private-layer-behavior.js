import React, { useContext, useMemo } from 'react';
import { GeoPrivateLayerContext } from '@meta-business/contexts/geo-private-layer-context';
import { useMergeRefs } from '@meta-core/react-utils/use-merge-refs';

export const useGeoPrivateLayerBehavior = ({ ref, xstyle }) => {
  const context = useContext(GeoPrivateLayerContext);
  const mergedRef = useMergeRefs(context.ref, ref);
  const mergedXstyle = useMemo(() => [context.xstyle, xstyle], [context.xstyle, xstyle]);

  return useMemo(() => {
    return function LayerBehaviorProvider(children) {
      return (
        <GeoPrivateLayerContext.Provider
          // eslint-disable-next-line react/jsx-no-constructed-context-values
          value={{ ref: mergedRef, xstyle: mergedXstyle }}
        >
          {children}
        </GeoPrivateLayerContext.Provider>
      );
    };
  }, [mergedRef, mergedXstyle]);
};
