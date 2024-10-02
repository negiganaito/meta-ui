import { useGeoTheme } from '@meta-ui/business/theme';
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
