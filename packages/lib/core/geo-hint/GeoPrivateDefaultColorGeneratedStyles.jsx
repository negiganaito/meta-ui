/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

const iconActiveStyles = {
  default: { color: "x4hq6eo" },
  error: { color: "xilsuq" },
  info: { color: "x923533" },
  inverted: { color: "x140t73q" },
  marker: { color: "x1vvsez5" },
  placeholder: { color: "x6lvj10" },
  success: { color: "xdyirqe" },
  warning: { color: "x746shc" },
};

const iconDisabledStyles = {
  default: { color: "x150cnoy" },
  error: { color: "x1n17xqh" },
  info: { color: "x1yjqqfx" },
  inverted: { color: "xto31z9" },
  marker: { color: "x1vvsez5" },
  placeholder: { color: "x9c3zl9" },
  success: { color: "x2o0mob" },
  warning: { color: "x10iwbtc" },
};

const borderDefaultActiveStyles = {
  button: {
    borderTopColor: "x1hwfl5k",
    borderEndColor: "xd1xcye",
    borderBottomColor: "x1vx98v3",
    borderStartColor: "x1eh26b4",
  },
  control: {
    borderTopColor: "x1hwfl5k",
    borderEndColor: "xd1xcye",
    borderBottomColor: "x1vx98v3",
    borderStartColor: "x1eh26b4",
  },
  divider: {
    borderTopColor: "xxh5dwz",
    borderEndColor: "x1klwvkx",
    borderBottomColor: "x136yy5x",
    borderStartColor: "x14baxfg",
  },
  element: {
    borderTopColor: "xb9moi8",
    borderEndColor: "xfth1om",
    borderBottomColor: "x21b0me",
    borderStartColor: "xmls85d",
  },
  error: {
    borderTopColor: "x1f29zjl",
    borderEndColor: "x1fuj67e",
    borderBottomColor: "xpvhgef",
    borderStartColor: "xr9dbrz",
  },
  frame: {
    borderTopColor: "x1qyvd2d",
    borderEndColor: "x16cu5w9",
    borderBottomColor: "xoul6tu",
    borderStartColor: "x2qkk2",
  },
  info: {
    borderTopColor: "x1nzp1ka",
    borderEndColor: "x19bpa06",
    borderBottomColor: "x8uew1",
    borderStartColor: "x8e7i6l",
  },
  mainNavigationSelected: {
    borderTopColor: "xk3090t",
    borderEndColor: "xl7eqiy",
    borderBottomColor: "xmmdwdf",
    borderStartColor: "x1jopdh1",
  },
  success: {
    borderTopColor: "x1p3az52",
    borderEndColor: "xkfp8yk",
    borderBottomColor: "x1py6mlr",
    borderStartColor: "xkk4w0o",
  },
  warning: {
    borderTopColor: "x1yh48zd",
    borderEndColor: "x4vtfqn",
    borderBottomColor: "xia54jr",
    borderStartColor: "x1myal5o",
  },
};

const borderDefaultDisabledStyles = {
  button: {
    borderTopColor: "x1hwfl5k",
    borderEndColor: "xd1xcye",
    borderBottomColor: "x1vx98v3",
    borderStartColor: "x1eh26b4",
  },
  control: {
    borderTopColor: "x1hwfl5k",
    borderEndColor: "xd1xcye",
    borderBottomColor: "x1vx98v3",
    borderStartColor: "x1eh26b4",
  },
  divider: {
    borderTopColor: "xb9moi8",
    borderEndColor: "xfth1om",
    borderBottomColor: "x21b0me",
    borderStartColor: "xmls85d",
  },
  element: {
    borderTopColor: "xb9moi8",
    borderEndColor: "xfth1om",
    borderBottomColor: "x21b0me",
    borderStartColor: "xmls85d",
  },
  error: {
    borderTopColor: "x11odbn4",
    borderEndColor: "xah6pmm",
    borderBottomColor: "xfho9m3",
    borderStartColor: "xnhjz54",
  },
  frame: {
    borderTopColor: "x17br7ac",
    borderEndColor: "xez219c",
    borderBottomColor: "xo3d0r6",
    borderStartColor: "x1hd6qti",
  },
  info: {
    borderTopColor: "x1gmergp",
    borderEndColor: "x1s4se2m",
    borderBottomColor: "xt8hko0",
    borderStartColor: "x1bo3sr7",
  },
  mainNavigationSelected: {
    borderTopColor: "x1sqlwr6",
    borderEndColor: "xrc621n",
    borderBottomColor: "x1gcplko",
    borderStartColor: "x7ymq3u",
  },
  success: {
    borderTopColor: "x1ye665i",
    borderEndColor: "x1n3wcwz",
    borderBottomColor: "xzd4j2o",
    borderStartColor: "x19nl1lb",
  },
  warning: {
    borderTopColor: "xsckyur",
    borderEndColor: "xa64ehz",
    borderBottomColor: "x1jyvsjm",
    borderStartColor: "xyvv1sq",
  },
};

