import { useGeoPrivateLayerBehavior, useGeoPrivateOnEscape } from '@meta-ui/business/hooks';

export const GeoBaseLayerEscapeBehavior = ({ children, contain = false, onEscape }) => {
  const escapeRef = useGeoPrivateOnEscape(onEscape, { contain });
  const LayerBehavior = useGeoPrivateLayerBehavior({ ref: escapeRef });

  return LayerBehavior(children);
};
