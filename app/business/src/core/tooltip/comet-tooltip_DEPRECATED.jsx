/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from 'react';

import { BaseTooltip } from './base-tooltip';
import { CometTooltipImpl } from './comet-tooltip-impl';

export const CometTooltip = (props) => {
  const { delayMs, tooltipTheme_DO_NOT_USE_OR_IT_WILL_BREAK_CONTRAST_ACCESSIBILITY, ...rest } = props;

  return (
    <BaseTooltip
      {...rest}
      delayTooltipMs={delayMs}
      tooltipImpl={CometTooltipImpl}
      tooltipTheme={tooltipTheme_DO_NOT_USE_OR_IT_WILL_BREAK_CONTRAST_ACCESSIBILITY}
    />
  );
};

/**

CometTooltip
  BaseTooltip
    useDelayedState
    BaseTooltipGroup
      BaseTooltipTargetWrapper
        FocusWithinHandler
    BaseTooltipTargetWrapper
  CometTooltipImpl
    CometTooltipDeferredImpl
      CometProgressRingIndeterminate
        BaseLoadingStateElement
        CometImageFromIXValue
        CometProgressRingUtils
      TetraTextPairing
      BaseTooltipImpl
        BaseContextualLayer
        CometPlaceholder
        CometHeroInteractionContextPassthrough
        BaseTooltipContainer
 */
