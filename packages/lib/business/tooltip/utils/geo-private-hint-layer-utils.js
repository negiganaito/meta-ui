import { useGeoTheme } from '@meta-ui/business/theme';
import { Image, ix } from '@meta-ui/core/image';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  root: {
    boxSizing: 'x9f619',
    maxWidth: 'xxc7z9f',
    wordBreak: 'x13faqbe',
  },
  icon: {
    display: 'x78zum5',
    cursor: 'x1ypdohk',
    verticalAlign: 'x1uuroth',
    pointerEvents: 'x67bb7w',
  },
  infoTooltipContainer: {
    flexShrink: 'x2lah0s',
  },
  mediaIcon: {
    display: 'x78zum5',
    borderTopStartRadius: 'x14yjl9h',
    borderTopEndRadius: 'xudhj91',
    borderBottomEndRadius: 'x18nykt9',
    borderBottomStartRadius: 'xww2gxu',
    flexShrink: 'x2lah0s',
    height: 'xxk0z11',
    justifyContent: 'xl56j7k',
    alignItems: 'x6s0dn4',
    width: 'xvy4d1p',
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
      return gkx2467 ? <GeoStatusIcon size={12} status="error" /> : <Image src={ix('489534')} />;
    case 'warning':
      return gkx2467 ? <GeoStatusIcon size={12} status="warning" /> : <Image src={ix('480789')} />;
    case 'policy-restriction':
      return <Image src={ix('1280864')} />;
    case 'disabled-restriction':
      return <Image src={ix('1826783')} />;
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
