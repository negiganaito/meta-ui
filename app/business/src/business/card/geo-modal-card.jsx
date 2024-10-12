import React from 'react';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '90vh',
  },
  bottomSheetCard: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    maxHeight: 'initial',
  },
});
