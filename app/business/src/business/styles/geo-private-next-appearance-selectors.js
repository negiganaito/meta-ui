import stylex from '@stylexjs/stylex';

import { GeoPrivateNextAppearanceGeneratedStyles } from './geo-private-next-appearance-generated-styles';

const styles = stylex.create({
  root: {
    borderStyle: 'solid',
  },
});

function selectBorderRadius({ context }) {
  return GeoPrivateNextAppearanceGeneratedStyles.borderRadiusStyles[context];
}

function selectBorderWidth({ context }) {
  return [styles.root, GeoPrivateNextAppearanceGeneratedStyles.borderWidthStyles[context]];
}

function selectSize({ ratio, size }) {
  let c = ratio.toLowerCase().replace(/-([a-z])/g, (a) => {
    return a[1].toUpperCase();
  });
  return GeoPrivateNextAppearanceGeneratedStyles.sizeStyles[String(ratio === 'circle' ? 'square' : c) + size];
}

export const GeoPrivateNextAppearanceSelectors = { selectBorderRadius, selectBorderWidth, selectSize };