const borderFocusedActiveStyles = {
  button: {
    borderTopColor: "x1hwfl5k",
    borderEndColor: "xd1xcye",
    borderBottomColor: "x1vx98v3",
    borderStartColor: "x1eh26b4",
  },
  control: {
    borderTopColor: "x1hwfl5k",
    borderEndColor: "xd1xcye",
    borderBottomColor: "x1vx98v3",
    borderStartColor: "x1eh26b4",
  },
  divider: {
    borderTopColor: "xxh5dwz",
    borderEndColor: "x1klwvkx",
    borderBottomColor: "x136yy5x",
    borderStartColor: "x14baxfg",
  },
  element: {
    borderTopColor: "xb9moi8",
    borderEndColor: "xfth1om",
    borderBottomColor: "x21b0me",
    borderStartColor: "xmls85d",
  },
  error: {
    borderTopColor: "xlrknr9",
    borderEndColor: "x14e8xwt",
    borderBottomColor: "xa6b8qs",
    borderStartColor: "xrm4nz7",
  },
  frame: {
    borderTopColor: "x1qyvd2d",
    borderEndColor: "x16cu5w9",
    borderBottomColor: "xoul6tu",
    borderStartColor: "x2qkk2",
  },
  info: {
    borderTopColor: "x8avcdo",
    borderEndColor: "x1uuat95",
    borderBottomColor: "x1b4moik",
    borderStartColor: "x1tv5ldd",
  },
  mainNavigationSelected: {
    borderTopColor: "xk3090t",
    borderEndColor: "xl7eqiy",
    borderBottomColor: "xmmdwdf",
    borderStartColor: "x1jopdh1",
  },
  success: {
    borderTopColor: "x47k0b6",
    borderEndColor: "xev7war",
    borderBottomColor: "x8kuxpe",
    borderStartColor: "x306xey",
  },
  warning: {
    borderTopColor: "x1fr7rrh",
    borderEndColor: "x1we963t",
    borderBottomColor: "xoucf1v",
    borderStartColor: "x1yupf9g",
  },
};

const borderFocusedDisabledStyles = {
  button: {
    borderTopColor: "x1hwfl5k",
    borderEndColor: "xd1xcye",
    borderBottomColor: "x1vx98v3",
    borderStartColor: "x1eh26b4",
  },
  control: {
    borderTopColor: "x1hwfl5k",
    borderEndColor: "xd1xcye",
    borderBottomColor: "x1vx98v3",
    borderStartColor: "x1eh26b4",
  },
  divider: {
    borderTopColor: "xb9moi8",
    borderEndColor: "xfth1om",
    borderBottomColor: "x21b0me",
    borderStartColor: "xmls85d",
  },
  element: {
    borderTopColor: "xb9moi8",
    borderEndColor: "xfth1om",
    borderBottomColor: "x21b0me",
    borderStartColor: "xmls85d",
  },
  error: {
    borderTopColor: "xnf1nyb",
    borderEndColor: "x9cq8o4",
    borderBottomColor: "xvieuqt",
    borderStartColor: "xk35g3i",
  },
  frame: {
    borderTopColor: "x17br7ac",
    borderEndColor: "xez219c",
    borderBottomColor: "xo3d0r6",
    borderStartColor: "x1hd6qti",
  },
  info: {
    borderTopColor: "x1jgf6j9",
    borderEndColor: "x1x1exb7",
    borderBottomColor: "x13mxa8r",
    borderStartColor: "xmdwe21",
  },
  mainNavigationSelected: {
    borderTopColor: "x1sqlwr6",
    borderEndColor: "xrc621n",
    borderBottomColor: "x1gcplko",
    borderStartColor: "x7ymq3u",
  },
  success: {
    borderTopColor: "xp9jigy",
    borderEndColor: "xqzltms",
    borderBottomColor: "xwdw8cy",
    borderStartColor: "xihadzq",
  },
  warning: {
    borderTopColor: "xxge7q2",
    borderEndColor: "x14h60gt",
    borderBottomColor: "x1eke3mv",
    borderStartColor: "x1f90l5c",
  },
};

