import React, { forwardRef, useContext, useEffect, useMemo, useRef } from 'react';
import { BUIPrivateButtonLayoutContext } from '@meta-business/contexts/bui-private-button-layout-context';
import { GeoPrivateButtonLayerActionContext } from '@meta-business/contexts/geo-private-button-layer-action-context';
import { GeoPrivateButtonStyleContext } from '@meta-business/contexts/geo-private-button-style-context';
import { GeoPrivateHoverCardContext } from '@meta-business/contexts/geo-private-hover-card-context';
import { useMergeRefs } from '@meta-core/react-utils/use-merge-refs';
import stylex from '@stylexjs/stylex';

import { GeoPrivateBaseButton } from './geo-private-base-button';

export const GeoButton = forwardRef(
  (
    {
      ariaLabel,
      autoFocus = false,
      containerRef,
      isDepressed,
      layerAction,
      loggingName = 'GeoButton',
      maxWidth,
      minWidth,
      onClick,
      onHoverChange,
      width,
      grow,
      isDisabled = false,
      type = 'button',
      xstyle,
      ...props
    },
    ref,
  ) => {
    const localRef = useRef(null);
    const layoutContext = BUIPrivateButtonLayoutContext.useLayoutContext();
    // const layoutStyle = layoutContext[0];

    // eslint-disable-next-line no-unused-vars
    const { marginLeft: _marginLeft, ...layoutStyle } = layoutContext[0];

    const buttonStyleContext = useContext(GeoPrivateButtonStyleContext);
    const buttonWidth = buttonStyleContext.width ?? width;
    const hoverCardContext = useContext(GeoPrivateHoverCardContext);
    const isHoverCard = hoverCardContext.isHoverCard;

    const finalGrow = isHoverCard ? 'fill' : grow;
    let combinedRef = useMergeRefs(containerRef, ref);
    combinedRef = useMergeRefs(combinedRef, layoutContext[1]);

    const layerActionContextValue = useMemo(() => {
      switch (layerAction) {
        case 'confirm':
          return 'layerConfirm';
        case 'cancel':
          return 'layerCancel';
        case 'button':
          return 'layerButton';
        default:
          return null;
      }
    }, [layerAction]);

    useEffect(() => {
      if (autoFocus) {
        localRef.current?.focus();
      }
    }, [autoFocus, autoFocus]);

    const isWidthDefined = buttonWidth !== null || minWidth !== null || maxWidth !== null;

    return (
      <GeoPrivateButtonLayerActionContext.Provider value={layerActionContextValue}>
        <div
          className={stylex(styles.buttonWrapper, finalGrow === 'fill' && styles.grow, xstyle)}
          role="none"
          style={{ ...layoutStyle, width: buttonWidth, minWidth, maxWidth }}
        >
          <GeoPrivateBaseButton
            {...props}
            aria-label={ariaLabel}
            containerRef={combinedRef}
            grow={isWidthDefined || finalGrow === 'fill' ? 'fill' : undefined}
            isDepressed={isDepressed}
            isDisabled={isDisabled}
            loggingName={loggingName}
            onClick={onClick}
            onHoverChange={onHoverChange}
            type={type}
          />
        </div>
      </GeoPrivateButtonLayerActionContext.Provider>
    );
  },
);

const styles = stylex.create({
  buttonWrapper: {
    display: 'inline-flex',
    maxWidth: '100%',
    verticalAlign: 'middle',
  },
  grow: {
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
  },
});
