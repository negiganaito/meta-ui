import stylex from '@stylexjs/stylex';

const elevationStyles = stylex.create({
  0: {
    boxShadow: '0 0 0 0 rgba(0,0,0,.1),0 0 0 0 rgba(0,0,0,.1)',
  },
  1: {
    boxShadow: '0 0 5px 0 rgba(0,0,0,.1),0 0 1px 0 rgba(0,0,0,.1)',
  },
  2: {
    boxShadow: '0 2px 8px 0 rgba(0,0,0,.1),0 1px 1px 0 rgba(0,0,0,.1)',
  },
  3: {
    boxShadow: '0 2px 12px 2px rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.1)',
  },
  4: {
    boxShadow: '0 8px 24px 4px rgba(0,0,0,.1),0 2px 2px 0 rgba(0,0,0,.1)',
  },
});

export const GeoPrivateDefaultElevationGeneratedStyles = {
  elevationStyles,
};
