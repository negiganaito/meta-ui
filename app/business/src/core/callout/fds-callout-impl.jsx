import React, { useContext } from 'react';
import { FDSCalloutContext } from '@meta-core/contexts/fds-callout-context';

import { BaseCalloutImpl } from './base-callout-impl';
import { FDSCallout } from './fds-callout';

export const FDSCalloutImpl = (props) => {
  const { calloutID, calloutProps, contentID, titleID } = props;
  const fdsCalloutContextValue = useContext(FDSCalloutContext);

  if (!fdsCalloutContextValue || !calloutProps) {
    return null;
  }

  const { disableOutsideClick, onClose, ...rest } = calloutProps;

  return (
    <BaseCalloutImpl {...props}>
      <FDSCallout
        {...rest}
        calloutID={calloutID}
        contentID={contentID}
        onClose={() => {
          fdsCalloutContextValue.removeCallout(calloutID);
          onClose && onClose();
        }}
        onOutsideClick={() => {
          if (disableOutsideClick !== true) {
            fdsCalloutContextValue.removeCallout(calloutID);
            onClose && onClose();
          }
        }}
        titleID={titleID}
      />
    </BaseCalloutImpl>
  );
};
