import { jsx } from 'react/jsx-runtime';

import { GeoPrivateLoggingRegion } from './geo-private-logging-region';

export const GeoModalFooter = ({ forwardedRef, ...rest }) => {
  return jsx(GeoPrivateLoggingRegion, {
    inputRef: forwardedRef,
    isDependentRegion: true,
    name: 'GeoModalFooter',
    children: (_forwardedRef) => {
      return jsx(GeoPrivateCardFooter, { ...rest, forwardedRef: _forwardedRef });
    },
  });
};
