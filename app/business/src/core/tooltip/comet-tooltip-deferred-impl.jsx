/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from 'react';
import { jsx } from 'react/jsx-runtime';
import { useCometTheme } from '@meta-core/hooks/use-comet-theme';
import { CometProgressRingIndeterminate } from '@meta-core/process-ring/comet-progress-ring-indeterminate';
import { FDSTextPairing } from '@meta-core/text/fds-text-pairing';

import { BaseTooltipImpl } from './base-tooltip-impl';

// type CometTooltipDeferredImplProps = {
//   tooltipTheme?: string
//   align?: 'above' | 'middle' | 'start' | 'end'
//   position?: 'end' | 'start' | 'above' | 'below'
//   contentKey?: string
//   contextRef?: any
//   id?: string
//   isVisible: boolean
//   tooltip?: any

//   headline?: any
// }

export function CometTooltipDeferredImpl({ headline, tooltip, tooltipTheme = 'invert', ...rest }) {
  const [Wrapper, themeClassName] = useCometTheme(tooltipTheme);

  const loadingState = jsx(CometProgressRingIndeterminate, {
    color: 'dark',
    size: 20,
  });

  const tooltipNormalize = tooltip ? (
    <FDSTextPairing body={tooltip} bodyColor="primary" headline={headline} headlineColor="primary" level={4} />
  ) : undefined;

  return (
    <Wrapper>
      <BaseTooltipImpl {...rest} loadingState={loadingState} tooltip={tooltipNormalize} xstyle={themeClassName} />
    </Wrapper>
  );

  // return jsx(Wrapper, {
  //   children: jsx(BaseTooltipImpl, {
  //     ...rest,
  //     loadingState: loadingState,
  //     tooltip: tooltipNormalize,
  //     xstyle: themeClassName,
  //   }),
  // });
}
