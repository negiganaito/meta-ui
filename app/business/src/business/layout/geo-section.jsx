import { useContext } from 'react';
import { jsx } from 'react/jsx-runtime';
import { GeoPrivateCardLayoutContext } from '@meta-business/contexts/geo-private-card-layout-context';
import { GeoPrivateCardSectionContext } from '@meta-business/contexts/geo-private-card-section-context';
import { GeoPrivateSectionStyleContext } from '@meta-business/contexts/geo-private-section-style-context';
import { GeoPrivateLoggingRegion } from '@meta-business/dialog/geo-private-logging-region';
import { useGeoTheme } from '@meta-business/theme/use-geo-theme';
import { useMergeRefs } from '@meta-core/react-utils/use-merge-refs';
import stylex from '@stylexjs/stylex';
import emptyFunction from 'fbjs/lib/emptyFunction';

const styles = stylex.create({
  root: {
    flexGrow: '1',
    flexShrink: '1',
    flexBasis: 'auto',
    height: 'inherit',
    maxHeight: 'inherit',
    minHeight: 'inherit',
  },
  noBorder: {
    borderWidth: '0',
  },
});

export const GeoSection = ({ children, containerRef, 'data-testid': dt, variant, xstyle }) => {
  const { selectBorderRadius, selectSpacing, selectStaticBackgroundColor } = useGeoTheme();

  let [n, m] = GeoPrivateCardLayoutContext.useLayoutContext();

  m = useMergeRefs(m, containerRef);

  let o = useContext(GeoPrivateSectionStyleContext);
  let d = useContext(GeoPrivateCardSectionContext);

  let p = variant === 'secondary';
  let q = [
    selectSpacing({
      context: 'container',
      bounds: 'internal',
      relation: 'component',
    }),
    variant === 'secondary' &&
      selectStaticBackgroundColor({
        isMuted: !0,
        surface: 'wash',
      }),
    variant === 'secondary' &&
      selectBorderRadius({
        context: 'container',
      }),
  ];

  return jsx(GeoPrivateLoggingRegion, {
    inputRef: m,
    isDependentRegion: d,
    name: 'GeoSection',
    children: (a) => {
      return jsx('div', {
        className: stylex([styles.root, xstyle, q, n, p && styles.noBorder, o]),
        'data-testid': void 0,
        ref: a,
        children: jsx(GeoPrivateCardLayoutContext.Provider, {
          value: emptyFunction,
          children,
        }),
      });
    },
  });
};
