import { executionEnvironment } from '@meta-core/utils/executionEnvironment';

import { CometSSRClientRender } from './comet-ssr-client-render';

export function suspendOrThrowIfUsedInSSR(a) {
  if (!executionEnvironment.isInBrowser) {
    throw CometSSRClientRender(a);
  }
}
