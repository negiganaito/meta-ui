import { useCallback, useRef } from 'react';
import { InteractionTracingMetrics } from '@meta-core/placeholder/interaction-tracing-metrics';
import { InteractionTracingMetricsCore } from '@meta-core/placeholder/interaction-tracing-metrics-core';
import performanceNow from 'fbjs/lib/performanceNow';

export function useCometDisplayTimingTrackerForInteraction(a, d, e) {
  d === void 0 && (d = !1);
  let f = useRef(null);
  return useCallback(
    (g) => {
      if (a && f.current !== g) {
        f.current = g;
        if (g) {
          let i = performanceNow();
          e
            ? InteractionTracingMetricsCore.addMountPoint(e, i, a)
            : InteractionTracingMetrics.currentInteractionLogger().forEach((b) => {
                return InteractionTracingMetrics.addMountPoint(b.traceId, i, a);
              });
          // TODO
          // if (!d && b("cr:449")) {
          //   let j = b("cr:449").getCurrentVCTraces();
          //   j.forEach((a) => {
          //     a.interactionType !== "INTERACTION" && a.excludeElement(g);
          //   });
          // }
        }
      }
    },
    [e, d, a],
  );
}
