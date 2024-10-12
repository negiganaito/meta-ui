import React from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';

export const GeoPrivatePopupBlockerContext = React.createContext({
  hasPermissionToRender: function () {
    return !0;
  },
  addPopup: emptyFunction,
});
