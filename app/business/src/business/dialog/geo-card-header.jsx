import { useContext } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import { GeoGenericCardHeader } from '@meta-business/card/geo-generic-card-header';
import { GeoCardHeaderLabelContext } from '@meta-business/contexts/geo-card-header-label-context';
import { GeoBaseSpacingLayout } from '@meta-business/layout/geo-base-spacing-layout';
import { GeoHStack } from '@meta-business/layout/geo-h-stack';
import { geoOffset } from '@meta-business/styles/geo-offset';
import { GeoTextPairing } from '@meta-business/text/geo-text-pairing';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  headerText: {
    flexGrow: 1,
    minWidth: 0,
  },
  endContent: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    minHeight: '36px',
  },
});

export const GeoCardHeader = ({ action, description, forwardedRef, heading, onBack }) => {
  const headingId = useContext(GeoCardHeaderLabelContext);

  const text = jsx(GeoTextPairing, {
    description,
    heading,
    headingId,
    overflowWrap: 'break-word',
    size: 'header3',
    xstyle: styles.headerText,
  });

  return jsx(GeoGenericCardHeader, {
    forwardedRef,
    onBack,
    children: !action
      ? text
      : jsxs(GeoBaseSpacingLayout, {
          align: 'start',
          children: [
            text,
            jsx(GeoHStack, {
              shrink: 0,
              xstyle: [styles.endContent, geoOffset.cardAction],
              children: action,
            }),
          ],
        }),
  });
};
