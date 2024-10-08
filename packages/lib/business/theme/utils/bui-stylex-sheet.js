import { StyleXSheet } from '@meta-core/theme';

import { BUIStyleXDefaultTheme } from '../utils/bui-stylex-default-theme';

const theme = new StyleXSheet({
  rootTheme: BUIStyleXDefaultTheme,
});

const inject = () => {
  theme.inject();
};

export const BUIStyleXSheet = {
  inject,
};
