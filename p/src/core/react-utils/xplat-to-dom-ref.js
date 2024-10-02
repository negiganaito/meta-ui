function _xplatToDOMRef(target) {
  return function (node) {
    node = window.HTMLElement && node instanceof window.HTMLElement ? node : null;
    typeof target === 'function' ? target(node) : target && typeof target === 'object' && (target.current = node);
  };
}
// TODO
// const h = window.HTMLInputElement

function xplatToInputRef(target) {
  return function (node) {
    node = window.HTMLInputElement && node instanceof window.HTMLInputElement ? node : null;
    typeof target === 'function' ? target(node) : target && typeof target === 'object' && (target.current = node);
  };
}

export const xplatToDOMRef = {
  xplatToDOMRef: _xplatToDOMRef,
  xplatToInputRef,
};
