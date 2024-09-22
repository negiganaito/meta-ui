export const ReloadPage = {
  now: (route) => {
    window.location.reload(route);
  },

  delay: (time) => {
    window.setTimeout(ReloadPage.now, time);
  },
};

// __d(
//   'ReloadPage',
//   ['Env', 'ifRequireable'],
//   function (a, b, c, d, e, f, g) {
//     var h;
//     function i(b) {
//       var d = c('ifRequireable')('BlueCompatRouter', function (a) {
//         return a;
//       });
//       if ((h || (h = c('Env'))).isCQuick && d) {
//         d.sendMessage({
//           compatAction: 'reload',
//         });
//         return;
//       }
//       a.window.location.reload(b);
//     }
//     function b(b) {
//       a.setTimeout(i, b);
//     }
//     g.now = i;
//     g.delay = b;
//   },
//   98,
// );
