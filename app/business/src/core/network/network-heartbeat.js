/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

// import { getSameOriginTransport } from "./get-same-origin-transport";
// import { killswitch } from "./killswitch";

// let h = "/nw/";
// let i = 6400;
// let j = 100;
// let k = null;
// let l = 0;
// let m = null;
// let n = killswitch("DISABLE_HEARTBEAT_POLLING");
// function o(a, b) {
//   // eslint-disable-next-line no-sequences
//   (m = getSameOriginTransport()),
//     m.open("GET", h, !0),
//     (m.onload = function () {
//       // eslint-disable-next-line no-sequences
//       m && m.status === 204 && (n = !0), q(a);
//     }),
//     (m.onerror = function () {
//       r(a, b);
//     }),
//     (m.ontimeout = function () {
//       r(a, b);
//     }),
//     m.send();
// }
// function p() {
//   // eslint-disable-next-line no-sequences
//   m = null;
//   j = 100;
//   l = 0;
//   clearTimeout(k);
// }
// function q(a) {
//   p();
//   a();
// }
// function r(a, b) {
//   (k = setTimeout(() => {
//     s(a, b, void 0, !0);
//     // eslint-disable-next-line no-sequences
//   }, j)),
//     l++,
//     j < i && (j = Math.min(j * Math.pow(2, l), i)),
//     b();
// }

// // eslint-disable-next-line max-params
// function s(a, b, c, d) {
//   c === void 0 &&
//     (c = function () {
//       return !0;
//       // eslint-disable-next-line no-sequences
//     }),
//     d === void 0 && (d = !1),
//     n || ((d || (!m && c())) && o(a, b));
// }

// function a() {
//   return m;
// }

// export const NetworkHeartbeat = {
//   maybeStartHeartbeat: s,
//   isHeartbeatPending: a,
// };

import { getSameOriginTransport } from './get-same-origin-transport';
import { killswitch } from './killswitch';

const HEARTBEAT_URL = '/healthz/';
const MAX_INTERVAL = 6400;
const INITIAL_INTERVAL = 100;
const KILLSWITCH_KEY = 'DISABLE_HEARTBEAT_POLLING';

let currentTransport = null;
let interval = INITIAL_INTERVAL;
let attempts = 0;
let timeoutId = null;
let heartbeatDisabled = killswitch(KILLSWITCH_KEY);

function handleSuccess(callback) {
  resetState();
  callback();
}

function handleError(callback, errorCallback) {
  timeoutId = setTimeout(() => {
    maybeStartHeartbeat(callback, errorCallback, undefined, true);
  }, interval);

  attempts++;
  if (interval < MAX_INTERVAL) {
    interval = Math.min(interval * Math.pow(2, attempts), MAX_INTERVAL);
  }

  errorCallback();
}

function resetState() {
  currentTransport = null;
  interval = INITIAL_INTERVAL;
  attempts = 0;
  clearTimeout(timeoutId);
}

function startHeartbeat(callback, errorCallback) {
  currentTransport = getSameOriginTransport();
  currentTransport.open('GET', HEARTBEAT_URL, true);

  currentTransport.onload = () => {
    if (currentTransport && currentTransport.status === 204) {
      heartbeatDisabled = true;
    }
    handleSuccess(callback);
  };

  currentTransport.onerror = () => {
    handleError(callback, errorCallback);
  };

  currentTransport.ontimeout = () => {
    handleError(callback, errorCallback);
  };

  currentTransport.send();
}

// eslint-disable-next-line max-params
function maybeStartHeartbeat(callback, errorCallback, condition = () => true, force = false) {
  if (!heartbeatDisabled && (force || (!currentTransport && condition()))) {
    startHeartbeat(callback, errorCallback);
  }
}

function isHeartbeatPending() {
  return currentTransport;
}

export const NetworkHeartbeat = {
  maybeStartHeartbeat,
  isHeartbeatPending,
};
