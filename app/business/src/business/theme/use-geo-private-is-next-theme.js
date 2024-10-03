import { createContext } from 'react';

import { GeoPrivateIsNextThemeContext } from './geo-private-is-next-theme-context';

export function useGeoPrivateIsNextTheme() {
  return createContext(GeoPrivateIsNextThemeContext);
}
