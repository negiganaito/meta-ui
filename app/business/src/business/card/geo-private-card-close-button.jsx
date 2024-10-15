import { useContext } from 'react';
import { jsx } from 'react/jsx-runtime';
import { GeoCloseButton } from '@meta-business/button/geo-close-button';
import { GeoPrivateCardLayerContext } from '@meta-business/contexts/geo-private-card-layer-context';
import { GeoPrivateCloseButtonContext } from '@meta-business/contexts/geo-private-close-button-context';
import { LayerHideSources } from '@meta-business/utils/layer-hide-sources';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  temp: {
    marginLeft: '8px',
  },
});

export const GeoPrivateCardCloseButton = () => {
  let geoPrivateCardLayerContextValue = useContext(GeoPrivateCardLayerContext);
  let { onHide } = useContext(GeoPrivateCloseButtonContext);

  return geoPrivateCardLayerContextValue
    ? jsx('span', {
        className: stylex(styles.temp),
        children: jsx(GeoCloseButton, {
          'data-testid': void 0,
          onClick: function () {
            return !onHide ? void 0 : onHide(LayerHideSources.LAYER_CANCEL_BUTTON);
          },
        }),
      })
    : null;
};
