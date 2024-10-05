import React, { forwardRef } from 'react';
import { BaseView } from '@fb-layout/base-view';

import { BaseThemeProvider } from './base-theme-provider';

export const BaseTheme = forwardRef(({ config, displayMode, style, xstyle, ...rest }, ref) => {
  return (
    <BaseThemeProvider
      config={config}
      displayMode={displayMode}
      children={(internalClass, internalStyle) => {
        return <BaseView {...rest} ref={ref} style={{ ...internalStyle, ...style }} xstyle={[internalClass, xstyle]} />;
      }}
    />
  );

  // return jsx(BaseThemeProvider, {
  //   config: config,
  //   displayMode: displayMode,
  //   children: function (internalClass, internalStyle) {
  //     console.log({ internalClass, internalStyle });

  //     return jsx(BaseView, {
  //       ...rest,
  //       ref,
  //       style: { ...internalStyle, ...style },
  //       xstyle: [internalClass.theme, xstyle],
  //     });
  //   },
  // });
});
