import React, { useContext } from 'react';
import { GeoPrivateBottomSheetContext } from '@meta-business/contexts/geo-private-bottom-sheet-context';
import stylex from '@stylexjs/stylex';

import { GeoPrivateCard } from './geo-private-card';

const styles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '90vh',
  },
  bottomSheetCard: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    maxHeight: 'initial',
  },
});

export const GeoModalCard = ({ children, containerRef, xstyle, ...rest }) => {
  const bottomSheetContextValue = useContext(GeoPrivateBottomSheetContext);

  return (
    <GeoPrivateCard
      {...rest}
      containerRef={containerRef}
      xstyle={[styles.root, bottomSheetContextValue && styles.bottomSheetCard, xstyle]}
    >
      <GeoPrivateBottomSheetContext.Provider value={false}>{children}</GeoPrivateBottomSheetContext.Provider>
    </GeoPrivateCard>
  );
};
