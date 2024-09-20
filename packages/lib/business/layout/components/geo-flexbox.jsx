import { jsx } from 'react/jsx-runtime';
import stylex from '@stylexjs/stylex';

import { webFlexItem } from '../utils/web-flex-item';
import { webFlexbox } from '../utils/web-flexbox';

export function GeoFlexbox(props) {
  const {
    accessibilityRole,
    alignContent,
    alignItems,
    alignSelf,
    basis,
    children,
    columnGap,
    containerRef,
    'data-testid': dataTestId,
    direction,
    display = 'flex',
    element: Element = 'div',
    gap,
    grow,
    justifyContent,
    order,
    rowGap,
    shrink,
    style,
    wrap,
    xstyle,
  } = props;

  const flexboxClassName = stylex(
    webFlexbox({
      alignContent,
      alignItems,
      direction,
      display,
      gap,
      justifyContent,
      wrap,
      rowGap,
      columnGap,
    }),
    webFlexItem({
      alignSelf,
      basis,
      grow,
      order,
      shrink,
    }),
    xstyle,
  );

  return jsx(Element, {
    className: flexboxClassName,
    'data-testid': dataTestId,
    ref: containerRef,
    role: accessibilityRole,
    style: style,
    children: children,
  });
}
