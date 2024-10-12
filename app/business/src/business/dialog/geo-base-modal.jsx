import React from 'react';
import { jsx } from 'react/jsx-runtime';
import { GeoCardHeaderLabelContext } from '@meta-business/contexts/geo-card-header-label-context';
import { GeoFormInputInlineContext } from '@meta-business/contexts/geo-form-input-inline-context';
import { GeoPrivateCardLayerContext } from '@meta-business/contexts/geo-private-card-layer-context';
import { GeoPrivateInvertThemeContext } from '@meta-business/contexts/geo-private-invert-theme-context';
import { GeoPrivatePreventContentAnimationContext } from '@meta-business/contexts/geo-private-prevent-content-animation-context';
import { useGeoPrivatePopupBlocker } from '@meta-business/hooks/use-geo-private-popup-blocker';
import { GeoPrivateResetSelectorStyle } from '@meta-business/unknown/geo-private-reset-selector-style';
import { useUniqueID } from '@meta-core/hooks/use-unique-id';

import { GeoPrivateBaseModalLayer } from './geo-private-base-modal-layer';

const defaultFormContext = {
  isInline: false,
};

export function GeoBaseModal({
  behaviors = {},
  children,
  dialogTransition,
  getCausalElementRef,
  hideOnBlur = true,
  hideOnEscape,
  interactionArea,
  isFixedToTop = false,
  isShown,
  layerRef,
  modalRef,
  onHide,
  width = 600,
  xstyle,
}) {
  const labelID = useUniqueID();
  const isCardLayerContext = React.useContext(GeoPrivateCardLayerContext);
  isShown = useGeoPrivatePopupBlocker(isShown);

  if (isCardLayerContext) {
    return children;
  }

  return jsx(GeoPrivateCardLayerContext.Provider, {
    value: true,
    children: jsx(GeoCardHeaderLabelContext.Provider, {
      value: labelID,
      children: jsx(GeoPrivateInvertThemeContext.Provider, {
        value: false,
        children: jsx(GeoPrivateResetSelectorStyle, {
          children: jsx(GeoFormInputInlineContext.Provider, {
            value: defaultFormContext,
            children: jsx(GeoPrivateBaseModalLayer, {
              dialogTransition,
              hideOnBlur,
              hideOnEscape,
              isFixedToTop,
              isShown,
              labelledBy: labelID,
              layerRef,
              onHide,
              width,
              xstyle,
              children: jsx(GeoPrivatePreventContentAnimationContext.Provider, {
                value: true,
                children,
              }),
            }),
          }),
        }),
      }),
    }),
  });
}
