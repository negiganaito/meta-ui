import React, { forwardRef, useContext, useMemo } from 'react';
import { FDSDialogLoadingStateContext } from '@meta-core/contexts/fds-dialog-loading-state-context';
import { BaseMultiPageView } from '@meta-core/view/base-multi-page-view';
import stylex from '@stylexjs/stylex';
import emptyFunction from 'fbjs/lib/emptyFunction';

import { BaseDialog } from './base-dialog';
import { BaseDialogLabelIDProvider } from './base-dialog-label-id-provider';
import { FDSDialogPageLoadingState } from './fds-dialog-page-loading-state';

const styles = stylex.create({
  anchor: {
    alignItems: 'stretch',
    maxHeight: '100vh',
    paddingLeft: '4px',
    paddingRight: '4px',
    paddingTop: {
      default: 'var(--dialog-anchor-vertical-padding)',
      '@supports (padding: env(safe-area-inset-bottom, 0))':
        'calc(var(--dialog-anchor-vertical-padding) + env(safe-area-inset-top,0))',
    },
    paddingBottom: {
      default: 'var(--dialog-anchor-vertical-padding)',
      '@supports (padding: env(safe-area-inset-bottom, 0))':
        'calc(var(--dialog-anchor-vertical-padding) + env(safe-area-inset-bottom,0))',
    },
  },

  card: {
    backgroundColor: 'var(--card-background)',
    borderTopLeftRadius: 'var(--dialog-corner-radius)',
    borderTopRightRadius: 'var(--dialog-corner-radius)',
    borderBottomRightRadius: 'var(--dialog-corner-radius)',
    borderBottomLeftRadius: 'var(--dialog-corner-radius)',
    flexGrow: 1,

    boxShadow: {
      // default:
      //   "0 12px 28px 0 var(--shadow-2),0 2px 4px 0 var(--shadow-1),inset 0 0 0 1px var(--shadow-inset)",
      '@media (max-width: 679px)': 'none',
    },
    clipPath: {
      default: 'none',
      '@media (max-width: 679px)': 'inset(0px 0 0 0 round var(--dialog-corner-radius))',
    },

    overflowX: {
      default: 'hidden',
      '@media (max-width: 679px)': 'visible',
    },
    overflowY: {
      default: 'hidden',
      '@media (max-width: 679px)': 'visible',
    },
  },

  dialog: {
    alignItems: 'stretch',
    borderTopLeftRadius: 'var(--dialog-corner-radius)',
    borderTopRightRadius: 'var(--dialog-corner-radius)',
    borderBottomRightRadius: 'var(--dialog-corner-radius)',
    borderBottomLeftRadius: 'var(--dialog-corner-radius)',
    display: 'flex',
    overflowX: 'visible',
    overflowY: 'visible',
    boxShadow: {
      default: null,
      '@media (max-width: 679px)':
        '0 12px 28px 0 var(--shadow-2),0 2px 4px 0 var(--shadow-1),inset 0 0 0 1px var(--shadow-inset)',
    },
  },

  root: {
    justifyContent: {
      // default: null,
      '@media (max-width: 679px)': 'center',
    },
  },

  // =======================================================
  // =======================================================

  anchor_LEGACY: {
    alignItems: 'stretch',
    maxHeight: '100vh',
    paddingLeft: '4px',
    paddingRight: '4px',

    paddingTop: 'var(--dialog-anchor-vertical-padding)',
    paddingBottom: 'var(--dialog-anchor-vertical-padding)',
    // eslint-disable-next-line @stylexjs/valid-styles
    '@supports (padding: env(safe-area-inset-bottom, 0))': {
      paddingTop: 'calc(var(--dialog-anchor-vertical-padding) + env(safe-area-inset-top,0))',
      paddingBottom: 'calc(var(--dialog-anchor-vertical-padding) + env(safe-area-inset-bottom,0))',
    },
  },

  card_LEGACY: {
    backgroundColor: 'var(--card-background)',
    borderRadius: 'var(--dialog-corner-radius)',
    flexGrow: 1,

    boxShadow: '0 12px 28px 0 var(--shadow-2),0 2px 4px 0 var(--shadow-1),inset 0 0 0 1px var(--shadow-inset)',
    // clipPath: "none",
    overflowX: 'hidden',
    overflowY: 'hidden',

    // eslint-disable-next-line @stylexjs/valid-styles
    '@media (max-width: 679px)': {
      // boxShadow: "none",
      // clipPath: "inset(0px 0 0 0 round var(--dialog-corner-radius))",
      overflowX: 'visible',
      overflowY: 'visible',
    },
  },

  dialog_LEGACY: {
    alignItems: 'stretch',
    borderRadius: 'var(--dialog-corner-radius)',
    display: 'flex',
    overflowX: 'visible',
    overflowY: 'visible',

    boxShadow: '0 12px 28px 0 var(--shadow-2),0 2px 4px 0 var(--shadow-1),inset 0 0 0 1px var(--shadow-inset)',

    // eslint-disable-next-line @stylexjs/valid-styles
    // "@media (max-width: 679px)": {
    //   boxShadow:
    //     "0 12px 28px 0 var(--shadow-2),0 2px 4px 0 var(--shadow-1),inset 0 0 0 1px var(--shadow-inset)",
    // },
  },

  root_LEGACY: {
    // eslint-disable-next-line @stylexjs/valid-styles
    '@media (max-width: 679px)': {
      justifyContent: 'center',
    },
  },
});

