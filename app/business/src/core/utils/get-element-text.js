import { isElementNode } from './is-element-node';
import { isTextNode } from './is-text-node';

let h = null;

export function getElementText(a) {
  if (isTextNode(a)) return a.data;
  else if (isElementNode(a)) {
    if (h === null) {
      let b = document.createElement('div');
      h = b.textContent !== null ? 'textContent' : 'innerText';
    }
    return a[h];
  } else return '';
}
