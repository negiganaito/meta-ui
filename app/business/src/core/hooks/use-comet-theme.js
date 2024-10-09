import { useMemo } from 'react';
import { jsx } from 'react/jsx-runtime';
import { BaseThemeDisplayModeContext } from '@meta-core/contexts/base-theme-display-mode-context';
import { stylexCompat } from '@meta-core/styles/stylex-compat';

import { useCurrentDisplayMode } from './use-current-display-mode';

const THEME_CLASSES = {
  dark: '__fb-dark-mode ',
  light: '__fb-light-mode ',
};

/**
 *
 * @param {string} val
 * @returns
 */
export function useCometTheme(val) {
  const displayMode = useCurrentDisplayMode();

  /**
   * @type {string}
   */
  let mode;

  if (val === 'invert') {
    mode = displayMode === 'light' ? 'dark' : 'light';
  } else {
    mode = val;
  }

  const wrapper = useMemo(() => {
    return ({ children }) => {
      return jsx(BaseThemeDisplayModeContext.Provider, {
        children,
        value: mode,
      });
    };
  }, [mode]);

  const styles = stylexCompat.makeNamespace({
    theme: THEME_CLASSES[mode],
  });

  return [wrapper, styles];
}