const interactiveBorderDefaultActiveStyles = {
  button: { outlineColor: "xx6esqt", outlineStyle: "xaatb59" },
  control: { outlineColor: "xx6esqt", outlineStyle: "xaatb59" },
  divider: { outlineColor: "x18gw13d", outlineStyle: "xaatb59" },
  element: { outlineColor: "x1mxyysi", outlineStyle: "xaatb59" },
  error: { outlineColor: "x1rd70wb", outlineStyle: "xaatb59" },
  frame: { outlineColor: "x47o8lo", outlineStyle: "xaatb59" },
  info: { outlineColor: "x1jt2ctn", outlineStyle: "xaatb59" },
  mainNavigationSelected: {
    outlineColor: "xe4nkwv",
    outlineStyle: "xaatb59",
  },
  success: { outlineColor: "xwt4hiq", outlineStyle: "xaatb59" },
  warning: { outlineColor: "xvg9o4p", outlineStyle: "xaatb59" },
};

const interactiveBorderDefaultDisabledStyles = {
  button: { outlineColor: "xx6esqt", outlineStyle: "xaatb59" },
  control: { outlineColor: "xx6esqt", outlineStyle: "xaatb59" },
  divider: { outlineColor: "x1mxyysi", outlineStyle: "xaatb59" },
  element: { outlineColor: "x1mxyysi", outlineStyle: "xaatb59" },
  error: { outlineColor: "x18nicxw", outlineStyle: "xaatb59" },
  frame: { outlineColor: "xb2bza1", outlineStyle: "xaatb59" },
  info: { outlineColor: "x1k7o0i0", outlineStyle: "xaatb59" },
  mainNavigationSelected: {
    outlineColor: "xhgzu67",
    outlineStyle: "xaatb59",
  },
  success: { outlineColor: "xxj33bx", outlineStyle: "xaatb59" },
  warning: { outlineColor: "xktpz7v", outlineStyle: "xaatb59" },
};

const interactiveBorderFocusedActiveStyles = {
  button: { outlineColor: "xx6esqt", outlineStyle: "xaatb59" },
  control: { outlineColor: "xx6esqt", outlineStyle: "xaatb59" },
  divider: { outlineColor: "x18gw13d", outlineStyle: "xaatb59" },
  element: { outlineColor: "x1mxyysi", outlineStyle: "xaatb59" },
  error: { outlineColor: "x1ww3coq", outlineStyle: "xaatb59" },
  frame: { outlineColor: "x47o8lo", outlineStyle: "xaatb59" },
  info: { outlineColor: "xejlkim", outlineStyle: "xaatb59" },
  mainNavigationSelected: {
    outlineColor: "xe4nkwv",
    outlineStyle: "xaatb59",
  },
  success: { outlineColor: "xqirkxh", outlineStyle: "xaatb59" },
  warning: { outlineColor: "x1barh0j", outlineStyle: "xaatb59" },
};

const interactiveBorderFocusedDisabledStyles = {
  button: { outlineColor: "xx6esqt", outlineStyle: "xaatb59" },
  control: { outlineColor: "xx6esqt", outlineStyle: "xaatb59" },
  divider: { outlineColor: "x1mxyysi", outlineStyle: "xaatb59" },
  element: { outlineColor: "x1mxyysi", outlineStyle: "xaatb59" },
  error: { outlineColor: "xhae8h5", outlineStyle: "xaatb59" },
  frame: { outlineColor: "xb2bza1", outlineStyle: "xaatb59" },
  info: { outlineColor: "xc88c14", outlineStyle: "xaatb59" },
  mainNavigationSelected: {
    outlineColor: "xhgzu67",
    outlineStyle: "xaatb59",
  },
  success: { outlineColor: "x1jzywy4", outlineStyle: "xaatb59" },
  warning: { outlineColor: "xovt8d8", outlineStyle: "xaatb59" },
};

