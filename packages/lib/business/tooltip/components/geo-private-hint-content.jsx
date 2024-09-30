/**
 __d("GeoPrivateHintContent.react", 
  ["GeoBaseSpacingLayout.react", 
  "GeoCloseButton.react", 
  "GeoFlexbox.react", 
  "GeoPrivateBaseHintContext", 
  "GeoPrivateHintLayerUtils", 
  "GeoPrivateMakeComponent", 
  "GeoTextPairing.react", 
  "GeoVStack.react", 
  "geoOffset", "react", "stylex", 
  "useGeoPrivateNoticeStyle"], (function(a, b, c, d, e, f, g) {
 */

import React, { useContext } from 'react';
import { GeoCloseButton } from '@meta-ui/business/button';
import { GeoPrivateBaseHintContext } from '@meta-ui/business/contexts';
import { GeoBaseSpacingLayout, GeoFlexbox, GeoVStack } from '@meta-ui/business/layout';
import { geoOffset, useGeoPrivateNoticeStyle } from '@meta-ui/business/styles';
import { GeoTextPairing } from '@meta-ui/business/text';
import stylex from '@stylexjs/stylex';

import { GeoPrivateHintLayerUtils } from '../utils/geo-private-hint-layer-utils';

export function GeoPrivateHintContent({
  additionalContent,
  description,
  contentRef,
  content,
  heading,
  onHideLayer,
  status,
}) {
  const { popoverType, isSticky } = useContext(GeoPrivateBaseHintContext);
  const isPopover = popoverType === 'popover';

  const noticeStyle = useGeoPrivateNoticeStyle({
    status: GeoPrivateHintLayerUtils.getStatus(status ?? 'normal'),
  });

  return (
    <GeoVStack context="container" relation="related">
      {heading && (
        <HintHeader
          description={description}
          heading={heading}
          isPopover={isPopover}
          isSticky={isSticky}
          onHideLayer={onHideLayer}
          status={status}
        />
      )}
      <div className={stylex(status && noticeStyle)} ref={contentRef}>
        {content}
      </div>
      {additionalContent}
    </GeoVStack>
  );
}

function HintHeader({ description, heading, isPopover, isSticky, onHideLayer, status }) {
  const closeButtonStyle = GeoPrivateHintLayerUtils.useCloseButtonStyle();
  const statusIcon = GeoPrivateHintLayerUtils.getStatusIcon(status);

  return (
    <GeoFlexbox>
      <GeoBaseSpacingLayout>
        {statusIcon && (
          <GeoVStack grow={0} justifyContent="center" shrink={0}>
            {statusIcon}
          </GeoVStack>
        )}
        {heading && <GeoTextPairing description={description} heading={heading} size="header3" textAlign="start" />}
      </GeoBaseSpacingLayout>
      {isPopover && isSticky && (
        <div className={stylex([closeButtonStyle, geoOffset.popoverCloseButton])}>
          <GeoCloseButton onClick={onHideLayer} />
        </div>
      )}
    </GeoFlexbox>
  );
}
