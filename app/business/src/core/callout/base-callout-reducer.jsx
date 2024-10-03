import { unrecoverableViolation } from '@meta-core/error/unrecoverable-violation';

export function BaseCalloutReducer(a, b) {
  switch (b.type) {
    case 'addCallout':
      return !a.calloutID ? { ...a, ...b.payload } : a;
    case 'removeCallout':
      if (a.calloutID && a.calloutID === b.payload) {
        let d = a.anchorRootRefContext;
        let e = a.animationContext;
        let f = a.contextualLayerProps;
        let g = a.scrollableAreaContext;
        return {
          anchorRootRefContext: d,
          animationContext: e,
          contextualLayerProps: f,
          scrollableAreaContext: g,
        };
      }
      return a;
    default:
      throw unrecoverableViolation(b.type + ' is not a supported action type', 'comet_ui');
  }
}
