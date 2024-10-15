import { jsx } from 'react/jsx-runtime';
import { useGeoTheme } from '@meta-business/theme/use-geo-theme';

import { GeoFlexbox } from './geo-flexbox';

export const GeoHStack = ({
  alignItems = 'start',
  context = 'component',
  containerRef,
  direction = 'row',
  display = 'flex',
  grow = 1,
  relation = 'unrelated',
  shrink = 1,
  xstyle,
  ...rest
}) => {
  const { selectLayoutSpacing } = useGeoTheme();

  const layoutStyles = selectLayoutSpacing({
    context,
    relation,
    direction: direction === 'row' ? 'horizontal' : 'horizontal-reverse',
  });

  return jsx(GeoFlexbox, {
    alignItems,
    containerRef,
    direction,
    display,
    grow,
    shrink,
    wrap: 'nowrap',
    xstyle: [layoutStyles, xstyle],
    ...rest,
  });
};
