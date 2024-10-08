import { FBLogger } from './fb-logger';

const projectName = 'flow_typing_for_legacy_code';

function invariantViolation(a) {
  FBLogger(projectName)
    .blameToPreviousFile()
    .event(projectName + '.bad_call')
    .mustfix(a);
  return new Error('[' + projectName + '] ' + a);
}

export const FlowMigrationUtilsForLegacyFiles = {
  invariantViolation,
};
