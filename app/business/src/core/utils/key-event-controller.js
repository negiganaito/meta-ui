/* eslint-disable no-return-assign */
/* eslint-disable new-cap */
/* eslint-disable no-undef */
/* eslint-disable no-invalid-this */

let h;
let i = null;
let j = {
  BACKSPACE: [8],
  TAB: [9],
  RETURN: [13],
  ALT: [18],
  ESCAPE: [27],
  LEFT: [37, 63234],
  UP: [38, 63232],
  RIGHT: [39, 63235],
  DOWN: [40, 63233],
  NUMPAD_ADD: [43],
  NUMPAD_SUBSTRACT: [45],
  DELETE: [46],
  COMMA: [188],
  PERIOD: [190],
  SLASH: [191],
  '`': [192],
  '[': [219],
  ']': [221],
  PAGE_UP: [33],
  PAGE_DOWN: [34],
  END: [35],
  HOME: [36],
  SPACE: [32],
  KP_DOT: [46, 110],
  '-': [189],
  '=': [187],
  FORWARD_SLASH: [191],
};

let k =
  ((a = {}),
  (a[8] = 1),
  (a[9] = 1),
  (a[13] = 1),
  (a[27] = 1),
  (a[32] = 1),
  (a[37] = 1),
  (a[63234] = 1),
  (a[38] = 1),
  (a[63232] = 1),
  (a[39] = 1),
  (a[63235] = 1),
  (a[40] = 1),
  (a[63233] = 1),
  (a[46] = 1),
  a);

const b = (function () {
  function a() {
    let a = this;
    this.handlers = {};
    ['keyup', 'keydown', 'keypress'].forEach((b) => {
      return document.addEventListener(b, a.onkeyevent.bind(a, 'on' + b));
    });
  }
  let b = a.prototype;
  b.mapKey = function (a) {
    // eslint-disable-next-line no-self-assign
    a = a;
    if (/^[0-9]$/.test(String(a))) {
      typeof a !== 'number' && (a = a.charCodeAt(0) - 48);
      return [48 + a, 96 + a];
    }
    a = String(a);
    let b = j[a.toUpperCase()];
    return b ? b : [a.toUpperCase().charCodeAt(0)];
  };
  b.onkeyevent = function (a, b) {
    let d = b;
    d = c('Event').$E(d);
    b = this.handlers[d.keyCode] || this.handlers[d.which];
    if (b)
      for (let e = 0; e < b.length; e++) {
        // eslint-disable-next-line no-inner-declarations, no-var
        var f = b[e].callback;
        let g = b[e].filter;
        try {
          if (!g || g(d, a)) {
            g = (function () {
              let b = f(d, a);
              let e = d.which || d.keyCode;
              c('Bootloader').loadModules(
                ['KeyEventTypedLogger'],
                (a) => {
                  new a()
                    .setAction('key_shortcut')
                    .setKey(d.key || '')
                    .setKeyChar(String.fromCharCode(e))
                    .setKeyCode(e)
                    .addToExtraData('is_trusted', d.isTrusted)
                    .log();
                },
                'KeyEventController',
              );
              if (b === !1)
                return {
                  v: c('Event').kill(d),
                };
            })();
            if (typeof g === 'object') return g.v;
          }
        } catch (a) {}
      }
    return !0;
  };
  b.resetHandlers = function () {
    for (let a in this.handlers)
      if (Object.prototype.hasOwnProperty.call(this.handlers, a)) {
        let b = this.handlers[a].filter((a) => {
          return a.preserve();
        });
        b.length ? (this.handlers[a] = b) : delete this.handlers[a];
      }
  };
  a.getInstance = function () {
    return i || (i = new a());
  };
  a.defaultFilter = function (b, d) {
    b = c('Event').$E(b);
    return a.filterEventTypes(b, d) && a.filterEventTargets(b, d) && a.filterEventModifiers(b, d);
  };
  a.filterEventTypes = function (a, b) {
    return b === 'onkeydown' ? !0 : !1;
  };
  a.filterEventTargets = function (a, b) {
    b = a.getTarget();
    return (
      !c('isElementInteractive')(b) ||
      (a.keyCode in k &&
        ((d('DOMQuery').isNodeOfType(b, ['input', 'textarea']) && b.value.length === 0) ||
          (c('isContentEditable')(b) && c('getElementText')(b).length === 0)))
    );
  };
  a.filterEventModifiers = function (a, b) {
    return a.ctrlKey || a.altKey || a.metaKey || a.repeat ? !1 : !0;
  };
  // eslint-disable-next-line max-params
  a.registerKeyAcrossTransitions = function (b, d, e, f) {
    e === void 0 && (e = a.defaultFilter);
    f === void 0 && (f = !1);
    return a.registerKey(b, d, e, f, c('emptyFunction').thatReturnsTrue);
  };
  // eslint-disable-next-line max-params
  a.registerKey = function (b, e, f, g, i) {
    f === void 0 && (f = a.defaultFilter);
    g === void 0 && (g = !1);
    i === void 0 && (i = c('emptyFunction').thatReturnsFalse);
    // eslint-disable-next-line no-self-assign
    b = b;
    let j = a.getInstance();
    let k = b === null ? [] : j.mapKey(b);
    (h || (h = c('isEmpty')))(j.handlers) && d('Run').onLeave(j.resetHandlers.bind(j));
    let l = {};
    for (let m = 0; m < k.length; m++) {
      b = String(k[m]);
      (!j.handlers[b] || g) && (j.handlers[b] = []);
      let n = {
        callback: e,
        filter: f,
        preserve: i,
      };
      l[b] = n;
      j.handlers[b].push(n);
    }
    return {
      remove: function () {
        // eslint-disable-next-line guard-for-in
        for (let a in l) {
          if (j.handlers[a] && j.handlers[a].length) {
            let b = j.handlers[a].indexOf(l[a]);
            b >= 0 && j.handlers[a].splice(b, 1);
          }
          delete l[a];
        }
      },
    };
  };
  a.registerKeyForButtonCallback = function (b, c) {
    return a.registerKey(b, () => {
      c.click();
      return !1;
    });
  };
  return a;
})();

export const KeyEventController = b;
