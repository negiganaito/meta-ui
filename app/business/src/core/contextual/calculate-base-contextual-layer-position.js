import Locale from 'fbjs/lib/Locale';

const isRTL = Locale.isRTL();

/**
 * Calculates the position of the contextual layer based on the provided parameters.
 *
 * @param {Object} params - Parameters for calculating the position.
 * @param {"start" | "middle" | "end" | "stretch"} params.align - Alignment of the layer.
 * @param {Object} params.contextRect - Bounding rect of the context element.
 * @param {Object} params.contextualLayerSize - Size of the contextual layer.
 * @param {boolean} params.fixed - Whether the position is fixed.
 * @param {Object} params.offsetRect - Offset rect of the layer.
 * @param {"above" | "below" | "end" | "start"} params.position - Position of the layer.
 * @param {Object} params.screenRect - Screen rect boundaries.
 * @returns {Object} - Calculated adjustment and style for the layer.
 */
// eslint-disable-next-line complexity
export function calculateBaseContextualLayerPosition({
  align,
  contextRect,
  contextualLayerSize,
  fixed,
  offsetRect,
  position,
  screenRect,
}) {
  const style = {
    height: undefined,
    position: fixed ? 'fixed' : undefined,
    transform: '',
    width: undefined,
  };

  let translateX = 0;
  let translateY = 0;
  let offsetX = 0;
  let offsetY = 0;

  const contextCenterY = (contextRect.bottom + contextRect.top) / 2;
  const contextCenterX = (contextRect.left + contextRect.right) / 2;
  const startKey = isRTL ? 'start' : 'end';
  const endKey = isRTL ? 'end' : 'start';

  switch (position) {
    case 'above':
      translateY = contextRect.top - offsetRect.top;
      offsetY = '-100%';
      break;
    case 'below':
      translateY = contextRect.bottom - offsetRect.top;
      break;
    case endKey:
      translateX = contextRect.left - offsetRect.left;
      offsetX = '-100%';
      break;
    case startKey:
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
        offsetY = '-50%';
        break;
      case 'end':
        translateY = contextRect.bottom - offsetRect.top;
        offsetY = '-100%';
        break;
      case 'stretch':
        translateY = contextRect.top - offsetRect.top;
        style.height = `${contextRect.bottom - contextRect.top}px`;
        break;
    }
  } else if (position === 'above' || position === 'below') {
    switch (align) {
      case endKey:
        translateX = contextRect.left - offsetRect.left;
        break;
      case 'middle':
        translateX = contextCenterX - offsetRect.left;
        offsetX = '-50%';
        break;
      case startKey:
        translateX = contextRect.right - offsetRect.left;
        offsetX = '-100%';
        break;
      case 'stretch':
        translateX = contextRect.left - offsetRect.left;
        style.width = `${contextRect.right - contextRect.left}px`;
        break;
    }
  }

  let adjustment = 0;
  if (contextualLayerSize) {
    if (position === 'start' || position === 'end') {
      let potentialTop = null;
      switch (align) {
        case 'start':
          potentialTop = contextRect.top;
          break;
        case 'middle':
          potentialTop = contextCenterY - contextualLayerSize.height / 2;
          break;
        case 'end':
          potentialTop = contextRect.bottom - contextualLayerSize.height;
          break;
      }

      if (potentialTop !== null) {
        if (potentialTop < screenRect.top) {
          adjustment = screenRect.top - potentialTop;
        } else if (potentialTop + contextualLayerSize.height > screenRect.bottom) {
          adjustment = screenRect.bottom - potentialTop - contextualLayerSize.height;
        }
      }
      translateY += adjustment;
    } else if (position === 'above' || position === 'below') {
      let potentialLeft = null;
      switch (align) {
        case endKey:
          potentialLeft = contextRect.left;
          break;
        case 'middle':
          potentialLeft = contextCenterX - contextualLayerSize.width / 2;
          break;
        case startKey:
          potentialLeft = contextRect.right - contextualLayerSize.width;
          break;
      }

      if (potentialLeft !== null) {
        if (potentialLeft < screenRect.left) {
          adjustment = screenRect.left - potentialLeft;
        } else if (potentialLeft + contextualLayerSize.width > screenRect.right) {
          adjustment = screenRect.right - potentialLeft - contextualLayerSize.width;
        }
      }
      translateX += adjustment;
    }
  }

  let transform = '';
  if (translateX !== 0 || translateY !== 0) {
    transform += `translate(${Math.round(translateX)}px, ${Math.round(translateY)}px) `;
  }
  if (offsetX !== 0 || offsetY !== 0) {
    transform += `translate(${offsetX}, ${offsetY}) `;
  }
  style.transform = transform;

  return {
    adjustment,
    style,
  };
}
