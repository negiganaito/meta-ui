import { suspendOrThrowIfUsedInSSR } from '@meta-core/unknown/suspend-or-throw-if-used-in-ssr';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';

const j = {};
function preload(a) {
  a.load();
}

function read(b) {
  const a = b.getModuleIfRequireable();
  if (!a) {
    !ExecutionEnvironment.isInBrowser &&
      !b.isAvailableInSSR_DO_NOT_USE() &&
      suspendOrThrowIfUsedInSSR('Loading of bootloaded and T3 components is disabled during SSR');
    const d = b.getModuleId();
    if (!j[d]) {
      b = j[d] = b.load();
      b.finally(() => {
        delete j[d];
      });
    }
    throw j[d];
  }
  return a;
}

export const BootloaderResource = {
  preload,
  read,
};
