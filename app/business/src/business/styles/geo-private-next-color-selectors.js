import stylex from '@stylexjs/stylex';

import { GeoPrivateCompanyGradientXStyleSelector } from './geo-private-company-gradient-xstyle-selector';
import { GeoPrivateNextAppearanceGeneratedStyles } from './geo-private-next-appearance-generated-styles';
import { GeoPrivateNextNewBrandingColorGeneratedStyles } from './geo-private-next-new-branding-color-generated-styles';

const glimmerLinearGradientStyle = stylex.create({
  default: {
    backgroundImage: 'linear-gradient(0deg,rgba(150,153,158,0) 30%,rgba(150,153,158,.8) 100%)',
    backgroundColor: 'none',
  },
  input: {
    backgroundImage: 'linear-gradient(0deg,rgba(150,153,158,0) 30%,rgba(150,153,158,.6) 100%)',
    backgroundColor: 'none',
  },
});

function selectGlimmer(props = {}) {
  let c = props.index ?? 0;
  let d = props.variant ?? 'default';
  let isLargeArea = props.isLargeArea ?? !1;
  return [
    d === 'input'
      ? GeoPrivateNextNewBrandingColorGeneratedStyles.glimmerVariantsStyles.input
      : GeoPrivateNextNewBrandingColorGeneratedStyles.glimmerStyles[c],
    isLargeArea && glimmerLinearGradientStyle[d],
  ];
}

function selectIconColor(props) {
  const { color, isDisabled = !1 } = props;
  return [
    !isDisabled && GeoPrivateNextNewBrandingColorGeneratedStyles.iconActiveStyles[color],
    isDisabled && GeoPrivateNextNewBrandingColorGeneratedStyles.iconDisabledStyles[color],
  ];
}

function selectStrokeColor(props) {
  const { shade, element } = props;
  return element === 'bar'
    ? GeoPrivateNextNewBrandingColorGeneratedStyles.barElementStrokeStyles[shade]
    : GeoPrivateNextNewBrandingColorGeneratedStyles.trackElementStrokeStyles[shade];
}

function selectStaticBackgroundColor(props) {
  const { isInverted = !1, isMuted = !1, surface } = props;
  if (isInverted) {
    return isMuted
      ? GeoPrivateNextNewBrandingColorGeneratedStyles.staticBackgroundInvertedMutedStyles[surface]
      : GeoPrivateNextNewBrandingColorGeneratedStyles.staticBackgroundInvertedStyles[surface];
  } else if (surface === 'page') {
    return GeoPrivateCompanyGradientXStyleSelector({ isMuted });
  } else {
    return isMuted
      ? GeoPrivateNextNewBrandingColorGeneratedStyles.staticBackgroundMutedStyles[surface]
      : GeoPrivateNextNewBrandingColorGeneratedStyles.staticBackgroundStyles[surface];
  }
}

function selectTextColor(props) {
  let { color, isDisabled = !1, isInverted = !1 } = props;
  if (color === 'inverted') {
    isInverted = !0;
    color = 'value';
  } else if (color === 'headingDescription' || color === 'valueLabel') {
    color = 'heading';
  }
  return isInverted
    ? [
        !isDisabled && GeoPrivateNextNewBrandingColorGeneratedStyles.textInvertedActiveStyles[color],
        isDisabled && GeoPrivateNextNewBrandingColorGeneratedStyles.textInvertedDisabledStyles[color],
      ]
    : [
        !isDisabled && GeoPrivateNextNewBrandingColorGeneratedStyles.textActiveStyles[color],
        isDisabled && GeoPrivateNextNewBrandingColorGeneratedStyles.textDisabledStyles[color],
      ];
}

function selectBorderColor(props) {
  const { color, isDisabled = !1, isFocused = !1, isMuted = !1 } = props;
  const adjustedColor = color === 'selected' ? 'info' : color;
  return [
    !isDisabled &&
      !isFocused &&
      !isMuted &&
      GeoPrivateNextNewBrandingColorGeneratedStyles.borderDefaultActiveStyles[adjustedColor],
    !isDisabled &&
      isFocused &&
      !isMuted &&
      GeoPrivateNextNewBrandingColorGeneratedStyles.borderFocusedActiveStyles[adjustedColor],
    isDisabled &&
      !isFocused &&
      !isMuted &&
      GeoPrivateNextNewBrandingColorGeneratedStyles.borderDefaultDisabledStyles[adjustedColor],
    isDisabled &&
      isFocused &&
      !isMuted &&
      GeoPrivateNextNewBrandingColorGeneratedStyles.borderFocusedDisabledStyles[adjustedColor],
    isMuted && !isDisabled && GeoPrivateNextNewBrandingColorGeneratedStyles.borderMutedActiveStyles[adjustedColor],
    isMuted && isDisabled && GeoPrivateNextNewBrandingColorGeneratedStyles.borderMutedDisabledStyles[adjustedColor],
  ];
}

