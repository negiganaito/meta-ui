import React from 'react';
import { WebPressable } from '@meta-core/pressable/web-pressable';

import { GeoPrivatePressableRouterLink } from './geo-private-pressable-router-link';

export const GeoPrivatePressable = (props) => {
  // useGeoPrivatePressableSSRSafeProps(props);

  if (props.link) {
    return <GeoPrivatePressableRouterLink {...props} />;
  } else {
    return <WebPressable {...props} />;
  }
};
