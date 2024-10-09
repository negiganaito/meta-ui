import { executionEnvironment } from './executionEnvironment';

let h;
let i = null;
let j = null;
function k() {
  j ||
    (j = Event.listen(window, 'blur', () => {
      (i = null), l();
    }));
}
function l() {
  j && (j.remove(), (j = null));
}
function a(a) {
  (i = c('Event').getKeyCode(a)), k();
}
function b() {
  (i = null), l();
}
if (executionEnvironment.canUseDOM) {
  f = document.documentElement;
  if (f)
    if (f.addEventListener) f.addEventListener('keydown', a, !0), f.addEventListener('keyup', b, !0);
    else if (f.attachEvent) {
      f = f.attachEvent;
      f('onkeydown', a);
      f('onkeyup', b);
    }
}
function d() {
  return !!i;
}
function e() {
  return i;
}

export const KeyStatus = {
  isKeyDown: d,
  getKeyDownCode: e,
};
