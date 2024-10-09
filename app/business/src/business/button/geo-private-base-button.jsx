import React, { useCallback, useContext, useMemo, useRef, useState } from 'react';
import { BUIPrivateButtonLayoutContext } from '@meta-business/contexts/bui-private-button-layout-context';
import { GeoPrivateButtonIconEndLayoutContext } from '@meta-business/contexts/geo-private-button-icon-end-layout-context';
import { GeoPrivateButtonLayerActionContext } from '@meta-business/contexts/geo-private-button-layer-action-context';
import { GeoPrivateInvertThemeContext } from '@meta-business/contexts/geo-private-invert-theme-context';
import { GeoPrivateTooltipTriggerContext } from '@meta-business/contexts/geo-private-tooltip-trigger-context';
import { GeoIcon } from '@meta-business/image/geo-icon';
import { GeoPrivateFBIconOrImageish } from '@meta-business/image/geo-private-fb-icon-or-imageish';
import { useGeoPrivateIsDisabled } from '@meta-business/image/use-geo-private-is-disabled';
import { GeoBaseSpacingLayout } from '@meta-business/layout/geo-base-spacing-layout';
import { GeoBaseAccessibleElement } from '@meta-business/layout/geo-baseA-accessible-element';
import { GeoSpinner } from '@meta-business/layout/geo-spinner';
import { GeoPrivatePressable } from '@meta-business/pressable/geo-private-pressable';
import { GeoBaseText } from '@meta-business/text/geo-base-text';
import { GeoPrivateButtonThemeUtils } from '@meta-business/theme/geo-private-button-theme-utils';
import { useGeoPrivateAnimationPressableStyle } from '@meta-business/theme/use-geo-private-animation-pressable-style';
import { useGeoPrivateIsNextTheme } from '@meta-business/theme/use-geo-private-is-next-theme';
import { useGeoTheme } from '@meta-business/theme/use-geo-theme';
import { GeoPrivateFbtOrTooltip } from '@meta-business/tooltip/geo-private-fbt-or-tooltip';
import { useMergeRefs } from '@meta-core/react-utils/use-merge-refs';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  fullWidth: { width: '100%' },
  container: { display: 'flex' },
  hiddenButton: { display: 'none' },
  growLabel: { flexGrow: '1' },
  icon: { flexShrink: 0, flexGrow: 0 },
  iconEnd: { marginLeft: 'auto' },
  root: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center' },
});

