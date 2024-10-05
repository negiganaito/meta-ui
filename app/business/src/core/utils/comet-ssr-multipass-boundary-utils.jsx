// // @ts-ignore
// import { jsx } from 'react/jsx-runtime';

// let j = '<!--$-->';
// let k = '<!--$?-->';
// let l = '<!--$!-->';
// let m = '<!--/$-->';
// let n = new Map();
// let o = new Set();

// export const setEnabledBoundaries = function (a) {
//   o = new Set(a);
// };

// export const isEnabledBoundary = function (a) {
//   return o.has(a);
// };

// export const getBoundarySSRContentID = function (a) {
//   return 'ssrb_' + a + '_content';
// };

// export const getBoundaryStartID = function (a) {
//   return 'ssrb_' + a + '_start';
// };
// export const getBoundaryEndID = function (a) {
//   return 'ssrb_' + a + '_end';
// };
// const r = function (a) {
//   return '<span id="' + getBoundaryStartID(a) + '" style="display:none"></span>';
// };
// const s = function (a) {
//   return '<span id="' + getBoundaryEndID(a) + '" style="display:none"></span>';
// };

// export const getBoundaryStartOffset = function (a, b) {
//   a = r(a);
//   let c = a.length;
//   a = b.indexOf(a);
//   if (a !== -1) {
//     if (b.startsWith(j, a + c)) return [a, c + j.length, 'hydrate'];
//     if (b.startsWith(l, a + c)) return [a, c + l.length, 'fallback'];
//     if (b.startsWith(k, a + c)) return [a, c + k.length, 'fallback'];
//   }
//   return null;
// };

// export const getBoundaryEndOffset = function (a, b) {
//   a = m + s(a);
//   b = b.indexOf(a);
//   return b !== -1 ? [b, a.length] : null;
// };

// export const getBoundaryString = function (a, b) {
//   return r(a) + (String(k) + b + m) + s(a);
// };
// export const getBoundaryStartComponent = function (a) {
//   return jsx('span', {
//     id: getBoundaryStartID(a),
//     style: {
//       display: 'none',
//     },
//   });
// };
// export const getBoundaryEndComponent = function (a) {
//   return jsx('span', {
//     id: getBoundaryEndID(a),
//     style: {
//       display: 'none',
//     },
//   });
// };

// export function tryResolveDisabledBoundaries(a) {
//   a.forEach((a) => {
//     let b = n.get(a) || null;
//     b && b.resolveFunc && typeof b.resolveFunc === 'function' && (b.resolveFunc(a), n['delete'](a));
//   });
// }
// export const tryGetBoundaryPromise = function (a) {
//   a = n.get(a);
//   return a ? a.promise : null;
// };
// export const updateDisabledBoundariesMap = function (a, b) {
//   n.set(a, b);
// };

// export const CometSSRMultipassBoundaryUtils = {
//   // setEnabled,
//   // isEnabled,
//   setEnabledBoundaries,
//   isEnabledBoundary,
//   getBoundarySSRContentID,
//   getBoundaryStartID,
//   getBoundaryEndID,
//   getBoundaryStartOffset,
//   getBoundaryEndOffset,
//   getBoundaryString,
//   getBoundaryStartComponent,
//   getBoundaryEndComponent,
//   tryResolveDisabledBoundaries,
//   tryGetBoundaryPromise,
//   updateDisabledBoundariesMap,
// };

// @ts-ignore
import { jsx } from 'react/jsx-runtime';

let placeholderOpen = '<!--$-->';
let placeholderPending = '<!--$?-->';
let placeholderFallback = '<!--$!-->';
let placeholderClose = '<!--/$-->';
let boundaryMap = new Map();
let enabledBoundariesSet = new Set();

const setEnabledBoundaries = function (boundaryList) {
  enabledBoundariesSet = new Set(boundaryList);
};

const isEnabledBoundary = function (boundary) {
  return enabledBoundariesSet.has(boundary);
};