function selectCategoricalBackgroundColor(props) {
  const { index = 0 } = props;
  const styles = GeoPrivateNextNewBrandingColorGeneratedStyles.categoricalBackgroundIdleStyles;
  return styles[index % Object.keys(styles).length];
}

function selectCategoricalForegroundColor(props) {
  const { index = 0 } = props;
  const styles = GeoPrivateNextNewBrandingColorGeneratedStyles.categoricalForegroundTextStyles;
  return styles[index % Object.keys(styles).length];
}

function selectInteractiveColorPalette(props) {
  const { color, isDisabled = !1, isFocused = !1, isActive = !1 } = props;
  return [
    GeoPrivateNextNewBrandingColorGeneratedStyles.interactiveBackgroundTextWeightStyles[color],
    GeoPrivateNextNewBrandingColorGeneratedStyles.interactiveBackgroundTextActiveStyles[color],
    GeoPrivateNextNewBrandingColorGeneratedStyles.interactiveBackgroundIdleStyles[color],
    isFocused && GeoPrivateNextNewBrandingColorGeneratedStyles.interactiveBackgroundFocusedStyles[color],
    isActive && GeoPrivateNextNewBrandingColorGeneratedStyles.interactiveBackgroundActiveStyles[color],
    isDisabled && GeoPrivateNextNewBrandingColorGeneratedStyles.interactiveBackgroundDisabledStyles[color],
    isDisabled && GeoPrivateNextNewBrandingColorGeneratedStyles.interactiveBackgroundTextDisabledStyles[color],
  ];
}

function selectInteractiveOverlay(props) {
  const { color, isFocused = !1, isActive = !1 } = props;
  return [
    GeoPrivateNextNewBrandingColorGeneratedStyles.interactiveOverlayColorStyles[color],
    GeoPrivateNextNewBrandingColorGeneratedStyles.interactiveOverlayIdleStyles[color],
    isFocused && GeoPrivateNextNewBrandingColorGeneratedStyles.interactiveOverlayFocusedStyles[color],
    isActive && GeoPrivateNextNewBrandingColorGeneratedStyles.interactiveOverlayActiveStyles[color],
  ];
}

function selectOutline(props) {
  const { color, isActive } = props;
  return isActive
    ? GeoPrivateNextNewBrandingColorGeneratedStyles.outlineActiveStyles[color]
    : GeoPrivateNextNewBrandingColorGeneratedStyles.outlineFocusedStyles[color];
}

function selectInteractiveBorder(props) {
  const { context, color, isDisabled = !1, isFocused = !1 } = props;
  if (
    (color === 'wash' && context === 'control') ||
    (color === 'button' && context === 'button') ||
    (color === 'buttonInverted' && context === 'buttonInverted')
  ) {
    return [
      !isDisabled &&
        !isFocused &&
        GeoPrivateNextNewBrandingColorGeneratedStyles.interactiveBorderDefaultActiveStyles[context],
      !isDisabled &&
        isFocused &&
        GeoPrivateNextNewBrandingColorGeneratedStyles.interactiveBorderFocusedActiveStyles[context],
      isDisabled &&
        !isFocused &&
        GeoPrivateNextNewBrandingColorGeneratedStyles.interactiveBorderDefaultDisabledStyles[context],
      isDisabled &&
        isFocused &&
        GeoPrivateNextNewBrandingColorGeneratedStyles.interactiveBorderFocusedDisabledStyles[context],
      GeoPrivateNextAppearanceGeneratedStyles.interactiveBorderWidthStyles[context],
    ];
  }
  return null;
}

function selectOnboardingPulseAnimation(props) {
  const { variant } = props;
  return [
    GeoPrivateNextNewBrandingColorGeneratedStyles.onboardingTourHighlightStyles[variant],
    GeoPrivateNextNewBrandingColorGeneratedStyles.onboardingPulseAnimationStyles[variant],
  ];
}

export const GeoPrivateNextColorSelectors = {
  glimmerLinearGradientStyle,
  selectBorderColor,
  selectCategoricalBackgroundColor,
  selectCategoricalForegroundColor,
  selectGlimmer,
  selectIconColor,
  selectInteractiveBorder,
  selectInteractiveColorPalette,
  selectInteractiveOverlay,
  selectOnboardingPulseAnimation,
  selectOutline,
  selectStaticBackgroundColor,
  selectStrokeColor,
  selectTextColor,
};
