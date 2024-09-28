import StyleXSheet from '../helpers/StyleXSheet';

import { GeodesicStyleXDefaultTheme } from './GeodesicStyleXDefaultTheme';

const sheet = new StyleXSheet({
  rootTheme: GeodesicStyleXDefaultTheme,
});

function inject() {
  sheet.inject();
}

export { inject };
