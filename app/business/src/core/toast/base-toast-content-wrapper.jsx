import React, { forwardRef } from 'react';
import { useCurrentDisplayMode } from '@meta-core/hooks/use-current-display-mode';
import { BaseView } from '@meta-core/layout/base-view';
import { BaseTheme } from '@meta-core/theme/base-theme';

const displayModeConfig = {
  dark: '__fb-dark-mode ',
  light: '__fb-light-mode ',
  type: 'CLASSNAMES',
};

export const BaseToastContentWrapper = forwardRef((props, ref) => {
  const { children, useInvertedDisplayMode, xstyle } = props;
  const currentDisplayMode = useCurrentDisplayMode();
  const invertedDisplayMode = currentDisplayMode === 'dark' ? 'light' : 'dark';

  return useInvertedDisplayMode ? (
    <BaseTheme config={displayModeConfig} displayMode={invertedDisplayMode} ref={ref} xstyle={xstyle}>
      {children}
    </BaseTheme>
  ) : (
    <BaseView ref={ref} xstyle={xstyle}>
      {children}
    </BaseView>
  );
});
