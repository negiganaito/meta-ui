import React, { useContext } from 'react';
import { GeoCloseButton } from '@meta-business/button/geo-close-button';
import { GeoPrivateBaseHintContext } from '@meta-business/contexts/geo-private-base-hint-context';
import { GeoBaseSpacingLayout } from '@meta-business/layout/geo-base-spacing-layout';
import { GeoFlexbox } from '@meta-business/layout/geo-flexbox';
import { GeoVStack } from '@meta-business/layout/geo-v-stack';
import { geoOffset } from '@meta-business/styles/geo-offset';
import { useGeoPrivateNoticeStyle } from '@meta-business/styles/use-geo-private-notice-style';
import { GeoTextPairing } from '@meta-business/text/geo-text-pairing';
import stylex from '@stylexjs/stylex';

import { GeoPrivateHintLayerUtils } from './geo-private-hint-layer-utils';

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
