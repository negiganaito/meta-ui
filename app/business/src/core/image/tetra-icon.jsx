import React, { forwardRef } from 'react';

import { FDSIcon } from './fds-icon';

export const TetraIcon = forwardRef((props, ref) => {
  return <FDSIcon {...props} ref={ref} />;
});
