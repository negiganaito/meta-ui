import React, { createContext, useContext } from 'react';
// @ts-ignore
import { jsx } from 'react/jsx-runtime';
import { FBLogger } from '@meta-core/error/fb-logger';
import { unrecoverableViolation } from '@meta-core/error/unrecoverable-violation';
import { CometBackupPlaceholder } from '@meta-core/placeholder/comet-backup-placeholder';
import { CometPlaceholder } from '@meta-core/placeholder/comet-placeholder';
import { CometSSRMultipassBoundaryUtils } from '@meta-core/utils/comet-ssr-multipass-boundary-utils';
import { executionEnvironment } from '@meta-core/utils/executionEnvironment';

// export function CometSSRMultipassBoundary(a) {
//   let b = a.children;
//   let d = a.fallback;
//   d = d === void 0 ? null : d;
//   let e = a.id;
//   a = a.useCometPlaceholder;
//   a = a === !0 ? CometPlaceholder : CometBackupPlaceholder;
//   return jsx(p, {
//     boundaryId: e,
//     children: jsx(a, {
//       fallback: jsx(n, {
//         id: e,
//         children: d,
//       }),
//       children: jsx(m, {
//         id: e,
//         children: jsx(React.Fragment, {
//           children: b,
//         }),
//       }),
//     }),
//   });
// }

// function m(a) {
//   // @ts-ignore
//   // eslint-disable-next-line no-invalid-this
//   let e = this;
//   let f = a.children;
//   a = a.id;
//   if (executionEnvironment.canUseDOM) {
//     return f;
//   }
//   if (!CometSSRMultipassBoundaryUtils.isEnabledBoundary(a)) {
//     let g = CometSSRMultipassBoundaryUtils.tryGetBoundaryPromise(a);
//     if (g) throw g;
//     g = function () {};
//     let j = new Promise((a) => {
//       g = a.bind(e);
//     });
//     CometSSRMultipassBoundaryUtils.updateDisabledBoundariesMap(a, {
//       promise: j,
//       resolveFunc: g,
//     });
//     throw j;
//   }
//   return f;
// }

// function n(a) {
//   let b = a.children;
//   a = a.id;
//   CometSSRMultipassBoundaryUtils.isEnabledBoundary(a) &&
//     FBLogger('comet_ssr').mustfix('SSR boundary suspended unexpectedly: ' + a);
//   return b;
// }

// const o = createContext(undefined);

// function p(a) {
//   let b = a.boundaryId;
//   a = a.children;
//   let d = useContext(o);
//   if (executionEnvironment.canUseDOM) {
//     return a;
//   }
//   if (d && d !== 'root')
//     throw unrecoverableViolation(
//       'Nested SSR boundaries are unsupported. ' +
//         ("Found boundary '" + b + "' nested underneath ") +
//         ("boundary '" + d + "'."),
//       'comet_ssr',
//     );
//   return jsx(o.Provider, {
//     value: b,
//     children: a,
//   });
// }

export function CometSSRMultipassBoundary({ children, fallback = null, id, useCometPlaceholder }) {
  const PlaceholderComponent = useCometPlaceholder ? CometPlaceholder : CometBackupPlaceholder;

  return jsx(SSRBoundaryContextProvider, {
    boundaryId: id,
    children: jsx(PlaceholderComponent, {
      fallback: jsx(FallbackBoundaryComponent, {
        id,
        children: fallback,
      }),
      children: jsx(SSRBoundaryContentComponent, {
        id,
        children: jsx(React.Fragment, {
          children,
        }),
      }),
    }),
  });
}

function SSRBoundaryContentComponent({ id, children }) {
  if (executionEnvironment.canUseDOM) {
    return children;
  }

  if (!CometSSRMultipassBoundaryUtils.isEnabledBoundary(id)) {
    let boundaryPromise = CometSSRMultipassBoundaryUtils.tryGetBoundaryPromise(id);
    if (boundaryPromise) throw boundaryPromise;

    let resolveBoundary = function () {};
    let promise = new Promise((resolve) => {
      resolveBoundary = resolve;
    });

    CometSSRMultipassBoundaryUtils.updateDisabledBoundariesMap(id, {
      promise,
      resolveFunc: resolveBoundary,
    });

    throw promise;
  }

  return children;
}

function FallbackBoundaryComponent({ id, children }) {
  if (CometSSRMultipassBoundaryUtils.isEnabledBoundary(id)) {
    FBLogger('comet_ssr').mustfix(`SSR boundary suspended unexpectedly: ${id}`);
  }

  return children;
}

const SSRBoundaryContext = createContext(undefined);

function SSRBoundaryContextProvider({ boundaryId, children }) {
  const currentBoundaryId = useContext(SSRBoundaryContext);

  if (executionEnvironment.canUseDOM) {
    return children;
  }

  if (currentBoundaryId && currentBoundaryId !== 'root') {
    throw unrecoverableViolation(
      `Nested SSR boundaries are unsupported. Found boundary '${boundaryId}' nested underneath boundary '${currentBoundaryId}'.`,
      'comet_ssr',
    );
  }

  return jsx(SSRBoundaryContext.Provider, {
    value: boundaryId,
    children,
  });
}
