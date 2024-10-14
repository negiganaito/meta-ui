import { useCallback, useState } from 'react';
import { intersectionObserverEntryIsIntersecting } from '@meta-core/utils/intersection-observer-entry-is-intersecting';

import useIntersectionObserver from './use-intersection-observer';

const k = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

// function a(a) {
//   a = a === void 0 ? {} : a;
//   let b = a.onHidden;
//   let d = a.onVisible;
//   let e = a.onVisibilityChange;
//   let f = a.root;
//   f = f === void 0 ? null : f;
//   let g = a.rootMargin;
//   g = g === void 0 ? k : g;
//   a = a.threshold;
//   a = a === void 0 ? 0 : a;
//   let h = j(!1);
//   let l = h[0];
//   let m = h[1];
//   h = i(
//     (a) => {
//       a = c('intersectionObserverEntryIsIntersecting')(a);
//       a ? (d == null ? void 0 : d()) : b == null ? void 0 : b();
//       e == null ? void 0 : e(a);
//       m(a);
//     },
//     [b, d, e],
//   );
//   h = c('useIntersectionObserver')(h, {
//     root: f,
//     rootMargin: g,
//     threshold: a,
//   });
//   return [h, l];
// }

export const useVisibility = (props = {}) => {
  const { onHidden, onVisible, onVisibilityChange, root = null, rootMargin = k, threshold = 0 } = props;

  const [l, m] = useState(false);

  const func = useCallback(
    (a) => {
      const val = intersectionObserverEntryIsIntersecting(a);
      val ? (!onVisible ? void 0 : onVisible()) : !onHidden ? void 0 : onHidden();
      !onVisibilityChange ? void 0 : onVisibilityChange(val);
      m(val);
    },
    [onHidden, onVisible, onVisibilityChange],
  );

  const h = useIntersectionObserver(func, {
    root,
    rootMargin,
    threshold,
  });

  return [h, l];
};
