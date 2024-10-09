import { useLayoutEffect, useRef, useState } from 'react';

/**
 * @typedef TooltipDelayedContent
 * @property {number} delayContentMs
 * @property {boolean} isVisible
 */

/**
 *
 * @param {TooltipDelayedContent} props
 * @returns
 */
export function useTooltipDelayedContent(props) {
  const { delayContentMs, isVisible } = props;

  const visibleRef = useRef(isVisible);
  const f = useRef(null);

  const [isPending, setPending] = useState(() => {
    return isVisible === true && visibleRef.current === false && delayContentMs > 0;
  });

  useLayoutEffect(() => {
    if (isVisible === true && visibleRef.current === false && delayContentMs > 0) {
      setPending(true);
      f.current = setTimeout(() => {
        setPending(false);
        f.current = null;
      }, delayContentMs);
      return function () {
        clearTimeout(f.current);
        f.current = null;
      };
    } else f.current && (setPending(!1), clearTimeout(f.current), (f.current = null));

    visibleRef.current = isVisible;
  }, [delayContentMs, isVisible, visibleRef]);
  return {
    isPending: isPending,
  };
}