const categoricalBackgroundIdleStyles = {
  0: { backgroundColor: "x15b7j53" },
  1: { backgroundColor: "xx490rm" },
  2: { backgroundColor: "x1vxgkma" },
  3: { backgroundColor: "xev6e05" },
  4: { backgroundColor: "x1okw7gl" },
  5: { backgroundColor: "xm27y4y" },
  6: { backgroundColor: "x1rcjd8h" },
  7: { backgroundColor: "xj31fhn" },
};

const categoricalForegroundTextStyles = {
  0: { color: "x1kq3dli" },
  1: { color: "x3yajuq" },
  2: { color: "x16ekl0a" },
  3: { color: "x1ucbko1" },
  4: { color: "x9ieef6" },
  5: { color: "x3m00aj" },
  6: { color: "x1pimas5" },
  7: { color: "x1f2mhan" },
};

const staticBackgroundStyles = {
  content: { backgroundColor: "x1gzqxud" },
  error: { backgroundColor: "x1q6shm8" },
  flat: { backgroundColor: "x1v911su" },
  inactive: { backgroundColor: "xas4zb2" },
  info: { backgroundColor: "xb57al4" },
  mainNavigationSelected: { backgroundColor: "xb57al4" },
  onboarding: { backgroundColor: "xgyuhzn" },
  overlay: { backgroundColor: "x1c8ul09" },
  page: { backgroundColor: "xq4jnbd" },
  selected: { backgroundColor: "xlvp1be" },
  success: { backgroundColor: "x1bmepy4" },
  warning: { backgroundColor: "x1adlnos" },
  wash: { backgroundColor: "xas4zb2" },
};

const staticBackgroundInvertedStyles = {
  content: { backgroundColor: "x1av4zun" },
  error: { backgroundColor: "x1q6shm8" },
  flat: { backgroundColor: "x1v911su" },
  inactive: { backgroundColor: "xas4zb2" },
  info: { backgroundColor: "xb57al4" },
  mainNavigationSelected: { backgroundColor: "xb57al4" },
  onboarding: { backgroundColor: "xgyuhzn" },
  overlay: { backgroundColor: "x1c8ul09" },
  page: { backgroundColor: "xq4jnbd" },
  selected: { backgroundColor: "xlvp1be" },
  success: { backgroundColor: "x1bmepy4" },
  warning: { backgroundColor: "x1adlnos" },
  wash: { backgroundColor: "x1ybmbna" },
};

const staticBackgroundMutedStyles = {
  content: { backgroundColor: "x1gzqxud" },
  error: { backgroundColor: "x1952bq8" },
  flat: { backgroundColor: "x1v911su" },
  inactive: { backgroundColor: "xas4zb2" },
  info: { backgroundColor: "xlvp1be" },
  mainNavigationSelected: { backgroundColor: "xb57al4" },
  onboarding: { backgroundColor: "xgyuhzn" },
  overlay: { backgroundColor: "x1c8ul09" },
  page: { backgroundColor: "xq4jnbd" },
  selected: { backgroundColor: "xlvp1be" },
  success: { backgroundColor: "x1fwvgxd" },
  warning: { backgroundColor: "xduklol" },
  wash: { backgroundColor: "x1yhoyej" },
};

const staticBackgroundInvertedMutedStyles = {
  content: { backgroundColor: "x1av4zun" },
  error: { backgroundColor: "x1q6shm8" },
  flat: { backgroundColor: "x1v911su" },
  inactive: { backgroundColor: "xas4zb2" },
  info: { backgroundColor: "xb57al4" },
  mainNavigationSelected: { backgroundColor: "xb57al4" },
  onboarding: { backgroundColor: "xgyuhzn" },
  overlay: { backgroundColor: "x1c8ul09" },
  page: { backgroundColor: "xq4jnbd" },
  selected: { backgroundColor: "xlvp1be" },
  success: { backgroundColor: "x1bmepy4" },
  warning: { backgroundColor: "x1adlnos" },
  wash: { backgroundColor: "x1ybmbna" },
};

const textActiveStyles = {
  error: { color: "x1ejwfya" },
  heading: { color: "x4hq6eo" },
  headingDescription: { color: "x4hq6eo" },
  info: { color: "xwpu04d" },
  link: { color: "xjnfcd9" },
  placeholder: { color: "x6lvj10" },
  success: { color: "x1fp01tm" },
  value: { color: "x108nfp6" },
  valueDescription: { color: "x4hq6eo" },
  warning: { color: "xx3ys0k" },
};

