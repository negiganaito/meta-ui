// import {
//   useCallback,
//   useContext,
//   useLayoutEffect,
//   useRef,
//   useState,
// } from "react";
// import { jsx } from "react/jsx-runtime";
// import stylex from "@stylexjs/stylex";

// import { BaseView } from "@/faang/base-row";
// import { HiddenSubtreeContext } from "@/faang/context";
// import { usePrevious, useStable } from "@/faang/hooks";
// import { HiddenSubtreeContextProvider } from "@/faang/popover";

// const styles = stylex.create({
//   detached: {
//     // eslint-disable-next-line @stylexjs/valid-styles
//     MsOverflowStyle: "none",
//     height: "100%",
//     overflowX: "auto",
//     overflowY: "auto",
//     position: "fixed",
//     // eslint-disable-next-line @stylexjs/valid-styles
//     scrollbarWidth: "none",
//     left: 0,
//     top: 0,
//     width: "100%",
//     // eslint-disable-next-line @stylexjs/valid-styles
//     "::-webkit-scrollbar": {
//       display: "none",
//       height: 0,
//       width: 0,
//     },
//   },
// });

// const p = new Map();
// const q = new Set();
// let r = null;

// function s(a, b) {
//   return !!(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);
// }

// function t() {
//   let a = null;
//   p.forEach((b, c) => {
//     !a ? (a = c) : a && c && s(a, c) && !q.has(c) && (a = c);
//   });
//   return a;
// }

// function u(a) {
//   return !r || s(r, a);
// }

// export function BaseDocumentScrollView({
//   contextKey = undefined,
//   detached = false,
//   detachedDefaultValue = false,
//   detachedPageOffsets,
//   disableNavigationScrollReset = false,
//   hiddenWhenDetached = false,
//   maintainScrollForContext = false,
//   onInitialScroll,
//   resetScrollOnMount = true,
//   ...rest
// }) {
//   let y = useRef();
//   let z = useRef({
//     x: 0,
//     y: 0,
//   });
//   let A = useStable(() => {
//     return {};
//   });
//   let B = usePrevious(contextKey);
//   const [C, D] = useState(detachedDefaultValue);
//   const [E, F] = useState({
//     x: 0,
//     y: 0,
//   });
//   let G = usePrevious(C);
//   const { hidden: H } = useContext(HiddenSubtreeContext);

//   useLayoutEffect(() => {
//     let a = y.current;
//     if (a) {
//       if (u(a)) {
//         if (r) {
//           let b = p.get(r);
//           b && b(!1);
//         }
//         r = a;
//       } else D(!0);
//       p.set(a, (a) => {
//         // eslint-disable-next-line no-sequences
//         a || F({ ...z.current }), D(!a);
//       });
//       return function () {
//         p["delete"](a);
//         if (r === a) {
//           r = t();
//           if (r) {
//             let b = p.get(r);
//             b && b(!0);
//           }
//         }
//       };
//     }
//   }, []);
//   let I = useCallback(
//     (b, c) => {
//       // eslint-disable-next-line no-sequences
//       window.scrollTo && window.scrollTo(b, c),
//         typeof onInitialScroll === "function" && onInitialScroll(b, c);
//     },
//     [onInitialScroll]
//   );
//   useLayoutEffect(() => {
//     (resetScrollOnMount || G) && !C && C !== G && I(E.x, E.y);
//   }, [C, E, G, I, resetScrollOnMount]);
//   useLayoutEffect(() => {
//     if ((resetScrollOnMount || B) && contextKey !== B) {
//       let a =
//         maintainScrollForContext && contextKey && contextKey in A
//           ? // @ts-ignore
//             A[contextKey]
//           : {
//               x: 0,
//               y: 0,
//             };
//       C ? F(a) : disableNavigationScrollReset !== !0 && I(a.x, a.y);
//     }
//   }, [
//     contextKey,
//     A,
//     C,
//     maintainScrollForContext,
//     B,
//     I,
//     resetScrollOnMount,
//     disableNavigationScrollReset,
//   ]);
//   useLayoutEffect(() => {
//     if (!C) {
//       let b = function () {
//         let b = window.pageXOffset;
//         let c = window.pageYOffset;
//         z.current = {
//           x: b,
//           y: c,
//         };
//         contextKey &&
//           // @ts-ignore
//           (A[contextKey] = {
//             x: b,
//             y: c,
//           });
//       };
//       window.addEventListener("scroll", b, {
//         passive: !0,
//       });
//       return function () {
//         return window.removeEventListener("scroll", b, {
//           // @ts-ignore
//           passive: !0,
//         });
//       };
//     }
//   }, [C, contextKey, A]);
//   useLayoutEffect(() => {
//     let a = y.current;
//     if (a)
//       if (H) {
//         q.add(a);
//         if (!C) {
//           D(!0);
//           r = t();
//           if (r) {
//             // eslint-disable-next-line no-inner-declarations, no-var
//             var b = p.get(r);
//             b && b(!0);
//           }
//         }
//         return function () {
//           q["delete"](a);
//         };
//       } else if (C && a !== r && a === t()) {
//         if (r) {
//           b = p.get(r);
//           b && b(!1);
//         }
//         r = a;
//         b = p.get(r);
//         b && b(!0);
//       }
//   }, [C, H]);
//   const isBackgrounded = detached || C;
//   const b = hiddenWhenDetached;
//   let J = C && !hiddenWhenDetached;
//   useLayoutEffect(() => {
//     let a = y.current;
//     J && a && (a.scrollTop = E.y);
//   }, [E.y, J]);
//   return jsx(HiddenSubtreeContextProvider, {
//     ignoreParent: !0,
//     isBackgrounded,
//     isHidden: b,
//     children: jsx(BaseView, {
//       ...rest,
//       hidden: b,
//       ...(J && {
//         "aria-hidden": !0,
//         id: "scrollview",
//         style: {
//           left: -E.x,
//         },
//         xstyle: styles.detached,
//       }),
//       ref: y,
//     }),
//   });
// }

