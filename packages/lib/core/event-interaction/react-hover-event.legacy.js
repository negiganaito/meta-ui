import { useEffect, useRef } from 'react';
import { ReactEventHookPropagation } from '@meta-core/react-utils';

import { ReactEventHelpers } from './utils/react-event-helpers';
import { ReactUseEvent } from './react-use-event';

const hoverOptions = {
  passive: true,
};

function createCustomEventObject(name, param, target) {
  return {
    clientX: param.clientX,
    clientY: param.clientY,
    pageX: param.pageX,
    pageY: param.pageY,
    screenX: param.screenX,
    screenY: param.screenY,
    target: target,
    timeStamp: param.timeStamp,
    type: name,
    x: param.clientX,
    y: param.clientY,
  };
}

function isAncestorOrSelfWithHover(a, b) {
  // eslint-disable-next-line no-self-assign
  b = b;
  while (b !== null) {
    if (b === a) return true;
    if (b._hoverEventTarget) return false;
    b = b.parentNode;
  }
  return false;
}

const useHover = (target, options) => {
  const { disabled, onHoverStart, onHoverMove, onHoverEnd, onHoverChange } = options;

  const touchstartHandler = ReactUseEvent('touchstart', hoverOptions);
  const mouseoverHandler = ReactUseEvent('mouseover', hoverOptions);
  const mouseoutHandler = ReactUseEvent('mouseout', hoverOptions);
  const mousemoveHandler = ReactUseEvent('mousemove', hoverOptions);
  const pointeroverHandler = ReactUseEvent('pointerover', hoverOptions);
  const pointeroutHandler = ReactUseEvent('pointerout', hoverOptions);
  const pointermoveHandler = ReactUseEvent('pointermove', hoverOptions);
  const pointercancelHandler = ReactUseEvent('pointercancel', hoverOptions);
  const hoverTouchRef = useRef({
    isHovered: false,
    isTouched: false,
  });

  useEffect(() => {
    let targetCurr = target.current;
    let hoverTouchRefCurr = hoverTouchRef.current;

    console.log({ targetCurr, hoverTouchRefCurr });

    if (targetCurr !== null && hoverTouchRefCurr !== null) {
      targetCurr._hoverEventTarget = true;

      const k = function (param) {
        hoverTouchRefCurr.isHovered &&
          !isAncestorOrSelfWithHover(targetCurr, param.relatedTarget) &&
          ((hoverTouchRefCurr.isHovered = false),
          onHoverEnd && onHoverEnd(createCustomEventObject('hoverend', param, targetCurr)),
          onHoverChange && onHoverChange(false),
          y(param));
      };

      const x = function (param) {
        hoverTouchRefCurr.isTouched = false;
        if (disabled === true) {
          y(param);
          return;
        }
        hoverTouchRefCurr.isHovered &&
          onHoverMove &&
          onHoverMove(createCustomEventObject('hovermove', param, targetCurr));
      };

      const y = function (param) {
        hoverTouchRefCurr.isTouched = false;

        ReactEventHelpers.hasPointerEvents
          ? (pointermoveHandler.setListener(document, null),
            pointercancelHandler.setListener(document, null),
            pointeroutHandler.setListener(document, null))
          : mouseoutHandler.setListener(document, null);
        k(param);
      };

      const i = function (event) {
        if (disabled === !0) {
          y(event);
          return;
        }
        if (ReactEventHookPropagation.hasEventHookPropagationStopped(event, 'useHover')) {
          return;
        }
        ReactEventHookPropagation.stopEventHookPropagation(event, 'useHover');

        if (!hoverTouchRefCurr.isHovered && !isAncestorOrSelfWithHover(targetCurr, event.relatedTarget)) {
          hoverTouchRefCurr.isHovered = true;
          if (onHoverStart) {
            onHoverStart(createCustomEventObject('hoverstart', event, targetCurr));
          }
          if (onHoverChange) {
            onHoverChange(!0);
          }

          if (ReactEventHelpers.hasPointerEvents) {
            pointermoveHandler.setListener(document, x);
            pointercancelHandler.setListener(document, y);
            pointeroutHandler.setListener(document, k);
          } else {
            mouseoutHandler.setListener(document, k);
          }
        }

        ReactEventHelpers.hasPointerEvents
          ? pointeroverHandler.setListener(targetCurr, (event) => {
              event.pointerType !== 'touch' && i(event);
            })
          : (mouseoverHandler.setListener(targetCurr, (event) => {
              hoverTouchRefCurr.isTouched || i(event);
            }),
            touchstartHandler.setListener(targetCurr, () => {
              hoverTouchRefCurr.isTouched = !0;
            }),
            mousemoveHandler.setListener(document, x));
        hoverTouchRefCurr.isHovered &&
          (ReactEventHelpers.hasPointerEvents
            ? (pointermoveHandler.setListener(document, x),
              pointercancelHandler.setListener(document, y),
              pointeroutHandler.setListener(document, k))
            : mouseoutHandler.setListener(document, k));
      };

      /**
      
      d('ReactEventHelpers').hasPointerEvents
              ? pointeroverHandler.setListener(targetCurr, function (a) {
                  a.pointerType !== 'touch' && i(a)
                })
              : (mouseoverHandler.setListener(targetCurr, function (a) {
                  hoverTouchRefCurr.isTouched || i(a)
                }),
                touchstartHandler.setListener(targetCurr, function () {
                  hoverTouchRefCurr.isTouched = !0
                }),
                mousemoveHandler.setListener(doc, x))
            hoverTouchRefCurr.isHovered &&
              (d('ReactEventHelpers').hasPointerEvents
                ? (pointermoveHandler.setListener(doc, x),
                  pointercancelHandler.setListener(doc, y),
                  pointeroutHandler.setListener(doc, k))
                : mouseoutHandler.setListener(doc, k))

       */

      if (ReactEventHelpers.hasPointerEvents) {
        pointeroverHandler.setListener(targetCurr, (a) => {
          if (a.pointerType !== 'touch') {
            i(a);
          }
        });
      } else {
        mouseoverHandler.setListener(targetCurr, (a) => {
          hoverTouchRefCurr.isTouched || i(a);
        });
        touchstartHandler.setListener(targetCurr, () => {
          hoverTouchRefCurr.isTouched = true;
        });
        mousemoveHandler.setListener(document, x);
      }

      if (hoverTouchRefCurr.isHovered) {
        if (ReactEventHelpers.hasPointerEvents) {
          pointermoveHandler.setListener(document, x);
          pointercancelHandler.setListener(document, y);
          pointeroutHandler.setListener(document, k);
        } else {
          mouseoutHandler.setListener(document, k);
        }
      }
    }
  }, [
    disabled,
    onHoverChange,
    onHoverEnd,
    onHoverMove,
    onHoverStart,
    pointercancelHandler,
    pointermoveHandler,
    pointeroutHandler,
    pointeroverHandler,
    mousemoveHandler,
    mouseoutHandler,
    mouseoverHandler,
    target,
    touchstartHandler,
  ]);
};

export const ReactHoverEvent_Legacy = {
  useHover,
};
