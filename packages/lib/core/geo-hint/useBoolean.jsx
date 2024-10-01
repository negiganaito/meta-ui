import { useCallback, useState } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';

function useBoolean(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const set = useCallback((newValue) => {
    setValue(newValue);
  }, []);

  const toggle = useCallback(() => {
    setValue((prevValue) => !prevValue);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
    emptyFunction();
  }, []);

  return {
    value,
    set,
    toggle,
    setTrue,
    setFalse,
  };
}

export default useBoolean;
