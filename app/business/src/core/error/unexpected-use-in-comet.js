import { FBLogger } from './fb-logger';

export function unexpectedUseInComet(a) {
  // if (!c("gkx")("708253")) return;
  a = a + ' called unexpectedly. This is not supported in Comet!';
  let b = FBLogger('comet_infra').blameToPreviousFrame().blameToPreviousFrame();
  b.mustfix(a);
}
