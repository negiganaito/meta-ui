import UserAgent from 'fbjs/lib/UserAgent';

import { createKeyCommand } from './create-key-command';
import { getCometKey } from './get-comet-key';

export function getKeyCommand(event) {
  const cometKey = getCometKey(event);

  if (!cometKey) {
    return null;
  }

  const isMacOS = UserAgent.isPlatform('Mac OS X');
  const isCommandKey = isMacOS ? event.metaKey : event.ctrlKey;

  const keyCommand = {
    alt: event.altKey,
    command: isCommandKey,
    key: cometKey,
    shift: event.shiftKey,
  };

  return createKeyCommand(keyCommand);
}