// eslint-disable-next-line complexity
export const GeoPrivateBaseButton = (props) => {
  const {
    'aria-errormessage': ariaErrorMessage,
    'aria-haspopup': ariaHasPopup,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-owns': ariaOwns,
    'aria-pressed': ariaPressed,
    icon,
    iconEnd,
    isDepressed = false,
    justify = 'center',
    // eslint-disable-next-line no-unused-vars
    loggingName = 'GeoPrivateBaseButton',
    onBlur,
    onFocusChange,
    onFocusVisibleChange,
    onHoverChange,
    onPressChange,
    onPressEnd,
    onPressMove,
    onPressStart,
    role,
    suppressHydrationWarning,
    variant = 'default',
    'aria-controls': ariaControls,
    'aria-describedby': ariaDescribedBy,
    'aria-expanded': ariaExpanded,
    containerRef,
    'data-testid': dataTestId,
    disabledMessage,
    download,
    grow = 'auto',
    hasAnimation = true,
    href,
    id,
    isDisabled = false,
    isLabelHidden = false,
    isLoading = false,
    label,
    onClick,
    onFocus,
    onHoverEnd,
    onHoverMove,
    onHoverStart,
    rel,
    target,
    tooltip,
    type = 'button',
    xstyle,
  } = props;

  const isNextTheme = useGeoPrivateIsNextTheme();
  const isIconEndLayoutEnd = useContext(GeoPrivateButtonIconEndLayoutContext) === 'end';
  const [isActive, setIsActive] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [layoutContext, layoutContextRef] = BUIPrivateButtonLayoutContext.useLayoutContext();
  const hiddenButtonRef = useRef(null);
  const tooltipTriggerRef = useRef(null);
  const mergedRef = useMergeRefs(useMergeRefs(layoutContextRef, tooltipTriggerRef), containerRef);
  const buttonLayerAction = useContext(GeoPrivateButtonLayerActionContext);
  const isDisabledState = useGeoPrivateIsDisabled(isDisabled);
  const isLabelHiddenOrEmpty = isLabelHidden || label === '';
  const isPrimaryOrCreation = ['primary', 'creation'].includes(variant);
  const isSubmitOrHasLayerAction = type === 'submit' || buttonLayerAction !== null;

  const handleFocusChange = useCallback(
    (isFocused) => {
      onFocusChange?.(isFocused);
    },
    [onFocusChange],
  );

  const handleFocusVisibleChange = useCallback(
    (isFocusVisible) => {
      setIsActive(isFocusVisible);
      onFocusVisibleChange?.(isFocusVisible);
    },
    [onFocusVisibleChange],
  );

  const handleHoverChange = useCallback(
    (isHovered) => {
      setIsFocused(isHovered);
      onHoverChange?.(isHovered);
    },
    [onHoverChange],
  );

  // const handleClickWithLogging = useGeoPrivateWithLogging(onClick, {
  //   name: loggingName,
  //   action: GeoPrivateLoggingAction.CLICK,
  //   classification: GeoPrivateLoggingClassification.USER_ACTION,
  // });

  const handleClick = useCallback(
    (event) => {
      if (isSubmitOrHasLayerAction) {
        hiddenButtonRef.current?.click();
      }
      // handleClickWithLogging?.(event);
      onClick && onClick(event);
    },
    [
      isSubmitOrHasLayerAction,
      // , handleClickWithLogging
    ],
  );

  const handlePressChange = useCallback(
    (isPressed) => {
      setIsPressed(isPressed);
      onPressChange?.(isPressed);
    },
    [onPressChange],
  );

  const adjustedLayoutContext = useMemo(() => {
    const { ...rest } = layoutContext;
    return isNextTheme && variant === 'default' ? rest : layoutContext;
  }, [isNextTheme, layoutContext, variant]);

  const hasStartIcon = icon !== null;
  const hasEndIcon = iconEnd !== null;
  const isIconOnly = isLabelHiddenOrEmpty && (hasStartIcon || hasEndIcon);

  const isFocusedOrActive = isActive || isFocused;
  const isDepressedOrPressed = isDepressed || isPressed;

  const buttonStyles = useButtonStyles({
    grow,
    variant,
    isDisabled: isDisabledState,
    isFocused: isFocusedOrActive,
    isActive: isDepressedOrPressed,
    isIconOnly,
    hasStartIcon,
    hasEndIcon,
    hasAnimation,
  });

  const contentStyles = useContentStyles({ justify, isHidden: isLoading });
  const spinnerStyles = useSpinnerStyles({
    isLoading,
    isSingleChild: isLabelHidden && icon === null && iconEnd === null,
  });
  const outlineStyles = useOutlineStyles({ isActive, variant });

  const effectiveTooltip = isDisabledState && disabledMessage !== null ? disabledMessage : tooltip;

  return (
    <GeoPrivateTooltipTriggerContext.Provider value={tooltipTriggerRef}>
      <GeoPrivatePressable
        accessibilityLabel={ariaLabel}
        accessibilityRelationship={{
          controls: ariaControls,
          describedby: ariaDescribedBy,
          errormessage: ariaErrorMessage,
          haspopup: ariaHasPopup,
          labelledby: ariaLabelledBy,
          owns: ariaOwns,
        }}
        accessibilityRole={role ?? (href ? 'link' : 'button')}
        accessibilityState={{
          busy: isLoading,
          expanded: ariaExpanded,
          pressed: ariaPressed,
        }}
        disabled={isDisabledState}
        forwardedRef={mergedRef}
        link={href ? { url: href.toString(), target, rel, download } : null}
        nativeID={id}
        onBlur={onBlur}
        onFocus={onFocus}
        onFocusChange={handleFocusChange}
        onFocusVisibleChange={handleFocusVisibleChange}
        onHoverChange={handleHoverChange}
        onHoverEnd={onHoverEnd}
        onHoverMove={onHoverMove}
        onHoverStart={onHoverStart}
        onPress={isSubmitOrHasLayerAction || onClick !== null ? handleClick : null}
        onPressChange={handlePressChange}
        onPressEnd={onPressEnd}
        onPressMove={onPressMove}
        onPressStart={onPressStart}
        preventDefault={href === null}
        style={adjustedLayoutContext}
        suppressHydrationWarning={suppressHydrationWarning}
        testID={dataTestId}
        xstyle={[buttonStyles, xstyle]}
      >
        <GeoBaseText color="inherit" size="value" weight="inherit" xstyle={styles.fullWidth}>
          <div className={stylex(styles.container)}>
            {isActive && <div className={stylex(outlineStyles)} style={adjustedLayoutContext} />}
            {isLoading && (
              <div className={stylex(spinnerStyles)}>
                <GeoSpinner shade={isPrimaryOrCreation ? 'light' : 'dark'} size="small" />
              </div>
            )}
            {isLabelHiddenOrEmpty && (
              <GeoBaseAccessibleElement isHidden={isLabelHidden}>{label}</GeoBaseAccessibleElement>
            )}
            <GeoBaseSpacingLayout xstyle={[contentStyles, styles.fullWidth]}>
              {hasStartIcon && (
                <GeoPrivateFBIconOrImageish
                  color="inherit"
                  icon={icon}
                  isDisabled={isDisabledState}
                  xstyle={styles.icon}
                />
              )}
              {isLabelHiddenOrEmpty ? (
                '\u200b'
              ) : (
                <GeoBaseText
                  color="inherit"
                  display="truncate"
                  showTruncationTooltip={effectiveTooltip === null}
                  size="interactive"
                  weight={isNextTheme ? null : 'inherit'}
                  xstyle={justify === 'start' && styles.growLabel}
                >
                  {label}
                </GeoBaseText>
              )}
              {iconEnd && (
                <GeoIcon
                  color="inherit"
                  icon={iconEnd}
                  isDisabled={isDisabledState}
                  xstyle={[styles.icon, isIconEndLayoutEnd && styles.iconEnd]}
                />
              )}
            </GeoBaseSpacingLayout>
          </div>
        </GeoBaseText>
      </GeoPrivatePressable>
      {isSubmitOrHasLayerAction && (
        <div className={stylex(styles.hiddenButton)}>
          <button className={buttonLayerAction} ref={hiddenButtonRef} type={type} />
        </div>
      )}
      <GeoPrivateFbtOrTooltip>{effectiveTooltip}</GeoPrivateFbtOrTooltip>
    </GeoPrivateTooltipTriggerContext.Provider>
  );
};

