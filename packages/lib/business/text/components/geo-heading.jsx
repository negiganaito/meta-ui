import React, { forwardRef } from 'react';
import { GeoFlexbox } from '@meta-business/layout';
import { GeoTextUtils } from '@meta-business/utils';

import { GeoBaseText } from './geo-base-text';

export const GeoHeading = forwardRef(
  ({ children, display = 'block', level, textAlign = 'start', tooltip, whiteSpace = 'inherit', ...props }, ref) => {
    const headingProps = {
      color: 'heading',
      display,
      size: GeoTextUtils.mapHeadingLevelToSize(level),
      textAlign,
      whiteSpace,
    };

    return display === 'truncate' && tooltip ? (
      <GeoFlexbox direction="row">
        <GeoBaseText {...headingProps} ref={ref} {...props}>
          {children}
        </GeoBaseText>
        {tooltip}
      </GeoFlexbox>
    ) : (
      <GeoBaseText {...headingProps} ref={ref} {...props}>
        {children}
        {tooltip}
      </GeoBaseText>
    );
  },
);
