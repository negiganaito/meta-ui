/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useCallback, useContext, useId, useRef } from 'react';
import { useDelayedState } from '@meta-core/hooks/use-delayed-state';

import { BaseTooltipGroup } from './base-tooltip-group';
import { BaseTooltipTargetWrapper } from './base-tooltip-target-wrapper';

const hideDelayMs = 50;
const defaultDelayTooltipMs = 300;

// type BaseTooltipWithoutContextProps = {
//   children?: ReactNode
//   delayTooltipMs?: number
//   disabled?: boolean
//   forceInlineDisplay?: any
//   tooltipImpl?: any
//   onVisibilityChange?: any
// }

// type BaseTooltipProps = {
//   delayTooltipMs?: number
//   tooltipImpl?: any

//   headline?: any
//   tooltip?: any
//   tooltipTheme?: string
//   position?: 'end' | 'start' | 'above' | 'below'
//   children?: ReactNode
// }

function BaseTooltipWithoutContext({
  children,
  delayTooltipMs = defaultDelayTooltipMs,
  disabled = false,
  forceInlineDisplay,
  tooltipImpl: TooltipImpl,
  onVisibilityChange,
  ...rest
}) {
  const [isVisible, delayCb] = useDelayedState(false);

  const tooltipId = useId();

  const ref = useRef(null);

  const onShow = useCallback(() => {
    if (disabled) {
      return;
    }
    delayCb(true, delayTooltipMs, onVisibilityChange);
  }, [delayTooltipMs, disabled, onVisibilityChange, delayCb]);

  const onHide = useCallback(() => {
    delayCb(false, 0, onVisibilityChange);
  }, [onVisibilityChange, delayCb]);

  return (
    <>
      <BaseTooltipTargetWrapper
        forceInlineDisplay={forceInlineDisplay}
        onHide={onHide}
        onShow={onShow}
        ref={ref}
        tooltipIdentifier={isVisible ? tooltipId : undefined}
      >
        {children}
      </BaseTooltipTargetWrapper>
      <TooltipImpl
        {...rest}
        contentKey={undefined}
        contextRef={ref}
        id={isVisible ? tooltipId : undefined}
        isVisible={isVisible}
      />
    </>
  );

  // return jsx(React.Fragment, {
  //   children: [
  //     jsx(BaseTooltipTargetWrapper, {
  //       children,
  //       forceInlineDisplay,
  //       onHide,
  //       onShow,
  //       ref,
  //       tooltipIdentifier: isVisible ? tooltipId : undefined,
  //     }),
  //     jsx(
  //       tooltipImpl,
  //       Object.assign({}, rest, {
  //         contentKey: undefined,
  //         contextRef: ref,
  //         id: isVisible ? tooltipId : undefined,
  //         isVisible: isVisible,
  //       }),
  //     ),
  //   ],
  // });
}

export function BaseTooltip(props) {
  const baseTooltipGroupValue = useContext(BaseTooltipGroup.Context);

  if (baseTooltipGroupValue) {
    const _delayTooltipMs = props.delayTooltipMs ?? defaultDelayTooltipMs;
    // eslint-disable-next-line no-unused-vars
    const { delayTooltipMs, tooltipImpl, ...rest } = props;

    return <BaseTooltipGroup.Child {...rest} hideDelayMs={hideDelayMs} showDelayMs={_delayTooltipMs} />;

    // return jsx(
    //   BaseTooltipGroup.Child,
    //   Object.assign({}, rest, {
    //     hideDelayMs,
    //     showDelayMs: _delayTooltipMs,
    //   }),
    // );
  }

  return <BaseTooltipWithoutContext {...props} />;

  // return jsx(BaseTooltipWithoutContext, Object.assign({}, props));
}