let q = stylex.create({
  root: {
    alignItems: 'center',
    borderStyle: 'none',
    display: 'inline-flex',
    flexBasis: 'auto',
    flexDirection: 'row',
    flexShrink: 0,
    maxWidth: '100%',
    position: 'relative',
    textDecoration: 'none',
    userSelect: 'none',
    verticalAlign: 'middle',
    // eslint-disable-next-line @stylexjs/valid-styles
    MozOsxFontSmoothing: 'xlh3980',
    WebkitFontSmoothing: 'antialiased',
    // eslint-disable-next-line @stylexjs/valid-styles
    ':hover': {
      textDecoration: 'none',
    },
  },
  outlineOffset: {
    outlineOffset: '-1px',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  grow: {
    display: 'flex',
    flexGrow: '1',
    flexShrink: '1',
  },
});

const useButtonStyles = (props) => {
  const {
    grow,
    variant,
    isDisabled = false,
    isFocused = false,
    isActive = false,
    isIconOnly,
    hasStartIcon,
    hasEndIcon,
    hasAnimation,
  } = props;

  const isNextTheme = useGeoPrivateIsNextTheme();
  const theme = useGeoTheme();
  const { selectBorderRadius, selectInteractiveColorPalette, selectSpacing } = theme;
  const effectiveVariant = getEffectiveVariant(variant);
  const { selectInteractiveBorder } = useGeoTheme();

  const iconPositions = [
    hasStartIcon ? 'start' : null,
    hasEndIcon ? 'end' : null,
    isIconOnly ? 'horizontal' : null,
  ].filter(Boolean);

  return [
    q.root,
    isNextTheme && q.outlineOffset,
    useGeoPrivateAnimationPressableStyle({
      hasAnimation,
      isActive,
    }),
    selectBorderRadius({ context: 'control' }),
    selectInteractiveBorder({
      context: effectiveVariant === 'button' ? 'button' : 'control',
      color: effectiveVariant,
      isDisabled,
    }),
    selectInteractiveColorPalette({
      color: effectiveVariant,
      isDisabled,
      isFocused,
      isActive,
    }),
    selectSpacing({ context: 'control', bounds: 'internal', target: 'coarse' }),
    iconPositions.length > 0 &&
      selectSpacing({
        context: 'control',
        bounds: 'internal',
        target: 'normal',
        positions: iconPositions,
      }),
    grow === 'fill' && q.grow,
  ];
};

const r = stylex.create({
  root: {
    justifyContent: 'center',
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
});

const useContentStyles = (props) => {
  const { justify = 'center', isHidden = false } = props;
  const { selectTransition } = useGeoTheme();
  const transition = selectTransition({ duration: 'fast', timing: 'soft' });

  return [
    r.root,
    transition,
    isHidden && r.hidden,
    justify === 'center' && q.justifyCenter,
    justify === 'start' && q.justifyStart,
  ];
};

const t = stylex.create({
  root: {
    display: 'inline-flex',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    margin: 'auto',
  },
});

const useSpinnerStyles = (props) => {
  const { isLoading = false, isSingleChild = false } = props;
  const { selectTransition } = useGeoTheme();
  const contentStyles = useContentStyles({ isHidden: !isLoading });
  const transition = selectTransition({ duration: 'fast', timing: 'soft' });

  return [t.spinnerRoot, !isSingleChild && t.spinnerAbsolute, contentStyles, transition];
};

const u = stylex.create({
  root: {
    bottom: '1px',
    right: '-1px',
    pointerEvents: 'none',
    position: 'absolute',
    left: '-1px',
    top: '-1px',
  },
});

const useOutlineStyles = (props) => {
  const { isActive = false, variant } = props;
  const { selectBorderRadius, selectOutline } = useGeoTheme();
  const effectiveVariant = getEffectiveVariant(variant);

  return [
    //
    selectBorderRadius({ context: 'control' }),
    selectOutline({ color: effectiveVariant, isActive }),
    u.root,
  ];
};

const getEffectiveVariant = (variant = 'default') => {
  const invertThemeContext = useContext(GeoPrivateInvertThemeContext);

  if (invertThemeContext) return 'flatInverted';
  return variant === 'default'
    ? GeoPrivateButtonThemeUtils.shouldUseUpdatedNextButtonColors()
      ? 'button'
      : 'wash'
    : variant;
};
