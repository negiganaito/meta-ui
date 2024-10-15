import { jsx, jsxs } from 'react/jsx-runtime';
import { GeoButton } from '@meta-business/button/geo-button';
import { GeoModal } from '@meta-business/dialog/geo-modal';
import { GeoModalFooter } from '@meta-business/dialog/geo-modal-footer';
import { GeoModalHeader } from '@meta-business/dialog/geo-modal-header';
import { GeoFlexbox } from '@meta-business/layout/geo-flexbox';
import { GeoSection } from '@meta-business/layout/geo-section';

export const BusinessContentManagerSeriesCreateOrEditSeriesDialog = ({
  props,
  isEditMode,
  onHide,
  prevDetails,
  refreshCallback,
}) => {
  const g = jsx(GeoModalHeader, {
    heading: isEditMode ? 'Edit series' : 'New series',
  });

  const x = jsx(GeoModalFooter, {
    primaryButton: jsx(GeoButton, {
      isDisabled: true,
      isLoading: true,
      label: isEditMode ? 'Edit series' : 'New series',
      onClick: () => {},
      variant: 'primary',
    }),
    secondaryButton: isEditMode
      ? jsx(GeoButton, {
          isDisabled: true,
          label: 'Cancel',
          onClick: function () {
            return onHide('layerCancelButton');
          },
        })
      : null,
  });

  return jsx(GeoModal, {
    footer: x,
    header: g,
    isShown: !0,
    onHide: onHide,
    width: 1e3,
    children: jsx(GeoSection, {
      children: jsxs(GeoFlexbox, {
        direction: 'column',
      }),
    }),
  });
};
