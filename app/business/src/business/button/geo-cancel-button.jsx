import { useCallback, useContext } from 'react';
import { jsx } from 'react/jsx-runtime';
import { GeoPrivateCloseButtonContext } from '@meta-business/contexts/geo-private-close-button-context';
import { LayerHideSources } from '@meta-business/utils/layer-hide-sources';

import { GeoPrivateBaseButton } from './geo-private-base-button';

export const GeoCancelButton = ({ containerRef, label = 'Cancel', onClick, ...rest }) => {
  const { onHide } = useContext(GeoPrivateCloseButtonContext);

  const _onClick = useCallback(
    (a) => {
      !onClick ? void 0 : onClick(a);
      !onHide ? void 0 : onHide(LayerHideSources.LAYER_CANCEL_BUTTON);
    },
    [onClick, onHide],
  );

  return jsx(GeoPrivateBaseButton, { ...rest, containerRef, label, loggingName: 'GeoCancelButton', onClick: _onClick });
};
