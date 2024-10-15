import { jsx, jsxs } from 'react/jsx-runtime';
import { GeoPrivateBottomSheetContext } from '@meta-business/contexts/geo-private-bottom-sheet-context';
import { GeoPrivateButtonStyleContext } from '@meta-business/contexts/geo-private-button-style-context';
import { GeoBaseSpacingLayout } from '@meta-business/layout/geo-base-spacing-layout';
import { useGeoTheme } from '@meta-business/theme/use-geo-theme';
import { GeoTextUtils } from '@meta-business/utils/geo-text-utils';
import { useShallowEqualMemo } from '@meta-business/utils/use-shallow-equal-memo';
import { LineClamp } from '@meta-core/unknown/line-clamp';
import stylex from '@stylexjs/stylex';

export const GeoPrivateCardFooter = ({
  direction = 'horizontal',
  forwardedRef,
  primaryButton,
  secondaryButton,
  startContent,
}) => {
  const { selectSpacing } = useGeoTheme();

  let isVertical = direction === 'vertical';
  let _align = isVertical ? 'stretch' : 'center';
  let isButtonExist = primaryButton !== null || secondaryButton !== null;

  const geoPrivateButtonStyleContextValue = useShallowEqualMemo({
    width: isVertical ? '100%' : void 0,
  });

  const _xstyle = [
    selectSpacing({
      context: 'container',
      bounds: 'internal',
      relation: 'component',
      positions: ['horizontal', 'bottom'],
    }),
    selectSpacing({
      context: 'component',
      bounds: 'internal',
      positions: ['top'],
      target: 'normal',
    }),
    styles.root,
    isVertical && styles.rootVertical,
  ];

  return jsx(GeoPrivateBottomSheetContext.Provider, {
    value: false,
    children: jsx(GeoPrivateButtonStyleContext.Provider, {
      value: geoPrivateButtonStyleContextValue,
      children: jsx(GeoBaseSpacingLayout, {
        align: _align,
        containerRef: forwardedRef,
        direction,
        xstyle: _xstyle,
        children: [
          startContent &&
            jsx('div', {
              className: stylex(styles.startContent, GeoTextUtils.getTextTruncateStyle()),
              children: jsx(LineClamp, {
                className: stylex(styles.temp),
                enableTooltipOnOverflow: !0,
                lines: 2,
                children: startContent,
              }),
            }),
          isButtonExist &&
            jsxs(GeoBaseSpacingLayout, {
              align: _align,
              direction,
              xstyle: [styles.endContent, startContent && !isVertical && styles.endContentNoGrow],
              children: [secondaryButton, primaryButton],
            }),
        ],
      }),
    }),
  });
};

const styles = stylex.create({
  root: {
    flexGrow: 0,
    flexShrink: 0,
  },
  rootVertical: {
    maxWidth: '300px',
  },
  endContent: {
    flexShrink: 0,
    justifyContent: 'flex-end',
  },
  endContentNoGrow: {
    flexGrow: 0,
  },
  startContent: {
    display: 'flex',
    flexGrow: 1,
  },

  temp: {
    // x1iyjqo2
    flexGrow: 1,
  },
});
