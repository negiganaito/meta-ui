import { StyleXSheet } from '@meta-core/theme/stylex-sheet.stylex';

import { BUIStyleXDefaultTheme } from './bui-stylex-default-theme';

const theme = new StyleXSheet({
  rootTheme: BUIStyleXDefaultTheme,
});

const inject = () => {
  theme.inject();
};

export const BUIStyleXSheet = {
  inject,
};
