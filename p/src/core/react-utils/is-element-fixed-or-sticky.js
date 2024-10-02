import { getComputedStyle } from './get-computed-style';

export function isElementFixedOrSticky(a) {
  let b = a;
  while (b && b !== a.ownerDocument) {
    let d = getComputedStyle(b);
    if (!d) return !1;
    d = d.getPropertyValue('position');
    if (d === 'fixed' || d === 'sticky') return !0;
    b = b.parentElement;
  }
  return !1;
}
