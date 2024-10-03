import React from 'react';
import { GeoStatusIcon } from '@meta-business/image/geo-status-icon';
import { useGeoTheme } from '@meta-business/theme/use-geo-theme';
import { Image } from '@meta-core/image/image';
import { ix } from '@meta-core/image/ix';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  root: {
    boxSizing: 'border-box',
    maxWidth: '360px',
    wordBreak: 'break-word',
  },
  icon: {
    display: 'flex',
    cursor: 'pointer',
    verticalAlign: 'text-bottom',
    pointerEvents: 'auto',
  },
  infoTooltipContainer: {
    flexShrink: 0,
  },
  mediaIcon: {
    display: 'flex',
    borderRadius: '50%',
    flexShrink: 0,
    height: '24px',
    justifyContent: 'center',
    alignItems: 'center',
    width: '24px',
  },
});

const gkx2467 = true;

function getStatus(status) {
  switch (status) {
    case 'policy-restriction':
      return 'error';
    case 'disabled-restriction':
    case 'normal':
      return 'info';
    default:
      return status;
  }
}

function getStatusIcon(status) {
  if (!status || status === 'normal') return null;
  switch (status) {
    case 'error':
      return gkx2467 ? <GeoStatusIcon size={12} status="error" /> : <Image src={ix(489534)} />;
    case 'warning':
      return gkx2467 ? <GeoStatusIcon size={12} status="warning" /> : <Image src={ix(480789)} />;
    case 'policy-restriction':
      return <Image src={ix(1280864)} />;
    case 'disabled-restriction':
      return <Image src={ix(1826783)} />;
    default:
      return null;
  }
}

function useLayerContentStyle() {
  const theme = useGeoTheme();
  const { selectBorderRadius, selectElevation, selectFont, selectStaticBackgroundColor, selectTextColor } = theme;

  return [
    styles.root,
    selectBorderRadius({ context: 'content' }),
    selectElevation({ level: 3 }),
    selectFont({ size: 'value' }),
    selectStaticBackgroundColor({ surface: 'content' }),
    selectTextColor({ color: 'value' }),
  ];
}

function useLayerContentContainerStyle({ isPositionVertical }) {
  const theme = useGeoTheme();
  const selectSpacing = theme.selectSpacing;

  return [
    isPositionVertical &&
      selectSpacing({ context: 'control', bounds: 'internal', target: 'fine', positions: ['vertical'] }),
    !isPositionVertical &&
      selectSpacing({ context: 'control', bounds: 'internal', target: 'normal', positions: ['horizontal'] }),
  ];
}

function useMediaIconStyle() {
  const theme = useGeoTheme();
  const selectSpacing = theme.selectSpacing;
  const selectStaticBackgroundColor = theme.selectStaticBackgroundColor;

  return [
    styles.mediaIcon,
    selectSpacing({ context: 'component', bounds: 'external', relation: 'related', positions: ['start'] }),
    selectStaticBackgroundColor({ surface: 'wash' }),
  ];
}

function useCloseButtonStyle() {
  const theme = useGeoTheme();
  const selectSpacing = theme.selectSpacing;

  return [selectSpacing({ context: 'component', bounds: 'external', relation: 'unrelated', positions: ['start'] })];
}

function useIconStyle() {
  const theme = useGeoTheme();
  const selectSpacing = theme.selectSpacing;

  return [
    styles.icon,
    selectSpacing({ context: 'component', bounds: 'external', relation: 'related', positions: ['horizontal'] }),
  ];
}

function useTooltipContainerStyle({ type }) {
  const theme = useGeoTheme();
  const selectSpacing = theme.selectSpacing;

  const spacingFine = selectSpacing({
    context: 'control',
    bounds: 'internal',
    target: 'fine',
    positions: ['vertical'],
  });
  const spacingNormal = selectSpacing({
    context: 'control',
    bounds: 'internal',
    target: 'normal',
    positions: ['horizontal'],
  });

  const containerSpacing = [
    styles.infoTooltipContainer,
    selectSpacing({ context: 'container', bounds: 'internal', relation: 'component' }),
  ];

  return type === 'simpleTooltip' ? [spacingFine, spacingNormal] : containerSpacing;
}

export const GeoPrivateHintLayerUtils = {
  getStatus,
  getStatusIcon,
  useLayerContentStyle,
  useLayerContentContainerStyle,
  useMediaIconStyle,
  useCloseButtonStyle,
  useIconStyle,
  useTooltipContainerStyle,
};
