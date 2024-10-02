import containsNode from 'fbjs/lib/containsNode';
import CSS from 'fbjs/lib/CSSCore';

import { ge } from './ge';
import { getOrCreateDOMID } from './get-or-create-dom-id';

function register(element, owner) {
  element.setAttribute('data-ownerid', getOrCreateDOMID(owner));
}

function containsIncludingLayers(element, target) {
  let currentTarget = target;
  while (currentTarget) {
    if (containsNode(element, currentTarget)) return true;
    currentTarget = getContext(currentTarget);
  }
  return false;
}

function getContext(element) {
  let currentElement = element;
  while (currentElement) {
    const ownerId = currentElement.getAttribute('data-ownerid');
    if (ownerId) return ge(ownerId);
    currentElement = currentElement.parentNode;
  }
  return null;
}

function parentByClass(element, className) {
  let currentElement = element;
  while (currentElement && !CSS.hasClass(currentElement, className)) {
    const ownerId = currentElement.getAttribute('data-ownerid');
    currentElement = ownerId ? ge(ownerId) : currentElement.parentNode;
  }
  return currentElement;
}

export const ContextualThing = { containsIncludingLayers, getContext, parentByClass, register };
