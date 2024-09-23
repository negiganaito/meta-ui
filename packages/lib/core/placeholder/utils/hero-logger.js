import { performanceNowAtAppStart, uuidv4 } from '@meta-core/utils';
import performanceNow from 'fbjs/lib/performanceNow';

import { HeroTracingPlaceholder } from '../hero-tracing-placeholder';

import { HeroTracingCoreConfig } from './hero-tracing-core-config';
import { HeroTracingCoreDependencies } from './hero-tracing-core-dependencies';
import { InteractionTracingMetrics } from './interaction-tracing-metrics';

let userTimingUtils;
let placeholderStartTimes = {};
let interactionCounter = 0;
const placeholderSubscribers = new Map();

function subscribeToPlaceholders(callback) {
  const id = interactionCounter++;
  placeholderSubscribers.set(id, callback);
  return function unsubscribe() {
    placeholderSubscribers.delete(id);
  };
}

function genHeroInteractionUUIDAndMarkStart(uuid, pageletStack) {
  uuid = uuid || uuidv4();
  if (HeroTracingPlaceholder.HeroPendingPlaceholderTracker.isInteractionActive(uuid)) {
    return uuid;
  }
  markStart(uuid, 'Interaction Start', pageletStack);
  HeroTracingPlaceholder.HeroPendingPlaceholderTracker.addInteraction(uuid);
  return uuid;
}

function cleanupHeroInteraction(uuid) {
  HeroTracingPlaceholder.HeroPendingPlaceholderTracker.removeInteraction(uuid);
}

function endHeroInteraction(uuid, status, cancelReason) {
  const metrics = InteractionTracingMetrics.get(uuid);
  if (metrics && status === 'ABORT') {
    InteractionTracingMetrics.addAnnotationInt(uuid, 'aborted', 1);
    InteractionTracingMetrics.addAnnotation(uuid, 'cancelType', `aborted:${cancelReason || 'unknown'}`);
  }
  InteractionTracingMetrics.complete(uuid);
}

// eslint-disable-next-line max-params
function markStart(uuid, marker, time, options) {
  const markerId = `${marker}${uuid}`;
  placeholderStartTimes[markerId] = time || performanceNow();
  if (options?.userTiming !== false) {
    userTimingUtils = HeroTracingCoreDependencies.UserTimingUtils;
    userTimingUtils?.measureStart(marker);
  }
}

// eslint-disable-next-line max-params
function markStartPlaceholder(uuid, placeholderId, time, description, pageletStack) {
  const startTime = time || performanceNow();
  markStart(uuid, placeholderId, startTime);

  HeroTracingPlaceholder.HeroPendingPlaceholderTracker.addPlaceholder(
    uuid,
    placeholderId,
    description,
    startTime,
    pageletStack || [],
  );

  if (placeholderSubscribers.size) {
    const placeholderInfo = {
      placeholderID: placeholderId + uuid,
      interactionID: uuid,
      spanUUID: placeholderId,
      startTime: startTime,
      pageletStack: pageletStack,
      description: description,
    };
    placeholderSubscribers.forEach((subscriber) => subscriber.onStart(placeholderInfo));
  }
}

// eslint-disable-next-line max-params
function markEnd(uuid, pageletStack, spanType, name, placeholderId, endTime, additionalData, options) {
  const startMarker = `${placeholderId}${uuid}`;
  const startTime = placeholderStartTimes[startMarker];
  endTime = endTime || performanceNow();

  if (startTime) {
    measure(uuid, pageletStack, spanType, name, startTime, endTime, additionalData, options);
  }

  if (placeholderSubscribers.size) {
    const placeholderEndInfo = {
      placeholderID: placeholderId + uuid,
      interactionID: uuid,
      pageletStack: pageletStack,
      spanType: spanType,
      name: name,
      spanUUID: placeholderId,
      data: additionalData,
      endTime: endTime,
    };
    placeholderSubscribers.forEach((subscriber) => subscriber.onEnd(placeholderEndInfo));
  }

  HeroTracingPlaceholder.HeroPendingPlaceholderTracker.removePlaceholder(uuid, placeholderId);
}

// eslint-disable-next-line max-params
function markEndPlaceholder(uuid, pageletStack, spanType, name, placeholderId, endTime, additionalData, options) {
  markEnd(uuid, pageletStack, spanType, name, placeholderId, endTime, additionalData, options);
  HeroTracingPlaceholder.HeroPendingPlaceholderTracker.removePlaceholder(uuid, placeholderId);
}

// eslint-disable-next-line max-params
function measure(uuid, pageletStack, spanType, name, startTime, endTime, additionalData, options) {
  const finalEndTime = endTime || performanceNow();

  InteractionTracingMetrics.addSubspan(uuid, name, 'HeroTracing', name, finalEndTime, {
    ...additionalData,
    pagelet: pageletStack[pageletStack.length - 1],
    pageletStack: pageletStack,
    spanType: spanType,
  });

  if (options?.userTiming !== false) {
    const spanLabel = `${name}[${uuid.slice(0, 3)}]`;
    const trackName = HeroTracingCoreConfig.enableTrackName ? `Track:Hero Logger:${spanLabel}` : spanLabel;
    userTimingUtils?.measureModern(
      trackName,
      {
        start: startTime + performanceNowAtAppStart(),
        end: finalEndTime + performanceNowAtAppStart(),
      },
      spanType,
    );
  }
}

export const HeroLogger = {
  subscribeToPlaceholders,
  genHeroInteractionUUIDAndMarkStart,
  cleanupHeroInteraction,
  endHeroInteraction,
  markStart,
  markStartPlaceholder,
  markEnd,
  markEndPlaceholder,
  measure,
};
