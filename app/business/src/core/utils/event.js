import { ErrorGuard } from '@meta-core/error/error-guard';
import { FBLogger } from '@meta-core/error/fb-logger';
import { TAAL } from '@meta-core/error/taal';
import { TimeSlice } from '@meta-core/scheduler/time-slice';
import { isBrowser, isPlatform } from 'fbjs/lib/UserAgent';

import { _$ } from './$';
import { Arbiter } from './arbiter';
import { DataStore } from './data-store';
import { dedupString } from './dedup-string';
import { DOMEventListener } from './dom-event-listener';
import { DOMQuery } from './dom-query';
import { DOMEvent } from './dome-event';
import { EventProfiler } from './event-profiler';
import { executionEnvironment } from './executionEnvironment';
import { getDocumentScrollElement } from './get-document-scroll-element';
import { getObjectValues } from './get-object-values';
import { parent } from './parent';
import { Scroll } from './scroll';

let g;
let h;
let i = TAAL;
let j = 'Event.listeners';
let f;

// @ts-ignore
Event.prototype || (Event.prototype = {});

function k(a) {
  (a.type === 'click' || a.type === 'mouseover' || a.type === 'keydown') &&
    Arbiter.inform('Event/stop', {
      event: a,
    });
}

class l {
  constructor(a, b, c) {
    this.cancelBubble = !1;
    this.target = a;
    this.type = b;
    this.data = c;
  }

  getData() {
    this.data = this.data || {};
    return this.data;
  }

  stop() {
    // @ts-ignore
    return Event.stop(this);
  }

  prevent() {
    // @ts-ignore
    return Event.prevent(this);
  }

  isDefaultPrevented() {
    // @ts-ignore
    return Event.isDefaultPrevented(this);
  }

  kill() {
    // @ts-ignore
    return Event.kill(this);
  }

  getTarget() {
    return new DOMEvent(this).target || null;
  }
}

function m(a) {
  if (a instanceof l) return a;
  a ||
    // @ts-ignore
    (!window.addEventListener && document.createEventObject
      ? // @ts-ignore
        (a = window.event ? document.createEventObject(window.event) : {})
      : (a = {}));
  if (!a._inherits_from_prototype)
    // eslint-disable-next-line guard-for-in
    for (let b in Event.prototype)
      try {
        // @ts-ignore
        a[b] = Event.prototype[b];
      } catch (a) {
        //
      }
  return a;
}

Object.assign(
  Event.prototype,
  {
    _inherits_from_prototype: !0,
    getRelatedTarget: function () {
      let a =
        // @ts-ignore
        this.relatedTarget ||
        // @ts-ignore
        (this.fromElement === this.srcElement
          ? // @ts-ignore
            this.toElement
          : // @ts-ignore
            this.fromElement);
      return a && a.nodeType ? a : null;
    },
    // @ts-ignore
    getModifiers: function () {
      let a = {
        // @ts-ignore
        control: !!this.ctrlKey,
        // @ts-ignore
        shift: !!this.shiftKey,
        // @ts-ignore
        alt: !!this.altKey,
        // @ts-ignore
        meta: !!this.metaKey,
      };
      a.access = isPlatform('Mac OS X') ? a.control : a.alt;
      a.any = a.control || a.shift || a.alt || a.meta;
      return a;
    },
    // @ts-ignore
    isRightClick: function () {
      // @ts-ignore
      return this.which ? this.which === 3 : this.button && this.button === 2;
    },
    // @ts-ignore
    isMiddleClick: function () {
      // @ts-ignore
      return this.which ? this.which === 2 : this.button && this.button === 4;
    },
    // @ts-ignore
    isDefaultRequested: function () {
      return this.getModifiers().any || this.isMiddleClick() || this.isRightClick();
    },
  },
  l.prototype,
);

