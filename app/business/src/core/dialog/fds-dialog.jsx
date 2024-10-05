import React, { forwardRef } from 'react';

import { BaseDialogLabelIDProvider } from './base-dialog-label-id-provider';
import { FDSDialogContainer } from './fds-dialog-container';
import { FDSDialogPage } from './fds-dialog-page';

/**
 * FDSDialog component.
 *
 * This component provides a dialog with customizable styles, header, and closing behavior.
 * It uses forwardRef to pass a ref to the underlying DOM element.
 *
 * @type React.ForwardRefRenderFunction<React.FunctionComponent, import("./types").FDSDialogProps>
 */
export const FDSDialog = forwardRef(
  ({ anchorXStyle, 'aria-label': al, disableClosingWithMask, header, onClose, size, tetsid, ...rest }, ref) => {
    return (
      <BaseDialogLabelIDProvider.BaseDialogLabelIDProvider>
        <FDSDialogContainer
          anchorXStyle={anchorXStyle}
          aria-label={al}
          disableClosingWithMask={disableClosingWithMask}
          onClose={onClose}
          ref={ref}
          size={size}
          testid={undefined}
        >
          <FDSDialogPage header={header} {...rest} />
        </FDSDialogContainer>
      </BaseDialogLabelIDProvider.BaseDialogLabelIDProvider>
    );

    // return jsx(BaseDialogLabelIDProvider.BaseDialogLabelIDProvider, {
    //   children: jsx(FDSDialogContainer, {
    //     anchorXStyle,
    //     "aria-label": al,
    //     disableClosingWithMask,
    //     onClose,
    //     ref,
    //     size,
    //     testid: undefined,
    //     children: jsx(FDSDialogPage, { header, ...rest }),
    //   }),
    // });
  },
);
