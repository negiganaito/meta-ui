import { useContext } from 'react';

import { GeoPrivatePressableRouterLinkContext } from './geo-private-pressable-router-link-context';

export const GeoPrivatePressableRouterLink = (props) => {
  const Comp = useContext(GeoPrivatePressableRouterLinkContext);

  return <Comp {...props} />;
};
