import { err } from '@meta-core/error/err';
import { unrecoverableViolation } from '@meta-core/error/unrecoverable-violation';
import { executionEnvironment } from '@meta-core/utils/executionEnvironment';

export function getSameOriginTransport() {
  if (!executionEnvironment.canUseDOM && !executionEnvironment.isInWorker)
    throw unrecoverableViolation(
      'getSameOriginTransport: Same origin transport unavailable in the server environment.',
      'comet_infra',
      {},
      {
        blameToPreviousFrame: 1,
      },
    );
  try {
    return new window.XMLHttpRequest();
  } catch (e) {
    throw err('getSameOriginTransport: %s', e.message);
  }
}
