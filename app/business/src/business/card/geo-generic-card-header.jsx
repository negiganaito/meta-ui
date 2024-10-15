import { useContext } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import { GeoButton } from '@meta-business/button/geo-button';
import { GeoPrivateCardLayerContext } from '@meta-business/contexts/geo-private-card-layer-context';
import { geoOffset } from '@meta-business/styles/geo-offset';
import { useGeoTheme } from '@meta-business/theme/use-geo-theme';
import { Image } from '@meta-core/image/image';
import { ix } from '@meta-core/image/ix';
import stylex from '@stylexjs/stylex';
import Locale from 'fbjs/lib/Locale';

import { GeoPrivateCardCloseButton } from './geo-private-card-close-button';

const styles = stylex.create({
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexShrink: '0',
    width: '100%',
  },
  mainContent: {
    flexGrow: '1',
    minWidth: '0',
  },
  actionContent: {
    alignItems: 'flex-start',
    display: 'flex',
    flexShrink: '0',
  },
  backButton: {
    marginRight: '8px',
  },
});

const o = Locale.isRTL();

export const GeoGenericCardHeader = ({ children, forwardedRef, onBack, xstyle }) => {
  let { selectSpacing } = useGeoTheme();

  const f = [
    selectSpacing({
      context: 'container',
      bounds: 'internal',
      relation: 'component',
    }),
  ];

  let g = useContext(GeoPrivateCardLayerContext);
  let k = o ? ix(1415702) : ix(1291651);

  return jsxs('div', {
    className: stylex(styles.root, f),
    ref: forwardedRef,
    children: [
      onBack !== null &&
        jsx('div', {
          className: stylex(styles.actionContent, styles.backButton, geoOffset.cardStartAction),
          children: jsx(GeoButton, {
            icon: jsx(Image, {
              src: k,
            }),
            isLabelHidden: !0,
            label: 'Previous',
            onClick: onBack,
            variant: 'flat',
            width: 36,
          }),
        }),
      jsx('div', {
        className: stylex(styles.mainContent, xstyle),
        children: children,
      }),
      g &&
        jsx('div', {
          className: stylex(styles.actionContent, geoOffset.cardEndAction),
          children: jsx(GeoPrivateCardCloseButton, {}),
        }),
    ],
  });
};
