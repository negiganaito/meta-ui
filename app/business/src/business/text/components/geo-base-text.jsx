import { createElement, forwardRef, Suspense, useCallback, useContext, useRef, useState } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import {
  GeoPrivateBaseTextContext,
  GeoPrivateDisabledContext,
  GeoPrivateDisableHeadingStructureContext,
  GeoPrivateGlimmeringHeadingStyleContext,
  GeoPrivateInvertThemeContext,
  GeoPrivateLayerVisibilityContext,
  GeoPrivateTruncationContext,
} from '@meta-ui/business/contexts';
import { GeoTooltip } from '@meta-ui/business/tooltip/components/geo-tooltip';
import { GeoDomID, GeoTextUtils } from '@meta-ui/business/utils';
import { useMergeRefs } from '@meta-ui/core/react-utils';
import stylex from '@stylexjs/stylex';

import { useGeoPrivateTextStyle } from '../hooks/use-geo-private-text-style';

import { DocumentTranslationStatusProvider } from './document-translation-status-provider';

const justKnobX_1568 = true;

function getElementType(display) {
  switch (display) {
    case 'block':
    case 'truncate':
      return 'div';
    default:
      return 'span';
  }
}

// eslint-disable-next-line complexity
export const GeoBaseText = forwardRef((props, ref) => {
  const {
    alwaysAddTooltip = false,
    children,
    color,
    // eslint-disable-next-line no-unused-vars
    'data-testid': dataTestId,
    display = 'inline',
    id,
    isDisabled = false,
    maxLines = 0,
    overflowWrap = 'normal',
    showTruncationTooltip = true,
    size = 'value',
    textAlign = 'inherit',
    tooltipRenderDelay,
    weight,
    whiteSpace = 'inherit',
    xstyle,
  } = props;

  const elementRef = useRef(null);
  const ElementType = getElementType(display);

  const isContextDisabled = useContext(GeoPrivateDisabledContext);
  const isContextInverted = useContext(GeoPrivateInvertThemeContext);
  const glimmeringHeadingStyle = useContext(GeoPrivateGlimmeringHeadingStyleContext);
  const disableHeadingStructure = useContext(GeoPrivateDisableHeadingStructureContext);
  const truncationContext = useContext(GeoPrivateTruncationContext);

  const textStyle = useGeoPrivateTextStyle({
    color,
    display,
    isDisabled: isDisabled || !!isContextDisabled,
    isInverted: !!isContextInverted,
    overflowWrap,
    size,
    textAlign,
    weight,
    whiteSpace,
  });

  const useMaxLines = display === 'block' && maxLines > 0;
  const useSingleLinePre = useMaxLines && maxLines === 1;
  const useMultiLine = useMaxLines && maxLines > 1;
  const inlineStyle = useMaxLines
    ? {
        WebkitLineClamp: maxLines,
        ...(maxLines > 1 ? { textWrap: 'wrap' } : {}),
      }
    : undefined;

  const shouldShowTooltip =
    (display === 'truncate' || useMaxLines) && (truncationContext ? truncationContext : showTruncationTooltip);
  const shouldAddTooltip = alwaysAddTooltip || shouldShowTooltip;

  // tooltipContent,
  //   isOverflowing,
  //   shouldAddTooltip || alwaysAddTooltip ? mouseEnterHandler : undefined,
  //   shouldAddTooltip || alwaysAddTooltip ? handleMouseEnter : undefined,
  // triggerRef, mouseEnterHandler, elementText
  const [tooltipContent, isOverflowing, mouseEnterHandler, handleMouseEnter] = useTooltipHandlers(
    shouldAddTooltip,
    alwaysAddTooltip,
  );

  // const [tooltipContent, setTooltipContent] = useState(null);
  // const [isOverflowing, setIsOverflowing] = useState(false);

  // const handleTooltipContent = useCallback((element) => {
  //   if (element) {
  //     setIsOverflowing(isElementOverflowing(element));
  //     setTooltipContent(element.textContent);
  //   }
  // }, []);

  // const handleMouseEnter = useCallback(
  //   (event) => {
  //     const target = event.target;
  //     handleTooltipContent(target);
  //   },
  //   [handleTooltipContent]
  // );

  const e = DocumentTranslationStatusProvider.useTranslationKeyForTextParent();

  const domIDProps = GeoDomID.useApplyGeoDomIDsDirectly({
    id: id ?? void 0,
  });

  const { ref: domRef, ...restDomIDProps } = domIDProps;

  const mergedRef = useMergeRefs(elementRef, handleMouseEnter, ref, domRef);

  return jsxs(GeoPrivateBaseTextContext.Provider, {
    value: true,
    children: [
      createElement(
        ElementType,
        {
          'aria-level': disableHeadingStructure ? undefined : GeoTextUtils.getAriaLevelForSize(size),
          className: stylex([
            textStyle,
            styles.root,
            glimmeringHeadingStyle,
            useSingleLinePre &&
              (whiteSpace === 'pre' && justKnobX_1568 ? styles.singleLinePre : styles.singleLineNoWrap),
            useMultiLine && styles.multiLine,
            xstyle,
          ]),
          'data-testid': undefined,
          onMouseEnter: shouldAddTooltip ? mouseEnterHandler : undefined,
          ref: mergedRef,
          role: !disableHeadingStructure && GeoTextUtils.isHeader(size) ? 'heading' : undefined,
          style: inlineStyle,
          key: e,
          ...restDomIDProps,
        },
        children,
      ),
      isOverflowing &&
        shouldAddTooltip &&
        jsx(Suspense, {
          fallback: null,
          children: jsx(GeoPrivateLayerVisibilityContext.Provider, {
            value: isOverflowing ? undefined : false,
            children: jsx(GeoTooltip, {
              content: tooltipContent,
              renderDelay: tooltipRenderDelay ?? undefined,
              triggerRef: elementRef,
            }),
          }),
        }),
    ],
  });
});

function isElementOverflowing(element) {
  return element.scrollWidth > element.offsetWidth || element.scrollHeight > element.offsetHeight;
}

function useTooltipHandlers(shouldAddTooltip, alwaysAddTooltip) {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [tooltipContent, setTooltipContent] = useState(null);

  const handleMouseEnter = useCallback(
    (element) => {
      if (element) {
        setIsOverflowing(shouldAddTooltip || isElementOverflowing(element));
        setTooltipContent(element.textContent);
      }
    },
    [shouldAddTooltip],
  );

  const mouseEnterHandler = useCallback(
    (event) => {
      const target = event.target;
      handleMouseEnter(target);
    },
    [handleMouseEnter],
  );

  return [
    tooltipContent,
    isOverflowing,
    shouldAddTooltip || alwaysAddTooltip ? mouseEnterHandler : undefined,
    shouldAddTooltip || alwaysAddTooltip ? handleMouseEnter : undefined,
  ];
}

const styles = stylex.create({
  root: { minWidth: '0' },
  singleLineNoWrap: {
    overflowX: 'hidden',
    overflowY: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  singleLinePre: {
    overflowX: 'hidden',
    overflowY: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'pre',
  },
  multiLine: {
    display: '-webkit-box',
    overflowX: 'hidden',
    overflowY: 'hidden',
    WebkitBoxOrient: 'vertical',
  },
});

GeoBaseText.displayName = 'GeoBaseText';

// CometStyleXSheet
