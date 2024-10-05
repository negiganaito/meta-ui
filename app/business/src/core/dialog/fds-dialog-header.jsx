/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from 'react';
import { html } from 'react-strict-dom';
import { FDSCircleButton } from '@meta-core/button/FDS-circle-button';
import { FDSText } from '@meta-core/text/fds-text';
import stylex from '@stylexjs/stylex';
import emptyFunction from 'fbjs/lib/emptyFunction';
import Locale from 'fbjs/lib/Locale';

import { BaseDialogLabelIDProvider } from './base-dialog-label-id-provider';
import { FDSDialogHeaderContainer } from './fds-dialog-header-container';

const styles = stylex.create({
  headerItem: {
    marginLeft: '16px',
    marginRight: '16px',
  },
  headerPlaceholder: {
    height: '36px',
    width: '36px',
  },
});

const isRTL = Locale.isRTL();

/**
 * FDSDialogHeader component.
 *
 * @param {FDSDialogHeaderProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered component.
 *
 * @typedef {import('./types').FDSDialogHeaderProps} FDSDialogHeaderProps
 */
export const FDSDialogHeader = ({
  backTestID = 'back-button',
  closeTestID = 'close-button',
  disabled = false,
  onBack = emptyFunction,
  onClose = emptyFunction,
  showTruncationTooltip = false,
  text,
  withBackButton = false,
  withCloseButton = true,
  withoutDivider = false,
}) => {
  let headerID = BaseDialogLabelIDProvider.useDialogHeaderID();

  return (
    <FDSDialogHeaderContainer withDivider={!withoutDivider}>
      {withBackButton ? (
        <html.div style={styles.headerItem}>
          <FDSCircleButton
            disabled={disabled}
            icon={isRTL ? ArrowRightFilled24 : ArrowLeftFilled24}
            label="Back"
            onPress={onBack}
            size={36}
            testid={backTestID}
          />
        </html.div>
      ) : (
        <html.div style={[styles.headerItem, styles.headerPlaceholder]} />
      )}
      {text && (
        <FDSText
          align="center"
          id={headerID}
          isSemanticHeading={true}
          numberOfLines={1}
          truncationTooltip={showTruncationTooltip ? text : undefined}
          type="headlineEmphasized2"
        >
          {text}
        </FDSText>
      )}
      {withCloseButton ? (
        <html.div style={styles.headerItem}>
          <FDSCircleButton
            disabled={disabled}
            icon={CrossFilled24}
            label="Close"
            onPress={onClose}
            size={36}
            testid={closeTestID}
          />
        </html.div>
      ) : (
        <html.div style={[styles.headerPlaceholder, styles.headerItem]} />
      )}
    </FDSDialogHeaderContainer>
  );
};
