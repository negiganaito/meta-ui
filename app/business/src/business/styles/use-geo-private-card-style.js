import { useGeoTheme } from '@meta-business/theme/use-geo-theme';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  root: {
    boxSizing: 'border-box',
    isolation: 'isolate',
    position: 'relative',

    '::after': {
      backgroundColor: 'inherit',
      borderRadius: 'inherit',
      content: "''",
      height: '100%',
      position: 'absolute',
      left: 0,
      right: null,
      top: 0,
      width: '100%',
      zIndex: -1,
    },
  },
});

export const useGeoPrivateCardStyle = ({ level = 0, isNext = false }) => {
  const { selectBorderRadius, selectElevation, selectStaticBackgroundColor } = useGeoTheme();

  const useFOAShadow = isNext && level === 1;

  return [
    selectStaticBackgroundColor({
      surface: 'content',
    }),
    selectBorderRadius({
      context: 'container',
    }),
    selectElevation({ level, useFOAShadow }),
    useFOAShadow && styles.root,
  ];
};
