const { uniqueID } = require('@meta-core/utils/unique-id');

function createItemKey() {
  return 'geo-toast-' + uniqueID();
}

function addItem(items, toast, config) {
  return [].concat(items, [
    {
      toast,
      config,
    },
  ]);
}

function hideItem(items, key) {
  return items.map((item) => {
    return item.config.key === key ? { toast: item.toast, config: { ...item.config, isVisible: false } } : item;
  });
}

function hideAllItems(items) {
  return items.map((item) => ({
    toast: { ...item.toast },
    config: { ...item.config, isVisible: false },
  }));
}

function removeItem(items, key) {
  return items.filter((item) => item.config.key !== key);
}

function itemsReducer(items, action) {
  switch (action.type) {
    case 'add':
      return addItem(items, action.toast, {
        ...action.config,
        key: action.key,
        onAfterHide: action.onAfterHide,
      });
    case 'remove':
      return removeItem(items, action.key);
    case 'hide':
      return hideItem(items, action.key);
    case 'hideAll':
      return hideAllItems(items);
    default:
      return items;
  }
}

const globalToasterSubscriptions = new Map();

function updateGlobalToasterSubscribers(newData) {
  for (const callback of globalToasterSubscriptions.values()) {
    callback(newData);
  }
}

export const GeoPrivateToasterUtils = {
  createItemKey,
  itemsReducer,
  globalToasterSubscriptions,
  updateGlobalToasterSubscribers,
};
