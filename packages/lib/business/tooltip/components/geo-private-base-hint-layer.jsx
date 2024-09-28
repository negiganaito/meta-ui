import React, { useContext, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import {
  GeoBaseHintSingletonContext,
  GeoPrivateBaseHintContext,
  GeoPrivateInvertThemeContext,
  GeoPrivateLayerVisibilityContext,
  GeoPrivateTooltipAnchorContext,
  GeoPrivateTooltipTriggerContext,
} from '@meta-ui/business/contexts';
import { useGeoMouseListeners, useGeoPrivateHintHoverBehavior } from '@meta-ui/business/hooks';
import { useDebounced } from '@meta-ui/core/hooks';

export const GeoPrivateBaseHintLayer = ({
  align = 'start',
  'data-testid': dataTestId,
  children,
  id,
  hideOnBlur,
  imperativeRef,
  isLayerHoverable = true,
  isSticky = false,
  onToggle,
  renderDelay,
  popoverType = 'infoTooltip',
  position = 'above',
  triggerRef,
  groupName = 'default',
  xstyle,
  ...props
}) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const layerRef = useRef(null);
  const triggerContextRef = useContext(GeoPrivateTooltipTriggerContext);
  const anchorContext = useContext(GeoPrivateTooltipAnchorContext);
  const anchorRef = anchorContext.anchorRef;
  const isAnchorHoverable = anchorContext.isHoverable;
  const finalTriggerRef = triggerRef ?? triggerContextRef;
  const hoverable = !isSticky && (isLayerHoverable || isAnchorHoverable);

  const singletonContext = useContext(GeoBaseHintSingletonContext);
  const { groups, setLastHintLayerForGroup } = singletonContext;

  const visibilityContext = useContext(GeoPrivateLayerVisibilityContext);
  const { isLayerVisible, onHideLayer, onShowLayer } = useGeoPrivateHintHoverBehavior({
    renderDelay,
    onToggle,
  });

  useImperativeHandle(imperativeRef, () => ({
    show: onShowLayer,
    hide: onHideLayer,
    disableTrigger: () => setIsEnabled(false),
  }));

  const debouncedOnHideLayer = useDebounced(onHideLayer, 200);

  const handleMouseEnter = () => {
    if (groups) {
      if (groups.has(groupName)) {
        let group = groups.get(groupName);
        if (group && group.ref !== finalTriggerRef) {
          group.hide();
        }
      }
      finalTriggerRef &&
        setLastHintLayerForGroup(groupName, {
          ref: finalTriggerRef,
          hide: onHideLayer,
        });
    }

    debouncedOnHideLayer.reset();
    onShowLayer();
  };

  const handleMouseLeave = () => {
    if (!isSticky) debouncedOnHideLayer();
  };

  const handleMouseMove = () => {
    debouncedOnHideLayer.reset();
    visibilityContext || onShowLayer();
  };

  useGeoMouseListeners(
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove,
    isEnabled ? finalTriggerRef : null,
    hoverable ? layerRef : null,
  );

  useEffect(() => {
    const triggerElement = finalTriggerRef?.current;
    if (triggerElement === null) return;
    triggerElement.addEventListener('mouseenter', handleMouseEnter);
    triggerElement.addEventListener('mousemove', handleMouseMove);
    triggerElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      triggerElement.removeEventListener('mouseenter', handleMouseEnter);
      triggerElement.removeEventListener('mousemove', handleMouseMove);
      triggerElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [finalTriggerRef, isEnabled, hoverable]);

  const contextValue = useMemo(() => ({ isSticky, popoverType }), [isSticky, popoverType]);

  const triggerElement = anchorRef?.current ?? finalTriggerRef?.current;
  const hintLayer = triggerElement ? (
    <GeoPrivateBaseHintContext.Provider value={contextValue}>
      <GeoPrivateInvertThemeContext.Provider value={false}>
        <GeoPrivateHintCard
          align={align}
          context={triggerElement}
          data-testid={dataTestId}
          hideOnBlur={hideOnBlur}
          id={id}
          isShown={visibilityContext ?? isLayerVisible}
          isSticky={isSticky}
          layerRef={layerRef}
          onHide={debouncedOnHideLayer}
          onMouseEnter={hoverable ? handleMouseEnter : null}
          onMouseLeave={hoverable ? handleMouseLeave : null}
          onMouseMove={hoverable ? handleMouseMove : null}
          popoverType={popoverType}
          position={position}
          {...props}
        >
          {children({ onHideLayer })}
        </GeoPrivateHintCard>
      </GeoPrivateInvertThemeContext.Provider>
    </GeoPrivateBaseHintContext.Provider>
  ) : null;

  return finalTriggerRef !== null ? hintLayer : null;
};

GeoPrivateBaseHintLayer.displayName = `GeoPrivateBaseHintLayer [from ${__filename}]`;
