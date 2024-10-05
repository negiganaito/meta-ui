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

export const BaseDialog = forwardRef(
  (
    {
      anchorXStyle,
      'arial-label': al,
      children,
      disableClosingWithEscape = false,
      disableClosingWithMask = false,
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
            children: jsx(BaseView, {
              ...rest,
              'aria-label': al ?? undefined,
              ref: mergedRef,
              role: 'dialog',
              testid: undefined,
              xstyle: [styles.dialog, xstyle],
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
