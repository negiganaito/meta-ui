import { useContext } from 'react';

import GeoPrivateThemeContext from '../contexts/GeoPrivateThemeContext';

function useGeoTheme() {
  return useContext(GeoPrivateThemeContext);
}

export default useGeoTheme;
