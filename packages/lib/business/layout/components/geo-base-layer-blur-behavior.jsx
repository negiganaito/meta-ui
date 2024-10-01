import { useRef } from 'react';
import { useGeoOnClickOutside, useGeoPrivateLayerBehavior } from '@meta-ui/business/hooks';

export function GeoBaseLayerBlurBehavior({ children, context, onBlur }) {
  const contextRef = useRef(context ?? null);
  const layerRef = useRef(null);
  const applyLayerBehavior = useGeoPrivateLayerBehavior({
    ref: layerRef,
  });

  useGeoOnClickOutside(onBlur, [contextRef, layerRef]);

  return applyLayerBehavior(children);
}
