import {
  coerceImageishSprited,
  coerceImageishURL,
  getImageSourceURLFromImageish,
  memoizeWithArgsWeak,
} from '@meta-core/react-utils';
import { isFalsey, isNotNullAndNotUndefined } from '@meta-core/utils';

let urlRegex = /(?:\(['\"]?)(.*?)(?:['\"]?\))/;

const getSrcFromIcon = (icon) => {
  let imageUrl = getImageSourceURLFromImageish(icon.src);
  if (imageUrl) {
    return imageUrl;
  }
  let spriteStyle = getSpriteStyle(icon);
  // eslint-disable-next-line no-return-assign
  return (!spriteStyle ? undefined : spriteStyle.url)
    ? !(icon = urlRegex.exec(spriteStyle.url))
      ? undefined
      : icon[1]
    : null;
};

const getSizeFromIcon = (icon) => {
  if (typeof icon.src === 'string' || coerceImageishURL(icon.src)) {
    return {
      width: icon.size,
      height: icon.size,
    };
  }
  let spriteStyle = getSpriteStyle(icon);
  if (!spriteStyle) {
    return null;
  }
  let size = parseSize(spriteStyle.size);
  let width = size[0];
  let height = size[1];
  return isNotNullAndNotUndefined(width) && isNotNullAndNotUndefined(height) // width !== null && height !== null
    ? {
        width: width,
        height: height,
      }
    : null;
};

const getPositionFromIcon = (icon) => {
  if (coerceImageishURL(icon.src)) {
    return {
      x: 0,
      y: 0,
    };
  }
  let spriteStyle = getSpriteStyle(icon);
  if (!spriteStyle) {
    return null;
  }
  let position = parseSize(spriteStyle.position);
  let x = position[0];
  let y = position[1];

  return isNotNullAndNotUndefined(x) && isNotNullAndNotUndefined(y) //  x !== null && y !== null
    ? {
        x,
        y,
      }
    : null;
};

// eslint-disable-next-line no-var
var getSpriteStyle = memoizeWithArgsWeak((icon) => {
  let element;
  icon = coerceImageishSprited(icon.src);
  if (!icon) {
    return null;
  }
  if (icon.type === 'cssless') {
    return {
      position: icon.style.backgroundPosition,
      size: icon.style.backgroundSize,
      url: icon.style.backgroundImage,
    };
  }
  element = !(element = document) ? undefined : element.body;
  if (!element) {
    return null;
  }
  let tempDiv = document.createElement('div');
  tempDiv.className = icon.className;
  tempDiv.style.display = 'none';
  element.appendChild(tempDiv);
  icon = getComputedStyle(tempDiv);
  let style = {
    position: icon.backgroundPosition,
    size: icon.backgroundSize,
    url: icon.backgroundImage,
  };
  element.removeChild(tempDiv);
  return style;
}, 'WebIconGetSpriteStyle');

const parseSize = (size) => {
  if (isFalsey(size) || size.includes('auto')) {
    return [void 0, void 0];
  }
  size = size.split(' ');
  let width = size[0];
  let height = size[1];

  return [parseFloat(width), parseFloat(height)];
};

export const WebIconUtils = {
  getSrcFromIcon,
  getSizeFromIcon,
  getPositionFromIcon,
};
