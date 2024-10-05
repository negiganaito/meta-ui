let g = null;
function h(a) {
  g = a.matches;
}

export function getPrefersReducedMotion() {
  if (!g)
    if (typeof window.matchMedia === 'function') {
      let a = matchMedia('(prefers-reduced-motion: reduce)');
      g = a.matches;
      a.addListener(h);
    } else {
      g = false;
    }
  return g;
}
