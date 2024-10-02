import stylex from '@stylexjs/stylex';

const glimmerVariantsInputAnimation = stylex.keyframes({
  '0%': {
    opacity: 0.12,
  },

  '100%': {
    opacity: 0.02,
  },
});

const onboardingPulseAnimationBase = stylex.keyframes({
  '0%': {
    boxShadow: '0 0 0 4px rgba(63,40,132,1),0 0 0 8px rgba(92,59,191,.2)',
  },

  '50%': {
    boxShadow: '0 0 0 4px rgba(63,40,132,1),0 0 0 12px rgba(92,59,191,.2)',
  },

  '100%': {
    boxShadow: '0 0 0 4px rgba(63,40,132,1),0 0 0 8px rgba(92,59,191,.2)',
  },
});

export const commonStyles = {
  iconActiveStyles: stylex.create({
    default: {
      color: 'rgba(0,0,0,.75)',
    },
    error: {
      color: 'rgba(217,54,22,1)',
    },
    info: {
      color: 'rgba(24,119,242,1)',
    },
    inverted: {
      color: 'rgba(255,255,255,1)',
    },
    marker: {
      color: 'rgba(0,0,0,.1)',
    },
    placeholder: {
      color: 'rgba(0,0,0,.55)',
    },
    success: {
      color: 'rgba(99,190,9,1)',
    },
    warning: {
      color: 'rgba(255,186,0,1)',
    },
    recommendation: {
      color: 'rgba(123,100,192,1)',
    },
  }),

  iconDisabledStyles: stylex.create({
    default: {
      color: 'rgba(0,0,0,.35)',
    },
    error: {
      color: 'rgba(217,54,22,.6)',
    },
    info: {
      color: 'rgba(24,119,242,.6)',
    },
    inverted: {
      color: 'rgba(255,255,255,.6)',
    },
    marker: {
      color: 'rgba(0,0,0,.1)',
    },
    placeholder: {
      color: 'rgba(0,0,0,.15)',
    },
    success: {
      color: 'rgba(99,190,9,.6)',
    },
    warning: {
      color: 'rgba(255,186,0,.6)',
    },
    recommendation: {
      color: 'rgba(123,100,192,.6)',
    },
  }),

  borderDefaultActiveStyles: stylex.create({
    button: {
      borderColor: 'rgba(0,0,0,0)',
    },
    control: {
      borderColor: 'rgba(0,0,0,0)',
    },
    default: {
      borderColor: 'rgba(24,119,242,1)',
    },
    divider: {
      borderColor: 'rgba(0,0,0,.55)',
    },
    element: {
      borderColor: 'rgba(0,0,0,.15)',
    },
    error: {
      borderColor: 'rgba(217,54,22,1)',
    },
    frame: {
      borderColor: 'rgba(255,255,255,1)',
    },
    info: {
      borderColor: 'rgba(24,119,242,1)',
    },
    mainNavigationSelected: {
      borderColor: 'rgba(0,0,0,.75)',
    },
    success: {
      borderColor: 'rgba(99,190,9,1)',
    },
    warning: {
      borderColor: 'rgba(255,186,0,1)',
    },
    recommendation: {
      borderColor: 'rgba(123,100,192,1)',
    },
  }),

  borderDefaultDisabledStyles: stylex.create({
    button: {
      borderColor: 'rgba(0,0,0,0)',
    },
    control: {
      borderColor: 'rgba(0,0,0,0)',
    },
    default: {
      borderColor: 'rgba(24,119,242,.6)',
    },
    divider: {
      borderColor: 'rgba(0,0,0,.15)',
    },
    element: {
      borderColor: 'rgba(0,0,0,.15)',
    },
    error: {
      borderColor: 'rgba(217,54,22,.6)',
    },
    frame: {
      borderColor: 'rgba(255,255,255,.6)',
    },
    info: {
      borderColor: 'rgba(24,119,242,.6)',
    },
    mainNavigationSelected: {
      borderColor: 'rgba(0,0,0,.35)',
    },
    success: {
      borderColor: 'rgba(99,190,9,.6)',
    },
    warning: {
      borderColor: 'rgba(255,186,0,.6)',
    },
    recommendation: {
      borderColor: 'rgba(123,100,192,.6)',
    },
  }),

  borderFocusedActiveStyles: stylex.create({
    button: {
      borderColor: 'rgba(0,0,0,0)',
    },
    control: {
      borderColor: 'rgba(0,0,0,0)',
    },
    default: {
      borderColor: 'rgba(24,119,242,1)',
    },
    divider: {
      borderColor: 'rgba(0,0,0,.55)',
    },
    element: {
      borderColor: 'rgba(0,0,0,.15)',
    },
    error: {
      borderColor: 'rgba(153,26,0,1)',
    },
    frame: {
      borderColor: 'rgba(255,255,255,1)',
    },
    info: {
      borderColor: 'rgba(23,113,237,1)',
    },
    mainNavigationSelected: {
      borderColor: 'rgba(0,0,0,.75)',
    },
    success: {
      borderColor: 'rgba(57,115,0,1)',
    },
    warning: {
      borderColor: 'rgba(77,56,0,1)',
    },
    recommendation: {
      borderColor: 'rgba(123,100,192,1)',
    },
  }),

  borderFocusedDisabledStyles: stylex.create({
    button: {
      borderColor: 'rgba(0,0,0,0)',
    },
    control: {
      borderColor: 'rgba(0,0,0,0)',
    },
    default: {
      borderColor: 'rgba(24,119,242,.6)',
    },
    divider: {
      borderColor: 'rgba(0,0,0,.15)',
    },
    element: {
      borderColor: 'rgba(0,0,0,.15)',
    },
    error: {
      borderColor: 'rgba(153,26,0,.6)',
    },
    frame: {
      borderColor: 'rgba(255,255,255,.6)',
    },
    info: {
      borderColor: 'rgba(23,113,237,.6)',
    },
    mainNavigationSelected: {
      borderColor: 'rgba(0,0,0,.35)',
    },
    success: {
      borderColor: 'rgba(57,115,0,.6)',
    },
    warning: {
      borderColor: 'rgba(77,56,0,.6)',
    },
    recommendation: {
      borderColor: 'rgba(123,100,192,.6)',
    },
  }),

  borderMutedActiveStyles: stylex.create({
    button: {
      borderColor: 'rgba(0,0,0,0)',
    },
    control: {
      borderColor: 'rgba(0,0,0,0)',
    },
    default: {
      borderColor: 'rgba(242,242,242,1)',
    },
    divider: {
      borderColor: 'rgba(0,0,0,.55)',
    },
    element: {
      borderColor: 'rgba(0,0,0,.15)',
    },
    error: {
      borderColor: 'rgba(255,234,230,1)',
    },
    frame: {
      borderColor: 'rgba(255,255,255,1)',
    },
    info: {
      borderColor: 'rgba(24,119,242,1)',
    },
    mainNavigationSelected: {
      borderColor: 'rgba(0,0,0,.75)',
    },
    success: {
      borderColor: 'rgba(218,242,194,1)',
    },
    warning: {
      borderColor: 'rgba(255,241,204,1)',
    },
    recommendation: {
      borderColor: 'rgba(240,235,245,1)',
    },
  }),

  borderMutedDisabledStyles: stylex.create({
    button: {
      borderColor: 'rgba(0,0,0,0)',
    },
    control: {
      borderColor: 'rgba(0,0,0,0)',
    },
    default: {
      borderColor: 'rgba(242,242,242,.6)',
    },
    divider: {
      borderColor: 'rgba(0,0,0,.15)',
    },
    element: {
      borderColor: 'rgba(0,0,0,.15)',
    },
    error: {
      borderColor: 'rgba(255,234,230,.6)',
    },
    frame: {
      borderColor: 'rgba(255,255,255,.6)',
    },
    info: {
      borderColor: 'rgba(24,119,242,.6)',
    },
    mainNavigationSelected: {
      borderColor: 'rgba(0,0,0,.35)',
    },
    success: {
      borderColor: 'rgba(218,242,194,.6)',
    },
    warning: {
      borderColor: 'rgba(255,241,204,.6)',
    },
    recommendation: {
      borderColor: 'rgba(240,235,245,.6)',
    },
  }),

  interactiveBorderDefaultActiveStyles: stylex.create({
    button: {
      outlineColor: 'rgba(0,0,0,0)',
      outlineStyle: 'solid',
    },
    control: {
      outlineColor: 'rgba(0,0,0,0)',
      outlineStyle: 'solid',
    },
    default: {
      outlineColor: 'rgba(24,119,242,1)',
      outlineStyle: 'solid',
    },
    divider: {
      outlineColor: 'rgba(0,0,0,.55)',
      outlineStyle: 'solid',
    },
    element: {
      outlineColor: 'rgba(0,0,0,.15)',
      outlineStyle: 'solid',
    },
    error: {
      outlineColor: 'rgba(217,54,22,1)',
      outlineStyle: 'solid',
    },
    frame: {
      outlineColor: 'rgba(255,255,255,1)',
      outlineStyle: 'solid',
    },
    info: {
      outlineColor: 'rgba(24,119,242,1)',
      outlineStyle: 'solid',
    },
    mainNavigationSelected: {
      outlineColor: 'rgba(0,0,0,.75)',
      outlineStyle: 'solid',
    },
    success: {
      outlineColor: 'rgba(99,190,9,1)',
      outlineStyle: 'solid',
    },
    warning: {
      outlineColor: 'rgba(255,186,0,1)',
      outlineStyle: 'solid',
    },
    recommendation: {
      outlineColor: 'rgba(123,100,192,1)',
      outlineStyle: 'solid',
    },
  }),

  interactiveBorderDefaultDisabledStyles: stylex.create({
    button: {
      outlineColor: 'rgba(0,0,0,0)',
      outlineStyle: 'solid',
    },
    control: {
      outlineColor: 'rgba(0,0,0,0)',
      outlineStyle: 'solid',
    },
    default: {
      outlineColor: 'rgba(24,119,242,.6)',
      outlineStyle: 'solid',
    },
    divider: {
      outlineColor: 'rgba(0,0,0,.15)',
      outlineStyle: 'solid',
    },
    element: {
      outlineColor: 'rgba(0,0,0,.15)',
      outlineStyle: 'solid',
    },
    error: {
      outlineColor: 'rgba(217,54,22,.6)',
      outlineStyle: 'solid',
    },
    frame: {
      outlineColor: 'rgba(255,255,255,.6)',
      outlineStyle: 'solid',
    },
    info: {
      outlineColor: 'rgba(24,119,242,.6)',
      outlineStyle: 'solid',
    },
    mainNavigationSelected: {
      outlineColor: 'rgba(0,0,0,.35)',
      outlineStyle: 'solid',
    },
    success: {
      outlineColor: 'rgba(99,190,9,.6)',
      outlineStyle: 'solid',
    },
    warning: {
      outlineColor: 'rgba(255,186,0,.6)',
      outlineStyle: 'solid',
    },
    recommendation: {
      outlineColor: 'rgba(123,100,192,.6)',
      outlineStyle: 'solid',
    },
  }),

  interactiveBorderFocusedActiveStyles: stylex.create({
    button: {
      outlineColor: 'rgba(0,0,0,0)',
      outlineStyle: 'solid',
    },
    control: {
      outlineColor: 'rgba(0,0,0,0)',
      outlineStyle: 'solid',
    },
    default: {
      outlineColor: 'rgba(24,119,242,1)',
      outlineStyle: 'solid',
    },
    divider: {
      outlineColor: 'rgba(0,0,0,.55)',
      outlineStyle: 'solid',
    },
    element: {
      outlineColor: 'rgba(0,0,0,.15)',
      outlineStyle: 'solid',
    },
    error: {
      outlineColor: 'rgba(153,26,0,1)',
      outlineStyle: 'solid',
    },
    frame: {
      outlineColor: 'rgba(255,255,255,1)',
      outlineStyle: 'solid',
    },
    info: {
      outlineColor: 'rgba(23,113,237,1)',
      outlineStyle: 'solid',
    },
    mainNavigationSelected: {
      outlineColor: 'rgba(0,0,0,.75)',
      outlineStyle: 'solid',
    },
    success: {
      outlineColor: 'rgba(57,115,0,1)',
      outlineStyle: 'solid',
    },
    warning: {
      outlineColor: 'rgba(77,56,0,1)',
      outlineStyle: 'solid',
    },
    recommendation: {
      outlineColor: 'rgba(123,100,192,1)',
      outlineStyle: 'solid',
    },
  }),

  interactiveBorderFocusedDisabledStyles: stylex.create({
    button: {
      outlineColor: 'rgba(0,0,0,0)',
      outlineStyle: 'solid',
    },
    control: {
      outlineColor: 'rgba(0,0,0,0)',
      outlineStyle: 'solid',
    },
    default: {
      outlineColor: 'rgba(24,119,242,.6)',
      outlineStyle: 'solid',
    },
    divider: {
      outlineColor: 'rgba(0,0,0,.15)',
      outlineStyle: 'solid',
    },
    element: {
      outlineColor: 'rgba(0,0,0,.15)',
      outlineStyle: 'solid',
    },
    error: {
      outlineColor: 'rgba(153,26,0,.6)',
      outlineStyle: 'solid',
    },
    frame: {
      outlineColor: 'rgba(255,255,255,.6)',
      outlineStyle: 'solid',
    },
    info: {
      outlineColor: 'rgba(23,113,237,.6)',
      outlineStyle: 'solid',
    },
    mainNavigationSelected: {
      outlineColor: 'rgba(0,0,0,.35)',
      outlineStyle: 'solid',
    },
    success: {
      outlineColor: 'rgba(57,115,0,.6)',
      outlineStyle: 'solid',
    },
    warning: {
      outlineColor: 'rgba(77,56,0,.6)',
      outlineStyle: 'solid',
    },
    recommendation: {
      outlineColor: 'rgba(123,100,192,.6)',
      outlineStyle: 'solid',
    },
  }),

  categoricalBackgroundIdleStyles: stylex.create({
    0: {
      backgroundColor: 'rgba(50,205,205,.2)',
    },
    1: {
      backgroundColor: 'rgba(140,217,255,.2)',
    },
    2: {
      backgroundColor: 'rgba(128,170,255,.2)',
    },
    3: {
      backgroundColor: 'rgba(92,59,191,.2)',
    },
    4: {
      backgroundColor: 'rgba(158,67,223,.2)',
    },
    5: {
      backgroundColor: 'rgba(172,47,130,.2)',
    },
    6: {
      backgroundColor: 'rgba(212,92,67,.2)',
    },
    7: {
      backgroundColor: 'rgba(48,131,96,.2)',
    },
  }),

  categoricalForegroundTextStyles: stylex.create({
    0: {
      color: 'rgba(20,82,82,1)',
    },
    1: {
      color: 'rgba(56,86,102,1)',
    },
    2: {
      color: 'rgba(51,68,102,1)',
    },
    3: {
      color: 'rgba(36,23,76,1)',
    },
    4: {
      color: 'rgba(63,26,89,1)',
    },
    5: {
      color: 'rgba(68,18,52,1)',
    },
    6: {
      color: 'rgba(84,36,26,1)',
    },
    7: {
      color: 'rgba(19,52,38,1)',
    },
  }),

  //

  staticBackgroundStyles: stylex.create({
    content: {
      backgroundColor: 'rgba(255,255,255,1)',
    },
    error: {
      backgroundColor: 'rgba(217,54,22,1)',
    },
    flat: {
      backgroundColor: 'rgba(0,0,0,0)',
    },
    inactive: {
      backgroundColor: 'rgba(0,0,0,.05)',
    },
    info: {
      backgroundColor: 'rgba(242,242,242,1)',
    },
    primary: {
      backgroundColor: 'rgba(24,119,242,1)',
    },
    mainNavigationSelected: {
      backgroundColor: 'rgba(24,119,242,1)',
    },
    onboarding: {
      backgroundColor: 'rgba(92,59,191,1)',
    },
    overlay: {
      backgroundColor: 'rgba(0,0,0,.4)',
    },
    page: {
      backgroundColor: 'rgba(242,242,242,1)',
    },
    recommendation: {
      backgroundColor: ' rgba(123,100,192,1)',
    },
    selected: {
      backgroundColor: 'rgba(24,119,242,.1)',
    },
    success: {
      backgroundColor: 'rgba(99,190,9,1)',
    },
    warning: {
      backgroundColor: 'rgba(255,186,0,1)',
    },
    wash: {
      backgroundColor: 'rgba(0,0,0,.05)',
    },
  }),

  staticBackgroundInvertedStyles: stylex.create({
    content: {
      backgroundColor: 'rgba(0,0,0,.85)',
    },
    error: {
      backgroundColor: 'rgba(217,54,22,1)',
    },
    flat: {
      backgroundColor: 'rgba(0,0,0,0)',
    },
    inactive: {
      backgroundColor: 'rgba(0,0,0,.05)',
    },
    info: {
      backgroundColor: 'rgba(242,242,242,1)',
    },
    primary: {
      backgroundColor: 'rgba(24,119,242,1)',
    },
    mainNavigationSelected: {
      backgroundColor: 'rgba(24,119,242,1)',
    },
    onboarding: {
      backgroundColor: 'rgba(92,59,191,1)',
    },
    overlay: {
      backgroundColor: 'rgba(0,0,0,.4)',
    },
    page: {
      backgroundColor: 'rgba(242,242,242,1)',
    },
    recommendation: {
      backgroundColor: ' rgba(123,100,192,1)',
    },
    selected: {
      backgroundColor: 'rgba(24,119,242,.1)',
    },
    success: {
      backgroundColor: 'rgba(99,190,9,1)',
    },
    warning: {
      backgroundColor: 'rgba(255,186,0,1)',
    },
    wash: {
      backgroundColor: 'rgba(255,255,255,.3)',
    },
  }),

  staticBackgroundMutedStyles: stylex.create({
    content: {
      backgroundColor: 'rgba(255,255,255,1)',
    },
    error: {
      backgroundColor: 'rgba(255,234,230,1)',
    },
    flat: {
      backgroundColor: 'rgba(0,0,0,0)',
    },
    inactive: {
      backgroundColor: 'rgba(0,0,0,.05)',
    },
    info: {
      backgroundColor: 'rgba(242,242,242,1)',
    },
    primary: {
      backgroundColor: 'rgba(24,119,242,.1)',
    },
    mainNavigationSelected: {
      backgroundColor: 'rgba(24,119,242,1)',
    },
    onboarding: {
      backgroundColor: 'rgba(92,59,191,1)',
    },
    overlay: {
      backgroundColor: 'rgba(0,0,0,.4)',
    },
    page: {
      backgroundColor: 'rgba(242,242,242,1)',
    },
    recommendation: {
      backgroundColor: 'rgba(240,235,245,1)',
    },
    selected: {
      backgroundColor: 'rgba(24,119,242,.1)',
    },
    success: {
      backgroundColor: 'rgba(218,242,194,1)',
    },
    warning: {
      backgroundColor: 'rgba(255,241,204,1)',
    },
    wash: {
      backgroundColor: 'rgba(0,0,0,.03)',
    },
  }),

  staticBackgroundInvertedMutedStyles: stylex.create({
    content: {
      backgroundColor: 'rgba(0,0,0,.85)',
    },
    error: {
      backgroundColor: 'rgba(217,54,22,1)',
    },
    flat: {
      backgroundColor: 'rgba(0,0,0,0)',
    },
    inactive: {
      backgroundColor: 'rgba(0,0,0,.05)',
    },
    info: {
      backgroundColor: 'rgba(242,242,242,1)',
    },
    primary: {
      backgroundColor: 'rgba(24,119,242,1)',
    },
    mainNavigationSelected: {
      backgroundColor: 'rgba(24,119,242,1)',
    },
    onboarding: {
      backgroundColor: 'rgba(92,59,191,1)',
    },
    overlay: {
      backgroundColor: 'rgba(0,0,0,.4)',
    },
    page: {
      backgroundColor: 'rgba(242,242,242,1)',
    },
    recommendation: {
      backgroundColor: 'rgba(123,100,192,1)',
    },
    selected: {
      backgroundColor: 'rgba(24,119,242,.1)',
    },
    success: {
      backgroundColor: 'rgba(99,190,9,1)',
    },
    warning: {
      backgroundColor: 'rgba(255,186,0,1)',
    },
    wash: {
      backgroundColor: 'rgba(255,255,255,.3)',
    },
  }),

  textActiveStyles: stylex.create({
    error: {
      color: 'rgba(153,26,0,1)',
    },
    heading: {
      color: 'rgba(0,0,0,.75)',
    },
    headingDescription: {
      color: 'rgba(0,0,0,.75)',
    },
    info: {
      color: 'rgba(23,113,237,1)',
    },
    link: {
      color: 'rgba(20,97,204,1)',
    },
    placeholder: {
      color: 'rgba(0,0,0,.55)',
    },
    recommendation: {
      color: 'rgba(123,100,192,1)',
    },
    success: {
      color: 'rgba(57,115,0,1)',
    },
    value: {
      color: 'rgba(0,0,0,.85)',
    },
    valueDescription: {
      color: 'rgba(0,0,0,.75)',
    },
    warning: {
      color: 'rgba(77,56,0,1)',
    },
  }),

  textDisabledStyles: stylex.create({
    error: {
      color: 'rgba(153,26,0,.6)',
    },
    heading: {
      color: 'rgba(0,0,0,.35)',
    },
    headingDescription: {
      color: 'rgba(0,0,0,.35)',
    },
    info: {
      color: 'rgba(23,113,237,.6)',
    },
    link: {
      color: 'rgba(20,97,204,.6)',
    },
    placeholder: {
      color: 'rgba(0,0,0,.15)',
    },
    recommendation: {
      color: 'rgba(123,100,192,.6)',
    },
    success: {
      color: 'rgba(57,115,0,.6)',
    },
    value: {
      color: 'rgba(0,0,0,.45)',
    },
    valueDescription: {
      color: 'rgba(0,0,0,.35)',
    },
    warning: {
      color: 'rgba(77,56,0,.6)',
    },
  }),

  textInvertedActiveStyles: stylex.create({
    error: {
      color: 'rgba(153,26,0,1)',
    },
    heading: {
      color: 'rgba(255,255,255,.85)',
    },
    headingDescription: {
      color: 'rgba(255,255,255,.85)',
    },
    info: {
      color: 'rgba(23,113,237,1)',
    },
    link: {
      color: 'rgba(20,97,204,1)',
    },
    placeholder: {
      color: 'rgba(255,255,255,.65)',
    },
    recommendation: {
      color: 'rgba(123,100,192,1)',
    },
    success: {
      color: 'rgba(57,115,0,1)',
    },
    value: {
      color: 'rgba(255,255,255,1)',
    },
    valueDescription: {
      color: 'rgba(255,255,255,.85)',
    },
    warning: {
      color: 'rgba(77,56,0,1)',
    },
  }),

  textInvertedDisabledStyles: stylex.create({
    error: {
      color: 'rgba(153,26,0,.6)',
    },
    heading: {
      color: 'rgba(255,255,255,.45)',
    },
    headingDescription: {
      color: 'rgba(255,255,255,.45)',
    },
    info: {
      color: 'rgba(23,113,237,.6)',
    },
    link: {
      color: 'rgba(20,97,204,.6)',
    },
    placeholder: {
      color: 'rgba(255,255,255,.25)',
    },
    recommendation: {
      color: 'rgba(123,100,192,.6)',
    },
    success: {
      color: 'rgba(57,115,0,.6)',
    },
    value: {
      color: 'rgba(255,255,255,.6)',
    },
    valueDescription: {
      color: 'rgba(255,255,255,.45)',
    },
    warning: {
      color: 'rgba(77,56,0,.6)',
    },
  }),

  interactiveBackgroundIdleStyles: stylex.create({
    button: {
      backgroundColor: 'rgba(0,0,0,.05)',
    },
    creation: {
      backgroundColor: 'rgba(99,190,9,1)',
    },
    error: {
      backgroundColor: 'rgba(255,234,230,1)',
    },
    flat: {
      backgroundColor: 'rgba(0,0,0,0)',
    },
    flatInverted: {
      backgroundColor: 'rgba(255,255,255,0)',
    },
    flatNavigation: {
      backgroundColor: 'rgba(24,119,242,.1)',
    },
    input: {
      backgroundColor: 'rgba(255,255,255,1)',
    },
    link: {
      backgroundColor: 'rgba(0,0,0,0)',
    },
    mainNavigation: {
      backgroundColor: 'rgba(0,0,0,0)',
    },
    mainNavigationSelected: {
      backgroundColor: 'rgba(0,0,0,0)',
    },
    navigation: {
      backgroundColor: 'rgba(24,119,242,.1)',
    },
    on: {
      backgroundColor: 'rgba(24,119,242,1)',
    },
    onboarding: {
      backgroundColor: 'rgba(92,59,191,1)',
    },
    primary: {
      backgroundColor: 'rgba(24,119,242,1)',
    },
    selected: {
      backgroundColor: 'rgba(24,119,242,.1)',
    },
    warning: {
      backgroundColor: 'rgba(255,241,204,1)',
    },
    wash: {
      backgroundColor: 'rgba(0,0,0,.05)',
    },
  }),

  interactiveBackgroundActiveStyles: stylex.create({
    button: {
      backgroundColor: 'rgba(0,0,0,.15)',
    },
    creation: {
      backgroundColor: 'rgba(61,116,5,1)',
    },
    error: {
      backgroundColor: 'rgba(255,169,152,1)',
    },
    flat: {
      backgroundColor: 'rgba(0,0,0,.1)',
    },
    flatInverted: {
      backgroundColor: 'rgba(255,255,255,.1)',
    },
    flatNavigation: {
      backgroundColor: 'rgba(24,119,242,.3)',
    },
    input: {
      backgroundColor: 'rgba(204,204,204,1)',
    },
    link: {
      backgroundColor: 'rgba(0,0,0,.1)',
    },
    mainNavigation: {
      backgroundColor: 'rgba(0,0,0,.1)',
    },
    mainNavigationSelected: {
      backgroundColor: 'rgba(0,0,0,.1)',
    },
    navigation: {
      backgroundColor: 'rgba(24,119,242,.3)',
    },
    on: {
      backgroundColor: 'rgba(24,119,242,1)',
    },
    onboarding: {
      backgroundColor: 'rgba(63,40,132,1)',
    },
    primary: {
      backgroundColor: 'rgba(10,83,178,1)',
    },
    selected: {
      backgroundColor: 'rgba(24,119,242,.3)',
    },
    warning: {
      backgroundColor: 'rgba(255,221,127,1)',
    },
    wash: {
      backgroundColor: 'rgba(0,0,0,.15)',
    },
  }),

  interactiveBackgroundDisabledStyles: stylex.create({
    button: {
      backgroundColor: 'rgba(0,0,0,.1)',
    },
    creation: {
      backgroundColor: 'rgba(99,190,9,.5)',
    },
    error: {
      backgroundColor: 'rgba(255,234,230,.5)',
    },
    flat: {
      backgroundColor: 'rgba(0,0,0,0)',
    },
    flatInverted: {
      backgroundColor: 'rgba(255,255,255,0)',
    },
    flatNavigation: {
      backgroundColor: 'rgba(0,0,0,.05)',
    },
    input: {
      backgroundColor: 'rgba(242,242,242,1)',
    },
    link: {
      backgroundColor: 'rgba(0,0,0,0)',
    },
    mainNavigation: {
      backgroundColor: 'rgba(0,0,0,0)',
    },
    mainNavigationSelected: {
      backgroundColor: 'rgba(0,0,0,0)',
    },
    navigation: {
      backgroundColor: 'rgba(0,0,0,.05)',
    },
    on: {
      backgroundColor: 'rgba(166,166,166,1)',
    },
    onboarding: {
      backgroundColor: 'rgba(92,59,191,.5)',
    },
    primary: {
      backgroundColor: 'rgba(24,119,242,.5)',
    },
    selected: {
      backgroundColor: 'rgba(0,0,0,.05)',
    },
    warning: {
      backgroundColor: 'rgba(255,241,204,.5)',
    },
    wash: {
      backgroundColor: 'rgba(0,0,0,.1)',
    },
  }),

  interactiveBackgroundFocusedStyles: stylex.create({
    button: {
      backgroundColor: 'rgba(0,0,0,.1)',
    },
    creation: {
      backgroundColor: 'rgba(73,141,6,1)',
    },
    error: {
      backgroundColor: 'rgba(255,191,178,1)',
    },
    flat: {
      backgroundColor: 'rgba(0,0,0,.05)',
    },
    flatInverted: {
      backgroundColor: 'rgba(255,255,255,.05)',
    },
    flatNavigation: {
      backgroundColor: 'rgba(24,119,242,.2)',
    },
    input: {
      backgroundColor: 'rgba(229,229,229,1)',
    },
    link: {
      backgroundColor: 'rgba(0,0,0,.05)',
    },
    mainNavigation: {
      backgroundColor: 'rgba(0,0,0,.05)',
    },
    mainNavigationSelected: {
      backgroundColor: 'rgba(0,0,0,.05)',
    },
    navigation: {
      backgroundColor: 'rgba(24,119,242,.2)',
    },
    on: {
      backgroundColor: 'rgba(11,94,202,1)',
    },
    onboarding: {
      backgroundColor: 'rgba(73,46,152,1)',
    },
    primary: {
      backgroundColor: 'rgba(11,94,202,1)',
    },
    selected: {
      backgroundColor: 'rgba(24,119,242,.2)',
    },
    warning: {
      backgroundColor: 'rgba(255,227,153,1)',
    },
    wash: {
      backgroundColor: 'rgba(0,0,0,.1)',
    },
  }),

  interactiveBackgroundTextWeightStyles: stylex.create({
    button: {
      fontWeight: 400,
    },
    creation: {
      fontWeight: 700,
    },
    error: {
      fontWeight: 400,
    },
    flat: {
      fontWeight: 400,
    },
    flatInverted: {
      fontWeight: 700,
    },
    flatNavigation: {
      fontWeight: 700,
    },
    input: {
      fontWeight: 400,
    },
    link: {
      fontWeight: 400,
    },
    mainNavigation: {
      fontWeight: 400,
    },
    mainNavigationSelected: {
      fontWeight: 400,
    },
    navigation: {
      fontWeight: 700,
    },
    on: {
      fontWeight: 700,
    },
    onboarding: {
      fontWeight: 400,
    },
    primary: {
      fontWeight: 700,
    },
    selected: {
      fontWeight: 400,
    },
    warning: {
      fontWeight: 400,
    },
    wash: {
      fontWeight: 400,
    },
  }),

  interactiveBackgroundTextActiveStyles: stylex.create({
    button: {
      color: 'rgba(0,0,0,.85)',
    },
    creation: {
      color: 'rgba(255,255,255,1)',
    },
    error: {
      color: 'rgba(0,0,0,.85)',
    },
    flat: {
      color: 'rgba(0,0,0,.85)',
    },
    flatInverted: {
      color: 'rgba(255,255,255,1)',
    },
    flatNavigation: {
      color: 'rgba(23,113,237,1)',
    },
    input: {
      color: 'rgba(0,0,0,.85)',
    },
    link: {
      color: 'rgba(23,113,237,1)',
    },
    mainNavigation: {
      color: 'rgba(0,0,0,.85)',
    },
    mainNavigationSelected: {
      color: 'rgba(23,113,237,1)',
    },
    navigation: {
      color: 'rgba(23,113,237,1)',
    },
    on: {
      color: 'rgba(255,255,255,1)',
    },
    onboarding: {
      color: 'rgba(255,255,255,1)',
    },
    primary: {
      color: 'rgba(255,255,255,1)',
    },
    selected: {
      color: 'rgba(0,0,0,.85)',
    },
    warning: {
      color: 'rgba(0,0,0,.85)',
    },
    wash: {
      color: 'rgba(0,0,0,.85)',
    },
  }),

  interactiveBackgroundTextDisabledStyles: stylex.create({
    button: {
      color: 'rgba(0,0,0,.45)',
    },
    creation: {
      color: 'rgba(255,255,255,.6)',
    },
    error: {
      color: 'rgba(153,26,0,.6)',
    },
    flat: {
      color: 'rgba(0,0,0,.45)',
    },
    flatInverted: {
      color: 'rgba(255,255,255,.6)',
    },
    flatNavigation: {
      color: 'rgba(23,113,237,.6)',
    },
    input: {
      color: 'rgba(0,0,0,.45)',
    },
    link: {
      color: 'rgba(23,113,237,.6)',
    },
    mainNavigation: {
      color: 'rgba(0,0,0,.45)',
    },
    mainNavigationSelected: {
      color: 'rgba(23,113,237,.6)',
    },
    navigation: {
      color: 'rgba(23,113,237,.6)',
    },
    on: {
      color: 'rgba(255,255,255,.6)',
    },
    onboarding: {
      color: 'rgba(255,255,255,.6)',
    },
    primary: {
      color: 'rgba(255,255,255,.6)',
    },
    selected: {
      color: 'rgba(0,0,0,.45)',
    },
    warning: {
      color: 'rgba(77,56,0,.6)',
    },
    wash: {
      color: 'rgba(0,0,0,.45)',
    },
  }),

  interactiveOverlayColorStyles: stylex.create({
    button: {
      backgroundColor: 'rgba(0,0,0,1)',
    },
    creation: {
      backgroundColor: 'rgba(0,0,0,1)',
    },
    error: {
      backgroundColor: 'rgba(0,0,0,1)',
    },
    flat: {
      backgroundColor: 'rgba(0,0,0,1)',
    },
    flatInverted: {
      backgroundColor: 'rgba(255,255,255,1)',
    },
    flatNavigation: {
      backgroundColor: 'rgba(24,119,242,1)',
    },
    input: {
      backgroundColor: 'rgba(255,255,255,1)',
    },
    link: {
      backgroundColor: 'rgba(0,0,0,1)',
    },
    mainNavigation: {
      backgroundColor: 'rgba(0,0,0,1)',
    },
    mainNavigationSelected: {
      backgroundColor: 'rgba(0,0,0,1)',
    },
    navigation: {
      backgroundColor: 'rgba(24,119,242,1)',
    },
    on: {
      backgroundColor: 'rgba(0,0,0,1)',
    },
    onboarding: {
      backgroundColor: 'rgba(0,0,0,1)',
    },
    primary: {
      backgroundColor: 'rgba(0,0,0,1)',
    },
    selected: {
      backgroundColor: 'rgba(24,119,242,1)',
    },
    warning: {
      backgroundColor: 'rgba(0,0,0,1)',
    },
    wash: {
      backgroundColor: 'rgba(0,0,0,1)',
    },
  }),

  interactiveOverlayIdleStyles: stylex.create({
    button: {
      opacity: '0',
    },
    creation: {
      opacity: '0',
    },
    error: {
      opacity: '0',
    },
    flat: {
      opacity: '0',
    },
    flatInverted: {
      opacity: '0',
    },
    flatNavigation: {
      opacity: '0',
    },
    input: {
      opacity: '0',
    },
    link: {
      opacity: '0',
    },
    mainNavigation: {
      opacity: '0',
    },
    mainNavigationSelected: {
      opacity: '0',
    },
    navigation: {
      opacity: '0',
    },
    on: {
      opacity: '0',
    },
    onboarding: {
      opacity: '0',
    },
    primary: {
      opacity: '0',
    },
    selected: {
      opacity: '0',
    },
    warning: {
      opacity: '0',
    },
    wash: {
      opacity: '0',
    },
  }),

  interactiveOverlayFocusedStyles: stylex.create({
    button: {
      opacity: '.1',
    },
    creation: {
      opacity: '.1',
    },
    error: {
      opacity: '.1',
    },
    flat: {
      opacity: '.1',
    },
    flatInverted: {
      opacity: '.1',
    },
    flatNavigation: {
      opacity: '.15',
    },
    input: {
      opacity: '.1',
    },
    link: {
      opacity: '.1',
    },
    mainNavigation: {
      opacity: '.1',
    },
    mainNavigationSelected: {
      opacity: '.1',
    },
    navigation: {
      opacity: '.15',
    },
    on: {
      opacity: '.1',
    },
    onboarding: {
      opacity: '.1',
    },
    primary: {
      opacity: '.1',
    },
    selected: {
      opacity: '.15',
    },
    warning: {
      opacity: '.1',
    },
    wash: {
      opacity: '.1',
    },
  }),

  interactiveOverlayActiveStyles: stylex.create({
    button: {
      opacity: '.15',
    },
    creation: {
      opacity: '.2',
    },
    error: {
      opacity: '.15',
    },
    flat: {
      opacity: '.15',
    },
    flatInverted: {
      opacity: '.15',
    },
    flatNavigation: {
      opacity: '.25',
    },
    input: {
      opacity: '.15',
    },
    link: {
      opacity: '.15',
    },
    mainNavigation: {
      opacity: '.15',
    },
    mainNavigationSelected: {
      opacity: '.15',
    },
    navigation: {
      opacity: '.25',
    },
    on: {
      opacity: '.2',
    },
    onboarding: {
      opacity: '.2',
    },
    primary: {
      opacity: '.2',
    },
    selected: {
      opacity: '.25',
    },
    warning: {
      opacity: '.15',
    },
    wash: {
      opacity: '.15',
    },
  }),

  glimmerStyles: {
    0: {
      animationDelay: 'x1uzojwf',
      animationName: 'xrtjlq3',
      backgroundColor: 'xc1r0np',
      opacity: 'xkk3ads',
    },
    1: {
      animationDelay: 'x1t83zlg',
      animationName: 'xrtjlq3',
      backgroundColor: 'xc1r0np',
      opacity: 'xkk3ads',
    },
    2: {
      animationDelay: 'x1xwhvez',
      animationName: 'xrtjlq3',
      backgroundColor: 'xc1r0np',
      opacity: 'xkk3ads',
    },
    3: {
      animationDelay: 'x1nrwgbl',
      animationName: 'x1camesu',
      backgroundColor: 'xc1r0np',
      opacity: 'xkk3ads',
    },
    4: {
      animationDelay: 'x1vvzlz1',
      animationName: 'x1wfwbum',
      backgroundColor: 'xc1r0np',
      opacity: 'xkk3ads',
    },
  },

  glimmerVariantsStyles: stylex.create({
    input: {
      animationName: glimmerVariantsInputAnimation,
      backgroundColor: '#96999e',
      opacity: 0.02,
    },
  }),

  barElementStrokeStyles: stylex.create({
    light: {
      stroke: 'rgba(255,255,255,1)',
    },
    dark: {
      stroke: 'rgba(24,119,242,1)',
    },
  }),

  trackElementStrokeStyles: {
    light: {
      stroke: 'x1tnjt92',
    },
    dark: {
      stroke: 'x18z1ann',
    },
  },

  outlineActiveStyles: stylex.create({
    button: {
      boxShadow: '0 0 0 2px rgba(0,0,0,.15)',
    },
    creation: {
      boxShadow: '0 0 0 2px rgba(61,116,5,1)',
    },
    error: {
      boxShadow: '0 0 0 2px rgba(255,169,152,1)',
    },
    flat: {
      boxShadow: '0 0 0 2px rgba(0,0,0,.1)',
    },
    flatInverted: {
      boxShadow: '0 0 0 2px rgba(255,255,255,.1)',
    },
    flatNavigation: {
      boxShadow: '0 0 0 2px rgba(24,119,242,.3)',
    },
    input: {
      boxShadow: '0 0 0 2px rgba(204,204,204,1)',
    },
    link: {
      boxShadow: '0 0 0 2px rgba(0,0,0,.1)',
    },
    mainNavigation: {
      boxShadow: '0 0 0 2px rgba(0,0,0,.1)',
    },
    mainNavigationSelected: {
      boxShadow: '0 0 0 2px rgba(0,0,0,.1)',
    },
    navigation: {
      boxShadow: '0 0 0 2px rgba(24,119,242,.3)',
    },
    on: {
      boxShadow: '0 0 0 2px rgba(24,119,242,1)',
    },
    onboarding: {
      boxShadow: '0 0 0 2px rgba(63,40,132,1)',
    },
    primary: {
      boxShadow: '0 0 0 2px rgba(10,83,178,1)',
    },
    selected: {
      boxShadow: '0 0 0 2px rgba(24,119,242,.3)',
    },
    warning: {
      boxShadow: '0 0 0 2px rgba(255,221,127,1)',
    },
    wash: {
      boxShadow: '0 0 0 2px rgba(0,0,0,.15)',
    },
  }),

  outlineFocusedStyles: stylex.create({
    button: {
      boxShadow: '0 0 0 2px rgba(0,0,0,.1)',
    },
    creation: {
      boxShadow: '0 0 0 2px rgba(73,141,6,1)',
    },
    error: {
      boxShadow: '0 0 0 2px rgba(255,191,178,1)',
    },
    flat: {
      boxShadow: '0 0 0 2px rgba(0,0,0,.05)',
    },
    flatInverted: {
      boxShadow: '0 0 0 2px rgba(255,255,255,.05)',
    },
    flatNavigation: {
      boxShadow: '0 0 0 2px rgba(24,119,242,.2)',
    },
    input: {
      boxShadow: '0 0 0 2px rgba(229,229,229,1)',
    },
    link: {
      boxShadow: '0 0 0 2px rgba(0,0,0,.05)',
    },
    mainNavigation: {
      boxShadow: '0 0 0 2px rgba(0,0,0,.05)',
    },
    mainNavigationSelected: {
      boxShadow: '0 0 0 2px rgba(0,0,0,.05)',
    },
    navigation: {
      boxShadow: '0 0 0 2px rgba(24,119,242,.2)',
    },
    on: {
      boxShadow: '0 0 0 2px rgba(11,94,202,1)',
    },
    onboarding: {
      boxShadow: '0 0 0 2px rgba(73,46,152,1)',
    },
    primary: {
      boxShadow: '0 0 0 2px rgba(11,94,202,1)',
    },
    selected: {
      boxShadow: '0 0 0 2px rgba(24,119,242,.2)',
    },
    warning: {
      boxShadow: '0 0 0 2px rgba(255,227,153,1)',
    },
    wash: {
      boxShadow: '0 0 0 2px rgba(0,0,0,.1)',
    },
  }),

  onboardingTourHighlightStyles: stylex.create({
    base: {
      boxShadow: '0 0 0 4px rgba(63,40,132,1),0 0 0 12px rgba(92,59,191,.2)',
    },
  }),

  onboardingPulseAnimationStyles: stylex.create({
    base: {
      animationName: onboardingPulseAnimationBase,
      animationIterationCount: 'infinite',
      animationDuration: '2s',
    },
  }),
};
