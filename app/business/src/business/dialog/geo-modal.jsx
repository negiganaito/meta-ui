import { jsx } from 'react/jsx-runtime';

import { GeoBaseModal } from './geo-base-modal';
import { useGeoPrivateScalingModalTransition } from './use-geo-private-scaling-modal-transition';

export function GeoModal({
  onEnterComplete,
  'data-testid': dataTestId,
  children,
  containerRef,
  footer,
  header,
  height,
  isShown,
  label,
  labelledBy,
  xstyle,
  ...props
}) {
  const dialogTransition = useGeoPrivateScalingModalTransition(isShown, onEnterComplete);

  return jsx(GeoPrivateLoggingRegion, {
    inputRef: containerRef,
    name: 'GeoModal',
    children: (loggingContainerRef) =>
      jsx(GeoBaseModal, {
        dialogTransition,
        isShown,
        ...props,
        children: jsx(GeoModalCard, {
          containerRef: loggingContainerRef,
          'data-testid': undefined,
          footer,
          header,
          height,
          label,
          labelledBy,
          xstyle,
          children,
        }),
      }),
  });
}
