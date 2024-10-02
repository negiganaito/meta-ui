export function ge(a, b, c) {
  if (typeof a !== 'string') {
    return a;
  } else if (!b) {
    return document.getElementById(a);
  } else {
    return findElementById(a, b, c);
  }
}

function findElementById(id, parent, tagName) {
  if (getElementId(parent) === id) {
    return parent;
  } else if (parent.getElementsByTagName) {
    const elements = parent.getElementsByTagName(tagName || '*');
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (getElementId(element) === id) {
        return element;
      }
    }
  } else {
    const children = parent.childNodes;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const found = findElementById(id, child);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

function getElementId(element) {
  return element.getAttribute ? element.getAttribute('id') : null;
}
