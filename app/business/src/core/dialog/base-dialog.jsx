/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { forwardRef, useEffect, useRef } from 'react';
import { jsx } from 'react/jsx-runtime';
import { CometHideLayerOnEscape } from '@meta-core/callout/comet-hide-layer-on-escape';
import { BaseView } from '@meta-core/layout/base-view';
import { useMergeRefs } from '@meta-core/react-utils/use-merge-refs';
import { BaseThemeProvider } from '@meta-core/theme/base-theme-provider';
import { pointerEventDistance } from '@meta-core/utils/pointer-event-distance';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  anchor: {
    alignItems: 'flex-start',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    minHeight: 0,
    minWidth: 0,
    pointerEvents: 'none',
  },
  dialog: {
    boxSizing: 'content-box',
    display: 'flex',
    flexDirection: 'column',
    outline: 'none',
    overflowX: 'hidden',
    overflowY: 'hidden',
    pointerEvents: 'all',
  },
  dialogBottomSheet: {
    touchAction: 'none',
  },
  root: {
    alignItems: 'stretch',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center',
  },
  rootWithDeprecatedStyles: {
    flexGrow: 0,
    minHeight: '100vh',
  },
});

// CHANGED
// @Becareful
export const BaseDialog = forwardRef(
  (
    {
      anchorXStyle,
      'arial-label': al,
      children,
      disableClosingWithEscape = false,
      disableClosingWithMask = false,
      enableBottomSheetBehavior = false,
      onAnimationEnd,
      onClose,
      rootXStyle,
      testid,
      themeConfig,
      withDeprecatedStyles = false,
      xstyle,
      ...rest
    },
    ref,
  ) => {
    const containerRef = useRef(null);
    const dialogRef = useRef(null);
    const initialPointerEventRef = useRef(null);
    const isPointerEventOutsideRef = useRef(false);

    const onCloseRef = useRef(onClose);

    useEffect(() => {
      onCloseRef.current = onClose;
    }, [onClose]);

    useEffect(() => {
      let container = containerRef.current;
      let dialog = dialogRef.current;

      if (!container || !dialog || disableClosingWithMask) {
        return;
      }

      function isOutsideClick(event) {
        return event instanceof Node && !dialog.contains(event) && container.contains(event);
      }

      let supportsPointerEvents = 'PointerEvent' in window;

      if (!supportsPointerEvents) {
        let handleClick = (event) => {
          isOutsideClick(event.target) && onClose();
        };

        container.addEventListener('click', handleClick);

        return () => {
          container.removeEventListener('click', handleClick);
        };
      }

      function handlePointerDown(event) {
        if (event.isPrimary) {
          let isOutside = isOutsideClick(event.target);
          isPointerEventOutsideRef.current = isOutside;
          initialPointerEventRef.current = event;
        }
      }

      function handlePointerUp(event) {
        let isOutside = isOutsideClick(event.target);
        if (isPointerEventOutsideRef.current && isOutside && initialPointerEventRef.current && event.isPrimary) {
          isOutside = pointerEventDistance.isWithinThreshold(initialPointerEventRef.current, event);
          isOutside && onClose();
        }
        isPointerEventOutsideRef.current = false;
        initialPointerEventRef.current = null;
      }

      container.addEventListener('pointerup', handlePointerUp);
      container.addEventListener('pointerdown', handlePointerDown);

      return function () {
        container.removeEventListener('pointerup', handlePointerUp);
        container.removeEventListener('pointerdown', handlePointerDown);
      };
    }, [disableClosingWithMask, onClose]);

    const handleTouchStart = (event) => {
      const dialogElement = dialogRef.current;

      if (dialogElement !== null) {
        let isTouching = true;
        const initialTouchY = event.touches ? event.touches[0].pageY : 0;
        const dialogHeight = parseInt(
          dialogElement.style.height !== '' ? dialogElement.style.height : dialogElement.clientHeight,
          10,
        );
        let swipeOffset = 0;

        const originalStyles = {
          transform: dialogElement.style.transform,
          transitionDuration: dialogElement.style.transitionDuration,
          transitionTimingFunction: dialogElement.style.transitionTimingFunction,
        };

        const handleTouchMove = (moveEvent) => {
          if (isTouching) {
            const currentTouchY = moveEvent.touches ? moveEvent.touches[0].pageY : 0;
            const distanceMoved = initialTouchY - currentTouchY;

            if (distanceMoved < 0) {
              swipeOffset = distanceMoved;
              dialogElement.style.transform = `translateY(${-1 * distanceMoved}px)`;
            }
          }
          moveEvent.stopPropagation();
        };

        const handleTouchEnd = (endEvent) => {
          isTouching = false;

          if (dialogElement) {
            dialogElement.style.transitionTimingFunction = 'ease-out';
            dialogElement.style.transitionDuration = '0.2s';
          }

          if (dialogHeight + swipeOffset < dialogHeight / 2) {
            const hideDialog = () => {
              dialogElement.removeEventListener('transitionend', hideDialog);
              dialogElement.style.display = 'none';
              onCloseRef.current();
            };

            dialogElement.addEventListener('transitionend', hideDialog);
            dialogElement.style.transform = 'translateY(100%)';
          } else {
            const resetDialogPosition = () => {
              dialogElement.removeEventListener('transitionend', resetDialogPosition);
              dialogElement.style.transform = originalStyles.transform;
              dialogElement.style.transitionDuration = originalStyles.transitionDuration;
              dialogElement.style.transitionTimingFunction = originalStyles.transitionTimingFunction;
            };

            dialogElement.addEventListener('transitionend', resetDialogPosition);
            dialogElement.style.transform = 'translateY(0%)';
          }
          endEvent.stopPropagation();
        };

        dialogElement.addEventListener('touchmove', handleTouchMove);
        dialogElement.addEventListener('touchend', handleTouchEnd);
      }
    };

    // const onTouchStart = (a) => {
    //   let b = dialogRef.current;
    //   if (b !== null) {
    //     let c = !0;
    //     let d = (a = a.touches) === null ? undefined : a[0].pageY;
    //     let e = parseInt(b.style.height !== '' ? b.style.height : b.clientHeight, 10);
    //     let f = 0;
    //     let g = {
    //       transform: b.style.transform,
    //       transitionDuration: b.style.transitionDuration,
    //       transitionTimingFunction: b.style.transitionTimingFunction,
    //     };
    //     a = function (a) {
    //       if (c) {
    //         let e;
    //         e = d - ((e = a.touches) === null ? void 0 : e[0].pageY);
    //         e < 0 && ((f = e), b !== null && (b.style.transform = 'translateY(' + -1 * e + 'px)'));
    //       }
    //       a.stopPropagation();
    //     };
    //     let h = function (a) {
    //       c = !1;
    //       if (b !== null) {
    //         b.style.transitionTimingFunction = 'ease-out';
    //         b.style.transitionDuration = '0.2s';
    //         if (e + f < e / 2) {
    //           // eslint-disable-next-line no-var, no-inner-declarations, func-name-matching
    //           var d = function a() {
    //             // eslint-disable-next-line no-sequences, no-undef
    //             b.removeEventListener('transitionend', a), (b.style.display = 'none'), onCloseRef.current();
    //           };
    //           b.addEventListener('transitionend', d);
    //           b.style.transform = 'translateY(100%)';
    //         } else {
    //           // eslint-disable-next-line func-name-matching
    //           d = function a() {
    //             b.removeEventListener('transitionend', a),
    //               (b.style.transform = g.transform),
    //               (b.style.transitionDuration = g.transitionDuration),
    //               (b.style.transitionTimingFunction = g.transitionTimingFunction);
    //           };
    //           b.addEventListener('transitionend', d);
    //           b.style.transform = 'translateY(0%)';
    //         }
    //       }
    //       a.stopPropagation();
    //     };
    //     b.addEventListener('touchmove', a);
    //     b.addEventListener('touchend', h);
    //   }
    // };

    const mergedRef = useMergeRefs(dialogRef, ref);

    const dialogContent = jsx(BaseThemeProvider, {
      config: themeConfig,
      children: (themeClass, themeStyle) => {
        return jsx('div', {
          className: stylex([
            themeClass,
            styles.root,
            withDeprecatedStyles && styles.rootWithDeprecatedStyles,
            rootXStyle,
          ]),
          onAnimationEnd: onAnimationEnd,
          ref: containerRef,
          style: themeStyle,
          children: jsx('div', {
            className: stylex(styles.anchor, anchorXStyle),
            onTouchStart: enableBottomSheetBehavior ? handleTouchStart : undefined,
            children: jsx(BaseView, {
              ...rest,
              'aria-label': al ?? undefined,
              ref: mergedRef,
              role: 'dialog',
              testid: undefined,
              xstyle: [styles.dialog, enableBottomSheetBehavior && styles.dialogBottomSheet, xstyle],
              children,
            }),
          }),
        });
      },
    });

    return disableClosingWithEscape
      ? dialogContent
      : jsx(CometHideLayerOnEscape, {
          onHide: onClose,
          children: dialogContent,
        });
  },
);
