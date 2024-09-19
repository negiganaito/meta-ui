import { memo, useContext, useLayoutEffect } from 'react';
import { HeroInteractionContext, HeroInteractionIDContext } from '@meta-core/contexts';

function heroComponent(props) {
  const { description } = props;

  let e = useContext(HeroInteractionContext.Context);
  let f = useContext(HeroInteractionIDContext);
  useLayoutEffect(() => {
    f && e.logHeroRender(f, description, e.pageletStack);
  }, [description, e, f]);
  return null;
}

heroComponent.displayName = 'HeroComponent';

export const HeroComponent = memo(heroComponent);
