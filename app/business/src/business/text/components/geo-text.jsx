import React from 'react';

import { GeoBaseText } from './geo-base-text';

export const GeoText = ({ children, containerRef, display = 'inline', ...rest }) => {
  return (
    <GeoBaseText color="value" display={display} size="value" {...rest} ref={containerRef}>
      {children}
    </GeoBaseText>
  );
};
