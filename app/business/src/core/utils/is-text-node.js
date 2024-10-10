import { isNode } from './is-node';

export function isTextNode(a) {
  return isNode(a) && a.nodeType === 3;
}
