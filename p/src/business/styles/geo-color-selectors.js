import stylex from '@stylexjs/stylex';

import { commonStyles } from './common-styles';

let glimmerLinearGradientStyle = stylex.create({
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
  const { index = 0, variant = 'default', isLargeArea = false } = props;
  return [
    variant === 'input' ? commonStyles.glimmerVariantsStyles.input : commonStyles.glimmerStyles[index],
    isLargeArea && glimmerLinearGradientStyle[variant],
  ];
}

function selectIconColor(props) {
  const { color, isDisabled = false } = props;
  return [!isDisabled && commonStyles.iconActiveStyles[color], isDisabled && commonStyles.iconDisabledStyles[color]];
}

function selectStrokeColor(props) {
  const { shade, element } = props;
  return element === 'bar' ? commonStyles.barElementStrokeStyles[shade] : commonStyles.trackElementStrokeStyles[shade];
}

function selectStaticBackgroundColor(props) {
  const { isInverted = false, isMuted = false, surface } = props;
  let backgroundStyle;

  if (isInverted) {
    backgroundStyle = isMuted
      ? commonStyles.staticBackgroundInvertedMutedStyles
      : commonStyles.staticBackgroundInvertedStyles;
  } else {
    backgroundStyle = isMuted ? commonStyles.staticBackgroundMutedStyles : commonStyles.staticBackgroundStyles;
  }

  return backgroundStyle[surface];
}

function selectTextColor(props) {
  let { color, isDisabled = false, isInverted = false } = props;

  if (color === 'inverted') {
    isInverted = true;
    color = 'value';
  } else if (color === 'headingDescription' || color === 'valueLabel') {
    color = 'heading';
  }

  return isInverted
    ? [
        !isDisabled && commonStyles.textInvertedActiveStyles[color],
        isDisabled && commonStyles.textInvertedDisabledStyles[color],
      ]
    : [!isDisabled && commonStyles.textActiveStyles[color], isDisabled && commonStyles.textDisabledStyles[color]];
}

function selectBorderColor(props) {
  const { color, isDisabled = false, isFocused = false, isMuted = false } = props;
  const borderColor = color === 'selected' ? 'info' : color;

  return [
    !isDisabled && !isFocused && !isMuted && commonStyles.borderDefaultActiveStyles[borderColor],
    !isDisabled && isFocused && !isMuted && commonStyles.borderFocusedActiveStyles[borderColor],
    isDisabled && !isFocused && !isMuted && commonStyles.borderDefaultDisabledStyles[borderColor],
    isDisabled && isFocused && !isMuted && commonStyles.borderFocusedDisabledStyles[borderColor],
    isMuted && !isDisabled && commonStyles.borderMutedActiveStyles[borderColor],
    isMuted && isDisabled && commonStyles.borderMutedDisabledStyles[borderColor],
  ];
}

function selectCategoricalBackgroundColor(props) {
  const { index = 0 } = props;
  const bgStyles = commonStyles.categoricalBackgroundIdleStyles;
  return bgStyles[index % Object.keys(bgStyles).length];
}

function selectCategoricalForegroundColor(props) {
  const { index = 0 } = props;
  const fgStyles = commonStyles.categoricalForegroundTextStyles;
  return fgStyles[index % Object.keys(fgStyles).length];
}

function selectInteractiveColorPalette(props) {
  const { color, isDisabled = false, isFocused = false, isActive = false } = props;
  return [
    commonStyles.interactiveBackgroundTextWeightStyles[color],
    commonStyles.interactiveBackgroundTextActiveStyles[color],
    commonStyles.interactiveBackgroundIdleStyles[color],
    isFocused && commonStyles.interactiveBackgroundFocusedStyles[color],
    isActive && commonStyles.interactiveBackgroundActiveStyles[color],
    isDisabled && commonStyles.interactiveBackgroundDisabledStyles[color],
    isDisabled && commonStyles.interactiveBackgroundTextDisabledStyles[color],
  ];
}

function selectInteractiveOverlay(props) {
  const { color, isFocused = false, isActive = false } = props;
  return [
    commonStyles.interactiveOverlayColorStyles[color],
    commonStyles.interactiveOverlayIdleStyles[color],
    isFocused && commonStyles.interactiveOverlayFocusedStyles[color],
    isActive && commonStyles.interactiveOverlayActiveStyles[color],
  ];
}

function selectOutline(props) {
  const { color, isActive } = props;
  return isActive ? commonStyles.outlineActiveStyles[color] : commonStyles.outlineFocusedStyles[color];
}

function selectInteractiveBorder() {
  // Placeholder function
  return null;
}

function selectOnboardingPulseAnimation(props) {
  const { variant } = props;
  return [commonStyles.onboardingTourHighlightStyles[variant], commonStyles.onboardingPulseAnimationStyles[variant]];
}

export const GeoColorSelectors = {
  glimmerLinearGradientStyle,
  selectGlimmer,
  selectIconColor,
  selectStrokeColor,
  selectStaticBackgroundColor,
  selectTextColor,
  selectBorderColor,
  selectCategoricalBackgroundColor,
  selectCategoricalForegroundColor,
  selectInteractiveColorPalette,
  selectInteractiveOverlay,
  selectOutline,
  selectInteractiveBorder,
  selectOnboardingPulseAnimation,
};
