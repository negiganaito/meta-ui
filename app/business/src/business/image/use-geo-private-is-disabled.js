import { useContext } from 'react';
import { GeoPrivateDisabledContext } from '@meta-business/contexts/geo-private-disabled-context';

export const useGeoPrivateIsDisabled = (val) => {
  val === undefined && (val = false);

  const context = useContext(GeoPrivateDisabledContext);

  return context ?? val;
};
