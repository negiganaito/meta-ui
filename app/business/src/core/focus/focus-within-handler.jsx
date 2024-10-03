import React from 'react';

import { FocusWithinHandlerNonStrictMode_DEPRECATED } from './focus-within-handler-non-strict-mode_DEPRECATED';
import { FocusWithinHandlerStrictMode } from './focus-within-handler-strict-mode';

const gkx3696 = false;

export const FocusWithinHandler = (props) => {
  if (gkx3696) {
    return <FocusWithinHandlerStrictMode {...props} />;
  } else {
    // eslint-disable-next-line react/jsx-pascal-case
    return <FocusWithinHandlerNonStrictMode_DEPRECATED {...props} />;
  }
};