const textDisabledStyles = {
  error: { color: "x1gark0l" },
  heading: { color: "x150cnoy" },
  headingDescription: { color: "x150cnoy" },
  info: { color: "x3rod1v" },
  link: { color: "x931pkn" },
  placeholder: { color: "x9c3zl9" },
  success: { color: "xl8mqd3" },
  value: { color: "x1kdmppe" },
  valueDescription: { color: "x150cnoy" },
  warning: { color: "xixgoho" },
};

const textInvertedActiveStyles = {
  error: { color: "x1ejwfya" },
  heading: { color: "x99e291" },
  headingDescription: { color: "x99e291" },
  info: { color: "xwpu04d" },
  link: { color: "xjnfcd9" },
  placeholder: { color: "xfiw4rn" },
  success: { color: "x1fp01tm" },
  value: { color: "x140t73q" },
  valueDescription: { color: "x99e291" },
  warning: { color: "xx3ys0k" },
};

const textInvertedDisabledStyles = {
  error: { color: "x1gark0l" },
  heading: { color: "xsokbok" },
  headingDescription: { color: "xsokbok" },
  info: { color: "x3rod1v" },
  link: { color: "x931pkn" },
  placeholder: { color: "x1t8b4hb" },
  success: { color: "xl8mqd3" },
  value: { color: "xto31z9" },
  valueDescription: { color: "xsokbok" },
  warning: { color: "xixgoho" },
};

const interactiveBackgroundIdleStyles = {
  button: { backgroundColor: "xas4zb2" },
  creation: { backgroundColor: "x1bmepy4" },
  error: { backgroundColor: "x1952bq8" },
  flat: { backgroundColor: "x1v911su" },
  flatInverted: { backgroundColor: "x8b1hf0" },
  flatNavigation: { backgroundColor: "xlvp1be" },
  input: { backgroundColor: "x1gzqxud" },
  link: { backgroundColor: "x1v911su" },
  mainNavigation: { backgroundColor: "x1v911su" },
  mainNavigationSelected: { backgroundColor: "x1v911su" },
  navigation: { backgroundColor: "xlvp1be" },
  on: { backgroundColor: "xb57al4" },
  onboarding: { backgroundColor: "xgyuhzn" },
  primary: { backgroundColor: "xb57al4" },
  selected: { backgroundColor: "xlvp1be" },
  warning: { backgroundColor: "xduklol" },
  wash: { backgroundColor: "xas4zb2" },
};

const interactiveBackgroundActiveStyles = {
  button: { backgroundColor: "x1e4gqcv" },
  creation: { backgroundColor: "xnc3ajd" },
  error: { backgroundColor: "x1q5x5ga" },
  flat: { backgroundColor: "x1si8nl4" },
  flatInverted: { backgroundColor: "x1ohetei" },
  flatNavigation: { backgroundColor: "xjtiqty" },
  input: { backgroundColor: "xrh1vfq" },
  link: { backgroundColor: "x1si8nl4" },
  mainNavigation: { backgroundColor: "x1si8nl4" },
  mainNavigationSelected: { backgroundColor: "x1si8nl4" },
  navigation: { backgroundColor: "xjtiqty" },
  on: { backgroundColor: "xb57al4" },
  onboarding: { backgroundColor: "xj1bup" },
  primary: { backgroundColor: "x1w7whrn" },
  selected: { backgroundColor: "xjtiqty" },
  warning: { backgroundColor: "xnamc57" },
  wash: { backgroundColor: "x1e4gqcv" },
};

const interactiveBackgroundDisabledStyles = {
  button: { backgroundColor: "x1si8nl4" },
  creation: { backgroundColor: "xypzpgp" },
  error: { backgroundColor: "x3n49o8" },
  flat: { backgroundColor: "x1v911su" },
  flatInverted: { backgroundColor: "x8b1hf0" },
  flatNavigation: { backgroundColor: "xas4zb2" },
  input: { backgroundColor: "xq4jnbd" },
  link: { backgroundColor: "x1v911su" },
  mainNavigation: { backgroundColor: "x1v911su" },
  mainNavigationSelected: { backgroundColor: "x1v911su" },
  navigation: { backgroundColor: "xas4zb2" },
  on: { backgroundColor: "x1bbbera" },
  onboarding: { backgroundColor: "x1tnfm5v" },
  primary: { backgroundColor: "x16qzbjk" },
  selected: { backgroundColor: "xas4zb2" },
  warning: { backgroundColor: "xvfcu65" },
  wash: { backgroundColor: "x1si8nl4" },
};

