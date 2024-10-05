import React from 'react';
import { jsx } from 'react/jsx-runtime';
import { CometAccessibilityAnnouncement } from '@meta-core/unknown/comet-accessibility-announcement';

import { useAccessibilityAlerts } from './use-accessibility-alerts';

function AccessibilityAlerts({ alerts }) {
  // a = a.alerts;
  return alerts.map(({ key, message, options }) => {
    // let b = a.key;
    // let d = a.message;
    // a = a.options;
    return React.createElement(CometAccessibilityAnnouncement, { ...options, key }, message);
  });
}

export const useCometAccessibilityAlerts = () => {
  const [alerts, triggerAccessibilityAlert] = useAccessibilityAlerts();
  // var b = a[0];
  // a = a[1];
  return {
    accessibilityAlerts: jsx(AccessibilityAlerts, {
      alerts,
    }),
    triggerAccessibilityAlert,
  };
};
