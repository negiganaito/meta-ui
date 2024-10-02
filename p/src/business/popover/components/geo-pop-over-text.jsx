import React from 'react';
import { GeoPrivateDisabledContext } from '@meta-ui/business/contexts';
import { geoMargin } from '@meta-ui/business/styles';
import { GeoHeading, GeoText } from '@meta-ui/business/text';

export function GeoPopoverText({ children, containerRef, title, whiteSpace }) {
  return (
    <GeoPrivateDisabledContext.Provider value={false}>
      <div ref={containerRef}>
        {title && (
          <GeoHeading level={4} textAlign="start" whiteSpace={whiteSpace} xstyle={geoMargin.top8}>
            {title}
          </GeoHeading>
        )}
        <GeoText display="block" textAlign="start" whiteSpace={whiteSpace}>
          {children}
        </GeoText>
      </div>
    </GeoPrivateDisabledContext.Provider>
  );
}