const interactiveBackgroundFocusedStyles = {
  button: { backgroundColor: "x1si8nl4" },
  creation: { backgroundColor: "xouchr0" },
  error: { backgroundColor: "x1ui0n4m" },
  flat: { backgroundColor: "xas4zb2" },
  flatInverted: { backgroundColor: "xpj9qch" },
  flatNavigation: { backgroundColor: "xb9hb0d" },
  input: { backgroundColor: "x1c4k4jh" },
  link: { backgroundColor: "xas4zb2" },
  mainNavigation: { backgroundColor: "xas4zb2" },
  mainNavigationSelected: { backgroundColor: "xas4zb2" },
  navigation: { backgroundColor: "xb9hb0d" },
  on: { backgroundColor: "x1natfvz" },
  onboarding: { backgroundColor: "xa74hv5" },
  primary: { backgroundColor: "x1natfvz" },
  selected: { backgroundColor: "xb9hb0d" },
  warning: { backgroundColor: "x1ub4f6" },
  wash: { backgroundColor: "x1si8nl4" },
};

const interactiveBackgroundTextWeightStyles = {
  button: { fontWeight: "xo1l8bm" },
  creation: { fontWeight: "x1xlr1w8" },
  error: { fontWeight: "xo1l8bm" },
  flat: { fontWeight: "xo1l8bm" },
  flatInverted: { fontWeight: "x1xlr1w8" },
  flatNavigation: { fontWeight: "x1xlr1w8" },
  input: { fontWeight: "xo1l8bm" },
  link: { fontWeight: "xo1l8bm" },
  mainNavigation: { fontWeight: "xo1l8bm" },
  mainNavigationSelected: { fontWeight: "xo1l8bm" },
  navigation: { fontWeight: "x1xlr1w8" },
  on: { fontWeight: "x1xlr1w8" },
  onboarding: { fontWeight: "xo1l8bm" },
  primary: { fontWeight: "x1xlr1w8" },
  selected: { fontWeight: "xo1l8bm" },
  warning: { fontWeight: "xo1l8bm" },
  wash: { fontWeight: "xo1l8bm" },
};

const interactiveBackgroundTextActiveStyles = {
  button: { color: "x108nfp6" },
  creation: { color: "x140t73q" },
  error: { color: "x108nfp6" },
  flat: { color: "x108nfp6" },
  flatInverted: { color: "x140t73q" },
  flatNavigation: { color: "xwpu04d" },
  input: { color: "x108nfp6" },
  link: { color: "xwpu04d" },
  mainNavigation: { color: "x108nfp6" },
  mainNavigationSelected: { color: "xwpu04d" },
  navigation: { color: "xwpu04d" },
  on: { color: "x140t73q" },
  onboarding: { color: "x140t73q" },
  primary: { color: "x140t73q" },
  selected: { color: "x108nfp6" },
  warning: { color: "x108nfp6" },
  wash: { color: "x108nfp6" },
};

const interactiveBackgroundTextDisabledStyles = {
  button: { color: "x1kdmppe" },
  creation: { color: "xto31z9" },
  error: { color: "x1gark0l" },
  flat: { color: "x1kdmppe" },
  flatInverted: { color: "xto31z9" },
  flatNavigation: { color: "x3rod1v" },
  input: { color: "x1kdmppe" },
  link: { color: "x3rod1v" },
  mainNavigation: { color: "x1kdmppe" },
  mainNavigationSelected: { color: "x3rod1v" },
  navigation: { color: "x3rod1v" },
  on: { color: "xto31z9" },
  onboarding: { color: "xto31z9" },
  primary: { color: "xto31z9" },
  selected: { color: "x1kdmppe" },
  warning: { color: "xixgoho" },
  wash: { color: "x1kdmppe" },
};

