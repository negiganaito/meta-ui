class DOMRectReadOnly_ {
  constructor() {
    this.bottom = 0;
    this.height = 0;
    this.left = 0;
    this.right = 0;
    this.top = 0;
    this.width = 0;
    this.x = 0;
    this.y = 0;
  }

  static fromRect(rect) {
    rect = rect || { height: 0, width: 0, x: 0, y: 0 };
    const { height, width, x, y } = rect;
    const domRect = new DOMRectReadOnly_();
    domRect.x = x;
    domRect.y = y;
    domRect.width = width;
    domRect.height = height;
    domRect.top = y;
    domRect.bottom = y + height;
    domRect.right = x + width;
    domRect.left = x;
    return domRect;
  }
}

// Check if window.DOMRectReadOnly exists
const isDOMRectReadOnlyInWindow = 'DOMRectReadOnly' in window;
const fromRectFunction = isDOMRectReadOnlyInWindow ? window.DOMRectReadOnly.fromRect : undefined;
const isValidFromRectFunction = !!fromRectFunction && typeof fromRectFunction === 'function';

// Use the native DOMRectReadOnly if available, otherwise use the custom class
const DOMRectClass = isValidFromRectFunction ? window.DOMRectReadOnly : DOMRectReadOnly_;

// Export the class as the default export
export const DOMRectReadOnly = DOMRectClass;
