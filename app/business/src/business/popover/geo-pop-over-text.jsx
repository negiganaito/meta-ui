import React from 'react';
import { GeoPrivateDisabledContext } from '@meta-business/contexts/geo-private-disabled-context';
import { geoMargin } from '@meta-business/styles/geo-margin';
import { GeoHeading } from '@meta-business/text/geo-heading';
import { GeoText } from '@meta-business/text/geo-text';

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
