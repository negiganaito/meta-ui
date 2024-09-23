import { useStable } from '@meta-core/hooks';

import { HeroTracingCoreDependencies } from '../utils/hero-tracing-core-dependencies';

class HeroCascadingRenderDetector {
  constructor() {
    this.pageletMap = new Map();
  }

  // eslint-disable-next-line max-params
  logRender(pageletId, timestamp, renderPhase, renderDuration) {
    const pageletData = this._getPageletData(pageletId);
    pageletData.set(timestamp, {
      isNested: renderPhase === 'nested-update',
      renderDuration: renderDuration,
    });
  }

  // eslint-disable-next-line max-params
  logCommit(pageletId, timestamp, commitPhase, layoutDuration) {
    const pageletData = this._getPageletData(pageletId);
    const data = pageletData.get(timestamp);
    if (!data || commitPhase !== 'nested-update') return;
    pageletData.set(timestamp, {
      ...data,
      isNested: true,
      layoutDuration: layoutDuration,
    });
  }

  // eslint-disable-next-line max-params
  logPostCommit(pageletId, timestamp, commitPhase, effectDuration) {
    const pageletData = this._getPageletData(pageletId);
    const data = pageletData.get(timestamp);
    if (!data || commitPhase !== 'nested-update') return;
    pageletData.set(timestamp, {
      ...data,
      effectDuration: effectDuration,
      isNested: true,
    });
  }

  getPageletReport(pageletId, threshold) {
    const pageletData = this._getPageletData(pageletId);
    if (pageletData.size === 0) return;

    const report = {
      cascadingRenderCount: 0,
      cascadingRenderTotalDuration: 0,
      maxChainedCascadingRenderCount: 0,
    };

    const timestamps = Array.from(pageletData.keys()).reverse();
    let isCascading = false;
    let chainedCount = 0;

    for (const timestamp of timestamps) {
      if (timestamp > threshold) continue;

      const data = pageletData.get(timestamp) || {};
      const { renderDuration = 0, layoutDuration = 0, effectDuration = 0, isNested = false } = data;

      if (isNested) {
        report.cascadingRenderCount += 1;
        report.cascadingRenderTotalDuration += renderDuration + layoutDuration + effectDuration;

        if (HeroTracingCoreDependencies.UserTimingUtils) {
          HeroTracingCoreDependencies.UserTimingUtils.measureModern(
            `⚠️ ${pageletId} [cascading commit block]`,
            { start: timestamp, end: timestamp + renderDuration + layoutDuration + effectDuration },
            'ReactCascadingRender',
          );
        }

        if (isCascading) {
          chainedCount++;
        } else {
          report.maxChainedCascadingRenderCount = Math.max(chainedCount, report.maxChainedCascadingRenderCount);
          chainedCount = 0;
        }

        isCascading = true;
      } else {
        isCascading = false;
      }
    }

    return report;
  }

  cleanup(pageletId) {
    this.pageletMap.delete(pageletId);
  }

  _getPageletData(pageletId) {
    if (this.pageletMap.has(pageletId)) {
      return this.pageletMap.get(pageletId);
    }

    const newMap = new Map();
    this.pageletMap.set(pageletId, newMap);
    return newMap;
  }
}

export function useHeroCascadingRenderDetector() {
  return useStable(() => new HeroCascadingRenderDetector());
}
