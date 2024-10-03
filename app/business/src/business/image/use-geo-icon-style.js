import { useGeoTheme } from '@meta-business/theme/use-geo-theme';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  inherit: {
    color: 'inherit',
  },
});

export const useGeoIconStyle = ({ color, isDisabled }) => {
  const { selectIconColor } = useGeoTheme();

  return selectIconColor === 'inherit'
    ? styles.inherit
    : selectIconColor({
        color,
        isDisabled,
      });
};
