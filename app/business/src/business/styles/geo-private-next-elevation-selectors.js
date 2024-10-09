import stylex from '@stylexjs/stylex';

import { GeoPrivateNextElevationGeneratedStyles } from './geo-private-next-elevation-generated-styles';

const styles = stylex.create({
  foaShadow: {
    position: 'relative',

    // eslint-disable-next-line @stylexjs/valid-styles
    '::before': {
      borderImageRepeat: 'stretch',
      borderImageSlice: '5 5 fill',
      borderImageSource:
        'url(data:image/png;base64,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)',
      borderImageWidth: '20px',
      borderStyle: 'solid',
      borderWidth: '20px',
      boxSizing: 'content-box',
      content: '""',
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      left: '-20px',
      right: null,
      top: '-20px',
      width: '100%',
      zIndex: -2,
    },
  },
});

export const selectElevation = ({ level, useFOAShadow = false }) => {
  return useFOAShadow ? styles.foaShadow : GeoPrivateNextElevationGeneratedStyles.elevationStyles[level];
};

export const GeoPrivateNextElevationSelectors = {
  selectElevation,
};
