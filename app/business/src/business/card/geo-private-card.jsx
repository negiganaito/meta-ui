import { useCallback, useContext, useImperativeHandle, useMemo, useRef } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import { GeoCardHeaderLabelContext } from '@meta-business/contexts/geo-card-header-label-context';
import { GeoPrivateBaseCardLoadingStateContext } from '@meta-business/contexts/geo-private-base-card-loading-state-context';
import { GeoPrivateCardLayerContext } from '@meta-business/contexts/geo-private-card-layer-context';
import { GeoPrivateCardLayoutContext } from '@meta-business/contexts/geo-private-card-layout-context';
import { GeoPrivateCardLevelContext } from '@meta-business/contexts/geo-private-card-level-context';
import { GeoPrivateCardSectionContext } from '@meta-business/contexts/geo-private-card-section-context';
import { GeoPrivateSectionStyleContext } from '@meta-business/contexts/geo-private-section-style-context';
import { useGeoPrivateCardStyle } from '@meta-business/styles/use-geo-private-card-style';
import { useGeoPrivateIsNextTheme } from '@meta-business/theme/use-geo-private-is-next-theme';
import { useGeoTheme } from '@meta-business/theme/use-geo-theme';
import { GeoDomID } from '@meta-business/utils/geo-dom-id';
import { BaseScrollableAreaContext } from '@meta-core/contexts/base-scrollable-area-context';
import { useBoolean } from '@meta-core/hooks/use-boolean';
import { useUniqueID } from '@meta-core/hooks/use-unique-id';
import { useVisibility } from '@meta-core/hooks/use-visibility';
import { useMergeRefs } from '@meta-core/react-utils/use-merge-refs';
import stylex from '@stylexjs/stylex';

import { GeoPrivateCardShadow } from './geo-private-card-shadow';

export const GeoPrivateCard = ({
  children,
  containerRef,
  'data-testid': dt,
  footer,
  header,
  height,
  imperativeRef,
  isOverflowHintVisible = false,
  isOverflowXAuto = true,
  isOverflowYAuto = true,
  label,
  labelledBy,
  role,
  xstyle,
}) => {
  const geoPrivateCardLayerContextValue = useContext(GeoPrivateCardLayerContext);
  const geoPrivateCardLevelContextValue = useContext(GeoPrivateCardLevelContext) ?? 1;
  const uniqueId = useUniqueID();
  const _id = useContext(GeoCardHeaderLabelContext) ?? uniqueId;
  const _label = labelledBy ? labelledBy : header ? _id : undefined;

  const isNextTheme = useGeoPrivateIsNextTheme();

  let geoPrivateBaseCardLoadingStateContextValue = useContext(GeoPrivateBaseCardLoadingStateContext);

  // eslint-disable-next-line no-unused-vars
  const { ref, id, ...restVal } = GeoDomID.useApplyGeoDomIDsDirectly({
    id: _id,
    'aria-labelledby': label ? void 0 : _label,
  });

  const combineRef = useMergeRefs(containerRef, ref);

  return jsx(GeoPrivateCardSectionContext.Provider, {
    value: true,
    children: jsx(GeoCardHeaderLabelContext.Provider, {
      value: _id,
      children: jsx('div', {
        ...restVal,
        className: stylex(
          useGeoPrivateCardStyle(
            {
              level: geoPrivateCardLayerContextValue ? 4 : geoPrivateCardLevelContextValue,
              isNext: isNextTheme,
            },
            styles.root,
            xstyle,
          ),
        ),
        'data-testid': undefined,
        ref: combineRef,
        role,
        style: {
          height,
        },
        children: jsxs('div', {
          className: stylex(styles.temp),
          children: [
            header,
            jsxs(GeoPrivateCardLayerContext.Provider, {
              value: false,
              children: [
                jsx(s, {
                  hasFooter: footer !== null,
                  hasHeader: header !== null,
                  imperativeRef,
                  isOverflowHidden: geoPrivateBaseCardLoadingStateContextValue,
                  isOverflowHintVisible,
                  isOverflowXAuto,
                  isOverflowYAuto,
                  children,
                }),
                footer,
              ],
            }),
          ],
        }),
      }),
    }),
  });
};

const gkx24838 = false;
const q = !gkx24838;

