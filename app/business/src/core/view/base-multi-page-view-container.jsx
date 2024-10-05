/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { jsx } from 'react/jsx-runtime';
import { BaseMultiPageViewContext } from '@meta-core/contexts/base-multi-page-view-context';
import { FocusInertRegion } from '@meta-core/focus/focus-inert-region';
import { FocusRegionStrictMode } from '@meta-core/focus/focus-region-strict-mode';
import { focusScopeQueries } from '@meta-core/focus/focus-scope-queries';
import { HiddenSubtreeContextProvider } from '@meta-core/layout/hidden-subtree-context-provider';
import { mergeRefs } from '@meta-core/react-utils/merge-refs';
import { getPrefersReducedMotion } from '@meta-core/utils/get-prefers-reduced-motion';
import { testID } from '@meta-core/utils/test-id';
import stylex from '@stylexjs/stylex';
import emptyFunction from 'fbjs/lib/emptyFunction';
import Locale from 'fbjs/lib/Locale';

const styles = stylex.create({
  page: {
    // eslint-disable-next-line @stylexjs/valid-styles
    // border: "inherit",
    borderWidth: 'inherit',
    borderColor: 'inherit',
    borderStyle: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    transformOrigin: 'top left',
    borderRadius: 'inherit',
  },
  pageInactive: {
    display: 'none',
    left: 0,
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  root: {
    alignItems: 'stretch',
    clipPath: 'inset(0 0 0 0)',
    // eslint-disable-next-line @stylexjs/valid-styles
    WebkitClipPath: 'inset(0 0 0 0)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    transformOrigin: 'top left',
  },
});

const isRTL = Locale.isRTL();

const p = 300;

const gkx22877 = true;

const reduceMotion = getPrefersReducedMotion() || !gkx22877;

function r(a) {
  return Math.cos((a + 1) * Math.PI) / 2 + 0.5;
}

export const BaseMultiPageViewContainer = forwardRef(
  (
    {
      onAddPage,
      onClearRemovedPages,
      onPopPage,
      pageHistory,
      children,
      disableAnimations = false,
      disableAutoFocus = false,
      disableAutoRestoreFocus = false,
      disableFocusContainment = false,
      disableInitialAutoFocus = false,
      fallback,
      imperativeRef,
      onPageChange = emptyFunction,
      pageXStyle,
      placeholderComponent,
      xstyle,
    },
    ref,
  ) => {
    const E = useRef(null);
    const F = useRef(null);
    const G = useRef(null);
    const H = useRef(!1);
    const I = disableInitialAutoFocus && !H.current;
    const L = disableAnimations || reduceMotion;
    const J = useCallback(() => {
      const a = E.current;
      const b = F.current;
      b ? (G.current = b.getBoundingClientRect()) : a && (G.current = a.getBoundingClientRect());
    }, []);

    const onAddPageCb = useCallback(
      (a, b, c) => {
        J();
        H.current = !0;
        onAddPage(a, b, c);
      },
      [onAddPage, J],
    );

    const popPageCb = useCallback(
      (a) => {
        J();
        onPopPage(a);
      },
      [onPopPage, J],
    );

    const onPushPageCb = useCallback(
      (a, b) => {
        return onAddPageCb('end', a, b);
      },
      [onAddPageCb],
    );

    const N = useMemo(() => {
      for (let a = pageHistory.length - 1; a >= 0; a--) {
        const b = pageHistory[a];
        if (b.type !== 'pushed_page' || !b.removed) return a;
      }
      return 0;
    }, [pageHistory]);

    const O = useRef(N);

    useEffect(() => {
      // eslint-disable-next-line no-sequences
      N !== O.current && onPageChange && onPageChange(N), (O.current = N);
    }, [onPageChange, N]);

    const P = useCallback(
      (a) => {
        const b = F.current;
        const c = E.current;
        if (a) {
          let d = pageHistory[N];
          d = d.type === 'pushed_page' ? d.direction : 'end';
          O.current > N && (d = d === 'start' ? 'end' : 'start');
          const e = G.current;
          const f = a.getBoundingClientRect();
          if (!L && b && b !== a && e && c) {
            d = (d === 'start' ? -1 : 1) * (isRTL ? -1 : 1);
            b.style.cssText = '';
            a.style.cssText = '';
            b.style.setProperty('display', 'flex');
            b.style.setProperty('width', e.width + 'px');
            b.style.setProperty('height', e.height + 'px');
            a.style.removeProperty('display');
            a.style.removeProperty('width');
            a.style.removeProperty('height');
            const g = Math.round(60 * (p / 1e3));
            const h = [];
            const i = [];
            const j = [];
            for (let k = 0; k <= g; k++) {
              let l = k / g;
              let m = r(l);
              let n = e.width / f.width;
              let s = e.height / f.height;
              n = n + (1 - n) * m;
              s = s + (1 - s) * m;
              let t = e.left - f.left;
              let u = e.top - f.top;
              t = t * (1 - m);
              let v = u * (1 - m);
              let w = Math.min(e.width, f.width);
              let x = w * -d * m;
              w = w * d * (1 - m);
              m = u - v;
              u = -v;
              h.push({
                easing: 'step-end',
                offset: l,
                transform: 'translateX(' + t + 'px) translateY(' + v + 'px) scaleX(' + n + ') scaleY(' + s + ')',
              });
              i.push({
                easing: 'step-end',
                offset: l,
                transform:
                  'scaleX(' + 1 / n + ') scaleY(' + 1 / s + ') translateX(' + x + 'px) translateY(' + m + 'px)',
              });
              j.push({
                easing: 'step-end',
                offset: l,
                transform:
                  'scaleX(' + 1 / n + ') scaleY(' + 1 / s + ') translateX(' + w + 'px) translateY(' + u + 'px)',
              });
            }
            a.animate(j, p);
            c.animate(h, p);
            b.animate(i, p);
            a.animate(
              [
                {
                  opacity: 0,
                },
                {
                  opacity: 1,
                },
              ],
              p,
            );
            b.animate(
              [
                {
                  opacity: 1,
                },
                {
                  opacity: 0,
                },
              ],
              p,
            ).onfinish = function () {
              b.style.cssText = '';
              onClearRemovedPages && onClearRemovedPages();
            };
          }
          F.current = a;
        }
      },
      [N, onClearRemovedPages, pageHistory],
    );

    useImperativeHandle(
      imperativeRef,
      () => {
        return {
          addPage: onAddPageCb,
          popPage: popPageCb,
        };
      },
      [popPageCb, onAddPageCb],
    );

    const Q = useMemo(() => {
      return {
        fallback,
        placeholderComponent,
        popPage: popPageCb,
        pushPage: onPushPageCb,
      };
    }, [fallback, placeholderComponent, popPageCb, onPushPageCb]);

    const combineRef = useMemo(() => {
      return mergeRefs(E, ref);
    }, [ref]);

    return jsx('div', {
      className: stylex(styles.root, xstyle),
      ref: combineRef,
      ...testID('BaseMultiStepContainer'),
      children: pageHistory.map((page, pageIndex) => {
        return jsx(
          'div',
          {
            'aria-hidden': pageIndex !== N,
            className: stylex(styles.page, pageIndex !== N && styles.pageInactive, pageXStyle),
            ref: pageIndex === N ? P : null,
            ...testID(pageIndex === 0 ? 'base-multistep-container-first-step' : null),
            children: jsx(FocusRegionStrictMode.FocusRegion, {
              autoFocusQuery:
                !disableAutoFocus && !I && pageIndex === N ? focusScopeQueries.headerOrTabbableScopeQuery : null,
              autoRestoreFocus: !disableAutoRestoreFocus,
              containFocusQuery: disableFocusContainment ? null : focusScopeQueries.tabbableScopeQuery,
              recoverFocusQuery: focusScopeQueries.headerOrTabbableScopeQuery,
              children: jsx(FocusInertRegion, {
                disabled: pageIndex === N,
                children: jsx(HiddenSubtreeContextProvider, {
                  isHidden: pageIndex !== N,
                  children: jsx(BaseMultiPageViewContext.Provider, {
                    value: Q,
                    children:
                      page.type === 'initial_page'
                        ? typeof children === 'function'
                          ? children(onPushPageCb)
                          : children
                        : page.type === 'pushed_page'
                        ? jsx(page.component, {
                            onReturn: popPageCb,
                          })
                        : null,
                  }),
                }),
              }),
            }),
          },
          page.key,
        );
      }),
    });
  },
);
