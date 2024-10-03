// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from 'react';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  root: {
    flexDirection: 'column',
    display: 'flex',
    position: 'relative',
    zIndex: 0,
  },
});

export function CometRootContainer({ children }) {
  let ref = useRef(null);
  // useEffect(() => {
  //   b("cr:1119068") != null &&
  //     ref.current != null &&
  //     b("cr:1119068").init(ref.current);
  //   return function () {
  //     b("cr:1119068") != null && b("cr:1119068").clear();
  //   };
  // }, []);

  return (
    <div className={stylex(styles.root)} ref={ref}>
      {children}
    </div>
  );
}
