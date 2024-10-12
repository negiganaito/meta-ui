/* eslint-disable no-sequences */
import { ee as Event } from './event';
import { executionEnvironment } from './executionEnvironment';

let documentElement;
let keyCode = null;
let blurListener = null;

function addBlurListener() {
  blurListener ||
    (blurListener = Event.listen(window, 'blur', () => {
      keyCode = null;
      removeBlurListener();
    }));
}

function removeBlurListener() {
  blurListener && (blurListener.remove(), (blurListener = null));
}

function handleKeyDown(event) {
  keyCode = Event.getKeyCode(event);
  addBlurListener();
}

function handleKeyUp() {
  keyCode = null;
  removeBlurListener();
}

if (executionEnvironment.canUseDOM) {
  documentElement = document.documentElement;
  if (documentElement) {
    if (documentElement.addEventListener) {
      documentElement.addEventListener('keydown', handleKeyDown, true);
      documentElement.addEventListener('keyup', handleKeyUp, true);
    } else if (documentElement.attachEvent) {
      documentElement = documentElement.attachEvent;
      documentElement('onkeydown', handleKeyDown);
      documentElement('onkeyup', handleKeyUp);
    }
  }
}

function isKeyDown() {
  return !!keyCode;
}

function getKeyDownCode() {
  return keyCode;
}

export const KeyStatus = {
  isKeyDown,
  getKeyDownCode,
};
