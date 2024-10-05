import { GeoPrivateNextTextGeneratedStyles } from './geo-private-next-text-generated-styles';

const selectFont = ({ size }) => {
  return GeoPrivateNextTextGeneratedStyles.fontStyles[size];
};

export const GeoPrivateNextTextSelectors = {
  selectFont,
};
