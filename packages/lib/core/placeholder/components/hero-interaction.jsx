import React, { forwardRef } from 'react';
import { HiddenSubtreePassiveContext } from '@meta-core/contexts';
import performanceNow from 'fbjs/lib/performanceNow';

import { HeroTracingPlaceholder } from '../hero-tracing-placeholder';
import { useHeroCascadingRenderDetector } from '../hooks/use-hero-cascading-render-detector';
import { HeroLogger } from '../utils/hero-logger';
import { HeroPlaceholderUtils } from '../utils/hero-placeholder-utils';
import { HeroTracingCoreConfig } from '../utils/hero-tracing-core-config';
import { InteractionTracingMetrics } from '../utils/interaction-tracing-metrics';

let n = React.useCallback;
let o = React.useContext;
let p = React.useEffect;
let q = React.useLayoutEffect;
let r = React.useMemo;
let s = React.useRef;
let t = HeroTracingCoreConfig.enableCascadingRenderDetector
  ? useHeroCascadingRenderDetector
  : function () {
      return null;
    };
let u = 'Interaction Start';
let v = 'root';
let w = {
  userTiming: !1,
};
let x = new Set();

function a(a, e) {
  let f;
  let g = a.children;
  let l = a.hidden;
  let ca = a.htmlAttributes;
  let E = a.interactionDesc;
  let F = a.interactionUUID;
  let da = a.observeTextMutation;
  let G = a.pageletName;
  let H = a.renderTrackedDOMElement;
  a = a.alwaysMarkMutationRootAsVisualChange;
  let I = o(d('hero-tracing-placeholder').HeroInteractionContext.Context);
  let J = o(d('hero-tracing-placeholder').HeroInteractionIDContext);
  let K = s(null);
  let L = s(null);
  let M = o(c('HiddenSubtreePassiveContext'));
  let N = (E = E) != null ? E : 'No Description';
  let O = s({});
  let P = s({});
  let Q = s({});
  let R = s(null);
  let ea = s(J);
  let S = c('useStable')(d('hero-tracing-placeholder').HeroPlaceholderUtils.getSimpleUUID);
  let T = r(() => {
    let a;
    return [].concat(I.pageletStack, [(a = G) != null ? a : v]);
  }, [I.pageletStack, G]);
  let U = s([]);
  let V = s(new Set());
  let W = t();
  let X = n(() => {
    return c('objectValues')(O.current).some((a) => {
      return a.shouldHold;
    });
  }, []);
  let Y = n(
    (a, b, c) => {
      L.current !== a &&
        K.current == null &&
        !M.getCurrentState().hidden &&
        !X() &&
        (K.current = d('foregroundRequestAnimationFrame').foregroundRequestAnimationFrame(() => {
          (K.current = null),
            !M.getCurrentState().hidden &&
              L.current !== a &&
              !X() &&
              ((L.current = a),
              d('HeroLogger').markEnd(a, T, 'Interaction', 'Interaction Done: ' + b, u),
              c !== a && d('HeroLogger').endHeroInteraction(a, 'SUCCESS'),
              c != null && I.unhold(c, c + '_' + S),
              B(U.current, a, T),
              C(V.current, a, T),
              (U.current = []),
              (V.current = new Set()));
        }));
    },
    [M, I, S, T, X],
  );
  let Z = n(() => {
    let a = R.current;
    a != null && Y(a.interactionUUID, a.interactionDesc, J);
  }, [J, Y]);
  let $ = n(
    (a, b, c) => {
      let e = R.current;
      e != null &&
        L.current !== e.interactionUUID &&
        (d('HeroLogger').markEnd(
          e.interactionUUID,
          T,
          'Interaction',
          'Interaction Aborted (' + b + '): ' + e.interactionDesc,
          u,
        ),
        c != null && I.unhold(c, c + '_' + S),
        c !== e.interactionUUID
          ? d('HeroLogger').endHeroInteraction(e.interactionUUID, 'ABORT', b)
          : c != null &&
            d('interaction-tracing-metrics').InteractionTracingMetricsCore.addMetadata(c, 'childInteractionAborted', 1),
        a !== null &&
          e.interactionUUID === a.interactionUUID &&
          d('HeroLogger').genHeroInteractionUUIDAndMarkStart(a.interactionUUID));
      e != null && (B(U.current, e.interactionUUID, T), C(V.current, e.interactionUUID, T));
      U.current = [];
      V.current = new Set();
      L.current = null;
      K.current && K.current();
      K.current = null;
      R.current = a;
      ea.current = c;
      a !== null && c != null && I.hold(c, T, 'Sub Interaction:' + a.interactionDesc, c + '_' + S);
    },
    [I, S, T],
  );
  E = s(null);
  p(() => {
    return function () {
      let a = function () {
        return $(null, 'Unmount');
      };
      a();
    };
  }, [$]);
  q(() => {
    let a;
    if (
      c('HeroTracingCoreConfig').enableResetCompletedFix === !0 &&
      F != null &&
      ((a = d('interaction-tracing-metrics').InteractionTracingMetricsCore.get(F)) == null ? void 0 : a.completed) !=
        null
    )
      return;
    a = null;
    F != null &&
      (a = {
        interactionDesc: N,
        interactionUUID: F,
      });
    $(a, 'New Interaction', J);
    F != null && Y(F, N, J);
  }, [N, F, J, $, Y]);
  q(() => {
    if (F != null) {
      let a = M.getCurrentState().hidden;
      let b = M.subscribeToChanges((b) => {
        b = b.hidden;
        a !== b &&
          ((a = b),
          b
            ? $(
                {
                  interactionDesc: N,
                  interactionUUID: F,
                },
                'Hidden',
              )
            : Y(F, N, J));
      });
      F != null && Y(F, N, J);
      return function () {
        return b.remove();
      };
    }
  }, [M, F, N, $, Y, J]);
  E = r(() => {
    var a = {
      consumeBootload: function (a) {
        V.current.add(a);
      },
      hold: function (c, e, f, g, h) {
        f === void 0 && (f = 'Hold');
        g = (g = g) != null ? g : d('hero-tracing-placeholder').HeroPlaceholderUtils.getSimpleUUID();
        let i = new (j || (j = b('Promise')))(() => {});
        (k || (k = d('PromiseAnnotate'))).setDisplayName(i, f);
        a.suspenseCallback(c, g, e, new Set([i]), h);
        a.registerPlaceholder(c, g, e);
        return g;
      },
      logHeroRender: function (a, b, e) {
        L.current !== a &&
          d('HeroLogger').markEnd(
            a,
            [].concat(e),
            'HeroRendering',
            'Hero Rendering: ' + b,
            u,
            void 0,
            void 0,
            c('HeroTracingCoreConfig').enableHeroLoggingVerbose ? void 0 : w,
          );
      },
      logMetadata: function (a, b, c) {
        let d;
        c = c[c.length - 1];
        d = (d = P.current[c]) != null ? d : Object.create(null);
        b != null ? (d[a] = b) : delete d[a];
        P.current[c] = d;
      },
      logPageletVC: function (a, b, c, e, f) {
        let g = f[f.length - 1];
        let h = P.current[g];
        h = h != null ? babelHelpers['extends']({}, h) : void 0;
        h && d('interaction-tracing-metrics').InteractionTracingMetricsCore.addMountPointMetadata(a, g, h);
        e != null &&
          d('HeroLogger').measure(
            a,
            [].concat(f),
            'VCWithoutImage',
            'VCWithoutImage: ' + f[f.length - 1],
            Math.min(b, e),
            e,
            h,
          );
        if (c != null) {
          h = Object.assign(
            (e = h) != null ? e : babelHelpers['extends']({}, null),
            ba(Q.current[g], c),
            W == null ? void 0 : W.getPageletReport(g, c),
          );
          Q.current[g] = {};
          W == null ? void 0 : W.cleanup(g);
          d('HeroLogger').measure(a, [].concat(f), 'VC', 'VC: ' + f[f.length - 1], Math.min(b, c), c, h);
        }
      },
      logReactCommit: function (a, b, d, e, f, g, i) {
        (h || (h = c('HeroTracingCoreDependencies'))).UserTimingUtils == null
          ? void 0
          : (h || (h = c('HeroTracingCoreDependencies'))).UserTimingUtils.measureReactCommit(b, f, e);
        if (L.current !== a && g) {
          b = i[i.length - 1];
          W == null ? void 0 : W.logCommit(b, f, d, e);
          g = (a = Q.current[b]) != null ? a : Object.create(null);
          d = (i = g[f]) != null ? i : Object.create(null);
          d.commitDuration = e;
          g[f] = d;
          Q.current[b] = g;
        }
      },
      logReactPostCommit: function (a, b, d, e, f, g, i) {
        (h || (h = c('HeroTracingCoreDependencies'))).UserTimingUtils == null
          ? void 0
          : (h || (h = c('HeroTracingCoreDependencies'))).UserTimingUtils.measureReactPostCommit(b, e);
        if (L.current !== a && g) {
          b = i[i.length - 1];
          W == null ? void 0 : W.logPostCommit(b, f, d, e);
          g = (a = Q.current[b]) != null ? a : Object.create(null);
          d = (i = g[f]) != null ? i : Object.create(null);
          d.postCommitDuration = e;
          g[f] = d;
          Q.current[b] = g;
        }
      },
      logReactRender: function (a, b, c, e, f, g, h, i, j) {
        if (L.current !== a) {
          d('HeroLogger').measure(a, [].concat(j), 'ReactRender', 'ReactRender: ' + b, e, f, {
            actualDuration: g,
            baseDuration: h,
            phase: c,
          });
          if (i) {
            a = j[j.length - 1];
            W == null ? void 0 : W.logRender(a, f, c, g);
            e = (b = Q.current[a]) != null ? b : Object.create(null);
            j = (i = e[f]) != null ? i : Object.create(null);
            j.actualDuration = g;
            j.baseDuration = h;
            e[f] = j;
            Q.current[a] = e;
          }
        }
      },
      pageletStack: I.pageletStack,
      registerPlaceholder: function (a, b, c) {
        let d = O.current[b];
        K.current && K.current();
        K.current = null;
        if (d != null) {
          d.shouldHold = !0;
          return;
        }
        d = new Set();
        O.current[b] = {
          pageletStack: c,
          shouldHold: !0,
          thenables: d,
        };
        z(a, b, c, D(O.current[b]));
      },
      removePlaceholder: function (a, b) {
        let c = O.current[b] != null;
        if (!c) return;
        c = O.current[b];
        !c;
        delete O.current[b];
        Z();
        A(a, b, c.pageletStack, D(c));
      },
      suspenseCallback: function (a, b, e, f, g) {
        let h = O.current[b];
        g = {
          boundaryName: g,
          pageletStack: e,
          shouldHold: (g = h == null ? void 0 : h.shouldHold) != null ? g : !1,
          thenables: f,
        };
        O.current[b] = g;
        g = D(g);
        h == null && z(a, b, e, g);
        f.forEach((b) => {
          if (!x.has(b)) {
            let f;
            x.add(b);
            (i || (i = c('ExecutionEnvironment'))).canUseDOM &&
              c('setTimeoutAcrossTransitions')(() => {
                x['delete'](b);
              }, 6e4);
            let g = (f = (k || (k = d('PromiseAnnotate'))).getDisplayName(b)) != null ? f : 'Promise';
            let h = d('hero-tracing-placeholder').HeroPlaceholderUtils.getSimpleUUID();
            y(a, h);
            b.then(() => {
              aa(a, h, e, g);
            });
          }
        });
        f = D(h);
        h != null && g !== f && (A(a, b, e, f), z(a, b, e, g));
      },
      unhold: function (b, c) {
        a.removePlaceholder(b, c);
      },
    };
    return a;
  }, [W, I.pageletStack, Z]);
  let fa = r(() => {
    return {
      consumeBootload: function (a) {
        V.current.add(a);
      },
      retainQuery: function (a) {
        U.current.push(a);
      },
      wrapPrepareQueryResource: function (a) {
        return a();
      },
    };
  }, []);
  f = (f = G) != null ? f : v;
  return m.jsx(d('hero-tracing-placeholder').HeroInteractionContext.Context.Provider, {
    value: E,
    children: m.jsx(d('hero-tracing-placeholder').HeroInteractionIDContext.Provider, {
      value: F,
      children: m.jsx(d('hero-tracing-placeholder').HeroCurrentInteractionForLoggingContext.Provider, {
        value: R,
        children: m.jsx(c('RelayProfilerContext').Provider, {
          value: fa,
          children: m.jsx(c('HeroPagelet.react'), {
            isMutationRoot: !0,
            name: f,
            observeTextMutation: da,
            ref: e,
            alwaysMarkMutationRootAsVisualChange:
              (E = a) != null ? E : c('HeroTracingCoreConfig').alwaysMarkMutationRootAsVisualChange,
            children: (function (b) {
              function a(a, c) {
                return b.apply(this, arguments);
              }
              a.toString = function () {
                return b.toString();
              };
              return a;
            })((a, b) => {
              return H
                ? m.jsxs(m.Fragment, {
                    children: [H(a, g), m.jsx(b, {})],
                  })
                : m.jsxs(c('HeroTracingPlatformDependencies').HostInstanceTrackableComponent, {
                    htmlAttributes: babelHelpers['extends']({}, ca),
                    mode: l === !0 ? 'hidden' : 'visible',
                    ref: a,
                    children: [m.jsx(b, {}), g],
                  });
            }),
          }),
        }),
      }),
    }),
  });
}

