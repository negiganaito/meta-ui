import { useContext } from 'react';
import { GeoPrivateDisabledContext } from '@meta-ui/business/contexts';

export const useGeoPrivateIsDisabled = (val) => {
  val === undefined && (val = false);

  const context = useContext(GeoPrivateDisabledContext);

  return context ?? val;
};
