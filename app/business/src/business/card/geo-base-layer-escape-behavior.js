import { useGeoPrivateLayerBehavior } from '@meta-business/hooks/use-geo-private-layer-behavior';
import { useGeoPrivateOnEscape } from '@meta-business/hooks/use-geo-private-on-escape';

export const GeoBaseLayerEscapeBehavior = ({ children, contain = false, onEscape }) => {
  const escapeRef = useGeoPrivateOnEscape(onEscape, { contain });
  const LayerBehavior = useGeoPrivateLayerBehavior({ ref: escapeRef });

  return LayerBehavior(children);
};
