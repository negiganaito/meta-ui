import React from 'react';

import { GeoBaseText } from './geo-base-text';

export function GeoDataText({ children, containerRef, display = 'block', textAlign, whiteSpace, ...props }) {
  return (
    <GeoBaseText
      color="value"
      display={display}
      ref={containerRef}
      size="data"
      textAlign={textAlign}
      whiteSpace={whiteSpace}
      {...props}
    >
      {children}
    </GeoBaseText>
  );
}

GeoDataText.displayName = 'GeoDataText';
