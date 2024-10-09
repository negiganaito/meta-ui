import { Arbiter } from './arbiter';
import { guid } from './guid';

let h = 'arbiter$' + guid();
let i = Object.prototype.hasOwnProperty;
export const ArbiterMixin = {
  _getArbiterInstance: function () {
    // eslint-disable-next-line no-return-assign
    return i.call(this, h) ? this[h] : (this[h] = new Arbiter());
  },
  inform: function (a, b, c) {
    return this._getArbiterInstance().inform(a, b, c);
  },
  subscribe: function (a, b, c) {
    return this._getArbiterInstance().subscribe(a, b, c);
  },
  subscribeOnce: function (a, b, c) {
    return this._getArbiterInstance().subscribeOnce(a, b, c);
  },
  unsubscribe: function (a) {
    this._getArbiterInstance().unsubscribe(a);
  },
  unsubscribeCurrentSubscription: function () {
    this._getArbiterInstance().unsubscribeCurrentSubscription();
  },
  releaseCurrentPersistentEvent: function () {
    this._getArbiterInstance().releaseCurrentPersistentEvent();
  },
  registerCallback: function (a, b) {
    return this._getArbiterInstance().registerCallback(a, b);
  },
  query: function (a) {
    return this._getArbiterInstance().query(a);
  },
};