const sizeStyles = stylex.create({
  medium: {
    maxWidth: '700px',
    width: '100%',
  },
  small: {
    maxWidth: '548px',
    width: '100%',
  },
});

export const FDSDialogContainer = forwardRef(
  (
    { anchorXStyle, 'aria-label': al, children, disableClosingWithMask = false, onClose, size = 'small', testid },
    ref,
  ) => {
    const fallback = useMemo(() => {
      return <FDSDialogPageLoadingState onClose={onClose ?? emptyFunction} />;
    }, [onClose]);

    let fdsDialogLoadingStateContextValue = useContext(FDSDialogLoadingStateContext);
    let labelID = BaseDialogLabelIDProvider.useDialogLabelID();

    return (
      <BaseDialog
        anchorXStyle={[styles.anchor_LEGACY, anchorXStyle]}
        aria-label={al}
        aria-labelledby={al ?? labelID}
        disableClosingWithMask={disableClosingWithMask}
        onClose={onClose ?? emptyFunction}
        ref={ref}
        rootXStyle={styles.root_LEGACY}
        testid={undefined}
        xstyle={[styles.dialog_LEGACY, sizeStyles[size]]}
      >
        <BaseMultiPageView
          disableAutoRestoreFocus={fdsDialogLoadingStateContextValue}
          fallback={fallback}
          xstyle={styles.card}
        >
          {children}
        </BaseMultiPageView>
      </BaseDialog>
    );

    // return jsx(BaseDialog, {
    //   anchorXStyle: [styles.anchor_LEGACY, anchorXStyle],
    //   "aria-label": al,
    //   "aria-labelledby": al ?? labelID,
    //   disableClosingWithMask,
    //   onClose: onClose ?? emptyFunction,
    //   ref,
    //   rootXStyle: styles.root_LEGACY,
    //   testid: undefined,
    //   xstyle: [styles.dialog_LEGACY, sizeStyles[size]],
    //   children: jsx(BaseMultiPageView, {
    //     disableAutoRestoreFocus: fdsDialogLoadingStateContextValue,
    //     fallback,
    //     xstyle: styles.card_LEGACY,
    //     children,
    //   }),
    // });
  },
);

FDSDialogContainer.displayName = 'FDSDialogContainer.react';
