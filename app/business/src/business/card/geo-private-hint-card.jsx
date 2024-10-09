import React from 'react';
import { GeoBaseContextualLayer } from '@meta-business/contextual/geo-base-contextual-layer';
import { GeoBaseLayerBlurBehavior } from '@meta-business/layout/geo-base-layer-blur-behavior';
import { GeoBaseLayerExitBehavior } from '@meta-business/layout/geo-base-layer-exit-behavior';
import { GeoBaseLayerFadeBehavior } from '@meta-business/layout/geo-base-layer-fade-behavior';
import { GeoPrivateAnimationLayerContainer } from '@meta-business/layout/geo-private-animation-layer-container';
import { GeoPrivateResetAnimationLayer } from '@meta-business/layout/geo-private-reset-animation-layer';
import { useGeoPrivateAnimationLayerStyles } from '@meta-business/layout/use-geo-private-animation-layer-styles';
import { GeoPrivateHintLayerUtils } from '@meta-business/tooltip/geo-private-hint-layer-utils';
import { GeoDomID } from '@meta-business/utils/geo-dom-id';
import { GeoLayerUtils } from '@meta-business/utils/geo-layer-utils';
import { stopPropagation } from '@meta-core/utils/stop-propagation';
import stylex from '@stylexjs/stylex';

import { GeoBaseLayerEscapeBehavior } from './geo-base-layer-escape-behavior';

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
          position={GeoLayerUtils.mapPosition(position)}
        >
          <div
            className={stylex(
              GeoPrivateHintLayerUtils.useLayerContentContainerStyle({
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

const gkx24835 = true;

const VisibilityLayerWrapper = ({ isShown, children }) => {
  return gkx24835 ? (
    <GeoPrivateAnimationLayerContainer isLayerShown={isShown}>{children}</GeoPrivateAnimationLayerContainer>
  ) : (
    <GeoBaseLayerFadeBehavior isShown={isShown}>{children}</GeoBaseLayerFadeBehavior>
  );
};

VisibilityLayerWrapper.displayName = 'VisibilityLayerWrapper';

const HintCardContent = ({ children, id, popoverType }) => {
  const GKX_24835 = true;

  const domIdProps = GeoDomID.useApplyGeoDomIDsDirectly({ id });
  const animationLayerStyles = useGeoPrivateAnimationLayerStyles({
    elevation: 2,
  });
  return (
    <div
      className={stylex(
        GeoPrivateHintLayerUtils.useLayerContentStyle(),
        GeoPrivateHintLayerUtils.useTooltipContainerStyle({
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
