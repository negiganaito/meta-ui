import React from 'react';
import { useGeoTheme } from '@meta-business/theme/use-geo-theme';

import { GeoFlexbox } from './geo-flexbox';

export function GeoVStack({
  alignItems = null,
  containerRef,
  context = 'component',
  direction = 'column',
  display = 'flex',
  grow = 1,
  relation = 'unrelated',
  shrink = 1,
  xstyle,
  ...props
}) {
  const theme = useGeoTheme();
  const layoutSpacing = theme.selectLayoutSpacing({
    context,
    relation,
    direction: direction === 'column' ? 'vertical' : 'vertical-reverse',
  });

  return (
    <GeoFlexbox
      alignItems={alignItems}
      containerRef={containerRef}
      direction={direction}
      display={display}
      grow={grow}
      shrink={shrink}
      wrap="nowrap"
      xstyle={[layoutSpacing, xstyle]}
      {...props}
    />
  );
}
