import React, { useContext, useMemo } from 'react';
import { BaseThemeConfigContext } from '@meta-core/contexts/base-theme-config-context';
import { BaseThemeDisplayModeContext } from '@meta-core/contexts/base-theme-display-mode-context';
import { useCurrentDisplayMode } from '@meta-core/hooks/use-current-display-mode';

// type BaseThemeProviderProps = {
//   children?: any
//   config: any
//   displayMode?: 'dark' | 'light'
// }

export function BaseThemeProvider({ children, config, displayMode }) {
  const baseThemeConfigValue = useContext(BaseThemeConfigContext);
  const currentDisplayMode = displayMode ?? useCurrentDisplayMode();

  const themeClass = useMemo(() => {
    let temp;
    config && config.type === 'CLASSNAMES'
      ? (temp = currentDisplayMode === 'dark' ? config.dark : config.light)
      : (temp =
          currentDisplayMode === 'dark' ? baseThemeConfigValue.darkClassName : baseThemeConfigValue.lightClassName);
    return temp
      ? {
          $$css: true,
          theme: temp,
        }
      : null;
  }, [config, baseThemeConfigValue.darkClassName, baseThemeConfigValue.lightClassName, currentDisplayMode]);

  const baseThemeConfigContextValue = useMemo(() => {
    if (config) {
      if (config.type === 'VARIABLES')
        return {
          ...baseThemeConfigValue,
          darkVariables: {
            ...baseThemeConfigValue.darkVariables,
            ...config.dark,
          },
          lightVariables: {
            ...baseThemeConfigValue.lightVariables,
            ...config.light,
          },
        };
      else if (config.type === 'CLASSNAMES') {
        return {
          ...baseThemeConfigValue,
          darkClassName: config.dark,
          lightClassName: config.light,
        };
      }
    }
    return baseThemeConfigValue;
  }, [config, baseThemeConfigValue]);

  const themeVariable = convert2CssVariable(
    currentDisplayMode === 'dark'
      ? baseThemeConfigContextValue.darkVariables
      : baseThemeConfigContextValue.lightVariables,
  );

  return (
    <BaseThemeConfigContext.Provider value={baseThemeConfigContextValue}>
      <BaseThemeDisplayModeContext.Provider value={currentDisplayMode}>
        {children(themeClass, themeVariable)}
      </BaseThemeDisplayModeContext.Provider>
    </BaseThemeConfigContext.Provider>
  );
}

function convert2CssVariable(a) {
  let b = {};
  Object.keys(a).forEach((c) => {
    // @ts-ignore
    b['--' + c] = a[c];
  });
  return b;
}
