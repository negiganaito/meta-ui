import React from 'react';
import { Image, TintableIconSource, WebCSSTintedIcon } from '@meta-ui/core/image';
import { isTruthy } from '@meta-ui/core/utils';
import stylex from '@stylexjs/stylex';

import { useGeoIconStyle } from '../hooks/use-geo-icon-style';
import { useGeoPrivateIsDisabled } from '../hooks/use-geo-private-is-disabled';

const styles = stylex.create({
  root: {
    display: 'inline-flex',
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) svg': {
      fill: 'currentColor',
    },

    // fill: {
    //   default: null,
    //   ":not([stylex-hack]) svg": "currentColor"
    // }
  },
});

export const GeoPrivateIcon = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { 'data-testid': dataTestId, description, color, icon, isDisabled = false, xstyle } = props;

  const disabled = useGeoPrivateIsDisabled(isDisabled);
  const iconStyle = useGeoIconStyle({
    color: color ?? 'default',
    isDisabled: disabled,
  });

  let iconElement = null;

  if (icon instanceof TintableIconSource) {
    iconElement = <WebCSSTintedIcon fallback={<Image src={icon.src} />} icon={icon} />;
  } else if (React.isValidElement(icon)) {
    iconElement = icon;
  }

  return (
    <div
      aria-label={description}
      className={stylex(styles.root, iconStyle, xstyle)}
      data-testid={undefined}
      role={isTruthy(description) ? 'img' : 'presentation'}
    >
      {iconElement}
    </div>
  );
};