const getBoundarySSRContentID = function (boundaryID) {
  return 'ssrb_' + boundaryID + '_content';
};

const getBoundaryStartID = function (boundaryID) {
  return 'ssrb_' + boundaryID + '_start';
};

const getBoundaryEndID = function (boundaryID) {
  return 'ssrb_' + boundaryID + '_end';
};

const getBoundaryStartSpan = function (boundaryID) {
  return '<span id="' + getBoundaryStartID(boundaryID) + '" style="display:none"></span>';
};

const getBoundaryEndSpan = function (boundaryID) {
  return '<span id="' + getBoundaryEndID(boundaryID) + '" style="display:none"></span>';
};

const getBoundaryStartOffset = function (boundaryID, content) {
  const boundaryStartHTML = getBoundaryStartSpan(boundaryID);
  let boundaryStartHTMLLength = boundaryStartHTML.length;
  let boundaryStartIndex = content.indexOf(boundaryStartHTML);
  if (boundaryStartIndex !== -1) {
    if (content.startsWith(placeholderOpen, boundaryStartIndex + boundaryStartHTMLLength)) {
      return [boundaryStartIndex, boundaryStartHTMLLength + placeholderOpen.length, 'hydrate'];
    }
    if (content.startsWith(placeholderFallback, boundaryStartIndex + boundaryStartHTMLLength)) {
      return [boundaryStartIndex, boundaryStartHTMLLength + placeholderFallback.length, 'fallback'];
    }
    if (content.startsWith(placeholderPending, boundaryStartIndex + boundaryStartHTMLLength)) {
      return [boundaryStartIndex, boundaryStartHTMLLength + placeholderPending.length, 'fallback'];
    }
  }
  return null;
};

const getBoundaryEndOffset = function (boundaryID, content) {
  const boundaryEndHTML = placeholderClose + getBoundaryEndSpan(boundaryID);
  let boundaryEndIndex = content.indexOf(boundaryEndHTML);
  return boundaryEndIndex !== -1 ? [boundaryEndIndex, boundaryEndHTML.length] : null;
};

const getBoundaryHTMLString = function (boundaryID, content) {
  return (
    getBoundaryStartSpan(boundaryID) +
    (String(placeholderPending) + content + placeholderClose) +
    getBoundaryEndSpan(boundaryID)
  );
};

const getBoundaryStartComponent = function (boundaryID) {
  return jsx('span', {
    id: getBoundaryStartID(boundaryID),
    style: {
      display: 'none',
    },
  });
};

const getBoundaryEndComponent = function (boundaryID) {
  return jsx('span', {
    id: getBoundaryEndID(boundaryID),
    style: {
      display: 'none',
    },
  });
};

function tryResolveDisabledBoundaries(boundaries) {
  boundaries.forEach((boundaryID) => {
    let boundaryEntry = boundaryMap.get(boundaryID) || null;
    if (boundaryEntry && boundaryEntry.resolveFunc && typeof boundaryEntry.resolveFunc === 'function') {
      boundaryEntry.resolveFunc(boundaryID);
      boundaryMap.delete(boundaryID);
    }
  });
}

const tryGetBoundaryPromise = function (boundaryID) {
  const boundaryEntry = boundaryMap.get(boundaryID);
  return boundaryEntry ? boundaryEntry.promise : null;
};

const updateDisabledBoundariesMap = function (boundaryID, boundaryEntry) {
  boundaryMap.set(boundaryID, boundaryEntry);
};

export const CometSSRMultipassBoundaryUtils = {
  setEnabledBoundaries,
  isEnabledBoundary,
  getBoundarySSRContentID,
  getBoundaryStartID,
  getBoundaryEndID,
  getBoundaryStartOffset,
  getBoundaryEndOffset,
  getBoundaryHTMLString,
  getBoundaryStartComponent,
  getBoundaryEndComponent,
  tryResolveDisabledBoundaries,
  tryGetBoundaryPromise,
  updateDisabledBoundariesMap,
};
