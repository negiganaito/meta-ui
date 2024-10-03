import { GeoAppearanceSelectors } from '@meta-business/styles/geo-appearance-selectors';
import { GeoColorSelectors } from '@meta-business/styles/geo-color-selectors';
import { GeoElevationSelectors } from '@meta-business/styles/geo-elevation-selectors';
import { GeoPrivateAnimationSelectors } from '@meta-business/styles/geo-private-animation-selectors';
import { GeoSpacingSelectors } from '@meta-business/styles/geo-spacing-selectors';
import { GeoTextSelectors } from '@meta-business/styles/geo-text-selectors';
import { GeoTransitionSelectors } from '@meta-business/styles/geo-transition-selectors';

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
