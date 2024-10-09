import React, { useContext } from 'react';
import { BaseContextualLayerContextSizeContext } from '@meta-core/contexts/base-contextual-layer-context-size-context';
import { BaseContextualLayerLayerAdjustmentContext } from '@meta-core/contexts/base-contextual-layer-layer-adjustment-context';
import { BaseContextualLayerOrientationContext } from '@meta-core/contexts/base-contextual-layer-orientation-context';
import { FocusRegionStrictMode } from '@meta-core/focus/focus-region-strict-mode';
import { focusScopeQueries } from '@meta-core/focus/focus-scope-queries';
import { useOnOutsideClick } from '@meta-core/hooks/use-on-outside-click';
import { BaseRow } from '@meta-core/layout/base-row';
import { BaseView } from '@meta-core/layout/base-view';
// import { FDSCalloutEdgeArrow } from '@meta-icons/fds-callout-edge-arrow';
import stylex from '@stylexjs/stylex';
import Locale from 'fbjs/lib/Locale';

import { CometHideLayerOnEscape } from './comet-hide-layer-on-escape';
import { FDSCalloutEdgeArrow } from './fds-callout-edge-arrow';

// CHANGED
// @becareful
export const FDSCalloutEdge = ({
  children,
  disableAutoFocus = false,
  id,
  onClose,
  onOutsideClick,
  type = 'default',
  xstyle,
  ...rest
}) => {
  const { align, position } = useContext(BaseContextualLayerOrientationContext);

  let alignType = align === 'stretch' ? 'start' : align;

  const positionType = position === 'start' ? 'above' : position === 'end' ? 'below' : position;

  let sizeContext = useContext(BaseContextualLayerContextSizeContext);

  let layerAdjustmentContext = useContext(BaseContextualLayerLayerAdjustmentContext) ?? 0;

  alignType = layerAdjustmentContext !== 0 ? arrowPositionMap[alignType] : alignType;

  sizeContext = calculateTransform(
    alignType,
    (!sizeContext ? void 0 : sizeContext.width) ? sizeContext : 0,
    layerAdjustmentContext,
  );

  layerAdjustmentContext = useOnOutsideClick(onOutsideClick);

  return (
    <BaseView {...rest} id={id ?? undefined} role="dialog" style={sizeContext} xstyle={stylesContainer.container}>
      <FocusRegionStrictMode.FocusRegion
        autoFocusQuery={disableAutoFocus ? undefined : focusScopeQueries.tabbableScopeQuery}
      >
        <CometHideLayerOnEscape onHide={onClose}>
          <BaseRow
            ref={layerAdjustmentContext}
            xstyle={[
              stylesContainer.content,
              stylesType[type],
              positionType === 'above' && stylesMarginBottom[alignType],
              positionType === 'below' && stylesMarginTop[alignType],
              xstyle,
            ]}
          >
            {children}
          </BaseRow>
          <CalloutEdgeArrow align={alignType} position={positionType} type={type} />
        </CometHideLayerOnEscape>
      </FocusRegionStrictMode.FocusRegion>
    </BaseView>
  );
};

let isRTL = Locale.isRTL();

function CalloutEdgeArrow({ align, position, type }) {
  // let b = a.align;
  // let d = a.position;
  // a = a.type;

  return (
    <FDSCalloutEdgeArrow
      fill={type === 'default' ? 'var(--popover-background)' : 'var(--callout-background-color-accent, var(--accent))'}
      xstyle={[
        stylesContainer.arrow,
        position === 'above' && type === 'default' && (isRTL ? p[align] : o[align]),
        position === 'above' && type === 'accent' && (isRTL ? r[align] : q[align]),
        position === 'below' && type === 'default' && (isRTL ? t[align] : s[align]),
        position === 'below' && type === 'accent' && (isRTL ? v[align] : u[align]),
      ]}
    />
  );

  // return i.jsx(c("CometCalloutEdgeArrow.svg.react"), {
  //   fill: a === "default" ? "var(--popover-background)" : "var(--accent)",
  //   xstyle: [
  //     k.arrow,
  //     d === "above" && a === "default" && (x ? p[b] : o[b]),
  //     d === "above" && a === "accent" && (x ? r[b] : q[b]),
  //     d === "below" && a === "default" && (x ? t[b] : s[b]),
  //     d === "below" && a === "accent" && (x ? v[b] : u[b]),
  //   ],
  // });
}

