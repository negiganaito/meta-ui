import { isNode } from './is-node';

export const isElementNode = (a) => {
  return isNode(a) && a.nodeType === 1;
};
