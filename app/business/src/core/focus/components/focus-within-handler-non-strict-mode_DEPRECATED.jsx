import { unstable_Scope as UnstableScope, useMemo, useRef, useState } from 'react';
import { jsx } from 'react/jsx-runtime';
import { ReactFocusEvent } from '@meta-ui/core/event-interaction';

/**
 *
 * @param {import("./types").FocusWithinHandlerNonStrictModeReactProps} param0
 */
export function FocusWithinHandlerNonStrictMode_DEPRECATED({
  children,
  onBlurWithin,
  onFocusChange,
  onFocusVisibleChange,
  onFocusWithin,
  testOnly,
}) {
  const ref = useRef(null);

  // let temp
  // const [isFocus, setFocus] = useState(
  //   (temp = testOnly && testOnly.focus) != null ? temp : false,
  // )
  // const [isFocusVisible, setFocusVisible] = useState(
  //   (temp = testOnly && testOnly.focusVisible) != null ? temp : false,
  // )

  const [isFocus, setFocus] = useState(testOnly && testOnly.focus ? testOnly.focus : false);

  const [isFocusVisible, setFocusVisible] = useState(testOnly && testOnly.focusVisible ? testOnly.focusVisible : false);

  const focusWithinNonStrictModeRef = ReactFocusEvent.useFocusWithin(
    ref,
    useMemo(() => {
      return {
        onFocusWithin: (ev) => {
          if (onFocusWithin && !isFocus) {
            onFocusWithin(ev);
          }
        },
        onBlurWithin: (ev) => {
          if (onBlurWithin && isFocus) {
            onBlurWithin(ev);
          }
        },
        onFocusWithinChange: onFocusChange
          ? (ev) => {
              setFocus(ev);
              onFocusChange(ev);
            }
          : setFocus,
        onFocusWithinVisibleChange: onFocusVisibleChange
          ? (ev) => {
              setFocusVisible(ev);
              onFocusVisibleChange(ev);
            }
          : setFocusVisible,
      };
    }, [isFocus, onBlurWithin, onFocusChange, onFocusVisibleChange, onFocusWithin]),
  );

  // return (
  //   <UnstableScope ref={focusWithinNonStrictModeRef}>
  //     {typeof children === "function"
  //       ? children(isFocus, isFocusVisible)
  //       : children}
  //   </UnstableScope>
  // );

  return jsx(UnstableScope, {
    children: typeof children === 'function' ? children(isFocus, isFocusVisible) : children,
    ref: focusWithinNonStrictModeRef,
  });
}