const interactiveOverlayColorStyles = {
  button: { backgroundColor: "x12s6r1p" },
  creation: { backgroundColor: "x12s6r1p" },
  error: { backgroundColor: "x12s6r1p" },
  flat: { backgroundColor: "x12s6r1p" },
  flatInverted: { backgroundColor: "x1gzqxud" },
  flatNavigation: { backgroundColor: "xb57al4" },
  input: { backgroundColor: "x1gzqxud" },
  link: { backgroundColor: "x12s6r1p" },
  mainNavigation: { backgroundColor: "x12s6r1p" },
  mainNavigationSelected: { backgroundColor: "x12s6r1p" },
  navigation: { backgroundColor: "xb57al4" },
  on: { backgroundColor: "x12s6r1p" },
  onboarding: { backgroundColor: "x12s6r1p" },
  primary: { backgroundColor: "x12s6r1p" },
  selected: { backgroundColor: "xb57al4" },
  warning: { backgroundColor: "x12s6r1p" },
  wash: { backgroundColor: "x12s6r1p" },
};

const interactiveOverlayIdleStyles = {
  button: { opacity: "xg01cxk" },
  creation: { opacity: "xg01cxk" },
  error: { opacity: "xg01cxk" },
  flat: { opacity: "xg01cxk" },
  flatInverted: { opacity: "xg01cxk" },
  flatNavigation: { opacity: "xg01cxk" },
  input: { opacity: "xg01cxk" },
  link: { opacity: "xg01cxk" },
  mainNavigation: { opacity: "xg01cxk" },
  mainNavigationSelected: { opacity: "xg01cxk" },
  navigation: { opacity: "xg01cxk" },
  on: { opacity: "xg01cxk" },
  onboarding: { opacity: "xg01cxk" },
  primary: { opacity: "xg01cxk" },
  selected: { opacity: "xg01cxk" },
  warning: { opacity: "xg01cxk" },
  wash: { opacity: "xg01cxk" },
};

const interactiveOverlayFocusedStyles = {
  button: { opacity: "x1ptxcow" },
  creation: { opacity: "x1ptxcow" },
  error: { opacity: "x1ptxcow" },
  flat: { opacity: "x1ptxcow" },
  flatInverted: { opacity: "x1ptxcow" },
  flatNavigation: { opacity: "x1xyvc85" },
  input: { opacity: "x1ptxcow" },
  link: { opacity: "x1ptxcow" },
  mainNavigation: { opacity: "x1ptxcow" },
  mainNavigationSelected: { opacity: "x1ptxcow" },
  navigation: { opacity: "x1xyvc85" },
  on: { opacity: "x1ptxcow" },
  onboarding: { opacity: "x1ptxcow" },
  primary: { opacity: "x1ptxcow" },
  selected: { opacity: "x1xyvc85" },
  warning: { opacity: "x1ptxcow" },
  wash: { opacity: "x1ptxcow" },
};

const interactiveOverlayActiveStyles = {
  button: { opacity: "x1xyvc85" },
  creation: { opacity: "xz5rk10" },
  error: { opacity: "x1xyvc85" },
  flat: { opacity: "x1xyvc85" },
  flatInverted: { opacity: "x1xyvc85" },
  flatNavigation: { opacity: "xvpkmg4" },
  input: { opacity: "x1xyvc85" },
  link: { opacity: "x1xyvc85" },
  mainNavigation: { opacity: "x1xyvc85" },
  mainNavigationSelected: { opacity: "x1xyvc85" },
  navigation: { opacity: "xvpkmg4" },
  on: { opacity: "xz5rk10" },
  onboarding: { opacity: "xz5rk10" },
  primary: { opacity: "xz5rk10" },
  selected: { opacity: "xvpkmg4" },
  warning: { opacity: "x1xyvc85" },
  wash: { opacity: "x1xyvc85" },
};

const glimmerStyles = {
  0: {
    animationDelay: "x1uzojwf",
    animationName: "xrtjlq3",
    backgroundColor: "xc1r0np",
    opacity: "xkk3ads",
  },
  1: {
    animationDelay: "x1t83zlg",
    animationName: "xrtjlq3",
    backgroundColor: "xc1r0np",
    opacity: "xkk3ads",
  },
  2: {
    animationDelay: "x1xwhvez",
    animationName: "xrtjlq3",
    backgroundColor: "xc1r0np",
    opacity: "xkk3ads",
  },
  3: {
    animationDelay: "x1nrwgbl",
    animationName: "x1camesu",
    backgroundColor: "xc1r0np",
    opacity: "xkk3ads",
  },
  4: {
    animationDelay: "x1vvzlz1",
    animationName: "x1wfwbum",
    backgroundColor: "xc1r0np",
    opacity: "xkk3ads",
  },
};

