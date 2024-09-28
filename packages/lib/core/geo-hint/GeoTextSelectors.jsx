import { fontGlimmerStyles, fontStyles } from './GeoPrivateDefaultTextGeneratedStyles';

function selectFont({ size }) {
  return fontStyles[size];
}

function selectFontGlimmer({ size }) {
  return fontGlimmerStyles[size];
}

export { selectFont, selectFontGlimmer };
