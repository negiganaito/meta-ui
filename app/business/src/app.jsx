import React from 'react';
import { GeoBaseText } from '@meta-ui/business/text';
import { GeoTextUtils } from '@meta-ui/business/utils';

export const App = () => {
  return (
    <div>
      <GeoBaseText
        {...GeoTextUtils.getPairingTextProps({
          size: 'header1',
          display: 'truncate',
        })}
      >
        Schedule, publish and manage posts and stories, and more.
      </GeoBaseText>
    </div>
  );
};
