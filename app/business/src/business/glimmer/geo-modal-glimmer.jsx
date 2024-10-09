import { jsx } from 'react/jsx-runtime';

export function GeoModalGlimmer({ children, onHide }) {
  return jsx(GeoModal, {
    footer: jsx(GeoModalFooter, {
      primaryButton: jsx(GeoCancelButton, {}),
    }),
    header: jsx(GeoModalHeader, {
      heading: 'Loading...',
    }),
    isShown: true,
    label: 'Loading...',
    onHide: onHide,
    children: jsx(GeoSection, {
      children: children ?? jsx(GeoGlimmer, { height: 50 }),
    }),
  });
}
