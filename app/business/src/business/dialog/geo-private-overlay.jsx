import React, { useContext } from 'react';
import { GeoModalOverlayOffsetContext } from '@meta-business/contexts/geo-modal-overlay-offset-context';
import { GeoPrivateBasePortal } from '@meta-business/contextual/geo-private-base-portal';
import { useGeoTheme } from '@meta-business/theme/use-geo-theme';
import stylex from '@stylexjs/stylex';
import Locale from 'fbjs/lib/Locale';

const isRTL = Locale.isRTL();

const styles = stylex.create({
  overlay: {
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    zIndex: 400,
  },
});

export const GeoPrivateOverlay = ({ children, style, xstyle }) => {
  const { selectStaticBackgroundColor } = useGeoTheme();

  const backgroundColorStyle = selectStaticBackgroundColor({ surface: 'overlay' });

  const { bottom = 0, end = 0, start = 0, top = 0 } = useContext(GeoModalOverlayOffsetContext);

  return (
    <GeoPrivateBasePortal target={document.body}>
      <div
        className={stylex(styles.overlay, backgroundColorStyle, xstyle)}
        style={{
          height: top + bottom !== 0 ? 'calc(100vh - ' + top + 'px - ' + bottom + 'px)' : void 0,
          width: start + end !== 0 ? 'calc(100vw - ' + start + 'px - ' + end + 'px)' : void 0,
          left: isRTL ? void 0 : start,
          right: isRTL ? start : void 0,
          top: top,
          ...style,
        }}
      >
        {children}
      </div>
    </GeoPrivateBasePortal>
  );
};
