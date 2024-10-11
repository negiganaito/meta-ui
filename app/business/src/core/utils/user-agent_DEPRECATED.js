/* eslint-disable camelcase */
let g = !1;
let h;
let i;
let j;
let k;
let l;
let m;
let n;
let o;
let p;
let q;
let r;
let s;
let t;
let u;
let v;
let w;

function x() {
  if (g) return;
  g = !0;
  let a = navigator.userAgent;
  let b =
    /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(
      a,
    );
  let c = /(Mac OS X)|(Windows)|(Linux)/.exec(a);
  s = /\b(iPhone|iP[ao]d)/.exec(a);
  t = /\b(iP[ao]d)/.exec(a);
  q = /Android/i.exec(a);
  u = /FBAN\/\w+;/i.exec(a);
  v = /FBAN\/mLite;/i.exec(a);
  w = /Mobile/i.exec(a);
  r = !!/Win64/.exec(a);
  if (b) {
    h = b[1] ? parseFloat(b[1]) : b[5] ? parseFloat(b[5]) : NaN;
    // @ts-ignore
    h && document && document.documentMode && (h = document.documentMode);
    // eslint-disable-next-line no-inner-declarations, no-var
    var d = /(?:Trident\/(\d+.\d+))/.exec(a);
    m = d ? parseFloat(d[1]) + 4 : h;
    i = b[2] ? parseFloat(b[2]) : NaN;
    j = b[3] ? parseFloat(b[3]) : NaN;
    k = b[4] ? parseFloat(b[4]) : NaN;
    k ? ((b = /(?:Chrome\/(\d+\.\d+))/.exec(a)), (l = b && b[1] ? parseFloat(b[1]) : NaN)) : (l = NaN);
  } else h = i = j = l = k = NaN;
  if (c) {
    if (c[1]) {
      d = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(a);
      n = d ? parseFloat(d[1].replace('_', '.')) : !0;
    } else n = !1;
    o = !!c[2];
    p = !!c[3];
  } else n = o = p = !1;
}
function ie() {
  return x() || h;
}
function ieCompatibilityMode() {
  return x() || m > h;
}
function ie64() {
  return ie() && r;
}
function firefox() {
  return x() || i;
}
function opera() {
  return x() || j;
}
function webkit() {
  return x() || k;
}
function safari() {
  return webkit();
}
function chrome() {
  return x() || l;
}
function windows() {
  return x() || o;
}
function osx() {
  return x() || n;
}
function linux() {
  return x() || p;
}
function iphone() {
  return x() || s;
}
function mobile() {
  return x() || s || t || q || w;
}
function nativeApp() {
  return x() || v !== null ? null : u;
}
function android() {
  return x() || q;
}
function ipad() {
  return x() || t;
}

// @ts-ignore
export const UserAgent_DEPRECATED = {
  android,
  chrome,
  firefox,
  ie,
  ie64,
  ieCompatibilityMode,
  ipad,
  iphone,
  linux,
  mobile,
  nativeApp,
  opera,
  osx,
  safari,
  webkit,
  windows,
};
