import { GeoPrivateDefaultTextGeneratedStyles } from './geo-private-default-text-generated-styles';

function selectFont({ size }) {
  return GeoPrivateDefaultTextGeneratedStyles.fontStyles[size];
}
function selectFontGlimmer({ size }) {
  return GeoPrivateDefaultTextGeneratedStyles.fontGlimmerStyles[size];
}

export const GeoTextSelectors = {
  selectFont,
  selectFontGlimmer,
};
