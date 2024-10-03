import { useRef } from 'react';
import { useGeoOnClickOutside } from '@meta-business/hooks/use-geo-on-click-outside';
import { useGeoPrivateLayerBehavior } from '@meta-business/hooks/use-geo-private-layer-behavior';

export function GeoBaseLayerBlurBehavior({ children, context, onBlur }) {
  const contextRef = useRef(context ?? null);
  const layerRef = useRef(null);
  const applyLayerBehavior = useGeoPrivateLayerBehavior({
    ref: layerRef,
  });

  useGeoOnClickOutside(onBlur, [contextRef, layerRef]);

  return applyLayerBehavior(children);
}
