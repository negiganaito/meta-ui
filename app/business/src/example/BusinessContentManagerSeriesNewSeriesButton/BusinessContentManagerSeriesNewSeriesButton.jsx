import React from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import { GeoButton } from '@meta-business/button/geo-button';
import { useGeoEntryPointModal } from '@meta-business/dialog/use-geo-entry-point-modal';
import { BizKitErrorBoundary } from '@meta-business/error/biz-kit-error-boundary';
import { fbicon } from '@meta-core/image/fb-icon';
import { ix } from '@meta-core/image/ix';

import { BusinessContentManagerSeriesCreateOrEditSeriesDialogEntryPoint } from './BusinessContentManagerSeriesCreateOrEditSeriesDialog.entrypoint';

export const BusinessContentManagerSeriesNewSeriesButton = ({ refreshCallback }) => {
  const { modal, showModal } = useGeoEntryPointModal(
    BusinessContentManagerSeriesCreateOrEditSeriesDialogEntryPoint,
    {
      isEditMode: !1,
      refreshCallback,
    },
    {},
  );

  return jsxs(React.Fragment, {
    children: [
      jsx(GeoButton, {
        icon: fbicon._(ix(483768), 16),
        label: 'New series',
        onClick: showModal,
      }),
      jsx(BizKitErrorBoundary, {
        fallback: () => {
          return null;
        },
        children: modal,
      }),
    ],
  });
};
