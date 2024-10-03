import { uniqueID } from '@meta-core/utils/unique-id';

export function getOrCreateDOMID(element) {
  if (!element.id) {
    element.id = uniqueID();
  }
  return element.id;
}
