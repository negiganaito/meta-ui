import { useEffect, useRef } from 'react';
import { ReactEventHookPropagation } from '@meta-core/react-utils';

import { ReactEventHelpers } from './utils/react-event-helpers';
import { ReactUseEvent } from './react-use-event';

const hoverOptions = {
  passive: true,
};

/**
 *
 * @param {string} name
 * @param {any} param
 * @param {any} target
 */
function createCustomEventObject(name, param, target) {
  return {
    clientX: param.clientX,
    clientY: param.clientY,
    pageX: param.pageX,
    pageY: param.pageY,
    screenX: param.screenX,
    screenY: param.screenY,
    target,
    timeStamp: param.timeStamp,
    type: name,
    x: param.clientX,
    y: param.clientY,
  };
}

function isAncestorOrSelfWithHover(childRef, parentRef) {
  while (parentRef) {
    if (parentRef === childRef) {
      return true;
    }
    if (parentRef._hoverEventTarget) {
      return false;
    }
    parentRef = parentRef.parentNode;
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
    const targetElement = target.current;
    const hoverTouchRefCurrent = hoverTouchRef.current;

    if (targetElement && hoverTouchRefCurrent) {
      targetElement._hoverEventTarget = true;

      const handleMouseOut = function (param) {
        hoverTouchRefCurrent.isHovered &&
          !isAncestorOrSelfWithHover(targetElement, param.relatedTarget) &&
          ((hoverTouchRefCurrent.isHovered = false),
          onHoverEnd && onHoverEnd(createCustomEventObject('hoverend', param, targetElement)),
          onHoverChange && onHoverChange(false),
          cleanup(param));
      };

      const handleMouseMove = function (param) {
        hoverTouchRefCurrent.isTouched = false;
        if (disabled === true) {
          cleanup(param);
          return;
        }
        hoverTouchRefCurrent.isHovered &&
          onHoverMove &&
          onHoverMove(createCustomEventObject('hovermove', param, targetElement));
      };

      const cleanup = function (param) {
        hoverTouchRefCurrent.isTouched = false;

        ReactEventHelpers.hasPointerEvents
          ? (pointermoveHandler.setListener(document, null),
            pointercancelHandler.setListener(document, null),
            pointeroutHandler.setListener(document, null))
          : mouseoutHandler.setListener(document, null);

        handleMouseOut(param);
      };

      const handleMouseOver = function (event) {
        if (disabled === true) {
          cleanup(event);
          return;
        }
        if (ReactEventHookPropagation.hasEventHookPropagationStopped(event, 'useHover')) {
          return;
        }
        ReactEventHookPropagation.stopEventHookPropagation(event, 'useHover');

        if (!hoverTouchRefCurrent.isHovered && !isAncestorOrSelfWithHover(targetElement, event.relatedTarget)) {
          hoverTouchRefCurrent.isHovered = true;
          if (onHoverStart) {
            onHoverStart(createCustomEventObject('hoverstart', event, targetElement));
          }
          if (onHoverChange) {
            onHoverChange(true);
          }

          if (ReactEventHelpers.hasPointerEvents) {
            pointermoveHandler.setListener(document, handleMouseMove);
            pointercancelHandler.setListener(document, cleanup);
            pointeroutHandler.setListener(document, handleMouseOut);
          } else {
            mouseoutHandler.setListener(document, handleMouseOut);
          }
        }

        ReactEventHelpers.hasPointerEvents
          ? pointeroverHandler.setListener(targetElement, (event) => {
              event.pointerType !== 'touch' && handleMouseOver(event);
            })
          : (mouseoverHandler.setListener(targetElement, (event) => {
              hoverTouchRefCurrent.isTouched || handleMouseOver(event);
            }),
            touchstartHandler.setListener(targetElement, () => {
              hoverTouchRefCurrent.isTouched = true;
            }),
            mousemoveHandler.setListener(document, handleMouseMove));
        hoverTouchRefCurrent.isHovered &&
          (ReactEventHelpers.hasPointerEvents
            ? (pointermoveHandler.setListener(document, handleMouseMove),
              pointercancelHandler.setListener(document, cleanup),
              pointeroutHandler.setListener(document, handleMouseOut))
            : mouseoutHandler.setListener(document, handleMouseOut));
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
        pointeroverHandler.setListener(targetElement, (event) => {
          if (event.pointerType !== 'touch') {
            handleMouseOver(event);
          }
        });
      } else {
        mouseoverHandler.setListener(targetElement, (event) => {
          hoverTouchRefCurrent.isTouched || handleMouseOver(event);
        });
        touchstartHandler.setListener(targetElement, () => {
          hoverTouchRefCurrent.isTouched = true;
        });
        mousemoveHandler.setListener(document, handleMouseMove);
      }

      if (hoverTouchRefCurrent.isHovered) {
        if (ReactEventHelpers.hasPointerEvents) {
          pointermoveHandler.setListener(document, handleMouseMove);
          pointercancelHandler.setListener(document, cleanup);
          pointeroutHandler.setListener(document, handleMouseOut);
        } else {
          mouseoutHandler.setListener(document, handleMouseOut);
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

export const ReactHoverEvent = {
  useHover,
};
