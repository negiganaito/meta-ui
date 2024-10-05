import { useContext, useEffect } from 'react';
import { CometHeroInteractionContextPassthrough } from '@meta-core/placeholder/comet-hero0-Interaction-context-passthrough';

export function useHeroBootloadedComponent(props) {
  const context = useContext(CometHeroInteractionContextPassthrough.Context);

  useEffect(() => {
    context.consumeBootload(props.getModuleId());
  }, [context, props]);
}
