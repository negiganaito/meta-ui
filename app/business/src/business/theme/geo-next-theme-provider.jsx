import React from 'react';
import { GeoPrivateDataVizThemeContext } from '@meta-business/contexts/geo-private-data-viz-theme-context';
import { GeoPrivateIsDarkThemeContext } from '@meta-business/contexts/geo-privateIs-dark-theme-context';

import { GeoPrivateDataVizNextTheme } from './geo-private-data-viz-next-theme';
import { GeoPrivateIsNextThemeContext } from './geo-private-is-next-theme-context';
import { GeoPrivateNextTheme } from './geo-private-next-theme';
import { GeoPrivateThemeContext } from './geo-private-theme-context';

export const GeoNextThemeProvider = ({ children }) => {
  return (
    <GeoPrivateThemeContext.Provider value={GeoPrivateNextTheme}>
      <GeoPrivateIsNextThemeContext.Provider value={true}>
        <GeoPrivateDataVizThemeContext.Provider value={GeoPrivateDataVizNextTheme}>
          <GeoPrivateIsDarkThemeContext.Provider value={false}>{children}</GeoPrivateIsDarkThemeContext.Provider>
        </GeoPrivateDataVizThemeContext.Provider>
      </GeoPrivateIsNextThemeContext.Provider>
    </GeoPrivateThemeContext.Provider>
  );
};
