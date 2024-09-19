import {
  GeoAppearanceSelectors,
  GeoColorSelectors,
  GeoElevationSelectors,
  GeoPrivateAnimationSelectors,
  GeoSpacingSelectors,
  GeoTextSelectors,
  GeoTransitionSelectors,
} from '@meta-business/styles';

import { GeoStyleXDefaultSheet } from './geo-stylex-default-sheet';

GeoStyleXDefaultSheet.inject();

export const GeoPrivateDefaultTheme = {
  selectAnimation: GeoPrivateAnimationSelectors.selectAnimation,
  selectBorderWidth: GeoAppearanceSelectors.selectBorderWidth,
  selectBorderColor: GeoColorSelectors.selectBorderColor,
  selectBorderRadius: GeoAppearanceSelectors.selectBorderRadius,
  selectFont: GeoTextSelectors.selectFont,
  selectGlimmer: GeoColorSelectors.selectGlimmer,
  selectIconColor: GeoColorSelectors.selectIconColor,
  selectInteractiveBorder: GeoColorSelectors.selectInteractiveBorder,
  selectInteractiveColorPalette: GeoColorSelectors.selectInteractiveColorPalette,
  selectInteractiveOverlay: GeoColorSelectors.selectInteractiveOverlay,
  selectCategoricalBackgroundColor: GeoColorSelectors.selectCategoricalBackgroundColor,
  selectCategoricalForegroundColor: GeoColorSelectors.selectCategoricalForegroundColor,
  selectOnboardingPulseAnimation: GeoColorSelectors.selectOnboardingPulseAnimation,
  selectOutline: GeoColorSelectors.selectOutline,
  selectSize: GeoAppearanceSelectors.selectSize,
  selectStaticBackgroundColor: GeoColorSelectors.selectStaticBackgroundColor,
  selectTextColor: GeoColorSelectors.selectTextColor,
  selectElevation: GeoElevationSelectors.selectElevation,
  selectLayoutSpacing: GeoSpacingSelectors.selectLayoutSpacing,
  selectSpacing: GeoSpacingSelectors.selectSpacing,
  selectStrokeColor: GeoColorSelectors.selectStrokeColor,
  selectTransition: GeoTransitionSelectors.selectTransition,
};
