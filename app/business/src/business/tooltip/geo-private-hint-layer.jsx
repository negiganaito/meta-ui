import React, { useContext, useRef } from 'react';
import { GeoPrivateTooltipTriggerContext } from '@meta-business/contexts/geo-private-tooltip-trigger-context';
import { GeoIcon } from '@meta-business/image/geo-icon';
import { GeoBaseLineHeightAlign } from '@meta-business/text/geo-base-line-height-align';
import { fbicon } from '@meta-core/image/fb-icon';
import { ix } from '@meta-core/image/ix';
import { useMergeRefs } from '@meta-core/react-utils/use-merge-refs';
import stylex from '@stylexjs/stylex';

import { GeoPrivateBaseHintLayer } from './geo-private-base-hint-layer';
import { GeoPrivateHintLayerUtils } from './geo-private-hint-layer-utils';

const styles = stylex.create({
  trigger: {
    display: 'inline-block', // Display the trigger element
    pointerEvents: 'auto', // Handle pointer events
  },
});

export function GeoPrivateHintLayer(props) {
  const {
    'data-testid': dataTestId,
    children,
    contentRenderer,
    hasCloseButton,
    hasMedia,
    imperativeRef,
    isSticky = false,
    layerRef,
    popoverType,
    triggerRef,
    groupName,
    xstyle,
    ...otherProps
  } = props;

  const localRef = useRef(null);
  const mergedRef = useMergeRefs(localRef, layerRef);
  const contextTriggerRef = useContext(GeoPrivateTooltipTriggerContext);

  const effectiveTriggerRef = triggerRef ?? contextTriggerRef;

  const hintLayer = (
    <GeoPrivateBaseHintLayer
      groupName={groupName}
      imperativeRef={imperativeRef}
      isSticky={isSticky}
      popoverType={popoverType}
      triggerRef={effectiveTriggerRef ?? localRef}
      {...otherProps}
    >
      {contentRenderer}
    </GeoPrivateBaseHintLayer>
  );

  return effectiveTriggerRef ? (
    hintLayer
  ) : (
    <>
      <div className={stylex(styles.trigger, xstyle)} ref={mergedRef}>
        {children ?? <DefaultTrigger />}
      </div>
      {hintLayer}
    </>
  );
}

function DefaultTrigger() {
  const iconStyle = GeoPrivateHintLayerUtils.useIconStyle();

  return (
    <GeoBaseLineHeightAlign>
      <div className={stylex(iconStyle)}>
        <GeoIcon icon={fbicon._(ix(479175), 12)} />
      </div>
    </GeoBaseLineHeightAlign>
  );
}
