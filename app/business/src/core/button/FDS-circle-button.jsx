import React, { forwardRef } from 'react';
import { FDSIcon } from '@meta-core/image/fds-icon';
import { CometPressable } from '@meta-core/pressable/comet-pressable';
import { ComponentWithDataAttributes } from '@meta-core/unknown/component-with-data-attributes';
import stylex from '@stylexjs/stylex';

const j = stylex.create({
  pressableOverlayPressed: {
    backgroundColor: 'var(--non-media-pressed)',
  },
  root: {
    alignItems: 'center',
    borderRadius: '999px',
    borderWidth: '0',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 0,
    position: 'relative',
  },
});

const k = stylex.create({
  24: {
    height: '24px',
    width: '24px',
  },
  28: {
    height: '28px',
    width: '28px',
  },
  32: {
    height: '32px',
    width: '32px',
  },
  36: {
    height: '36px',
    width: '36px',
  },
  40: {
    height: '40px',
    width: '40px',
  },
  48: {
    height: '48px',
    width: '48px',
  },
});

const l = stylex.create({
  'dark-overlay': {
    backgroundColor: 'var(--always-dark-overlay)',
    color: 'var(--always-white)',
  },
  deemphasized: {
    backgroundColor: 'transparent',
  },
  'deemphasized-overlay': {
    backgroundColor: 'var(--primary-deemphasized-button-background)',
  },
  normal: {
    backgroundColor: 'var(--secondary-button-background)',
  },
  overlay: {
    backgroundColor: 'var(--popover-background)',
    boxShadow: '0 0 0 1px var(--shadow-1)',
    color: 'var(--secondary-text)',
  },
  'overlay-floating': {
    backgroundColor: 'var(--secondary-button-background-floating)',
    boxShadow: '0 2px 4px var(--shadow-1),0 12px 28px var(--shadow-2)',
  },
  'overlay-raised': {
    backgroundColor: 'var(--popover-background)',
    boxShadow: '0 2px 8px var(--shadow-1),0 0 0 1px var(--shadow-1)',
    color: 'var(--secondary-text)',
  },
  'primary-background-overlay': {
    backgroundColor: 'var(--primary-button-background)',
  },
});

const m = stylex.create({
  'dark-overlay': {
    backgroundColor: 'var(--always-dark-overlay)',
  },
  deemphasized: {
    backgroundColor: 'transparent',
  },
  'deemphasized-overlay': {
    backgroundColor: 'var(--always-light-overlay)',
  },
  normal: {
    backgroundColor: 'var(--disabled-button-background)',
  },
  overlay: {
    backgroundColor: 'var(--progress-ring-on-media-background)',
    borderWidth: '0',
    boxShadow: '0 2px 4px var(--shadow-1)',
    color: 'var(--disabled-text)',
  },
  'primary-background-overlay': {
    backgroundColor: 'var(--primary-button-background)',
  },
});

const buttonColors = stylex.create({
  default: {
    backgroundColor: 'var(--secondary-button-background)',
  },
  disabled: {
    backgroundColor: 'var(--disabled-button-background)',
  },
  'primary-deemphasized': {
    backgroundColor: 'var(--primary-deemphasized-button-background)',
  },
  'primary-on-color': {
    backgroundColor: 'var(--primary-button-background-on-color)',
  },
  'primary-on-media': {
    backgroundColor: 'var(--primary-button-background-on-media)',
  },
  'secondary-on-color': {
    backgroundColor: 'var(--secondary-button-background-on-color)',
  },
  'secondary-on-media': {
    backgroundColor: 'var(--secondary-button-background-on-dark)',
  },
});

