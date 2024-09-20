import { createContext } from 'react';

import { GeoPrivateIsNextThemeContext } from '../contexts/geo-private-theme-context';

export function useGeoPrivateIsNextTheme() {
  return createContext(GeoPrivateIsNextThemeContext);
}
