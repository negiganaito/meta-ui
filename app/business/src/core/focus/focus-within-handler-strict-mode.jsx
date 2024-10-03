import { unstable_Scope as UnstableScope, useInsertionEffect, useMemo, useRef, useState } from 'react';
import { ReactFocusEvent } from '@meta-core/event-interaction/react-focus-event';

/**
 *
 * @param {import("./types").FocusWithinHandlerStrictModeProps} props
 */
export function FocusWithinHandlerStrictMode({
  onBlurWithin,
  onFocusChange,
  onFocusVisibleChange,
  onFocusWithin,
  children,
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

  const [isFocus, setFocus] = useState(testOnly?.focus ?? false);
  const [isFocusVisible, setFocusVisible] = useState(testOnly?.focusVisible ?? false);

  const focusWithinStrictMode = ReactFocusEvent.useFocusWithinStrictMode(
    useMemo(() => {
      return {
        onBlurWithin: (e) => {
          if (onBlurWithin && isFocus) {
            onBlurWithin(e);
          }
        },
        onFocusWithin: (e) => {
          if (onFocusWithin && !isFocus) {
            onFocusWithin(e);
          }
        },
        onFocusWithinChange: onFocusChange
          ? (e) => {
              setFocus(e);
              onFocusChange(e);
            }
          : setFocus,
        onFocusWithinVisibleChange: onFocusVisibleChange
          ? (e) => {
              setFocusVisible(e);
              onFocusVisibleChange(e);
            }
          : setFocusVisible,
      };
    }, [isFocus, onBlurWithin, onFocusChange, onFocusVisibleChange, onFocusWithin]),
  );

  useInsertionEffect(() => {
    focusWithinStrictMode(ref.current);
    return () => {
      focusWithinStrictMode(null);
    };
  }, [ref, focusWithinStrictMode]);

  return (
    <UnstableScope ref={ref}>
      {typeof children === 'function' ? children(isFocus, isFocusVisible) : children}
    </UnstableScope>
  );

  // return jsx(unstable_Scope, {
  //   children:
  //     typeof children === "function"
  //       ? children(isFocus, isFocusVisible)
  //       : children,
  //   ref,
  // });
}
