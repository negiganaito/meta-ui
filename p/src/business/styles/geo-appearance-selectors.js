import stylex from '@stylexjs/stylex';

import { GeoPrivateDefaultAppearanceGeneratedStyles } from './geo-private-default-appearance-generated-styles';

let styles = stylex.create({
  root: {
    borderTopStyle: 'solid',
    borderRightStyle: 'solid',
    borderBottomStyle: 'solid',
    borderLeftStyle: 'solid',
  },
});

function selectBorderRadius(props) {
  const { context } = props;
  return GeoPrivateDefaultAppearanceGeneratedStyles.borderRadiusStyles[context];
}

function selectBorderWidth(props) {
  const { context } = props;
  return [styles.root, GeoPrivateDefaultAppearanceGeneratedStyles.borderWidthStyles[context]];
}

function selectSize(props) {
  const { ratio, size } = props;
  const formattedRatio = ratio.toLowerCase().replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());

  const sizeKey = ratio === 'circle' ? 'square' : formattedRatio + size;

  return GeoPrivateDefaultAppearanceGeneratedStyles.sizeStyles[sizeKey];
}

export const GeoAppearanceSelectors = {
  selectBorderRadius,
  selectBorderWidth,
  selectSize,
};
