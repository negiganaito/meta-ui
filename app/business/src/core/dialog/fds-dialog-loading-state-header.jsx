import React from 'react';
import { html } from 'react-strict-dom';
import { FDSCircleButton } from '@meta-core/button/FDS-circle-button';
import { BaseDivider } from '@meta-core/unknown/base-divider';
import stylex from '@stylexjs/stylex';

import { BaseDialogLabelIDProvider } from './base-dialog-label-id-provider';

const styles = stylex.create({
  headerContainer: {
    width: '100%',
  },

  headerRow: {
    alignItems: 'center',
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'flex-end',
    marginLeft: '16px',
    // marginLeft: null,
    // marginRight: null,
    marginRight: '16px',
    minHeight: '60px',
  },
});

export const FDSDialogLoadingStateHeader = ({ onClose, withcloseButton = true }) => {
  const headerID = BaseDialogLabelIDProvider.useDialogHeaderID();

  return (
    <html.div style={styles.headerContainer}>
      <html.div id={headerID} style={styles.headerRow}>
        {withcloseButton ? (
          <FDSCircleButton
            icon={FBNucleusCrossFilled24Svg}
            label="Close"
            onPress={onClose}
            size={36}
            testid={undefined}
          />
        ) : undefined}
      </html.div>
      <BaseDivider />
    </html.div>
  );
};
