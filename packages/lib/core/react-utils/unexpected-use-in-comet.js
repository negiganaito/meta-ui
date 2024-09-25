import { FBLogger } from '@meta-core/error';

const _20935 = true;

export function unexpectedUseInComet(a) {
  if (!_20935) return;
  a = a + ' called unexpectedly. This is not supported in Comet!';
  let b = FBLogger('comet_infra').blameToPreviousFrame().blameToPreviousFrame();
  b.mustfix(a);
}
