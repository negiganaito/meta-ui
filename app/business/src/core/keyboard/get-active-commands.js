export function getActiveCommands(targetNode, commandMap1, commandMap2) {
  let activeCommands = new Map();
  function addCommandsFromMap(commandMap) {
    commandMap.forEach((command, commandKey) => {
      let existingCommands = activeCommands.get(commandKey);
      if (existingCommands) {
        let shouldAddCommand = existingCommands.every((existingCommand) => {
          return existingCommand.shouldStopPropagation === !1;
        });
        shouldAddCommand && existingCommands.push(command);
      } else activeCommands.set(commandKey, [command]);
    });
  }

  // eslint-disable-next-line no-self-assign
  let currentNode = targetNode;
  while (currentNode) {
    let currentCommandMap = currentNode && currentNode.getCommandMap();
    addCommandsFromMap(currentCommandMap);
    currentNode = currentNode && currentNode.getParent();
  }
  commandMap1 && addCommandsFromMap(commandMap1.getCommandMap());
  commandMap2 && addCommandsFromMap(commandMap2.getCommandMap());
  return activeCommands;
}

// export function getActiveCommands(targetNode, commandMap1, commandMap2) {
//   const activeCommands = new Map();

//   function addCommandsFromMap(commandMap) {
//     commandMap.forEach((command, commandKey) => {
//       const existingCommands = activeCommands.get(commandKey);

//       if (existingCommands) {
//         const shouldAddCommand = existingCommands.every((existingCommand) => {
//           return existingCommand.shouldStopPropagation === false;
//         });
//         if (shouldAddCommand) {
//           existingCommands.push(command);
//         }
//       } else {
//         activeCommands.set(commandKey, [command]);
//       }
//     });
//   }

//   // Traverse the command tree and collect commands from each node
//   let currentNode = targetNode;
//   while (currentNode) {
//     const currentCommandMap = currentNode.getCommandMap();
//     addCommandsFromMap(currentCommandMap);
//     currentNode = currentNode.getParent();
//   }

//   // Add additional commands if provided
//   if (commandMap1) {
//     addCommandsFromMap(commandMap1.getCommandMap());
//   }

//   if (commandMap2) {
//     addCommandsFromMap(commandMap2.getCommandMap());
//   }

//   return activeCommands;
// }
