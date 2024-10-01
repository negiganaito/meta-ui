import { useStyleXTransition } from './use-stylex-transition';

export function useStyleXTransitionSingle(state, config) {
  const transition = useStyleXTransition(state ? [state] : [], () => 0, config);
  return transition[0];
}
