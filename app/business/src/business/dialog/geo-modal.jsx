import { jsx } from 'react/jsx-runtime';

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
