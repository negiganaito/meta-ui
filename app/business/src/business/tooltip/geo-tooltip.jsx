import React, { useRef, useState } from 'react';
import { jsx } from 'react/jsx-runtime';

import { GeoPrivateHintContent } from './geo-private-hint-content';
import { GeoPrivateHintLayer } from './geo-private-hint-layer';
import { GeoTooltipText } from './geo-tooltip-text';

export const GeoTooltip = ({ content, groupName = 'GeoTooltip', heading, onToggle, whiteSpace, ...rest }) => {
  const contentRef = useRef(null);
  const [isLayerHoverable, setLayerHoverable] = useState(false);

  // TODO
  const isFbtContent = false; // GeoFbtUtils.isFbt(content);
  const hasHeading = heading || !isFbtContent;
  let tooltipContent = content;

  if (isFbtContent) {
    tooltipContent = React.jsx(GeoTooltipText, {
      children: content,
      whiteSpace: whiteSpace,
    });
  }

  const handleToggle = (isVisible) => {
    onToggle?.(isVisible);
    if (isVisible) {
      setLayerHoverable(Boolean(contentRef.current?.querySelector('a')));
    }
  };

  // Content renderer for GeoPrivateHintLayer
  const renderContent = (tooltipProps) => {
    return jsx(GeoPrivateHintContent, {
      ...tooltipProps,
      content: tooltipContent,
      contentRef: contentRef,
      heading: heading,
    });
  };

  return jsx(GeoPrivateHintLayer, {
    ...rest,
    contentRenderer: renderContent,
    groupName,
    isLayerHoverable: isLayerHoverable,
    isSticky: false,
    onToggle: handleToggle,
    popoverType: hasHeading ? 'infoTooltip' : 'simpleTooltip',
  });
};
