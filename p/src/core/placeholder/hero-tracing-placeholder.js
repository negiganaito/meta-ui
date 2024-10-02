import {
  HeroCurrentInteractionForLoggingContext,
  HeroInteractionContext,
  HeroInteractionIDContext,
} from '@meta-ui/core/contexts';

import { HeroInteractionContextPassthrough } from './components/hero-interaction-context-passthrough';
import { HeroPlaceholder } from './components/hero-placeholder';
import { HeroComponent } from './utils/hero-component';
import { HeroHoldTrigger } from './utils/hero-hold-trigger';
import { HeroPendingPlaceholderTracker } from './utils/hero-pending-placeholder-tracker';
import { HeroPlaceholderUtils } from './utils/hero-placeholder-utils';

export const HeroTracingPlaceholder = {
  HeroComponent,
  HeroCurrentInteractionForLoggingContext,
  HeroHoldTrigger,
  HeroInteractionContext: HeroInteractionContext,
  HeroInteractionContextPassthrough,
  HeroInteractionIDContext,
  HeroPendingPlaceholderTracker,
  HeroPlaceholder,
  HeroPlaceholderUtils,
};
