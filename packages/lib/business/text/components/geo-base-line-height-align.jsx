import React from 'react';
import stylex from '@stylexjs/stylex';

import { useGeoPrivateTextStyle } from '../hooks/use-geo-private-text-style';

const symbol = '\u200b';

const styles = stylex.create({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  temp: {
    height: '1px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const textStyles = {
  color: 'value',
  display: 'block',
  overflowWrap: 'normal',
  textAlign: 'inherit',
  whiteSpace: 'inherit',
  weight: 'normal',
};

export const GeoBaseLineHeightAlign = ({ size = 'value', ...rest }) => {
  const combineTextStyles = useGeoPrivateTextStyle({ ...textStyles, size });

  return (
    <>
      <div className={stylex([combineTextStyles, styles.root, rest.xstyle])}>
        <span>{symbol}</span>
        <div className={stylex(styles.temp)}>{rest.children}</div>
      </div>
      <div />
    </>
  );
};
