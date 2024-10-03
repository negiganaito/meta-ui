import { useGeoPrivateIsNextTheme } from '@meta-business/theme/use-geo-private-is-next-theme';
import { useGeoTheme } from '@meta-business/theme/use-geo-theme';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  root: {
    alignSelf: 'stretch',
  },
});

const gkx2467 = true;

function getSurfaceAndMutedStatus(status, isNextThemeEnabled) {
  switch (status) {
    case 'info':
      return {
        surface: gkx2467 ? 'info' : 'wash',
        isMuted: gkx2467 ? true : !isNextThemeEnabled,
      };
    case 'policy-warning':
      return {
        surface: 'warning',
        isMuted: true,
      };
    case 'policy-violation':
      return {
        surface: 'error',
        isMuted: true,
      };
    default:
      return {
        surface: status,
        isMuted: true,
      };
  }
}

export function useGeoPrivateNoticeStyle(props) {
  const { status } = props;
  const isNextTheme = useGeoPrivateIsNextTheme();
  const theme = useGeoTheme();
  const selectBorderRadius = theme.selectBorderRadius;
  const selectStaticBackgroundColor = theme.selectStaticBackgroundColor;
  const selectSpacing = theme.selectSpacing;

  return [
    styles.root,
    selectBorderRadius({ context: 'content' }),
    selectStaticBackgroundColor(getSurfaceAndMutedStatus(status, isNextTheme)),
    selectSpacing({
      context: 'component',
      bounds: 'internal',
      target: 'coarse',
    }),
  ];
}
