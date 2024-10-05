import React from 'react';
import { FBLogger } from '@meta-core/error/fb-logger';

export const GeoPrivateModalContext = React.createContext(() => {
  FBLogger('geodesic_web').blameToPreviousFrame().mustfix('Trying to render modal without GeoTransientModalProvider');
});
