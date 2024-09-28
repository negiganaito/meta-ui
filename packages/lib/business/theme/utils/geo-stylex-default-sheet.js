import { StyleXSheet } from '@meta-ui/core/theme';

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
