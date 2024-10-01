import React, { useContext } from 'react';
import { WaitTimeContext } from '@meta-ui/business/contexts';
import { HeroTracingPlaceholder } from '@meta-ui/core/placeholder';

function LoadingMarker_({ children, nodeRef, stateTracker }) {
  return children;
}

const LoadingMarkerGated = {
  component: null,
};

function withHeroHold(Component) {
  return function EnhancedComponent(props) {
    const waitTimeContext = useContext(WaitTimeContext);
    const waitTimeAreaName = waitTimeContext?.waitTimeAreaName ?? 'unnamed';
    const description = 'LoadingMarker(' + waitTimeAreaName + ')';

    const content = (
      <>
        <HeroTracingPlaceholder.HeroHoldTrigger hold={true} description={description} />
        <Component {...props} />
      </>
    );

    return content;
  };
}

export const LoadingMarker = withHeroHold(LoadingMarkerGated.component || LoadingMarker_);
