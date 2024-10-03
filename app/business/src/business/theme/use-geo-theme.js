import { useContext } from 'react';

import { GeoPrivateThemeContext } from './geo-private-theme-context';

export const useGeoTheme = () => {
  return useContext(GeoPrivateThemeContext);
};
