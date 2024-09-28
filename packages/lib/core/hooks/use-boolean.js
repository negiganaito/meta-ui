import { useCallback, useState } from 'react';

export function useBoolean(initialValue) {
  // useState to hold the current boolean value, initialized with the provided initialValue
  const [value, setValue] = useState(initialValue);

  // Helper function to toggle the boolean value (true -> false, false -> true)
  const toggle = useCallback(() => {
    setValue((prevValue) => !prevValue);
  }, []);

  // Helper function to explicitly set the value to true
  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  // Helper function to explicitly set the value to false
  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  // Return the current value and the helper functions as an object
  return {
    value,
    set: setValue,
    toggle,
    setTrue,
    setFalse,
  };
}
