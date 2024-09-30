import React from 'react';
import { useGeoPrivateIsNextTheme } from '@meta-ui/business/theme';

import { GeoPrivateStatusIconUtils } from '../utils/geo-private-status-icon-utils';

import { GeoPrivateIcon } from './geo-private-icon';

const gkx2467 = true;

export const GeoStatusIcon = ({ color = 'default', 'data-testid': dataTestid, size = 16, status, xstyle }) => {
  const theme = useGeoPrivateIsNextTheme();

  const statusColor = gkx2467 ? l(status) : k(status);

  const _color = color === 'default' ? statusColor : color;

  return (
    <GeoPrivateIcon
      color={_color}
      data-testid={undefined}
      icon={
        theme ? GeoPrivateStatusIconUtils.getNextIcon(status, size) : GeoPrivateStatusIconUtils.getIcon(status, size)
      }
      xstyle={xstyle}
    />
  );
};

function k(status) {
  switch (status) {
    case 'info':
    case 'progress':
    case 'recommendation':
      return 'default';
    case 'success':
      return 'success';
    case 'warning':
      return 'warning';
    default:
      return 'error';
  }
}

function l(status) {
  switch (status) {
    case 'info':
    case 'info-advantage-plus':
    case 'progress':
      return 'default';
    case 'recommendation':
      return 'recommendation';
    case 'success':
    case 'success-advantage-plus':
      return 'success';
    case 'warning':
    case 'warning-emphasized':
      return 'warning';
    case 'error':
    case 'error-emphasized':
      return 'error';
  }
}
