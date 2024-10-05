import React from 'react';
import { html } from 'react-strict-dom';
import { BaseDivider } from '@meta-core/unknown/base-divider';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  container: {
    backgroundColor: 'var(--card-background)',
    width: '100%',
  },
  content: {
    alignItems: 'center',
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'space-between',
    minHeight: '60px',
    position: 'relative',
  },
});

export const FDSDialogHeaderContainer = ({ addOnBottom, children, id, withDivider = false, xstyle }) => {
  return (
    <html.div style={styles.container}>
      <html.div id={id} style={[styles.content, xstyle]}>
        {children}
      </html.div>
      {withDivider && <BaseDivider />}
      {addOnBottom}
    </html.div>
  );
};
