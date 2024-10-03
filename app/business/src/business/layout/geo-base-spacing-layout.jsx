import React from 'react';
import { useGeoTheme } from '@meta-business/theme/use-geo-theme';

import { GeoFlexbox } from './geo-flexbox';

export function GeoBaseSpacingLayout(props) {
  const {
    align = 'center',
    containerRef,
    context = 'component',
    direction = 'horizontal',
    grow = 'fill',
    relation = 'unrelated',
    wrap = false,
    xstyle,
    ...otherProps
  } = props;

  const theme = useGeoTheme();
  const layoutSpacing = theme.selectLayoutSpacing({
    context,
    relation,
    direction,
  });

  return (
    <GeoFlexbox
      alignItems={align}
      containerRef={containerRef}
      direction={direction === 'horizontal' ? 'row' : 'column'}
      display={grow === 'auto' ? 'inline-flex' : 'flex'}
      grow={grow === 'auto' ? 0 : 1}
      wrap={wrap === false ? 'nowrap' : 'wrap'}
      xstyle={[layoutSpacing, xstyle]}
      {...otherProps}
    />
  );
}
