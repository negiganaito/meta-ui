import { jsxs } from 'react/jsx-runtime';
import { CometTriggerAccessibilityAlertContext } from '@meta-core/contexts/comet-trigger-accessibility-alert-context';
import { useCometAccessibilityAlerts } from '@meta-core/hooks/use-comet-accessibility-alerts';

export const CometAccessibilityAlertProvider = ({ children }) => {
  let { accessibilityAlerts, triggerAccessibilityAlert } = useCometAccessibilityAlerts();
  // let d = b.accessibilityAlerts;
  // b = b.triggerAccessibilityAlert;
  return jsxs(CometTriggerAccessibilityAlertContext.Provider, {
    value: triggerAccessibilityAlert,
    children: [children, accessibilityAlerts],
  });
};
