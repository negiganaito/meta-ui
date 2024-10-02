let prefix = 'js_';
let base = 36;
let counter = 0;

export function uniqueID(customPrefix = prefix, onlyPrefix = false) {
  return onlyPrefix ? customPrefix : customPrefix + (counter++).toString(base);
}
