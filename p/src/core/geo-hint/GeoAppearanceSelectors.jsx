import GeoPrivateDefaultAppearanceGeneratedStyles from './GeoPrivateDefaultAppearanceGeneratedStyles';

const rootStyle = {
  root: {
    borderTopStyle: 'x13fuv20',
    borderEndStyle: 'xu3j5b3',
    borderBottomStyle: 'x1q0q8m5',
    borderStartStyle: 'x26u7qi',
  },
};

const selectBorderRadius = ({ context }) => {
  return GeoPrivateDefaultAppearanceGeneratedStyles.borderRadiusStyles[context];
};

const selectBorderWidth = ({ context }) => {
  return [rootStyle.root, GeoPrivateDefaultAppearanceGeneratedStyles.borderWidthStyles[context]];
};

const selectSize = ({ ratio, size }) => {
  const formattedRatio = ratio.toLowerCase().replace(/-([a-z])/g, (_match, p1) => p1.toUpperCase());
  return GeoPrivateDefaultAppearanceGeneratedStyles.sizeStyles[
    `${ratio === 'circle' ? 'square' : formattedRatio}${size}`
  ];
};

export { selectBorderRadius, selectBorderWidth, selectSize };
