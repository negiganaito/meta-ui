import React from 'react';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  root: {
    alignContent: 'inherit',
    alignItems: 'inherit',
    borderTopLeftRadius: 'inherit',
    borderTopRightRadius: 'inherit',
    borderBottomRightRadius: 'inherit',
    borderBottomLeftRadius: 'inherit',
    display: 'inherit',
    flexDirection: 'inherit',
    height: 'inherit',
    justifyContent: 'inherit',
    position: 'relative',
    width: 'inherit',
  },
});

export const CometPressableChildrenWithOverlay = ({ children, overlay }) => {
  return (
    <div className={stylex(styles.root)}>
      {children}
      {overlay}
    </div>
  );
};