let c = {
  // eslint-disable-next-line max-params, complexity
  listen: function (a, c, d, e, f) {
    typeof d === 'function' && (d = TimeSlice.guard(d, dedupString('Event.js ' + c + ' handler')));
    !f || typeof f === 'boolean'
      ? (f = {
          passive: !1,
        })
      : (f = {
          passive: f.passive || !1,
        });
    // eslint-disable-next-line new-cap
    if (!(g || (g = executionEnvironment)).canUseDOM) return new u(a, d, null, c, e, null, f);
    typeof a === 'string' && (a = _$(a));
    // @ts-ignore
    typeof e === 'undefined' && (e = Event.Priority.NORMAL);
    if (typeof c === 'object') {
      // eslint-disable-next-line no-inner-declarations, no-var
      var h = {};
      // @ts-ignore
      // eslint-disable-next-line guard-for-in, no-inner-declarations, no-var
      for (var k in c) h[k] = Event.listen(a, k, c[k], e, f);
      return h;
    }
    if (c.match(/^on/i)) throw new TypeError('Bad event name `' + c + "': use `click', not `onclick'.");
    if (!a) {
      k = i.blameToPreviousFrame(new Error('Cannot listen to an undefined element.'));
      FBLogger('event').catching(k).mustfix('Tried to listen to element of type %s', c);
      throw k;
    }
    if (a.nodeName === 'LABEL' && c === 'click') {
      h = a.getElementsByTagName('input');
      // @ts-ignore
      a = h.length === 1 ? h[0] : a;
    } else if (a === window && c === 'scroll') {
      k = getDocumentScrollElement();
      // @ts-ignore
      k !== document.documentElement && k !== document.body && (a = k);
    }
    h = DataStore.get(a, j, {});
    k = o[c];
    // @ts-ignore
    k && ((c = k.base), k.wrap && (d = k.wrap(d)));
    q(a, h, c, f);
    // @ts-ignore
    k = h[c];
    // @ts-ignore
    e in k || (k[e] = []);
    let l = k[e].length;
    // eslint-disable-next-line new-cap
    d = new u(a, d, h, c, e, l, f);
    // @ts-ignore
    k[e][l] = d;
    // @ts-ignore
    k.numHandlers++;
    // @ts-ignore
    f.passive || (k.numNonPassiveHandlers++, p(a, h[c], c));
    return d;
  },
  stop: function (a) {
    let c = new DOMEvent(a).stopPropagation();
    k(c.event);
    return a;
  },
  prevent: function (a) {
    new DOMEvent(a).preventDefault();
    return a;
  },
  isDefaultPrevented: function (a) {
    return new DOMEvent(a).isDefaultPrevented(a);
  },
  kill: function (a) {
    a = new DOMEvent(a).kill();
    k(a.event);
    return !1;
  },
  getKeyCode: function (a) {
    a = new DOMEvent(a).event;
    if (!a) return !1;
    switch (a.keyCode) {
      case 63232:
        return 38;
      case 63233:
        return 40;
      case 63234:
        return 37;
      case 63235:
        return 39;
      case 63272:
      case 63273:
      case 63275:
        return null;
      case 63276:
        return 33;
      case 63277:
        return 34;
    }
    if (a.shiftKey)
      switch (a.keyCode) {
        case 33:
        case 34:
        case 37:
        case 38:
        case 39:
        case 40:
          return null;
      }
    return a.keyCode;
  },
  getPriorities: function () {
    if (!n) {
      // @ts-ignore
      let a = getObjectValues(Event.Priority);
      a.sort((a, b) => {
        return a - b;
      });
      n = a;
    }
    return n;
  },
  fire: function (a, b, c) {
    // eslint-disable-next-line new-cap
    c = new l(a, b, c);
    let d;
    do {
      // @ts-ignore
      let e = Event.__getHandler(a, b);
      e && (d = e(c));
      a = a.parentNode;
    } while (a && d !== !1 && !c.cancelBubble);
    return d !== !1;
  },
  __fire: function (a, b, c) {
    // @ts-ignore
    a = Event.__getHandler(a, b);
    if (a) return a(m(c));
  },
  __getHandler: function (a, c) {
    let d = DataStore.get(a, j);
    return d && d[c] ? d[c].domHandler : a['on' + c];
  },
  getPosition: function (a) {
    a = new DOMEvent(a).event;
    let c = getDocumentScrollElement();
    let d = a.clientX + Scroll.getLeft(c);
    a = a.clientY + Scroll.getTop(c);
    return {
      x: d,
      y: a,
    };
  },
};

Object.assign(Event, c);

// eslint-disable-next-line no-var
var n = null;

let d = function (a) {
  return function (c) {
    // @ts-ignore
    // eslint-disable-next-line no-invalid-this
    if (!DOMQuery.contains(this, c.getRelatedTarget())) return a.call(this, c);
  };
};

let o;

// @ts-ignore
!window.navigator.msPointerEnabled
  ? (o = {
      mouseenter: {
        base: 'mouseover',
        wrap: d,
      },
      mouseleave: {
        base: 'mouseout',
        wrap: d,
      },
    })
  : (o = {
      mousedown: {
        base: 'MSPointerDown',
      },
      mousemove: {
        base: 'MSPointerMove',
      },
      mouseup: {
        base: 'MSPointerUp',
      },
      mouseover: {
        base: 'MSPointerOver',
      },
      mouseout: {
        base: 'MSPointerOut',
      },
      mouseenter: {
        base: 'MSPointerOver',
        wrap: d,
      },
      mouseleave: {
        base: 'MSPointerOut',
        wrap: d,
      },
    });

