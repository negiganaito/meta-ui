import React from 'react';

export class XPlatReactToasterView extends React.PureComponent {
  static defaultProps = {
    maxVisible: 1,
  };

  constructor(props) {
    super(props);
    this.state = {
      visibleToasts: [],
    };
  }

  static getDerivedStateFromProps = function (a, b) {
    b = b ? b.visibleToasts.slice(0, a.maxVisible) : [];
    let c = 0;
    let d = a.filterToasts;
    let e = a.toasterState;
    let f = {};
    let g = d
      ? // eslint-disable-next-line array-callback-return
        Object.keys(e).filter((b) => {
          let c;
          let g = e[b];
          f[b] = g;
          let h = !g ? void 0 : g.shown;
          c = !g ? void 0 : !(c = g.value) ? void 0 : !(c = c.type) ? void 0 : c.name;
          if (!g || !c) {
            return !0;
          }
          if (d.has(c) && !h) {
            a.onExpireToast(b);
            return !1;
          }
        })
      : Object.keys(e);
    let h = b.reduce((a, b) => {
      b && a.add(b.id);
      return a;
    }, new Set());
    let i = 0;
    while (c < a.maxVisible) {
      let j = b[c];
      let k = Object.keys(f).length > 0 ? f : a.toasterState;
      if (j) {
        k = Object.prototype.hasOwnProperty.call(k, j.id);
        if (k) {
          k = e[j.id];
          b[c] = {
            expired: k.expired,
            id: k.id,
            toast: k.value,
          };
          c++;
          continue;
        } else b[c] = null;
      }
      j = null;
      while (!j && i < g.length) {
        k = g[i++];
        let l = h.has(k);
        l || (j = a.toasterState[k]);
      }
      j &&
        (b[c] = {
          expired: j.expired,
          id: j.id,
          toast: j.value,
        });
      c++;
    }
    return {
      visibleToasts: b,
    };
  };

  render() {
    return (
      <>
        {this.state.visibleToasts.map((visibleToast, index) =>
          visibleToast ? this.props.children(visibleToast.toast, visibleToast.id, visibleToast.expired, index) : null,
        )}
      </>
    );
  }
}

// import React from "react";

// export class XPlatReactToasterView extends React.PureComponent {
//   static defaultProps = {
//     maxVisible: 1,
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       visibleToasts: [],
//     };
//   }

//   static getDerivedStateFromProps(nextProps, prevState) {
//     const { maxVisible, filterToasts, toasterState, onExpireToast } = nextProps;
//     const visibleToasts = prevState
//       ? prevState.visibleToasts.slice(0, maxVisible)
//       : [];

//     const filteredToasts = {};
//     const filteredKeys = filterToasts
//       ? Object.keys(toasterState).filter((key) => {
//           const toast = toasterState[key];
//           if (!toast) return true;

//           const toastType = toast.value?.type?.name;
//           if (!toastType) return true;

//           if (filterToasts.has(toastType) && !toast.shown) {
//             onExpireToast(key);
//             return false;
//           }

//           filteredToasts[key] = toast;
//           return true;
//         })
//       : Object.keys(toasterState);

//     const existingToastIds = new Set(visibleToasts.map((toast) => toast?.id));

//     let index = 0;
//     let toastIndex = 0;
//     while (index < maxVisible) {
//       let toast = visibleToasts[index];
//       if (toast) {
//         if (toasterState[toast.id]) {
//           visibleToasts[index] = {
//             expired: toasterState[toast.id].expired,
//             id: toasterState[toast.id].id,
//             toast: toasterState[toast.id].value,
//           };
//           index++;
//           continue;
//         } else {
//           visibleToasts[index] = null;
//         }
//       }

//       while (!toast && toastIndex < filteredKeys.length) {
//         const toastId = filteredKeys[toastIndex++];
//         if (!existingToastIds.has(toastId)) {
//           toast = toasterState[toastId];
//         }
//       }

//       if (toast) {
//         visibleToasts[index] = {
//           expired: toast.expired,
//           id: toast.id,
//           toast: toast.value,
//         };
//       }
//       index++;
//     }

//     return {
//       visibleToasts,
//     };
//   }

//   render() {
//     const { visibleToasts } = this.state;
//     const { children } = this.props;

//     return (
//       <>
//         {visibleToasts.map((visibleToast, index) =>
//           visibleToast
//             ? children(
//                 visibleToast.toast,
//                 visibleToast.id,
//                 visibleToast.expired,
//                 index
//               )
//             : null
//         )}
//       </>
//     );
//   }
// }
