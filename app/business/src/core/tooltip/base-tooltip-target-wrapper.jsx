import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { FocusWithinHandler } from '@meta-core/focus/focus-within-handler';
import stylex from '@stylexjs/stylex';

export const BaseTooltipTargetWrapper = forwardRef(
  ({ children, forceInlineDisplay, onHide, onShow, tooltipIdentifier }, ref) => {
    const [isFocus, onFocusChange] = useState(false);
    const [isFocusVisible, onFocusVisibleChange] = useState(false);

    const focus = isFocus && isFocusVisible;
    const focusRef = useRef(focus);

    useEffect(() => {
      if (focusRef.current !== focus) {
        if (focus) {
          onShow();
        } else {
          onHide();
        }
      }
      focusRef.current = focus;
    }, [onHide, onShow, focus]);

    const onKeyDown = useCallback(
      (event) => {
        const { key } = event;
        if (key === 'Escape' && tooltipIdentifier) {
          onHide();
          event.stopPropagation();
        }
      },
      [onHide, tooltipIdentifier],
    );

    return (
      <span
        aria-describedby={tooltipIdentifier}
        className={stylex(styles.inheritAll, forceInlineDisplay && styles.wrapperInline)}
        data-testid={undefined}
        onKeyDown={onKeyDown}
        onPointerEnter={onShow}
        onPointerLeave={onHide}
        onPointerUp={onHide}
        ref={ref}
      >
        <FocusWithinHandler onFocusChange={onFocusChange} onFocusVisibleChange={onFocusVisibleChange}>
          {children}
        </FocusWithinHandler>
      </span>
    );
  },
);

BaseTooltipTargetWrapper.displayName = 'BaseTooltipTargetWrapper.react';

const styles = stylex.create({
  inheritAll: {
    alignContent: 'inherit',
    alignItems: 'inherit',
    alignSelf: 'inherit',
    display: 'inherit',
    flexBasis: 'inherit',
    flexDirection: 'inherit',
    flexGrow: 'inherit',
    flexShrink: 'inherit',
    height: 'inherit',
    justifyContent: 'inherit',
    maxHeight: 'inherit',
    maxWidth: 'inherit',
    minHeight: 'inherit',
    minWidth: 'inherit',
    width: 'inherit',
  },
  wrapperInline: {
    display: 'inline-flex',
  },
});