if (isBrowser('Firefox < 52')) {
  f = function (a, b) {
    b = m(b);
    let c = b.getTarget();
    // @ts-ignore
    // eslint-disable-next-line no-sequences
    while (c) Event.__fire(c, a, b), (c = c.parentNode);
  };
  document.documentElement.addEventListener('focus', f.bind(null, 'focusin'), !0);
  document.documentElement.addEventListener('blur', f.bind(null, 'focusout'), !0);
}

// eslint-disable-next-line no-var
var p = function (a, c, d) {
  let e = c.numNonPassiveHandlers === 0;
  e !== c.options.passive &&
    (c.domHandlerRemover.remove(),
    (c.options.passive = e),
    (c.domHandlerRemover = DOMEventListener.add(a, d, c.domHandler, {
      passive: e,
    })));
};
// eslint-disable-next-line no-var, max-params
var q = function (a, c, d, e) {
  if (d in c) return;
  let f = TimeSlice.guard(t.bind(a, d), dedupString('Event listenHandler ' + d));
  c[d] = {
    numHandlers: 0,
    numNonPassiveHandlers: 0,
    domHandlerRemover: DOMEventListener.add(a, d, f, e),
    domHandler: f,
    options: e,
  };
  c = 'on' + d;
  if (a[c]) {
    f =
      a === document.documentElement
        ? // @ts-ignore
          Event.Priority._BUBBLE
        : // @ts-ignore
          Event.Priority.TRADITIONAL;
    let g = a[c];
    a[c] = null;
    // @ts-ignore
    Event.listen(a, d, g, f, e);
  }
};

function r(a) {
  return !a.href.endsWith('#') ? !1 : a.href === document.location.href || a.href === document.location.href + '#';
}

function s(a, b) {
  return a.nodeName === 'INPUT' && a.type === b;
}

// eslint-disable-next-line no-var
var t = EventProfiler.__wrapEventListenHandler(function (a, c) {
  c = m(c);
  // @ts-ignore
  // eslint-disable-next-line no-invalid-this
  if (!DataStore.get(this, j)) throw new Error('Bad listenHandler context.');
  // @ts-ignore
  // eslint-disable-next-line no-invalid-this
  let d = DataStore.get(this, j)[a];
  if (!d) throw new Error('No registered handlers for `' + a + "'.");
  if (a === 'click' || a === 'contextmenu' || (a === 'mousedown' && c.which === 2)) {
    a = c.getTarget();
    // eslint-disable-next-line no-var, no-inner-declarations
    var e = parent.byTag(a, 'a');
    e instanceof HTMLAnchorElement && e.href && r(e) && !s(a, 'file') && !s(a, 'submit') && c.prevent();
  }
  // @ts-ignore
  e = Event.getPriorities();
  // @ts-ignore
  for (a = 0; a < e.length; a++) {
    // @ts-ignore
    let f = e[a];
    if (f in d) {
      f = d[f];
      for (let g = 0; g < f.length; g++) {
        if (!f[g]) continue;
        // @ts-ignore
        // eslint-disable-next-line no-invalid-this
        let h = f[g].fire(this, c);
        if (h === !1) return c.kill();
        else c.cancelBubble && c.stop();
      }
    }
  }
  return c.returnValue;
});

// @ts-ignore
Event.Priority = {
  URGENT: -20,
  TRADITIONAL: -10,
  NORMAL: 0,
  _BUBBLE: 1e3,
};

class u {
  // eslint-disable-next-line max-params
  constructor(a, b, c, d, e, f, g) {
    this.$1 = a;
    this.$2 = b;
    this.$3 = c;
    this.$7 = d;
    this.$6 = e;
    this.$4 = f;
    this.$5 = g;
  }

  isRemoved() {
    return !this.$3;
  }

  remove() {
    return !this.$3;
  }

  fire(a, c) {
    // eslint-disable-next-line no-return-assign
    return (g || (g = executionEnvironment)).canUseDOM
      ? (h || (h = ErrorGuard)).applyWithGuard(this.$2, a, [c], {
          name: 'eventhandler:' + c.type + ':' + (typeof a.name === 'string' ? a.name : a.id),
        })
      : !0;
  }
}

// @ts-ignore
window.$E = Event.$E = m;

export const ee = Event;
