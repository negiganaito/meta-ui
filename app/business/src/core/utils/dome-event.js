import { invariant } from '@meta-core/error/invariant';

export class DOMEvent {
  constructor(a) {
    this.event = a || window.event;
    // eslint-disable-next-line valid-typeof
    typeof this.event.srcElement !== 'unknown' || invariant(0, 5798);
    this.target = this.event.target || this.event.srcElement;
  }

  preventDefault = function () {
    let a = this.event;
    a.preventDefault
      ? (a.preventDefault(), 'defaultPrevented' in a || (a.defaultPrevented = !0))
      : (a.returnValue = !1);
    return this;
  };

  isDefaultPrevented = function () {
    let a = this.event;
    return 'defaultPrevented' in a ? a.defaultPrevented : a.returnValue === !1;
  };

  stopPropagation = function () {
    let a = this.event;
    a.stopPropagation ? a.stopPropagation() : (a.cancelBubble = !0);
    return this;
  };

  kill = function () {
    this.stopPropagation().preventDefault();
    return this;
  };

  static killThenCall = function (b) {
    return function (c) {
      new DOMEvent(c).kill();
      return b();
    };
  };
}