function ba(a, b) {
  if (!a) return null;
  let d = {
    commitCount: 0,
    lastBaseDuration: 0,
    maxBaseDuration: 0,
    totalActualDuration: 0,
    totalCommitDuration: 0,
    totalPostCommitDuration: 0,
    zeroDurationCommitCount: 0,
    zeroDurationPostCommitCount: 0,
  };
  for (
    // eslint-disable-next-line no-inner-declarations, no-var
    var a = c('objectEntries')(a),
      e = Array.isArray(a),
      f = 0,
      a = e ? a : a[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator']();
    ;

  ) {
    // eslint-disable-next-line no-inner-declarations, no-var
    var g;
    if (e) {
      if (f >= a.length) break;
      g = a[f++];
    } else {
      f = a.next();
      if (f.done) break;
      g = f.value;
    }
    g = g;
    let h = g[0];
    g = g[1];
    if (h > b) break;
    h = g.actualDuration;
    h = h === void 0 ? 0 : h;
    let i = g.baseDuration;
    i = i === void 0 ? 0 : i;
    let j = g.commitDuration;
    j = j === void 0 ? 0 : j;
    let k = g.postCommitDuration;
    k = k === void 0 ? 0 : k;
    d.commitCount++;
    g.commitDuration === 0 && d.zeroDurationCommitCount++;
    g.postCommitDuration === 0 && d.zeroDurationPostCommitCount++;
    d.maxBaseDuration = Math.max(d.maxBaseDuration, i);
    d.lastBaseDuration = i;
    d.totalActualDuration += h;
    d.totalCommitDuration += j;
    d.totalPostCommitDuration += k;
  }
  return d;
}

function D(a) {
  if (!a) return 'No placeholder';
  let b = a.boundaryName ? '@' + a.boundaryName : '';
  a = HeroTracingPlaceholder.HeroPlaceholderUtils.createThenableDescription(a.thenables) || 'No Promises';
  return a + b;
}

function C(a, b, c) {
  InteractionTracingMetrics.addHeroBootload(b, {
    moduleIDs: Array.from(a),
    pageletStack: c,
  });
}

function B(a, b, e) {
  InteractionTracingMetrics.addHeroRelay(b, {
    pageletStack: e,
    queries: a,
  });
  for (
    // eslint-disable-next-line no-inner-declarations, no-var
    var a = a,
      f = Array.isArray(a),
      g = 0,
      a = f ? a : a[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator']();
    ;

  ) {
    // eslint-disable-next-line no-inner-declarations, no-var
    var h;
    // eslint-disable-next-line no-inner-declarations, no-var
    var i;
    if (f) {
      if (g >= a.length) break;
      i = a[g++];
    } else {
      g = a.next();
      if (g.done) break;
      i = g.value;
    }
    // eslint-disable-next-line no-self-assign
    i = i;
    HeroLogger.measure(
      b,
      e,
      'Relay',
      i.name,
      i.start,
      i.end,
      {
        // eslint-disable-next-line no-cond-assign
        full_duration: (((h = i.end) ? h : c('performanceNowSinceAppStart')()) - i.start) / 1e3,
        is_preloaded: i.isPreloaded === !0,
        networkStart: i.networkStart / 1e3,
        networkDuration: i.end ? (i.end - i.networkStart) / 1e3 : 0,
      },
      HeroTracingCoreConfig.enableHeroLoggingVerbose ? void 0 : w,
    );
    for (h = 0; h < i.flushes.length; h++) {
      let j = i.flushes[h];
      HeroLogger.measure(
        b,
        e,
        'RelayFlush',
        i.name + '(' + j.label + ')',
        i.start,
        j.time,
        {
          flush: j.label,
          queryName: i.name,
          full_duration: (j.time - i.start) / 1e3,
          is_preloaded: i.isPreloaded === !0,
        },
        HeroTracingCoreConfig.enableHeroLoggingVerbose ? void 0 : w,
      );
    }
  }
}

// eslint-disable-next-line max-params
function A(a, b, e, f) {
  HeroLogger.markEndPlaceholder(
    a,
    e,
    'PlaceholderWait',
    'Placeholder Wait: ' + f,
    b,
    void 0,
    void 0,
    HeroTracingCoreConfig.enableHeroLoggingVerbose ? void 0 : w,
  );
}

// eslint-disable-next-line max-params
function aa(a, b, e, f) {
  HeroLogger.markEnd(
    a,
    e,
    'SuspensePromise',
    'Promise Wait: ' + f,
    b,
    void 0,
    void 0,
    HeroTracingCoreConfig.enableHeroLoggingVerbose ? void 0 : w,
  );
}

// eslint-disable-next-line max-params
function z(a, b, c, e) {
  HeroLogger.markStartPlaceholder(a, b, void 0, c, e);
}

function y(a, b) {
  HeroLogger.markStart(a, b);
}

export const HeroInteraction = forwardRef(a);
