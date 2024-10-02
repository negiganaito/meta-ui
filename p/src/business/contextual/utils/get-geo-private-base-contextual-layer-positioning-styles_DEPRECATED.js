import Locale from 'fbjs/lib/Locale';

const isRTL = Locale.isRTL();

// eslint-disable-next-line complexity
export const getGeoPrivateBaseContextualLayerPositioningStyles_DEPRECATED = ({
  adjustment,
  align,
  contextRect,
  fixed,
  offsetRect,
  position,
}) => {
  const styles = {
    height: undefined,
    position: fixed ? 'fixed' : 'absolute',
    transform: '',
    width: undefined,
  };

  let translateX = 0;
  let translateY = 0;
  let translateXPercent = 0;
  let translateYPercent = 0;

  const contextCenterY = (contextRect.bottom + contextRect.top) / 2;
  const contextCenterX = (contextRect.left + contextRect.right) / 2;
  const horizontalStart = isRTL ? 'start' : 'end';
  const horizontalEnd = isRTL ? 'end' : 'start';

  switch (position) {
    case 'above':
      translateY = contextRect.top - offsetRect.top;
      translateYPercent = -100;
      break;
    case 'below':
      translateY = contextRect.bottom - offsetRect.top;
      break;
    case horizontalEnd:
      translateX = contextRect.left - offsetRect.left;
      translateXPercent = -100;
      break;
    case horizontalStart:
      translateX = contextRect.right - offsetRect.left;
      break;
  }

  if (position === 'start' || position === 'end') {
    switch (align) {
      case 'start':
        translateY = contextRect.top - offsetRect.top;
        break;
      case 'middle':
        translateY = contextCenterY - offsetRect.top;
        translateYPercent = -50;
        break;
      case 'end':
        translateY = contextRect.bottom - offsetRect.top;
        translateYPercent = -100;
        break;
      case 'stretch':
        translateY = contextRect.top - offsetRect.top;
        styles.height = `${contextRect.bottom - contextRect.top}px`;
        break;
    }
  } else if (position === 'above' || position === 'below') {
    switch (align) {
      case horizontalEnd:
        translateX = contextRect.left - offsetRect.left;
        break;
      case 'middle':
        translateX = contextCenterX - offsetRect.left;
        translateXPercent = -50;
        break;
      case horizontalStart:
        translateX = contextRect.right - offsetRect.left;
        translateXPercent = -100;
        break;
      case 'stretch':
        translateX = contextRect.left - offsetRect.left;
        styles.width = `${contextRect.right - contextRect.left}px`;
        break;
    }
  }

  if (adjustment) {
    if (position === 'start' || position === 'end') {
      translateY += adjustment;
    } else if (position === 'above' || position === 'below') {
      translateX += adjustment;
    }
  }

  let transform = '';
  if (translateX !== 0 || translateY !== 0) {
    transform += `translate(${Math.round(translateX)}px, ${Math.round(translateY)}px) `;
  }
  if (translateXPercent !== 0 || translateYPercent !== 0) {
    transform += `translate(${translateXPercent}%, ${translateYPercent}%) `;
  }
  styles.transform = transform.trim();

  return styles;
};
