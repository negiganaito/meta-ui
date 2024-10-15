import { jsx } from 'react/jsx-runtime';
import { GeoPrivateCardLayerContext } from '@meta-business/contexts/geo-private-card-layer-context';

import { GeoCardHeader } from './geo-card-header';
import { GeoPrivateLoggingRegion } from './geo-private-logging-region';

export const GeoModalHeader = ({ forwardedRef, ...rest }) => {
  return jsx(GeoPrivateLoggingRegion, {
    inputRef: forwardedRef,
    isDependentRegion: !0,
    name: 'GeoModalHeader',
    children: (_forwardedRef) => {
      return jsx(GeoPrivateCardLayerContext.Provider, {
        value: !0,
        children: jsx(GeoCardHeader, { ...rest, forwardedRef: _forwardedRef }),
      });
    },
  });
};
