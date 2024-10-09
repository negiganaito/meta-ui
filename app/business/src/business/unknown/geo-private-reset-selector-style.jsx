import React from 'react';
import { GeoPrivateSelectorContext } from '@meta-business/contexts/geo-private-selector-context';

const val = {
  trigger: 'input',
};

export const GeoPrivateResetSelectorStyle = ({ children }) => {
  return <GeoPrivateSelectorContext.Provider value={val}>{children}</GeoPrivateSelectorContext.Provider>;
};
