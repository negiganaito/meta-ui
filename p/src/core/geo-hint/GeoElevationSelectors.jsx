import { elevationStyles } from './GeoPrivateDefaultElevationGeneratedStyles';

function selectElevation({ level }) {
  return elevationStyles[level];
}

export { selectElevation };
