import React from 'react';
import { html } from 'react-strict-dom';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  divider: {
    backgroundColor: 'var(--divider)',
    boxSizing: 'border-box',
    height: '1px',
  },
  reset: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    // borderEndWidth: "xcfux6l",
    // borderBottomWidth: "x1qhh985",
    // borderStartWidth: "xm0m39n",
    margin: 0,
  },
});

export const BaseDivider = ({ ariaHidden, xstyle }) => {
  return <html.hr aria-hidden={ariaHidden} style={[styles.reset, styles.divider, [xstyle]]} />;
};
