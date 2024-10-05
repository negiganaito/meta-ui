import { createContext, useContext, useId } from 'react';
import { jsx } from 'react/jsx-runtime';
import { HiddenSubtreeContext } from '@meta-core/contexts/hidden-subtree-context';

const context = createContext(undefined);

const _BaseDialogLabelIDProvider = ({ children }) => {
  const id = useId();

  return jsx(context.Provider, {
    value: id,
    children,
  });
};

function useDialogHeaderID() {
  let id = useContext(context);
  let { hidden } = useContext(HiddenSubtreeContext);
  return hidden ? undefined : id;
}

function useDialogLabelID() {
  return useContext(context);
}

export const BaseDialogLabelIDProvider = {
  BaseDialogLabelIDProvider: _BaseDialogLabelIDProvider,
  useDialogHeaderID,
  useDialogLabelID,
  BaseDialogLabelIDContext: context,
};