function calculateTransform(align, size, adjustment) {
  adjustment = adjustment === 0 ? size / 2 : 0;
  if (adjustment === 0) return void 0;
  if (align === 'start')
    return {
      transform: 'translateX(' + (isRTL ? -1 * adjustment : adjustment) + 'px)',
    };
  return align === 'end'
    ? {
        transform: 'translateX(' + (isRTL ? adjustment : -1 * adjustment) + 'px)',
      }
    : undefined;
}

//

const stylesContainer = stylex.create({
  arrow: {
    position: 'absolute',
  },
  container: {
    display: 'flex',
  },
  content: {
    backgroundColor: 'var(--overlay-alpha-80)',
    borderRadius: '8px',
    borderWidth: '1px',
    boxShadow: '0 8px 16px var(--shadow-1)',
    paddingLeft: '12px',
    paddingRight: '12px',
    paddingTop: '16px',
    paddingBottom: '16px',
  },
});

const stylesType = stylex.create({
  accent: {
    backgroundColor: 'var(--accent)',
  },
  default: {
    backgroundColor: 'var(--popover-background)',
  },
});

const stylesMarginBottom = stylex.create({
  end: {
    borderBottomRightRadius: '0',
    marginBottom: '20px',
  },
  middle: {
    marginBottom: '4px',
  },
  start: {
    borderBottomLeftRadius: 0,
    marginBottom: '20px',
  },
});

const stylesMarginTop = stylex.create({
  end: {
    borderTopRightRadius: '0',
    marginTop: '20px',
  },
  middle: {
    marginTop: '4px',
  },
  start: {
    borderTopLeftRadius: 0,
    marginTop: '20px',
  },
});

const o = stylex.create({
  end: {
    bottom: '9px',
    right: 0,
    transform: 'scaleX(-1)',
  },
  middle: {
    bottom: '9px',
    right: 0,
  },
  start: {
    bottom: '9px',
    start: '0',
  },
});

const p = stylex.create({
  end: {},
  middle: {},
  start: {},
});

const q = stylex.create({
  end: {
    bottom: '9px',
    right: 0,
    transform: 'scaleX(-1)',
  },
  middle: {
    bottom: '9px',
    right: 0,
  },
  start: {
    bottom: '9px',
    left: 0,
  },
});

const r = stylex.create({
  end: {},
  middle: {},
  start: {},
});

const s = stylex.create({
  end: {
    right: 0,
    top: '9px',
    transform: 'rotate(180deg)',
  },
  middle: {
    right: 0,
    top: '9px',
    transform: 'rotate(180deg) scaleX(-1)',
  },
  start: {
    left: 0,
    top: '9px',
    transform: 'rotate(180deg) scaleX(-1)',
  },
});

const t = stylex.create({
  end: {
    transform: 'rotate(180deg)',
  },
  middle: {
    transform: 'rotate(180deg) scaleX(-1)',
  },
  start: {
    transform: 'rotate(180deg) scaleX(-1)',
  },
});

const u = stylex.create({
  end: {
    right: 0,
    top: '9px',
    transform: 'rotate(180deg)',
  },
  middle: {
    right: 0,
    top: '9px',
    transform: 'rotate(180deg) scaleX(-1)',
  },
  start: {
    left: 0,
    top: '9px',
    transform: 'rotate(180deg) scaleX(-1)',
  },
});

const v = stylex.create({
  end: {
    transform: 'rotate(180deg)',
  },
  middle: {
    transform: 'rotate(180deg) scaleX(-1)',
  },
  start: {
    transform: 'rotate(180deg) scaleX(-1)',
  },
});

const arrowPositionMap = {
  end: 'start',
  start: 'end',
};
