import { StyleXSheet } from '@meta-core/theme/stylex-sheet.stylex';

import { geodesicStylexDefaultTheme } from './geodesic-stylex-default-theme';

const theme = new StyleXSheet({
  rootTheme: geodesicStylexDefaultTheme,
});

function inject() {
  theme.inject();
}

export const GeoStyleXDefaultSheet = {
  inject,
};
