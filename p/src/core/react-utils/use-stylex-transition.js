import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { useForceUpdate, useIsMountedRef, useStable } from '@meta-ui/core/hooks';
import { differenceSets, mapMapToArray, mapSet, nullthrows, sortBy } from '@meta-ui/core/utils';

function useTimeouts() {
  const timeouts = useStable(() => new Map());

  useEffect(() => {
    return () => {
      Array.from(timeouts.values()).forEach(clearTimeout);
    };
  }, []);

  return timeouts;
}

function useTriggerUpdate() {
  const forceUpdate = useForceUpdate();
  const isMountedRef = useIsMountedRef();

  return useStable(() => () => {
    if (isMountedRef.current) {
      forceUpdate();
    }
  });
}

export function useStyleXTransition(items, getKey, config) {
  const triggerUpdate = useTriggerUpdate();
  const timeouts = useTimeouts();
  const previousItemsRef = useRef(new Map());
  const isInitialRender = useRef(true);
  const enterStyle = config.enter;
  const leaveStyle = config.leave;
  const baseStyle = config.base;
  const duration = config.duration ?? 100;
  const durationIn = config.durationIn;
  const durationOut = config.durationOut;
  const onEnter = config.onEnter;
  const onLeave = config.onLeave;
  const onEnterComplete = config.onEnterComplete;
  const onLeaveComplete = config.onLeaveComplete;

  const createItemObject = useCallback(
    (key, item, order) => ({
      item,
      key,
      order,
      xstyle: [baseStyle, isInitialRender.current && enterStyle],
      style: {
        transitionDuration: `${durationIn ?? duration}ms`,
      },
    }),
    [baseStyle, enterStyle, durationIn, duration],
  );

  const newItemsMap = new Map(items.map((item, index) => [getKey(item), { item, order: index }]));

  const enteringKeys = differenceSets(new Set(newItemsMap.keys()), new Set(previousItemsRef.current.keys()));
  const leavingKeys = differenceSets(new Set(previousItemsRef.current.keys()), new Set(newItemsMap.keys()));

  const orderFixes = new Map();
  const sortedLeavingOrders = Array.from(
    mapSet(leavingKeys, (key) => nullthrows(previousItemsRef.current.get(key)).order),
  ).sort((a, b) => a - b);

  sortedLeavingOrders.forEach((order, index) => {
    order -= index;
    while (order < items.length) {
      const fixCount = orderFixes.get(order) ?? 0;
      orderFixes.set(order, fixCount + 1);
      order += 1;
    }
  });

  const updatedItems = sortBy(
    [
      ...mapMapToArray(previousItemsRef.current, (prevItem) => {
        const newItem = newItemsMap.get(prevItem.key);
        if (newItem) {
          return { ...prevItem, item: newItem.item, order: newItem.order + (orderFixes.get(newItem.order) ?? 0) };
        }
        return prevItem;
      }),
      ...Array.from(
        mapSet(enteringKeys, (key) => {
          const newItem = nullthrows(newItemsMap.get(key));
          return createItemObject(key, newItem.item, newItem.order);
        }),
      ),
    ],
    (item) => item.order,
  );

  useLayoutEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    }

    items.forEach((item, index) => {
      const key = getKey(item);
      const prevItem = previousItemsRef.current.get(key);
      const currentItem = prevItem ?? createItemObject(key, item, index);
      if (enteringKeys.has(key)) {
        requestAnimationFrame(() => {
          currentItem.xstyle = [baseStyle, enterStyle];
          clearTimeout(timeouts.get(key));
          timeouts.set(
            key,
            // eslint-disable-next-line max-nested-callbacks
            setTimeout(() => {
              onEnterComplete && onEnterComplete(item);
            }, durationIn ?? duration),
          );
          // eslint-disable-next-line max-nested-callbacks
          setImmediate(() => {
            currentItem.xstyle = [baseStyle, enterStyle];
            onEnter && onEnter(item);
            triggerUpdate();
          });
        });
      }
      currentItem.item = item;
      currentItem.order = index + (orderFixes.get(index) ?? 0);
      previousItemsRef.current.set(key, currentItem);
    });

    Array.from(leavingKeys.values()).forEach((key) => {
      const leavingItem = previousItemsRef.current.get(key);
      if (!leavingItem) return;
      const item = leavingItem.item;
      if (leavingItem.status !== 'leaving') {
        leavingItem.status = 'leaving';
        leavingItem.style = {
          transitionDuration: `${durationOut ?? duration}ms`,
        };
        requestAnimationFrame(() => {
          leavingItem.xstyle = [baseStyle, leaveStyle];
          clearTimeout(timeouts.get(key));
          timeouts.set(
            key,
            // eslint-disable-next-line max-nested-callbacks
            setTimeout(() => {
              previousItemsRef.current.delete(key);
              onLeaveComplete && onLeaveComplete(item);
              triggerUpdate();
            }, durationOut ?? duration),
          );
          // eslint-disable-next-line max-nested-callbacks
          setImmediate(() => {
            onLeave && onLeave(item);
            triggerUpdate();
          });
        });
      }
    });
  });

  return updatedItems;
}
