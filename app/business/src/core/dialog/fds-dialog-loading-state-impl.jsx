import React from 'react';
import { FDSGlimmer } from '@meta-core/glimmer/fds-glimmer';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  firstLine: {
    height: '12px',
    marginBottom: '10px',
    maxWidth: '440px',
  },
  glimmer: {
    alignSelf: 'flex-start',

    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    borderBottomRightRadius: '8px',
    borderBottomLeftRadius: '8px',

    boxSizing: 'border-box',
    marginLeft: '16px',
    marginRight: '16px',
    width: 'calc(100% - 40px)',
  },
  heading: {
    height: '20px',
    marginTop: '20px',
    marginBottom: '20px',
    maxWidth: '241px',
  },
  secondLine: {
    height: '12px',
    marginBottom: '20px',
    maxWidth: '296px',
  },
});

export const FDSDialogLoadingStateImpl = () => {
  return (
    <>
      <FDSGlimmer index={0} xstyle={[styles.glimmer, styles.heading]} />
      <FDSGlimmer index={1} xstyle={[styles.glimmer, styles.firstLine]} />
      <FDSGlimmer index={2} xstyle={[styles.glimmer, styles.secondLine]} />
    </>
  );
};
