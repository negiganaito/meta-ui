import { jsx } from 'react/jsx-runtime';
import { HeroCurrentInteractionForLoggingContext } from '@meta-core/contexts/hero-current-interaction-for-logging-context';
import { HeroInteractionContext } from '@meta-core/contexts/hero-interaction-context';
import { HeroInteractionIDContext } from '@meta-core/contexts/hero-interaction-id-context';
import { RelayProfilerContext } from '@meta-core/contexts/relay-profiler-context';

const heroCurrentInteractionForLoggingValue = {
  current: null,
};

const relayProfilerValue = {
  consumeBootload: function () {},
  retainQuery: function () {},
  wrapPrepareQueryResource: (a) => {
    return a();
  },
};

export function HeroInteractionContextPassthrough({ children, clear = true }) {
  return !clear
    ? children
    : jsx(HeroInteractionContext.Context.Provider, {
        children: jsx(HeroCurrentInteractionForLoggingContext.Provider, {
          children: jsx(HeroInteractionIDContext.Provider, {
            children: jsx(RelayProfilerContext.Provider, {
              children,
              value: relayProfilerValue,
            }),
            value: null,
          }),
          value: heroCurrentInteractionForLoggingValue,
        }),
        value: HeroInteractionContext.DEFAULT_CONTEXT_VALUE,
      });
}
