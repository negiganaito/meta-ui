let g = (function () {
  function a(a) {
    // eslint-disable-next-line no-invalid-this, no-sequences
    (this.$1 = a), (this.$2 = !1);
  }
  let b = a.prototype;
  b.enable = function () {
    this.$2 || ((this.$2 = !0), this.$1.enable());
  };
  b.disable = function () {
    this.$2 && ((this.$2 = !1), this.$1.disable());
  };
  return a;
})();
let h = 1;
function i(a) {
  a.__BEHAVIOR_ID || (a.__BEHAVIOR_ID = h++);
  return a.__BEHAVIOR_ID;
}
export const BehaviorsMixin = {
  enableBehavior: function (a) {
    this._behaviors || (this._behaviors = {});
    let b = i(a);
    // eslint-disable-next-line new-cap
    this._behaviors[b] || (this._behaviors[b] = new g(new a(this)));
    this._behaviors[b].enable();
    return this;
  },
  disableBehavior: function (a) {
    if (this._behaviors) {
      a = i(a);
      this._behaviors[a] && this._behaviors[a].disable();
    }
    return this;
  },
  enableBehaviors: function (a) {
    a.forEach(this.enableBehavior, this);
    return this;
  },
  destroyBehaviors: function () {
    if (this._behaviors) {
      // eslint-disable-next-line guard-for-in
      for (let a in this._behaviors) this._behaviors[a].disable();
      this._behaviors = {};
    }
  },
  hasBehavior: function (a) {
    return this._behaviors && i(a) in this._behaviors;
  },
};
