import React from 'react';
import { useCurrentDisplayMode } from '@meta-core/hooks/use-current-display-mode';
import stylex from '@stylexjs/stylex';

import { BaseGlimmer } from './base-glimmer.jsx';

const styles = stylex.create({
  dark: {
    backgroundColor: 'var(--placeholder-icon)',
  },
  light: {
    backgroundColor: 'var(--wash)',
  },
});

export const FDSGlimmer = ({ xstyle, ...rest }) => {
  const mode = useCurrentDisplayMode();

  return <BaseGlimmer xstyle={[mode === 'dark' ? styles.dark : styles.light, xstyle]} {...rest} />;
};
