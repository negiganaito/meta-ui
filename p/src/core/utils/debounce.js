import { debounceCore } from './debounce-core';

// eslint-disable-next-line max-params
export function debounce(a, b = 100, d, e, f) {
  // The debouncing function uses `setTimeout` with the option to not call in the leading edge (based on `e`)
  const g = function (a, b, d) {
    return setTimeout(a, b, d, !e); // Adds the timeout delay
  };

  // Uses the core debounce function (`debounceCore`), passing in the timeout logic and clear function
  return debounceCore(a, b, d, g, clearTimeout, f);
}
