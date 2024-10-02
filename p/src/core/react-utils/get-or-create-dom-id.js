import { uniqueID } from '@meta-ui/core/utils';

export function getOrCreateDOMID(element) {
  if (!element.id) {
    element.id = uniqueID();
  }
  return element.id;
}
