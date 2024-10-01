import { EventSubscription } from './event-subscription';

export class EmitterSubscription extends EventSubscription {
  constructor(b, c, d) {
    super(b);
    this.listener = c;
    this.context = d;
  }
}
