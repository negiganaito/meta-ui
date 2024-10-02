import React, { useContext, useMemo } from 'react';
import { GeoPrivateLayerContext } from '@meta-ui/business/contexts';
import { useMergeRefs } from '@meta-ui/core/react-utils';

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
