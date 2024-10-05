import { useCallback, useEffect, useRef, useState } from 'react';

export function useAccessibilityAlerts() {
  let cleanupRef = useRef(null);
  let alertsMapRef = useRef(new Map());
  let alertIdRef = useRef(0);
  let [alerts, setAlerts] = useState([]);

  useEffect(() => {
    return function () {
      cleanupRef.current && cleanupRef.current();
    };
  }, []);

  let addAlert = useCallback((message, options) => {
    let alertId = alertIdRef.current++;
    const newAlert = {
      key: alertId,
      message: message,
      options: options,
    };
    alertsMapRef.current.set(alertId, newAlert);
    setAlerts(Array.from(alertsMapRef.current.values()));
    return function () {
      alertsMapRef.current['delete'](alertId);
      setAlerts(Array.from(alertsMapRef.current.values()));
    };
  }, []);

  const handleAlert = useCallback(
    (message, options) => {
      cleanupRef.current && cleanupRef.current();
      message = addAlert(message, options);
      cleanupRef.current = message;
      return message;
    },
    [addAlert],
  );
  return [alerts, handleAlert];
}
