import React, { forwardRef, useCallback, useRef, useState } from 'react';
import Loadable from 'react-loadable';
import { FDSTextContext } from '@meta-core/contexts/fds-text-context';
import { CometPlaceholder } from '@meta-core/placeholder/comet-placeholder';
import { useMergeRefs } from '@meta-core/react-utils/use-merge-refs';
import { CometTextTypography } from '@meta-core/styles/comet-text-typography';
import { cssUserAgentSupports } from '@meta-core/utils/css-useragent-supports';
import stylex from '@stylexjs/stylex';

const CometToolTip = Loadable({
  loader: () => import('@fb-tooltip/index').then((r) => r.CometTooltip),
  loading: () => null,
});

const e = {
  useTranslationKeyForTextParent: function () {},
};

const { useTranslationKeyForTextParent } = e;

const notSupportWebkitLineClamp = cssUserAgentSupports.webkitLineClamp();

function calculateLineHeight(type) {
  return type && type in CometTextTypography ? CometTextTypography[type].lineHeight : 16;
}

/**
 * @type React.ForwardRefRenderFunction<React.FunctionComponent, import("./types").CometLineClampProps>
 */
export const CometLineClamp = forwardRef((props, externalRef) => {
  const {
    id,
    children,
    lines = 1,
    useAutomaticTextDirection = false,
    // eslint-disable-next-line no-unused-vars
    testid,
    xstyle,
    truncationTooltip,
  } = props;

  const cometTextContextValue = FDSTextContext.useFDSTextContext();

  const [isOverflowing, setOverflowing] = useState(false);

  const translationKeyComp = useTranslationKeyForTextParent();

  const ref = useRef(null);

  let internalStyle;
  let childrenClone = children;

  if (lines > 1) {
    if (notSupportWebkitLineClamp) {
      internalStyle = {
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: lines,
        display: '-webkit-box',
      };
    } else {
      const lineHeight = calculateLineHeight(!cometTextContextValue ? undefined : cometTextContextValue.type);
      internalStyle = { maxHeight: lineHeight * lines + 0.1 };

      const calculateSize = {
        maxHeight: 'calc((100% - ' + lineHeight * lines + 'px) * 999)',
        top: lineHeight * (lines - 1),
      };

      childrenClone = (
        <>
          {childrenClone}
          <span
            aria-hidden={true}
            children={'\u2026'}
            className={stylex(styles.supportLineHeight)}
            style={calculateSize}
          />
        </>
      );
    }
  }

  const onMouseEneterWithTooltip = () => {
    const curr = ref.current;
    if (!curr || lines < 1) {
      return;
    }
    setOverflowing(curr.offsetWidth < curr.scrollWidth || curr.offsetHeight < curr.scrollHeight);
  };

  const fallback = useCallback(
    (a) => {
      if (!a || !truncationTooltip) {
        return;
      }
      // n.preload()
      CometToolTip.preload();
    },
    [truncationTooltip],
  );

  const mergedRef = useMergeRefs(externalRef, ref);

  const LineComp = (
    <span
      className={stylex(styles.root, lines === 1 && styles.oneLine, xstyle)}
      data-testid={undefined}
      dir={useAutomaticTextDirection ? 'auto' : undefined}
      id={id}
      onMouseEnter={truncationTooltip ? onMouseEneterWithTooltip : undefined}
      ref={mergedRef}
      style={internalStyle}
      key={translationKeyComp}
    >
      {childrenClone}
    </span>
  );

  return isOverflowing ? (
    <CometPlaceholder fallback={fallback}>
      <CometToolTip tooltip={truncationTooltip}>{LineComp}</CometToolTip>
    </CometPlaceholder>
  ) : (
    LineComp
  );
});

const styles = stylex.create({
  ellisis: {
    overflowX: 'hidden',
    overflowY: 'hidden',
    position: 'absolute',
  },

  oneLine: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  root: {
    display: 'block',
    overflowX: 'hidden',
    overflowY: 'hidden',
    position: 'relative',
  },

  supportLineHeight: {
    overflowX: 'hidden',
    overflowY: 'hidden',
    position: 'absolute',
    right: 0,
  },
});