const s = ({
  children,
  hasFooter,
  hasHeader,
  imperativeRef,
  isOverflowHidden,
  isOverflowHintVisible,
  isOverflowXAuto,
  isOverflowYAuto,
}) => {
  const { value: boolValue1, setTrue: setTrue1, setFalse: setFalse1 } = useBoolean(true);
  const { value: boolValue2, setTrue: setTrue2, setFalse: setFalse2 } = useBoolean(true);

  const { selectBorderColor } = useGeoTheme();

  const B = selectBorderColor({
    color: 'element',
    isDisabled: !1,
  });

  const geoPrivateCardLayoutContextValue = useCallback(
    ({ isFirst, isLast }) => {
      let c = !isFirst && [styles.sectionBorderTop, B];
      return !q
        ? c
        : [hasHeader && isFirst && styles.removePaddingTop, hasFooter && isLast && styles.removePaddingBottom, c];
    },
    [B, hasFooter, hasHeader],
  );

  const C = useRef(null);
  const D = useRef(null);
  const E = useContext(BaseScrollableAreaContext);
  const F = useMemo(() => {
    return {
      getDOMNode: function () {
        return D.current;
      },
    };
  }, []);

  const baseScrollableAreaContextValue = useMemo(() => {
    return [].concat(E, [F]);
  }, [F, E]);

  const geoPrivateSectionStyleContextValue = useMemo(() => {
    return !gkx24838 ? null : [hasHeader && styles.sectionWithHeader, hasFooter && styles.sectionWithFooter];
  }, [hasFooter, hasHeader]);

  useImperativeHandle(
    imperativeRef,
    () => {
      return {
        scrollToTop: function () {
          D.current && (D.current.scrollTop = 0);
        },
        scrollToBottom: function () {
          D.current && (D.current.scrollTop = D.current.scrollHeight);
        },
        getScrollRef: function () {
          return D.current;
        },
      };
    },
    [],
  );

  return jsx(GeoPrivateCardLayoutContext.Provider, {
    value: geoPrivateCardLayoutContextValue,
    children: jsx(GeoPrivateSectionStyleContext.Provider, {
      value: geoPrivateSectionStyleContextValue,
      children: jsx(BaseScrollableAreaContext.Provider, {
        value: baseScrollableAreaContextValue,
        children: jsx('div', {
          className: stylex(styles.temp2),
          ref: C,
          children: [
            jsxs('div', {
              className: stylex(
                styles.content,
                !hasFooter && styles.removePaddingBottom,
                !isOverflowHidden && !isOverflowXAuto && styles.overflowXVisible,
                !isOverflowHidden && !isOverflowYAuto && styles.overflowYVisible,
                isOverflowHidden && styles.overflowHidden,
              ),
              ref: D,
              children: [
                jsx(t, {
                  containerRef: C,
                  onHidden: setFalse1,
                  onVisible: setTrue1,
                  xstyle: styles.triggerTop,
                }),
                children,
                jsx(t, {
                  containerRef: C,
                  onHidden: setFalse2,
                  onVisible: setTrue2,
                  xstyle: styles.triggerBottom,
                }),
              ],
            }),
            jsx(GeoPrivateCardShadow, {
              isVisible: (isOverflowHintVisible && hasHeader) || !boolValue1,
              position: 'top',
            }),
            jsx(GeoPrivateCardShadow, {
              isVisible: (isOverflowHintVisible && hasFooter) || !boolValue2,
              position: 'bottom',
            }),
          ],
        }),
      }),
    }),
  });
};

const t = ({ containerRef, onHidden, onVisible, xstyle }) => {
  const e = useVisibility({
    onVisible,
    onHidden,
    root: function () {
      return containerRef.current;
    },
  });

  return jsx('div', {
    className: stylex(styles.trigger, xstyle),
    ref: e[0],
  });
};

const styles = stylex.create({
  content: {
    overflowX: 'auto',
    overflowY: 'auto',
    paddingBottom: '8px',
    width: '100%',
  },
  overflowXVisible: {
    overflowX: 'visible',
  },
  overflowYVisible: {
    overflowY: 'visible',
  },
  overflowHidden: {
    overflowX: 'hidden',
    overflowY: 'hidden',
  },
  removePaddingTop: {
    paddingTop: '0',
  },
  removePaddingBottom: {
    paddingBottom: '0',
  },
  root: {
    height: '100%',
    width: '100%',
  },
  sectionBorderTop: {
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
  },
  trigger: {
    height: '1px',
    opacity: 0,
    pointerEvents: 'none',
    width: '100%',
  },
  triggerTop: {
    marginBottom: '-1px',
  },
  triggerBottom: {
    marginTop: '-1px',
  },
  sectionWithHeader: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':nth-child(2)': {
      paddingTop: '0',
    },
  },
  sectionWithFooter: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':nth-last-child(2)': {
      paddingBottom: '0',
    },
  },

  temp: {
    // x78zum5 xdt5ytf x5yr21d xedcshv x1t2pt76 xh8yej3
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    maxHeight: 'inherit',
    minHeight: 'inherit',
    width: '100%',
  },

  temp2: {
    // x9f619 x78zum5 x1iyjqo2 x5yr21d x2lwn1j x1n2onr6 xh8yej3
    boxSizing: 'border-box',
    display: 'flex',
    flexGrow: 1,
    height: '100%',
    minHeight: 0,
    position: 'relative',
    width: '100%',
  },
});
