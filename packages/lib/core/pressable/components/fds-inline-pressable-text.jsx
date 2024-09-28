import React, { forwardRef } from 'react';
import { FDSTextContext } from '@meta-ui/core/contexts';
import { CometTextTypography } from '@meta-ui/core/styles';
import stylex from '@stylexjs/stylex';

// CSS class mappings for various states
const styles = stylex.create({
  root: {
    color: 'inherit',
    textDecoration: {
      default: null,
      ':hover': 'underline',
    },
  },
  disabled: {
    color: 'var(--disabled-text)',
    textDecoration: {
      default: null,
      ':hover': 'none',
    },
  },
  hoverUnderlineDisabled: {
    textDecoration: {
      default: null,
      ':hover': 'none',
    },
  },
});

// Color mappings
const colorStyles = stylex.create({
  blueLink: { color: 'var(--blue-link)' },
  disabled: { color: 'var(--disabled-text)' },
  highlight: { color: 'var(--accent' },
  negative: { color: 'var(--negative)' },
  positive: { color: 'var(--positive)' },
  primary: { color: 'var(--primary-text)' },
  secondary: { color: 'var(--secondary-text)' },
  tertiary: { color: 'var(--placeholder-text)' },
  white: { color: 'var(--always-white)' },
});

// Font weight mappings
const fontWeightStyles = stylex.create({
  bold: { fontWeight: 700 },
  medium: { fontWeight: 500 },
  normal: { fontWeight: 400 },
  semibold: { fontWeight: 600 },
});

export const FDSInlinePressableText = forwardRef((props, ref) => {
  const {
    children,
    color_DEPRECATED,
    disabled = false,
    hoverUnderlineDisabled = false,
    linkProps_DEPRECATED,
    onHoverIn,
    onHoverOut,
    onPress,
    testid,
    weight,
    ...rest
  } = props;

  const textContext = FDSTextContext.useFDSTextContext();
  let opensInNewWindow = false;
  let linkProps;

  // If linkProps_DEPRECATED is provided, set up the link properties
  if (linkProps_DEPRECATED) {
    const { target, url, ...otherLinkProps } = linkProps_DEPRECATED;
    linkProps = { ...otherLinkProps, href: url, target };
    opensInNewWindow = target === '_blank' || (!target && url && url !== '#' && !isCometRouterUrl(url));
  }

  // Determine the text color and font weight based on context and props
  const color = color_DEPRECATED ?? (textContext ? determineTextColor(textContext.type, opensInNewWindow) : 'inherit');
  const fontWeight = weight ?? (textContext ? determineFontWeight(textContext.type, opensInNewWindow) : 'inherit');

  return (
    <BaseLink
      {...linkProps}
      disabled={disabled}
      fbclid={linkProps_DEPRECATED?.fbclid}
      onClick={onPress}
      onHoverEnd={onHoverOut}
      onHoverStart={onHoverIn}
      ref={ref}
      suppressFocusRing
      testid={testid}
      xstyle={[
        styles.root,
        color !== 'inherit' && colorStyles[color],
        fontWeight !== 'inherit' && fontWeightStyles[fontWeight],
        hoverUnderlineDisabled && styles.hoverUnderlineDisabled,
        disabled && styles.disabled,
      ]}
    >
      {children}
    </BaseLink>
  );
});

// Determine the text color based on typography type and whether it opens in a new window
function determineTextColor(typographyType, opensInNewWindow) {
  switch (typographyType) {
    case 'headline3':
    case 'headline4':
    case 'body1':
    case 'body2':
    case 'body3':
    case 'body4':
      return opensInNewWindow ? 'blueLink' : 'primary';
    case 'meta1':
    case 'meta2':
    case 'meta3':
    case 'meta4':
      return opensInNewWindow ? 'blueLink' : 'inherit';
    default:
      return 'inherit';
  }
}

// Determine the font weight based on typography type and whether it opens in a new window
function determineFontWeight(typographyType, opensInNewWindow) {
  if (!opensInNewWindow) {
    const mappedType = mapTypographyToEmphasized(typographyType);
    return CometTextTypography[mappedType]?.fontWeight ?? 'inherit';
  }
  return 'inherit';
}

// Map the typography type to its emphasized or link-specific counterpart
function mapTypographyToEmphasized(typographyType) {
  switch (typographyType) {
    case 'headline3':
      return 'headlineEmphasized3';
    case 'headline4':
      return 'headlineEmphasized4';
    case 'body1':
      return 'bodyLink1';
    case 'body2':
      return 'bodyLink2';
    case 'body3':
      return 'bodyLink3';
    case 'body4':
      return 'bodyLink4';
    default:
      return typographyType;
  }
}
