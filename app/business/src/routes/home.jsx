import React from 'react';
import { GeoButton } from '@meta-business/button/geo-button';
import { GeoFlexbox } from '@meta-business/layout/geo-flexbox';
import { geoMargin } from '@meta-business/styles/geo-margin';
import { GeoBaseText } from '@meta-business/text/geo-base-text';
import { GeoHeading } from '@meta-business/text/geo-heading';
import { GeoTextUtils } from '@meta-business/utils/geo-text-utils';

export const Home = () => {
  return (
    <GeoFlexbox gap={16} display="flex" direction="column" xstyle={geoMargin.all8}>
      <GeoBaseText
        {...GeoTextUtils.getPairingTextProps({
          size: 'header1',
          display: 'truncate',
        })}
      >
        Schedule, publish and manage posts and stories, and more.
      </GeoBaseText>

      <GeoHeading level={2}>Series</GeoHeading>

      <GeoButton label="See all series" onClick={() => console.log('Click')} />
    </GeoFlexbox>
  );
};
