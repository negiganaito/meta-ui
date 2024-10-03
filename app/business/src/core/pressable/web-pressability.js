import { ReactContextMenuEvent } from '@meta-core/event-interaction/react-context-menu-event';
import { ReactFocusEvent } from '@meta-core/event-interaction/react-focus-event';
import { ReactHoverEvent } from '@meta-core/event-interaction/react-hover-event';
import { ReactPressEvent } from '@meta-core/event-interaction/react-press-event';

function usePressability(targetRef, options) {
  const {
    disabled,
    onBlur,
    onContextMenu,
    onFocus,
    onFocusChange,
    onFocusVisibleChange,
    onHoverChange,
    onHoverEnd,
    onHoverMove,
    onHoverStart,
    onPressChange,
    onPressEnd,
    onPressMove,
    onPressStart,
    preventContextMenu,
  } = options;

  ReactHoverEvent.useHover(targetRef, {
    disabled,
    onHoverChange,
    onHoverEnd,
    onHoverMove,
    onHoverStart,
  });

  // ReactHoverEvent_Legacy.useHover(targetRef, {
  //   disabled,
  //   onHoverChange,
  //   onHoverEnd,
  //   onHoverMove,
  //   onHoverStart,
  // });

  ReactPressEvent.usePress(targetRef, {
    disabled,
    onPressChange,
    onPressEnd,
    onPressMove,
    onPressStart,
  });

  ReactFocusEvent.useFocus(targetRef, {
    disabled,
    onBlur,
    onFocus,
    onFocusChange,
    onFocusVisibleChange,
  });

  ReactContextMenuEvent.useContextMenu(targetRef, {
    disabled,
    onContextMenu,
    preventDefault: preventContextMenu || false,
  });
}

export const WebPressability = {
  usePressability,
};