const n = {
  default: {
    backgroundColor: buttonColors['default'],
    iconColor: 'primary',
  },
  disabled: {
    backgroundColor: buttonColors.disabled,
    iconColor: 'disabled',
  },
  'primary-deemphasized': {
    backgroundColor: buttonColors['primary-deemphasized'],
    iconColor: 'primaryDeemphasizedButtonIcon',
  },
  'primary-on-color': {
    backgroundColor: buttonColors['primary-on-color'],
    iconColor: 'primaryButtonIconOnColor',
  },
  'primary-on-media': {
    backgroundColor: buttonColors['primary-on-media'],
    iconColor: 'primaryButtonIconOnMedia',
  },
  'secondary-on-color': {
    backgroundColor: buttonColors['secondary-on-color'],
    iconColor: 'secondaryIconOnColor',
  },
  'secondary-on-media': {
    backgroundColor: buttonColors['secondary-on-media'],
    iconColor: 'secondaryButtonIconOnMedia',
  },
};

const iconSize = {
  24: 12,
  28: 16,
  32: 16,
  36: 20,
  40: 20,
  48: 24,
};

const buttonSize = {
  24: 20,
  28: 20,
  32: 24,
  36: 28,
  40: 32,
  48: 32,
};

export const FDSCircleButton = forwardRef((props, ref) => {
  const {
    color_DEPRECATED,
    dataAttributes,
    disabled = false,
    focusable,
    icon,
    iconRatio,
    label,
    linkProps,
    onFocusIn,
    onFocusOut,
    onHoverIn,
    onHoverOut,
    onPress,
    onPressIn,
    onPressOut,
    overlayHoveredStyle,
    showDynamicHover,
    size,
    testid,
    testOnly_pressed,
    type,
    type_DEPRECATED = 'normal',
  } = props;

  const attributes = dataAttributes
    ? Object.keys(dataAttributes).reduce((acc, key) => {
        if (acc && key) {
          acc['data-' + key] = dataAttributes[key];
        }
        return acc;
      }, {})
    : null;

  const button = (
    <CometPressable
      aria-label={label}
      disabled={disabled}
      focusable={focusable}
      linkProps={linkProps}
      onFocusIn={onFocusIn}
      onFocusOut={onFocusOut}
      onHoverIn={onHoverIn}
      onHoverOut={onHoverOut}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      overlayHoveredStyle={overlayHoveredStyle}
      overlayPressedStyle={j.pressableOverlayPressed}
      overlayRadius="50%"
      pressedStyleValue={{ scale: 0.96 }}
      ref={ref}
      showDynamicHover={showDynamicHover}
      testOnly_pressed={testOnly_pressed}
      xstyle={[j.root, k[size], type ? t(disabled, type) : s(disabled, type_DEPRECATED)]}
    >
      <FDSIcon
        color={type ? r(disabled, type) : q(disabled, color_DEPRECATED, type_DEPRECATED)}
        icon={icon}
        size={iconRatio === 'large' ? buttonSize[size] : iconSize[size]}
      />
    </CometPressable>
  );

  return attributes ? (
    <ComponentWithDataAttributes dataAttributes={dataAttributes}>{button}</ComponentWithDataAttributes>
  ) : (
    button
  );
});

function q(disabled, color_DEPRECATED, type_DEPRECATED) {
  return disabled ? 'disabled' : color_DEPRECATED ?? u(type_DEPRECATED);
}

function r(disabled, type) {
  const background = disabled ? n.disabled : n[type];
  return background.iconColor;
}

function s(disabled, type_DEPRECATED) {
  return [
    l[type_DEPRECATED],
    disabled &&
      m[type_DEPRECATED === 'overlay-raised' || type_DEPRECATED === 'overlay-floating' ? 'overlay' : type_DEPRECATED],
  ];
}

function t(disabled, type) {
  const background = disabled ? n.disabled : n[type];
  return background.backgroundColor;
}

function u(type_DEPRECATED) {
  switch (type_DEPRECATED) {
    case 'primary-background-overlay':
    case 'dark-overlay':
      return 'white';
    case 'deemphasized-overlay':
      return 'highlight';
    default:
      return 'primary';
  }
}
