import React from 'react';
import { html } from 'react-strict-dom';
import { FDSCircleButton } from '@meta-core/button/FDS-circle-button';
import { useMatchViewport } from '@meta-core/hooks/use-match-viewport';
import { FDSText } from '@meta-core/text/fds-text';
import { FBNucleusArrowLeftFilled24 } from '@meta-icons/fb-nucleus-arrow-left-filled-24';
import { FBNucleusArrowRightFilled24 } from '@meta-icons/fb-nucleus-arrow-right-filled-24';
import { FBNucleusCrossFilled24 } from '@meta-icons/fb-nucleus-cross-filled-24';
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
  headerTextItem: {
    display: 'flex',
    minWidth: 0,
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

  const match = useMatchViewport('max', 'width', 375);

  return (
    <FDSDialogHeaderContainer withDivider={!withoutDivider}>
      {withBackButton ? (
        <html.div style={styles.headerItem}>
          <FDSCircleButton
            disabled={disabled}
            icon={isRTL ? FBNucleusArrowRightFilled24 : FBNucleusArrowLeftFilled24}
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
        <html.div style={styles.headerTextItem}>
          <FDSText
            align="center"
            id={headerID}
            isSemanticHeading={true}
            numberOfLines={1}
            truncationTooltip={showTruncationTooltip ? text : undefined}
            type={match ? 'headlineEmphasized3' : 'headlineEmphasized2'} // "headlineEmphasized2"
          >
            {text}
          </FDSText>
        </html.div>
      )}
      {withCloseButton ? (
        <html.div style={styles.headerItem}>
          <FDSCircleButton
            disabled={disabled}
            icon={FBNucleusCrossFilled24}
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
