import { ErrorMetadata } from './error-metadata';
import { FBLogMessage } from './fb-log-message';

export function FBLogger(projectName, occurAt) {
  const fbLogMessage = new FBLogMessage(projectName);
  return occurAt ? fbLogMessage.event(projectName + '.' + occurAt) : fbLogMessage;
}

FBLogger.addGlobalMetadata = function (a, b, c) {
  ErrorMetadata.addGlobalMetadata(a, b, c);
};
