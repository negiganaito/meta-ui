/* eslint-disable no-var */
/* eslint-disable no-invalid-this */
/* eslint-disable new-cap */
/* eslint-disable no-undef */
/* eslint-disable no-sequences */
/* eslint-disable no-inner-declarations */
import { ErrorGuard } from '@meta-core/error/error-guard';
import { invariant } from '@meta-core/error/invariant';
import { EventEmitter } from '@meta-core/event-interaction/event-emitter';
import { EventEmitterWithHolding } from '@meta-core/event-interaction/event-emitter-with-holding';
import { EventHolder } from '@meta-core/event-interaction/event-holder';

import { ArbiterToken } from './arbiter-token';
import { CallbackDependencyManager } from './callback-dependency-manager';

const inheritsLoose = function (a, b) {
  Object.assign(a, b);
  a.prototype = Object.create(b && b.prototype);
  a.prototype.constructor = a;
  a.__superConstructor__ = b;
  return b;
};

function j(a) {
  return Array.isArray(a) ? a : [a];
}
function k(a) {
  return a instanceof l || a === l ? a : l;
}
var l = (function () {
  function a() {
    let a = new EventEmitter();
    this.$3 = new m();
    this.$2 = new EventEmitterWithHolding(a, this.$3);
    this.$1 = new CallbackDependencyManager();
    this.$4 = [];
  }
  let b = a.prototype;
  b.subscribe = function (a, b, d) {
    let e = this;
    a = j(a);
    a.forEach((a) => {
      (a && typeof a === 'string') || invariant(0, 1966, a);
    });
    typeof b === 'function' || invariant(0, 1967, b);
    d = d || 'all';
    d === 'new' || d === 'all' || invariant(0, 1968, d);
    a = a.map((a) => {
      let c = function (c) {
        return e.$5(b, a, c);
      };
      c.__SMmeta = b.__SMmeta;
      if (d === 'new') return e.$2.addListener(a, c);
      e.$4.push({});
      c = e.$2.addRetroactiveListener(a, c);
      e.$4.pop();
      return c;
    });
    return new ArbiterToken(this, a);
  };
  b.$5 = function (a, b, d) {
    let e = this.$4[this.$4.length - 1];
    if (e[b] === !1) return;
    a = ErrorGuard.applyWithGuard(a, null, [b, d]);
    a === !1 && this.$2.releaseCurrentEvent();
    e[b] = a;
  };
  b.unsubscribeCurrentSubscription = function () {
    this.$2.removeCurrentListener();
  };
  b.releaseCurrentPersistentEvent = function () {
    this.$2.releaseCurrentEvent();
  };
  b.subscribeOnce = function (a, b, c) {
    let d = this;
    a = this.subscribe(
      a,
      (a, c) => {
        d.unsubscribeCurrentSubscription();
        return b(a, c);
      },
      c,
    );
    return a;
  };
  b.unsubscribe = function (a) {
    a.isForArbiterInstance(this) || invariant(0, 1969), a.unsubscribe();
  };
  b.inform = function (a, b, c) {
    let d = Array.isArray(a);
    a = j(a);
    c = c || 'event';
    let e = c === 'state' || c === 'persistent';
    this.$4.push({});
    for (let f = 0; f < a.length; f++) {
      // eslint-disable-next-line no-var
      var g = a[f];
      g || invariant(0, 1970, g);
      this.$3.setHoldingBehavior(g, c);
      this.$2.emitAndHold(g, b);
      this.$6(g, b, e);
    }
    g = this.$4.pop();
    return d ? g : g[a[0]];
  };
  b.query = function (a) {
    let b = this.$3.getHoldingBehavior(a);
    !b || b === 'state' || invariant(0, 1971, a);
    b = null;
    this.$3.emitToListener(a, (a) => {
      b = a;
    });
    return b;
  };
  b.registerCallback = function (a, b) {
    if (typeof a === 'function') return this.$1.registerCallback(a, b);
    else return this.$1.addDependenciesToExistingCallback(a, b);
  };
  b.$6 = function (a, b, c) {
    if (b === null) return;
    c ? this.$1.satisfyPersistentDependency(a) : this.$1.satisfyNonPersistentDependency(a);
  };
  a.subscribe = function (b, c, d) {
    return a.prototype.subscribe.apply(k(this), arguments);
  };
  a.unsubscribeCurrentSubscription = function () {
    return a.prototype.unsubscribeCurrentSubscription.apply(k(this));
  };
  a.releaseCurrentPersistentEvent = function () {
    return a.prototype.releaseCurrentPersistentEvent.apply(k(this));
  };
  a.subscribeOnce = function (b, c, d) {
    return a.prototype.subscribeOnce.apply(k(this), arguments);
  };
  a.unsubscribe = function (b) {
    return a.prototype.unsubscribe.apply(k(this), arguments);
  };
  a.inform = function (b, c, d) {
    return a.prototype.inform.apply(k(this), arguments);
  };
  a.informSingle = function (b, c, d) {
    return a.prototype.inform.apply(k(this), arguments);
  };
  a.query = function (b) {
    return a.prototype.query.apply(k(this), arguments);
  };
  a.registerCallback = function (b, c) {
    return a.prototype.registerCallback.apply(k(this), arguments);
  };
  a.$6 = function (b, c, d) {
    return a.prototype.$6.apply(k(this), arguments);
  };
  a.$5 = function (b, c, d) {
    return a.prototype.$5.apply(k(this), arguments);
  };
  return a;
})();

let m = (function (b) {
  inheritsLoose(a, b);
  function a() {
    var a;
    a = b.call(this) || this;
    a.$ArbiterEventHolder1 = {};
    return a;
  }
  var c = a.prototype;
  c.setHoldingBehavior = function (a, b) {
    this.$ArbiterEventHolder1[a] = b;
  };
  c.getHoldingBehavior = function (a) {
    return this.$ArbiterEventHolder1[a];
  };
  c.holdEvent = function (a) {
    var c = this.$ArbiterEventHolder1[a];
    c !== 'persistent' && this.$ArbiterEventHolder2(a);
    if (c !== 'event') {
      var d;
      for (var e = arguments.length, f = new Array(e > 1 ? e - 1 : 0), g = 1; g < e; g++) f[g - 1] = arguments[g];
      // eslint-disable-next-line no-return-assign
      return (d = b.prototype.holdEvent).call.apply(d, [this, a].concat(f));
    }
    return void 0;
  };
  c.$ArbiterEventHolder2 = function (a) {
    this.emitToListener(a, this.releaseCurrentEvent, this);
  };
  c.releaseEvent = function (a) {
    a && b.prototype.releaseEvent.call(this, a);
  };
  return a;
})(EventHolder);

export const Arbiter = l.call(l);
