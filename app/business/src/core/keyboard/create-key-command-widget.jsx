import { createContext, useContext, useEffect } from 'react';
import { recoverableViolation } from '@meta-core/error/recoverable-violation';

import { createKeyCommandWrapper } from './create-key-command-wrapper';

export function createKeyCommandWidget(isFocusCapture = true) {
  const Context = createContext();
  const Wrapper = createKeyCommandWrapper(isFocusCapture, Context);

  function useKeyCommands(commands, allowOutsideScope = false, dependencies) {
    // allowOutsideScope === void 0 && (allowOutsideScope = !1);

    // if (allowOutsideScope === undefined) {
    //   allowOutsideScope = false;
    // }

    let contextValue = useContext(Context);
    useEffect(() => {
      if (!contextValue) {
        allowOutsideScope ||
          recoverableViolation(
            "Attempting to register a key command outside of its widget scope. Calls to useKeyCommand must be within its widget's wrapper.",
            'comet_ax',
          );
        return;
      }
      if (commands) return contextValue.addCommands(commands, dependencies);
    }, [contextValue, commands, allowOutsideScope, dependencies]);
  }

  return {
    Context,
    Wrapper,
    useKeyCommands,
  };
}