const glimmerVariantsStyles = {
  input: {
    animationName: "x5uexz0",
    backgroundColor: "xc1r0np",
    opacity: "xkk3ads",
  },
};

const barElementStrokeStyles = {
  light: { stroke: "x1606d9y" },
  dark: { stroke: "x4mwgaj" },
};

const trackElementStrokeStyles = {
  light: { stroke: "x1tnjt92" },
  dark: { stroke: "x18z1ann" },
};

const outlineActiveStyles = {
  button: { boxShadow: "x15u2huf" },
  creation: { boxShadow: "x6zghsr" },
  error: { boxShadow: "xo6rvx7" },
  flat: { boxShadow: "x1d0qdvz" },
  flatInverted: { boxShadow: "xbmzmm3" },
  flatNavigation: { boxShadow: "x17ihpsl" },
  input: { boxShadow: "xwwk14r" },
  link: { boxShadow: "x1d0qdvz" },
  mainNavigation: { boxShadow: "x1d0qdvz" },
  mainNavigationSelected: { boxShadow: "x1d0qdvz" },
  navigation: { boxShadow: "x17ihpsl" },
  on: { boxShadow: "x1464af" },
  onboarding: { boxShadow: "x3w23vw" },
  primary: { boxShadow: "x8tw7v1" },
  selected: { boxShadow: "x17ihpsl" },
  warning: { boxShadow: "x5d84an" },
  wash: { boxShadow: "x15u2huf" },
};

const outlineFocusedStyles = {
  button: { boxShadow: "x1d0qdvz" },
  creation: { boxShadow: "xk8u0jf" },
  error: { boxShadow: "xt4f6be" },
  flat: { boxShadow: "xq6q66p" },
  flatInverted: { boxShadow: "x1hcs357" },
  flatNavigation: { boxShadow: "x1rr46mp" },
  input: { boxShadow: "xnwyait" },
  link: { boxShadow: "xq6q66p" },
  mainNavigation: { boxShadow: "xq6q66p" },
  mainNavigationSelected: { boxShadow: "xq6q66p" },
  navigation: { boxShadow: "x1rr46mp" },
  on: { boxShadow: "x1t5zvq3" },
  onboarding: { boxShadow: "x15f6gkv" },
  primary: { boxShadow: "x1t5zvq3" },
  selected: { boxShadow: "x1rr46mp" },
  warning: { boxShadow: "x3vxpbe" },
  wash: { boxShadow: "x1d0qdvz" },
};

const onboardingTourHighlightStyles = {
  base: { boxShadow: "x1k3v63p" },
};

const onboardingPulseAnimationStyles = {
  base: {
    animationName: "xnp97gk",
    animationIterationCount: "xa4qsjk",
    animationDuration: "x1c74tu6",
  },
};

export {
  barElementStrokeStyles,
  borderDefaultActiveStyles,
  borderDefaultDisabledStyles,
  borderFocusedActiveStyles,
  borderFocusedDisabledStyles,
  categoricalBackgroundIdleStyles,
  categoricalForegroundTextStyles,
  glimmerStyles,
  glimmerVariantsStyles,
  iconActiveStyles,
  iconDisabledStyles,
  interactiveBackgroundActiveStyles,
  interactiveBackgroundDisabledStyles,
  interactiveBackgroundFocusedStyles,
  interactiveBackgroundIdleStyles,
  interactiveBackgroundTextActiveStyles,
  interactiveBackgroundTextDisabledStyles,
  interactiveBackgroundTextWeightStyles,
  interactiveBorderDefaultActiveStyles,
  interactiveBorderDefaultDisabledStyles,
  interactiveBorderFocusedActiveStyles,
  interactiveBorderFocusedDisabledStyles,
  interactiveOverlayActiveStyles,
  interactiveOverlayColorStyles,
  interactiveOverlayFocusedStyles,
  interactiveOverlayIdleStyles,
  onboardingPulseAnimationStyles,
  onboardingTourHighlightStyles,
  outlineActiveStyles,
  outlineFocusedStyles,
  staticBackgroundInvertedMutedStyles,
  staticBackgroundInvertedStyles,
  staticBackgroundMutedStyles,
  staticBackgroundStyles,
  textActiveStyles,
  textDisabledStyles,
  textInvertedActiveStyles,
  textInvertedDisabledStyles,
  trackElementStrokeStyles,
};
