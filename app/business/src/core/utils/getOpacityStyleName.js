let g = !1;
let h = null;
export function getOpacityStyleName() {
  if (!g) {
    if (document.body && 'opacity' in document.body.style) h = 'opacity';
    else {
      let a = document.createElement('div');
      a.style.filter = 'alpha(opacity=100)';
      a.style.filter && (h = 'filter');
    }
    g = !0;
  }
  return h;
}
