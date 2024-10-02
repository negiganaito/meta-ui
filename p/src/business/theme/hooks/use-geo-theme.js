import { useContext } from 'react';

import { GeoPrivateThemeContext } from '../contexts/geo-private-theme-context';

export const useGeoTheme = () => {
  return useContext(GeoPrivateThemeContext);
};
