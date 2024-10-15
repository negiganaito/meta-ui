import { jsx } from 'react/jsx-runtime';
import { GeoCancelButton } from '@meta-business/button/geo-cancel-button';
import { GeoModal } from '@meta-business/dialog/geo-modal';
import { GeoModalFooter } from '@meta-business/dialog/geo-modal-footer';
import { GeoModalHeader } from '@meta-business/dialog/geo-modal-header';
import { GeoSection } from '@meta-business/layout/geo-section';

import { GeoGlimmer } from './geo-glimmer';

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
