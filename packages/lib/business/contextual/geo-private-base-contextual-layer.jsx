__d(
  'GeoPrivateBaseContextualLayer.react',
  [
    'BaseContextualLayerAnchorRoot.react',
    'BaseContextualLayerAnchorRootContext',
    'BaseContextualLayerContextSizeContext',
    'BaseContextualLayerLayerAdjustmentContext',
    'BaseContextualLayerOrientationContext',
    'BaseScrollableAreaContext',
    'BaseViewportMarginsContext',
    'FocusRegion.react',
    'GeoPrivateBasePortal.react',
    'GeoPrivateMakeComponent',
    'HiddenSubtreeContext',
    'LegacyHidden',
    'Locale',
    'focusScopeQueries',
    'getComputedStyle',
    'getGeoPrivateBaseContextualLayerPositioningStyles_DEPRECATED',
    'isElementFixedOrSticky',
    'mergeRefs',
    'react',
    'stylex',
    'useResizeObserver',
  ],
  (a, b, c, d, e, f, g) => {
    let h;
    let i;
    let j;
    let k = j || (j = d('react'));
    e = j;
    let l = e.useCallback;
    let m = e.useContext;
    let n = e.useEffect;
    let o = e.useImperativeHandle;
    let p = e.useLayoutEffect;
    let q = e.useMemo;
    let r = e.useRef;
    let s = e.useState;
    function t(a) {
      a = a.getBoundingClientRect();
      return {
        bottom: a.bottom,
        left: a.left,
        right: a.right,
        top: a.top,
      };
    }
    function aa(a) {
      let b = (h || (h = c('getComputedStyle')))(a);
      return b != null && b.getPropertyValue('position') !== 'static'
        ? a
        : (a instanceof HTMLElement && a.offsetParent) || a.ownerDocument.documentElement;
    }
    let u = 8;
    function ba(a, b) {
      return a.bottom < b.top || b.bottom < a.top || a.right < b.left || b.right < b.left
        ? null
        : {
            bottom: Math.min(a.bottom, b.bottom),
            left: Math.max(a.left, b.left),
            right: Math.min(a.right, b.right),
            top: Math.max(a.top, b.top),
          };
    }
    function v(a) {
      switch (a) {
        case 'stretch-end':
        case 'stretch-start':
          return 'stretch';
        default:
          return a;
      }
    }
    function ca(a, b, c) {
      if (c === 'above' || c === 'below') {
        var d = a.bottom - b.bottom;
        var e = b.top - a.top;
        if (e < d) return 'below';
        else if (e > d) return 'above';
        else return c;
      } else {
        e = w ? 'start' : 'end';
        d = w ? 'end' : 'start';
        let f = b.left - a.left;
        a = a.right - b.right;
        if (a < f) return d;
        else if (a > f) return e;
        else return c;
      }
    }
    var w = d('Locale').isRTL();
    let da = {
      root: {
        left: 'xu96u03',
        marginRight: 'xm80bdy',
        position: 'x10l6tqk',
        top: 'x13vifvy',
        $$css: !0,
      },
    };
    function b(b) {
      let e = b.align;
      let f = e === void 0 ? 'start' : e;
      e = b.autoFocus;
      let g = b.autoRestoreFocus;
      let h = b.children;
      let j = b.containerRef;
      let x = b.containFocus;
      x = x === void 0 ? !1 : x;
      let y = b['data-testid'];
      y = y === void 0 ? 'ContextualLayerRoot' : y;
      let z = b.disableAutoAlign;
      let A = z === void 0 ? !1 : z;
      z = b.disableAutoFlip;
      let B = z === void 0 ? !1 : z;
      z = b.hidden;
      z = z === void 0 ? !1 : z;
      let C = b.imperativeRef;
      let D = b.onIndeterminatePosition;
      let E = b.position;
      let F = E === void 0 ? 'below' : E;
      E = b.xstyle;
      b = babelHelpers.objectWithoutPropertiesLoose(b, [
        'align',
        'autoFocus',
        'autoRestoreFocus',
        'children',
        'containerRef',
        'containFocus',
        'data-testid',
        'disableAutoAlign',
        'disableAutoFlip',
        'hidden',
        'imperativeRef',
        'onIndeterminatePosition',
        'position',
        'xstyle',
      ]);
      let G = r(!1);
      let H = s(() => {
        return F;
      });
      let I = H[0];
      let J = H[1];
      H = s(null);
      let K = H[0];
      let ea = H[1];
      H = s(null);
      let L = H[0];
      let fa = H[1];
      H = s(null);
      let ga = H[0];
      let ha = H[1];
      let M = m(c('BaseContextualLayerAnchorRootContext'));
      let N = m(c('BaseScrollableAreaContext'));
      let O = m(c('BaseViewportMarginsContext'));
      H = m(c('HiddenSubtreeContext'));
      H = H.hidden;
      let P = H || z;
      H = s(!1);
      let Q = H[0];
      let R = H[1];
      let S = r(null);
      let T = r(null);
      let U = b.context !== void 0 ? b.context : void 0;
      let V = b.contextRef !== void 0 ? b.contextRef : void 0;
      let W = l(() => {
        let a = S.current;
        let b = document.documentElement;
        let c = U;
        c == null && U == null && V != null && (c = V.current);
        if (a == null || c == null || B || b == null) return;
        c = t(c);
        a = t(a);
        b = {
          bottom: b.clientHeight - O.bottom - u,
          left: O.left + u,
          right: b.clientWidth - O.right - u,
          top: O.top + u,
        };
        let d = a.bottom - a.top;
        let e = a.right - a.left;
        T.current = {
          height: d,
          width: e,
        };
        d = w ? 'start' : 'end';
        e = w ? 'end' : 'start';
        let f = I === 'above' && a.top !== 0 && a.top < b.top;
        let g = I === 'below' && a.bottom !== 0 && a.bottom > b.bottom;
        e = I === e && a.left !== 0 && a.left < b.left;
        d = I === d && a.right !== 0 && a.right > b.right;
        (f || g || e || d) && J(ca(b, c, I));
      }, [B, I, U, V, O.bottom, O.left, O.right, O.top]);
      let X = l(() => {
        let a = document.documentElement;
        let b = M.current;
        if (a == null || b == null) return;
        let d = aa(b);
        if (d == null) return;
        let e = U;
        e == null && U == null && V != null && (e = V.current);
        if (e == null) return;
        b = c('isElementFixedOrSticky')(b);
        b = !b && c('isElementFixedOrSticky')(e);
        e = N.map((a) => {
          return a.getDOMNode();
        })
          .filter(Boolean)
          .filter((a) => {
            return d.contains(a);
          })
          .reduce((a, b) => {
            return a != null ? ba(a, t(b)) : null;
          }, t(e));
        if (e == null || (e.left === 0 && e.right === 0)) {
          R(!0);
          D && D();
          return;
        }
        let g = b
          ? {
              bottom: a.clientHeight,
              left: 0,
              right: a.clientWidth,
              top: 0,
            }
          : t(d);
        let h = null;
        let i = T.current;
        if (G.current && i != null && !A) {
          a = {
            bottom: a.clientHeight - O.bottom - u,
            left: O.left + u,
            right: a.clientWidth - O.right - u,
            top: O.top + u,
          };
          if (I === 'start' || I === 'end') {
            let j;
            let k;
            if (f === 'middle') {
              var l = (e.bottom + e.top) / 2;
              j = l - i.height / 2;
              k = l + i.height / 2;
            } else
              f === 'start' || f === 'stretch-start'
                ? ((j = e.top), (k = e.top + i.height))
                : (f === 'end' || f === 'stretch-end') && ((j = e.bottom - i.height), (k = e.bottom));
            if (j != null && k != null)
              if (j < a.top) {
                l = e.bottom - j;
                var m = a.top - j;
                h = Math.min(l, m);
              } else if (k > a.bottom) {
                l = e.top - k;
                m = a.bottom - k;
                h = Math.max(l, m);
              }
          } else if (I === 'above' || I === 'below') {
            let n;
            let o;
            l = w ? 'start' : 'end';
            m = w ? 'end' : 'start';
            if (f === 'middle') {
              var p = (e.right + e.left) / 2;
              n = p - i.width / 2;
              o = p + i.width / 2;
            } else
              f === m || f === 'stretch-' + m
                ? ((n = e.left), (o = e.left + i.width))
                : (f === l || f === 'stretch-' + l) && ((n = e.right - i.width), (o = e.right));
            if (n != null && o != null)
              if (n < a.left) {
                p = e.right - n;
                m = a.left - n;
                h = Math.min(p, m);
              } else if (o > a.right) {
                l = e.left - o;
                i = a.right - o;
                h = Math.max(l, i);
              }
          }
        }
        p = c('getGeoPrivateBaseContextualLayerPositioningStyles_DEPRECATED')({
          adjustment: h,
          align: v(f),
          contextRect: e,
          fixed: b,
          offsetRect: g,
          position: I,
        });
        m = S.current;
        if (m != null) {
          a = Object.keys(p);
          for (l = 0; l < a.length; l++) {
            i = a[l];
            b = p[i];
            b != null ? m.style.setProperty(i, b) : m.style.removeProperty(i);
          }
        }
        G.current = !0;
        R(!1);
        e != null && (ea(e.bottom - e.top), fa(e.right - e.left));
        ha(h);
      }, [M, U, V, N, A, f, I, D, O.bottom, O.left, O.right, O.top]);
      o(
        C,
        () => {
          return {
            reposition: function (a) {
              a = a || {};
              a = a.autoflip;
              a = a === void 0 ? !1 : a;
              a && W();
              X();
            },
          };
        },
        [X, W],
      );
      let Y = c('useResizeObserver')((a) => {
        let b = a.height;
        a = a.width;
        T.current = {
          height: b,
          width: a,
        };
      });
      let Z = r(F);
      p(() => {
        F !== Z.current && (J(F), W(), X()), (Z.current = F);
      }, [F, X, W]);
      let ia = l(
        (a) => {
          (S.current = a), a != null && !P ? (G.current || X(), W(), X()) : a == null && (G.current = !1);
        },
        [P, X, W],
      );
      n(() => {
        if (P) return;
        let b = function () {
          W(), X();
        };
        a.addEventListener('resize', b);
        return function () {
          a.removeEventListener('resize', b);
        };
      }, [P, X, W]);
      n(() => {
        if (P) return;
        let b = N.map((a) => {
          return a.getDOMNode();
        }).filter(Boolean);
        a.addEventListener != null && b.push(a);
        if (b.length > 0) {
          b.forEach((a) => {
            return a.addEventListener('scroll', X, {
              passive: !0,
            });
          });
          return function () {
            b.forEach((a) => {
              return a.removeEventListener('scroll', X, {
                passive: !0,
              });
            });
          };
        }
        if (a.addEventListener == null) return;
        a.addEventListener('scroll', X, {
          passive: !0,
        });
        return function () {
          a.removeEventListener('scroll', X, {
            passive: !0,
          });
        };
      }, [P, X, N]);
      H = q(() => {
        return c('mergeRefs')(ia, Y, j);
      }, [ia, Y, j]);
      b = q(() => {
        return {
          align: v(f),
          position: I,
        };
      }, [f, I]);
      C = q(() => {
        return K != null && L != null
          ? {
              height: K,
              width: L,
            }
          : null;
      }, [K, L]);
      let $ = z || Q;
      return k.jsx(c('GeoPrivateBasePortal.react'), {
        target: M.current,
        children: k.jsx(c('LegacyHidden'), {
          htmlAttributes: {
            'data-testid': y,
            className: (i || (i = c('stylex')))(da.root, E),
          },
          mode: z || Q ? 'hidden' : 'visible',
          ref: H,
          children: k.jsx(d('FocusRegion.react').FocusRegion, {
            autoFocusQuery:
              !$ && ((y = e) != null ? y : x) ? d('focusScopeQueries').headerFirstTabbableSecondScopeQuery : null,
            autoRestoreFocus: (E = g) != null ? E : !$,
            containFocusQuery: $ ? null : d('focusScopeQueries').tabbableScopeQuery,
            recoverFocusQuery: $ ? null : d('focusScopeQueries').headerFirstTabbableSecondScopeQuery,
            children: k.jsx(c('BaseContextualLayerAnchorRoot.react'), {
              children: k.jsx(c('BaseContextualLayerContextSizeContext').Provider, {
                value: C,
                children: k.jsx(c('BaseContextualLayerLayerAdjustmentContext').Provider, {
                  value: ga,
                  children: k.jsx(c('BaseContextualLayerOrientationContext').Provider, {
                    value: b,
                    children: h,
                  }),
                }),
              }),
            }),
          }),
        }),
      });
    }
    b.displayName = b.name + ' [from ' + f.id + ']';
    e = d('GeoPrivateMakeComponent').makeGeoComponent('BaseContextualLayer', b);
    g['default'] = e;
  },
  98,
);
