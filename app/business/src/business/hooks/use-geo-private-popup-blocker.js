import { useContext, useEffect, useId } from 'react';
import { GeoPrivatePopupBlockerContext } from '@meta-business/contexts/geo-private-popup-blocker-context';

export const useGeoPrivatePopupBlocker = (a) => {
  let b = useId();
  let d = useContext(GeoPrivatePopupBlockerContext);
  let e = d.hasPermissionToRender;
  let f = d.addPopup;
  useEffect(() => {
    f(b);
  }, [f, b]);
  return a === !0 ? e(b) : !1;
};
