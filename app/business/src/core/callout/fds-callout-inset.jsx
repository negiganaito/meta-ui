/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useContext } from 'react';
import { BaseContextualLayerContextSizeContext } from '@meta-core/contexts/base-contextual-layer-context-size-context';
import { BaseContextualLayerLayerAdjustmentContext } from '@meta-core/contexts/base-contextual-layer-layer-adjustment-context';
import { BaseContextualLayerOrientationContext } from '@meta-core/contexts/base-contextual-layer-orientation-context';
import { FocusRegionStrictMode } from '@meta-core/focus/focus-region-strict-mode';
import { focusScopeQueries } from '@meta-core/focus/focus-scope-queries';
import { useOnOutsideClick } from '@meta-core/hooks/use-on-outside-click';
import { BaseRow } from '@meta-core/layout/base-row';
import { BaseView } from '@meta-core/layout/base-view';
import stylex from '@stylexjs/stylex';
import Locale from 'fbjs/lib/Locale';

import { CometCalloutInsetArrow } from './comet-callout-inset-arrow';
import { CometHideLayerOnEscape } from './comet-hide-layer-on-escape';

export const FDSCalloutInset = ({
  children,
  disableAutoFocus = false,
  id,
  onClose,
  onOutsideClick,
  type = 'default',
  xstyle,
  ...rest
}) => {
  let { align, position } = useContext(BaseContextualLayerOrientationContext);

  let _align = align === 'stretch' ? 'start' : align;
  const _position = position === 'start' ? 'above' : position === 'end' ? 'below' : position;

  let sizeContext = useContext(BaseContextualLayerContextSizeContext);

  let baseContextualLayerLayerAdjustmentContextValue = useContext(BaseContextualLayerLayerAdjustmentContext) ?? 0;

  const [style, arrowStyles] = r(
    _align,
    _position,
    // eslint-disable-next-line no-cond-assign
    (_align = !sizeContext ? undefined : sizeContext.width) ? _align : 0,
    baseContextualLayerLayerAdjustmentContextValue,
  );

  const ref = useOnOutsideClick(onOutsideClick);

  return (
    <BaseView {...rest} id={id ?? undefined} role="dialog" style={style} xstyle={k.container}>
      <FocusRegionStrictMode.FocusRegion
        autoFocusQuery={disableAutoFocus ? void 0 : focusScopeQueries.tabbableScopeQuery}
      >
        <CometHideLayerOnEscape onHide={onClose}>
          <BaseRow ref={ref} xstyle={[k.content, l[type], m[_position], xstyle]}>
            {children}
          </BaseRow>
          <CometInsetArrow arrowStyles={arrowStyles} position={_position} type={type} />
        </CometHideLayerOnEscape>
      </FocusRegionStrictMode.FocusRegion>
    </BaseView>
  );
};

function CometInsetArrow({ arrowStyles, position, type }) {
  return (
    <CometCalloutInsetArrow
      fill={type === 'default' ? 'var(--popover-background)' : 'var(--accent)'}
      style={arrowStyles}
      xstyle={[k.arrow, n[position], type === 'accent' && o[position]]}
    />
  );
}

let isRTL = Locale.isRTL();

// eslint-disable-next-line max-params, complexity
function r(a, b, c, d) {
  let e = Math.max(c / 2 - 8, 16) + Math.abs(d);
  let f = c / 2 - 8 < 16;
  c = 24 - c / 2;
  if (b === 'above')
    if (a === 'start') {
      // eslint-disable-next-line no-inner-declarations, no-var
      var g;
      // eslint-disable-next-line no-undef
      b = isRTL ? 'right' : 'left';
      // eslint-disable-next-line no-return-assign
      return [
        f
          ? {
              // eslint-disable-next-line no-undef
              transform: 'translateX(' + (isRTL ? c : -c) + 'px)',
            }
          : void 0,
        ((g = {}), (g[b] = 'min(calc(100% - 32px), ' + e + 'px)'), g),
      ];
    } else if (a === 'end') {
      // eslint-disable-next-line no-undef
      b = isRTL ? 'left' : 'right';
      // eslint-disable-next-line no-return-assign
      return [
        f
          ? {
              transform: 'translateX(' + (isRTL ? -c : c) + 'px)',
            }
          : void 0,
        ((g = {}), (g[b] = 'min(calc(100% - 32px), ' + e + 'px)'), g),
      ];
    } else {
      // eslint-disable-next-line no-inner-declarations, no-var
      var h;
      // eslint-disable-next-line no-undef
      b = isRTL ? 'left' : 'right';
      // eslint-disable-next-line no-undef
      g = (isRTL ? -d : d) - 8;
      // eslint-disable-next-line no-return-assign
      return [void 0, ((h = {}), (h[b] = 'calc(50% + ' + g + 'px)'), h)];
    }
  else if (a === 'start') {
    // eslint-disable-next-line no-undef
    b = isRTL ? 'right' : 'left';
    // eslint-disable-next-line no-return-assign
    return [
      f
        ? {
            // eslint-disable-next-line no-undef
            transform: 'translateX(' + (isRTL ? c : -c) + 'px)',
          }
        : void 0,
      ((g = {}), (g[b] = 'min(calc(100% - 32px), ' + e + 'px)'), g),
    ];
  } else if (a === 'end') {
    // eslint-disable-next-line no-undef
    h = isRTL ? 'left' : 'right';
    // eslint-disable-next-line no-return-assign
    return [
      f
        ? {
            transform: 'translateX(' + (isRTL ? -c : c) + 'px)',
          }
        : void 0,
      ((b = {}), (b[h] = 'min(calc(100% - 32px), ' + e + 'px)'), b),
    ];
  } else {
    // eslint-disable-next-line no-undef
    g = isRTL ? 'left' : 'right';
    // eslint-disable-next-line no-undef
    a = (isRTL ? -d : d) - 8;
    // eslint-disable-next-line no-return-assign
    return [void 0, ((f = {}), (f[g] = 'calc(50% + ' + a + 'px)'), f)];
  }
}

//

const k = stylex.create({
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
    boxShadow: ' 0 8px 16px var(--shadow-1)',
    paddingLeft: '12px',
    paddingRight: '12px',
    paddingTop: '16px',
    paddingBottom: '16px',
  },
});

const l = stylex.create({
  accent: {
    backgroundColor: 'var(--accent)',
  },
  default: {
    backgroundColor: 'var(--popover-background)',
  },
});

const m = stylex.create({
  above: {
    marginBottom: '16px',
  },
  below: {
    marginTop: '16px',
  },
  end: {
    marginLeft: '16px',
  },
});

const n = stylex.create({
  above: {
    bottom: '5px',
  },
  below: {
    top: '5px',
    transform: 'rotate(180deg) scaleX(-1)',
  },
  end: {},
});

const o = stylex.create({
  above: {
    bottom: '5px',
  },
  below: {
    top: '5px',
    transform: 'rotate(180deg) scaleX(-1)',
  },
  end: {},
});