import { useCallback, useContext, useLayoutEffect, useRef, useState } from 'react';
import { jsx } from 'react/jsx-runtime';
import stylex from '@stylexjs/stylex';

import { HiddenSubtreeContext } from '../contexts';
import { usePrevious, useStable } from '../hooks';

import { BaseView } from './base-view';
import { HiddenSubtreeContextProvider } from './hidden-subtree-context-provider';

const styles = stylex.create({
  detached: {
    // eslint-disable-next-line @stylexjs/valid-styles
    MsOverflowStyle: 'none',
    height: '100%',
    overflowX: 'auto',
    overflowY: 'auto',
    position: 'fixed',
    scrollbarWidth: 'none',
    left: 0,
    top: 0,
    width: '100%',
    '::-webkit-scrollbar': {
      display: 'none',
      height: 0,
      width: 0,
    },
  },
});

const activeScrollViews = new Map();
const hiddenScrollViews = new Set();
let activeScrollView = null;

function isFollowingNode(a, b) {
  return !!(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);
}

function findNextActiveScrollView() {
  let nextScrollView = null;
  activeScrollViews.forEach((callback, scrollView) => {
    if (
      !nextScrollView ||
      (scrollView && isFollowingNode(nextScrollView, scrollView) && !hiddenScrollViews.has(scrollView))
    ) {
      nextScrollView = scrollView;
    }
  });
  return nextScrollView;
}

function isActiveScrollView(a) {
  return !activeScrollView || isFollowingNode(activeScrollView, a);
}

