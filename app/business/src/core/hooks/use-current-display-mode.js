import { useContext } from 'react';
import { BaseThemeDisplayModeContext } from '@meta-core/contexts/base-theme-display-mode-context';

const defaultTheme = 'light';

export function useCurrentDisplayMode() {
  const mode = useContext(BaseThemeDisplayModeContext);

  return mode ?? defaultTheme;
}
