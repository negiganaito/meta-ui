import { GeoPrivateDefaultElevationGeneratedStyles } from './geo-private-default-elevation-generated-styles';

function selectElevation({ level }) {
  return GeoPrivateDefaultElevationGeneratedStyles.elevationStyles[level];
}

export const GeoElevationSelectors = {
  selectElevation,
};
