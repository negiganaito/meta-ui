const TimerTypes = {
  ANIMATION_FRAME: 'ANIMATION_FRAME',
  IDLE_CALLBACK: 'IDLE_CALLBACK',
  IMMEDIATE: 'IMMEDIATE',
  INTERVAL: 'INTERVAL',
  TIMEOUT: 'TIMEOUT',
};

const timerStorage = {};
Object.keys(TimerTypes).forEach((key) => {
  timerStorage[key] = {};
});

export const TimerStorage = {
  ...TimerTypes,

  set: function (type, id) {
    timerStorage[type][id] = true;
  },

  unset: function (type, id) {
    delete timerStorage[type][id];
  },

  clearAll: function (type, callback) {
    Object.keys(timerStorage[type]).forEach(callback);
    timerStorage[type] = {};
  },

  getStorages: function () {
    return {};
  },
};
