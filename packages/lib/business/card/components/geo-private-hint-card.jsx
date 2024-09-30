import React from 'react';
import stylex from '@stylexjs/stylex';

import { GeoBaseLayerEscapeBehavior } from '../utils/geo-base-layer-escape-behavior';

export const GeoPrivateHintCard = ({
  align,
  children,
  context,
  'data-testid': dataTestId,
  hideOnBlur,
  id,
  isShown,
  isSticky = false,
  layerRef,
  popoverType = 'infoTooltip',
  position = 'above',
  onHide,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  ...rest
}) => {
  const isPositionVertical = position === 'above' || position === 'below';
  const content = (
    <GeoBaseLayerEscapeBehavior onEscape={onHide}>
      <HintCardWrapper context={context} hideOnBlur={!!hideOnBlur} onBlur={onHide}>
        <GeoBaseContextualLayer
          align={align}
          containerRef={layerRef}
          context={context}
          position={mapPosition(position)}
        >
          <div
            className={stylex(
              useLayerContentContainerStyle({
                isPositionVertical,
              }),
            )}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onMouseMove={onMouseMove}
            {...rest}
          >
            <HintCardContent id={id} popoverType={popoverType}>
              {children}
            </HintCardContent>
          </div>
        </GeoBaseContextualLayer>
      </HintCardWrapper>
    </GeoBaseLayerEscapeBehavior>
  );

  return (
    <StickyLayerWrapper isSticky={isSticky} onHide={onHide}>
      <VisibilityLayerWrapper isShown={isShown}>{content}</VisibilityLayerWrapper>
    </StickyLayerWrapper>
  );
};

GeoPrivateHintCard.displayName = 'GeoPrivateHintCard';

const VisibilityLayerWrapper = ({ isShown, children }) => {
  const GKX_24835 = true;
  return GKX_24835 ? (
    <GeoPrivateAnimationLayerContainer isLayerShown={isShown}>{children}</GeoPrivateAnimationLayerContainer>
  ) : (
    <GeoBaseLayerFadeBehavior isShown={isShown}>{children}</GeoBaseLayerFadeBehavior>
  );
};

VisibilityLayerWrapper.displayName = 'VisibilityLayerWrapper';

const HintCardContent = ({ children, id, popoverType }) => {
  const GKX_24835 = true;

  const domIdProps = useApplyGeoDomIDsDirectly({ id });
  const animationLayerStyles = useGeoPrivateAnimationLayerStyles({
    elevation: 2,
  });
  return (
    <div
      className={stylex(
        useLayerContentStyle(),
        useTooltipContainerStyle({
          type: popoverType,
        }),
        GKX_24835 && animationLayerStyles,
      )}
      onClick={stopPropagation}
      onMouseDown={stopPropagation}
      {...domIdProps}
    >
      <GeoPrivateResetAnimationLayer>{children}</GeoPrivateResetAnimationLayer>
    </div>
  );
};

const StickyLayerWrapper = ({ isSticky, onHide, children }) => {
  return !isSticky ? (
    <GeoBaseLayerExitBehavior delay={50} onExit={onHide}>
      {children}
    </GeoBaseLayerExitBehavior>
  ) : (
    children
  );
};

const HintCardWrapper = ({ children, context, hideOnBlur, onBlur }) => {
  return hideOnBlur ? <GeoBaseLayerBlurBehavior onBlur={onBlur}>{children}</GeoBaseLayerBlurBehavior> : children;
};
