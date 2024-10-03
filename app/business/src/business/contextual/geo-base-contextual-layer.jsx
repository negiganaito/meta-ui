import React, { useContext, useMemo } from 'react';
import { GeoPrivateLayerContext } from '@meta-business/contexts/geo-private-layer-context';
import { GeoPrivateLayerPositionContext } from '@meta-business/contexts/geo-private-layer-position-context';
import { useGeoPrivateLegacyLayerCompatibility } from '@meta-business/hooks/use-geo-private-legacy-layer-compatibility';
import { BaseContextualLayerAnchorRootContext } from '@meta-core/contexts/base-contextual-layer-anchor-root-context';
import { useMergeRefs } from '@meta-core/react-utils/use-merge-refs';
import stylex from '@stylexjs/stylex';

import { GeoPrivateBaseContextualLayer } from './geo-private-base-contextual-layer';

const styles = stylex.create({
  root: {
    zIndex: '400',
  },
});

export const GeoBaseContextualLayer = ({ xstyle, disableAutoFlip, position, containerRef, ...props }) => {
  const layerPositionContext = useContext(GeoPrivateLayerPositionContext);
  const mergedDisableAutoFlip = layerPositionContext.disableAutoFlip ?? disableAutoFlip;
  const mergedPosition = layerPositionContext.position ?? position;

  const context = props.context ?? props.contextRef;
  const legacyLayerCompatibilityRef = useGeoPrivateLegacyLayerCompatibility(context);
  const layerContext = useContext(GeoPrivateLayerContext);
  const mergedRef = useMergeRefs(legacyLayerCompatibilityRef, layerContext.ref, containerRef);

  const mergedXstyle = [layerContext.xstyle, styles.root, xstyle];

  return (
    <LayerContextProvider>
      <AnchorRootContextProvider context={context}>
        <GeoPrivateBaseContextualLayer
          {...props}
          containerRef={mergedRef}
          disableAutoFlip={mergedDisableAutoFlip}
          position={mergedPosition}
          xstyle={mergedXstyle}
        />
      </AnchorRootContextProvider>
    </LayerContextProvider>
  );
};

GeoBaseContextualLayer.displayName = `${GeoBaseContextualLayer.name} [from ${module.id}]`;

const AnchorRootContextProvider = ({ context, children }) => {
  const anchorRootContext = useContext(BaseContextualLayerAnchorRootContext);

  const value = useMemo(() => {
    const element = context instanceof Element ? context : context?.current;
    if (element === null) return anchorRootContext;

    const closestLayer = element.closest?.('.uiLayer');
    if (!(closestLayer instanceof HTMLElement)) return anchorRootContext;

    const anchorRootElement = anchorRootContext.current;
    return anchorRootElement instanceof HTMLElement && closestLayer.contains(anchorRootElement)
      ? anchorRootContext
      : { current: closestLayer };
  }, [context, anchorRootContext]);

  return (
    <BaseContextualLayerAnchorRootContext.Provider value={value}>
      {children}
    </BaseContextualLayerAnchorRootContext.Provider>
  );
};

const layerContextValue = {};

const LayerContextProvider = ({ children }) => (
  <GeoPrivateLayerContext.Provider value={layerContextValue}>{children}</GeoPrivateLayerContext.Provider>
);
