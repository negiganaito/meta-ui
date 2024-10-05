import { getKeyCommand } from './get-key-command';

// eslint-disable-next-line max-params
export function applyKeyCommand(event, commandHandler, fallbackHandler1, fallbackHandler2) {
  let keyCommand = getKeyCommand(event);
  if (!keyCommand) return !1;
  // eslint-disable-next-line no-self-assign
  let currentHandler = commandHandler;
  while (currentHandler) {
    if (currentHandler && currentHandler.applyCommand(keyCommand, event)) return !0;
    currentHandler = currentHandler && currentHandler.getParent();
  }
  if (fallbackHandler1 && fallbackHandler1.applyCommand(keyCommand, event)) return !0;
  return fallbackHandler2 && fallbackHandler2.applyCommand(keyCommand, event) ? !0 : !1;
}

// import { getKeyCommand } from './get-key-command';

// eslint-disable-next-line max-params
// export function applyKeyCommand(event, commandHandler, fallbackHandler1, fallbackHandler2) {
//   const keyCommand = getKeyCommand(event);
//   if (!keyCommand) return false;

//   // Traverse the command handler hierarchy
//   let currentHandler = commandHandler;
//   while (currentHandler) {
//     if (currentHandler.applyCommand(keyCommand, event)) {
//       return true;
//     }
//     currentHandler = currentHandler.getParent();
//   }

//   // Try applying the command using fallback handlers if provided
//   if (fallbackHandler1 && fallbackHandler1.applyCommand(keyCommand, event)) {
//     return true;
//   }

//   return fallbackHandler2 && fallbackHandler2.applyCommand(keyCommand, event) ? true : false;
// }
