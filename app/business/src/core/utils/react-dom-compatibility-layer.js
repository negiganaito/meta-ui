import ReactDOM from 'react-dom';

let h = typeof WeakMap === 'function' ? new WeakMap() : new Map();

function a(a, b) {
  let c = h.get(b);
  c === null && ((c = ReactDOM.createRoot(b)), h.set(b, c));
  b = null;
  let e = a.props.ref;
  ReactDOM.flushSync(() => {
    let d;
    // eslint-disable-next-line no-return-assign
    return (d = c) === null
      ? void 0
      : d.render(
          typeof a.type === 'string' ||
            ((d = a.type) === null ? void 0 : (d = d.prototype) === null ? void 0 : d.isReactComponent)
            ? {
                ...a,
                props: {
                  ...a.props,
                  ref: function (a) {
                    // eslint-disable-next-line no-sequences
                    typeof e === 'function' ? e(a) : e !== null && (e.current = a), (b = a);
                  },
                },
              }
            : a,
        );
  });
  return b;
}

function b(a) {
  if (a === null) return !1;
  let b = h.get(a);
  if (b) {
    ReactDOM.flushSync(() => {
      b.unmount();
    });
    h['delete'](a);
    return !0;
  }
  return !1;
}

export const ReactDOMCompatibilityLayer = {
  render_DEPRECATED: a,
  unmountComponentAtNode_DEPRECATED: b,
};
