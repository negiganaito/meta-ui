export const Promise = window.Promise;

Promise.allSettled ||
  (Promise.allSettled = function (a) {
    let b;
    if ((typeof Symbol === 'function' ? Symbol.iterator : '@@iterator') in a) b = Array.from(a);
    else return Promise.reject(new TypeError('Promise.allSettled must be passed an iterable.'));
    let c = Array(b.length);
    a = function (a, d) {
      let e = b[a];
      d = typeof e === 'object' && e !== null && typeof e.then === 'function';
      c[a] = d
        ? new Promise((a, b) => {
            e.then(
              (b) => {
                a({
                  status: 'fulfilled',
                  value: b,
                });
              },
              (b) => {
                a({
                  status: 'rejected',
                  reason: b,
                });
              },
            );
          })
        : Promise.resolve({
            status: 'fulfilled',
            value: e,
          });
    };
    for (let d = 0, e = b.length; d < e; ++d) a(d, e);
    return Promise.all(c);
  });
Promise.prototype['finally'] ||
  (Promise.prototype['finally'] = function (a) {
    return this.then(
      (b) => {
        return Promise.resolve(a()).then(() => {
          return b;
        });
      },
      (b) => {
        return Promise.resolve(a()).then(() => {
          throw b;
        });
      },
    );
  });
