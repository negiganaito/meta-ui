import { selectBorderRadius, selectBorderWidth, selectSize } from './GeoAppearanceSelectors';
import {
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
} from './GeoColorSelectors';
import { selectElevation } from './GeoElevationSelectors';
import { selectAnimation } from './GeoPrivateAnimationSelectors';
import { selectLayoutSpacing, selectSpacing } from './GeoSpacingSelectors';
import { inject as injectStyleXDefaultSheet } from './GeoStyleXDefaultSheet';
import { selectFont } from './GeoTextSelectors';
import { selectTransition } from './GeoTransitionSelectors';

injectStyleXDefaultSheet();

const GeoPrivateDefaultTheme = {
  selectAnimation,
  selectBorderWidth,
  selectBorderColor,
  selectBorderRadius,
  selectFont,
  selectGlimmer,
  selectIconColor,
  selectInteractiveBorder,
  selectInteractiveColorPalette,
  selectInteractiveOverlay,
  selectCategoricalBackgroundColor,
  selectCategoricalForegroundColor,
  selectOnboardingPulseAnimation,
  selectOutline,
  selectSize,
  selectStaticBackgroundColor,
  selectTextColor,
  selectElevation,
  selectLayoutSpacing,
  selectSpacing,
  selectStrokeColor,
  selectTransition,
};

export default GeoPrivateDefaultTheme;
