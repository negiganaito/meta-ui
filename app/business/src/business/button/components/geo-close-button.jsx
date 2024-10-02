import React from 'react';
import { useGeoPrivateIsNextTheme } from '@meta-ui/business/theme';
import { fbicon, ix } from '@meta-ui/core/image';

import { GeoPrivateBaseButton } from './geo-private-base-button';

export function GeoCloseButton(props) {
  const { label = 'Close', isDisabled = false, ...otherProps } = props;

  const isNextTheme = useGeoPrivateIsNextTheme();

  return (
    <GeoPrivateBaseButton
      {...otherProps}
      icon={isNextTheme ? fbicon(ix(478237), 16) : fbicon(ix(478232), 16)}
      isDisabled={isDisabled}
      isLabelHidden={true}
      label={label}
      loggingName="GeoCloseButton"
      variant="flat"
    />
  );
}