export function BaseDocumentScrollView({
  contextKey = undefined,
  detached = false,
  detachedDefaultValue = false,
  detachedPageOffsets,
  disableNavigationScrollReset = false,
  hiddenWhenDetached = false,
  maintainScrollForContext = false,
  onInitialScroll,
  resetScrollOnMount = true,
  ...rest
}) {
  const scrollViewRef = useRef();
  const scrollPosition = useRef({ x: 0, y: 0 });
  const contextScrollPositions = useStable(() => ({}));
  const prevContextKey = usePrevious(contextKey);
  const [isDetached, setDetached] = useState(detachedDefaultValue);
  const [scrollOffsets, setScrollOffsets] = useState({ x: 0, y: 0 });
  const prevDetached = usePrevious(isDetached);
  const { hidden: isParentHidden } = useContext(HiddenSubtreeContext);

  useLayoutEffect(() => {
    const currentScrollView = scrollViewRef.current;
    if (currentScrollView) {
      if (isActiveScrollView(currentScrollView)) {
        if (activeScrollView) {
          const callback = activeScrollViews.get(activeScrollView);
          callback && callback(false);
        }
        activeScrollView = currentScrollView;
      } else {
        setDetached(true);
      }
      activeScrollViews.set(currentScrollView, (isActive) => {
        isActive || setScrollOffsets({ ...scrollPosition.current });
        setDetached(!isActive);
      });
      return () => {
        activeScrollViews.delete(currentScrollView);
        if (activeScrollView === currentScrollView) {
          activeScrollView = findNextActiveScrollView();
          if (activeScrollView) {
            const callback = activeScrollViews.get(activeScrollView);
            callback && callback(true);
          }
        }
      };
    }
  }, []);

  const handleInitialScroll = useCallback(
    (x, y) => {
      window.scrollTo && window.scrollTo(x, y);
      onInitialScroll && onInitialScroll(x, y);
    },
    [onInitialScroll],
  );

  useLayoutEffect(() => {
    if ((resetScrollOnMount || prevDetached) && !isDetached && isDetached !== prevDetached) {
      handleInitialScroll(scrollOffsets.x, scrollOffsets.y);
    }
  }, [isDetached, scrollOffsets, prevDetached, handleInitialScroll, resetScrollOnMount]);

  useLayoutEffect(() => {
    if ((resetScrollOnMount || prevContextKey) && contextKey !== prevContextKey) {
      const scrollPos =
        maintainScrollForContext && contextKey && contextKey in contextScrollPositions
          ? contextScrollPositions[contextKey]
          : { x: 0, y: 0 };
      isDetached
        ? setScrollOffsets(scrollPos)
        : !disableNavigationScrollReset && handleInitialScroll(scrollPos.x, scrollPos.y);
    }
  }, [
    contextKey,
    contextScrollPositions,
    isDetached,
    maintainScrollForContext,
    prevContextKey,
    handleInitialScroll,
    resetScrollOnMount,
    disableNavigationScrollReset,
  ]);

  useLayoutEffect(() => {
    if (!isDetached) {
      const handleScroll = () => {
        const x = window.pageXOffset;
        const y = window.pageYOffset;
        scrollPosition.current = { x, y };
        if (contextKey) {
          contextScrollPositions[contextKey] = { x, y };
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll, { passive: true });
    }
  }, [isDetached, contextKey, contextScrollPositions]);

  useLayoutEffect(() => {
    const currentScrollView = scrollViewRef.current;
    if (currentScrollView) {
      if (isParentHidden) {
        hiddenScrollViews.add(currentScrollView);
        if (!isDetached) {
          setDetached(true);
          activeScrollView = findNextActiveScrollView();
          if (activeScrollView) {
            const callback = activeScrollViews.get(activeScrollView);
            callback && callback(true);
          }
        }
        return () => {
          hiddenScrollViews.delete(currentScrollView);
        };
      } else if (
        isDetached &&
        currentScrollView !== activeScrollView &&
        currentScrollView === findNextActiveScrollView()
      ) {
        if (activeScrollView) {
          const callback = activeScrollViews.get(activeScrollView);
          callback && callback(false);
        }
        activeScrollView = currentScrollView;
        const callback = activeScrollViews.get(activeScrollView);
        callback && callback(true);
      }
    }
  }, [isDetached, isParentHidden]);

  const isHidden = hiddenWhenDetached;
  const isBackgrounded = detached || isDetached;
  const isAriaHidden = isDetached && !hiddenWhenDetached;

  useLayoutEffect(() => {
    const currentScrollView = scrollViewRef.current;
    if (isAriaHidden && currentScrollView) {
      currentScrollView.scrollTop = scrollOffsets.y;
    }
  }, [scrollOffsets.y, isAriaHidden]);

  return jsx(HiddenSubtreeContextProvider, {
    ignoreParent: true,
    isBackgrounded,
    isHidden,
    children: jsx(BaseView, {
      ...rest,
      hidden: isHidden,
      ...(isAriaHidden && {
        'aria-hidden': true,
        id: 'scrollview',
        style: { left: -scrollOffsets.x },
        xstyle: styles.detached,
      }),
      ref: scrollViewRef,
    }),
  });
}
