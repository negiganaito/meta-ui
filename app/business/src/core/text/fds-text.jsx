import React, { forwardRef, useContext, useMemo } from 'react';
import { BaseTextContextProvider, useBaseTextContext } from '@meta-core/contexts/base-text-context';
import { CometDensityModeContext } from '@meta-core/contexts/comet-density-mode-context';
import { CometTextLangContext } from '@meta-core/contexts/comet-text-lang-context';
import { FDSTextContext } from '@meta-core/contexts/fds-text-context';
import { CometTextTypography } from '@meta-core/styles/comet-text-typography';
import stylex from '@stylexjs/stylex';

import { BaseHeading } from './base-heading';
import { CometLineClamp } from './comet-line-clamp';

const defaultFunc = {
  useTranslationKeyForTextParent: function () {},
};

const { useTranslationKeyForTextParent } = defaultFunc;

function getTypoColor(color, type) {
  if (type) {
    // Check if the type is present in BUTTON_TYPE, otherwise use the provided color
    // eslint-disable-next-line no-return-assign, no-cond-assign
    return (type = BUTTON_TYPE[color]) ? type : color;
  } else {
    // If no type provided, use the given color directly
    return color;
  }
}

/**
 * @type React.ForwardRefRenderFunction<React.FunctionComponent, import("./types").TetraTextProps>
 */
export const FDSText = forwardRef((props, ref) => {
  const {
    align = 'auto',
    children,
    color,
    dir = 'auto',
    hyphens = 'none',
    id,
    isPrimaryHeading = false,
    isSemanticHeading = false,
    numberOfLines,
    preserveNewLines = false,
    suppressHydrationWarning,
    type,
    truncationTooltip,
  } = props;

  // eslint-disable-next-line no-unused-vars
  const [densityMode, _] = useContext(CometDensityModeContext);

  const textLang = useContext(CometTextLangContext);
  const {
    fontFamily,
    fontSize,
    defaultColor = 'primary',
    fontWeight = 'normal',
    offsets = [0, 0],
  } = CometTextTypography[type];

  const offsetsValue = offsets.length === 3 ? offsets[2] : 0;

  const key = useTranslationKeyForTextParent();

  const typoColor = getTypoColor(color ?? defaultColor, type === 'button1' || type === 'button2');

  const CometTextContextValue = useMemo(() => {
    return { color: typoColor, type };
  }, [typoColor, type]);

  const baseTextContextValue = useBaseTextContext();

  const nested = (!baseTextContextValue ? undefined : baseTextContextValue.nested) === true;

  const textChild = (
    <BaseTextContextProvider nested={true}>
      <FDSTextContext.Provider value={CometTextContextValue}>
        <span
          key={key}
          className={stylex(
            styles.base,
            fontFamily,
            !nested && styles.block,
            // @ts-ignore
            !nested && nestedBeforeOffsetStyles[offsets[0]],
            !nested && styles.block,
            !nested && nestedAfterOffsetStyles[numberOfLines !== undefined ? offsets[1] + offsetsValue : offsets[1]],
            densityMode ? densityModeFontStyles[fontSize] : defaultFontSizeStyles[fontSize],
            fontWeightStyles[fontWeight],
            buttonColorStyles[typoColor],
            align !== 'auto' && alignStyles[align],
            hyphens !== 'none' && hyphensStyles[hyphens],
            preserveNewLines && styles.preserveNewLines,
          )}
          lang={textLang}
          dir={nested ? undefined : dir}
          id={id}
          ref={ref}
          suppressHydrationWarning={suppressHydrationWarning}
          data-testid={undefined}
        >
          {numberOfLines ? (
            <CometLineClamp
              lines={numberOfLines}
              truncationTooltip={truncationTooltip}
              xstyle={offsetsValue !== true && offsetValueStyles[offsetsValue]}
            >
              {children}
            </CometLineClamp>
          ) : (
            children
          )}
        </span>
      </FDSTextContext.Provider>
    </BaseTextContextProvider>
  );

  return isSemanticHeading ? (
    <BaseHeading isPrimaryHeading={isPrimaryHeading} xstyle={styles.heading}>
      {textChild}
    </BaseHeading>
  ) : (
    textChild
  );
});

const styles = stylex.create({
  //
  apple: {
    MozOsxFontSmoothing: 'grayscale',
    WebkitFontSmoothing: 'antialiased',
    fontFamily: 'var(--font-family-apple)',
  },

  base: {
    maxWidth: '100%',
    minWidth: 0,
    wordBreak: 'break-word',
    wordWrap: 'break-word',
  },

  block: {
    content: {
      '::after': '""',
      '::before': '""',
    },

    display: {
      default: 'block',
      '::after': 'block',
      '::before': 'block',
    },

    height: {
      '::after': 0,
      '::before': 0,
    },
  },

  default: { fontFamily: 'var(--font-family-default)' },

  heading: {
    maxWidth: '100%',
    minWidth: 0,
  },

  preserveNewLines: { whiteSpace: 'pre-line' },

  segoe: { fontFamily: 'var(--font-family-segoe)' },
});

const alignStyles = stylex.create({
  center: { textAlign: 'center' },

  end: { textAlign: 'end' },

  start: { textAlign: 'start' },
});

const buttonColorStyles = stylex.create({
  blueLink: {
    color: 'var(--blue-link)',
  },
  disabled: {
    color: 'var(--disabled-text)',
  },
  disabledButton: {
    color: 'var(--disabled-button-text)',
  },
  highlight: {
    color: 'var(--accent)',
  },
  negative: {
    color: 'var(--negative)',
  },
  placeholder: {
    color: 'var(--placeholder-text)',
  },
  positive: {
    color: 'var(--positive)',
  },
  primary: {
    color: 'var(--primary-text)',
  },
  primaryButton: {
    color: 'var(--primary-button-text)',
  },
  primaryDeemphasizedButton: {
    color: 'var(--primary-deemphasized-button-text)',
  },
  primaryOnMedia: {
    color: 'var(--primary-text-on-media)',
  },
  secondary: {
    color: 'var(--secondary-text)',
  },
  secondaryButton: {
    color: 'var(--secondary-button-text)',
  },
  secondaryOnMedia: {
    color: 'var(--secondary-text-on-media)',
  },
  selectedOption: {
    color: 'var(--inverse-text)',
  },
  tertiary: {
    color: 'var(--placeholder-text)',
  },
  tooltip: {
    color: 'var(--primary-text)',
  },
  white: {
    color: 'var(--always-white)',
  },
});

const defaultFontSizeStyles = stylex.create({
  12: {
    fontSize: '.75rem',
    lineHeight: '1.3333',
  },
  13: {
    fontSize: ' .8125rem',
    lineHeight: '1.2308',
  },
  14: {
    fontSize: '.875rem',
    lineHeight: '1.2857',
  },
  15: {
    fontSize: '.9375rem',
    lineHeight: '1.3333',
  },
  16: {
    fontSize: '1rem',
    lineHeight: '1.25',
  },
  17: {
    fontSize: '1.0625rem',
    lineHeight: '1.1765',
  },
  20: {
    fontSize: '1.25rem',
    lineHeight: '1.2',
  },
  24: {
    fontSize: '1.5rem',
    lineHeight: '1.1667',
  },
  28: {
    fontSize: '1.75rem',
    lineHeight: '1.1429',
  },
  32: {
    fontSize: '2rem',
    lineHeight: ' 1.1875',
  },
});

const densityModeFontStyles = stylex.create({
  12: {
    fontSize: '.75rem',
    lineHeight: '1.3333',
  },
  13: {
    fontSize: '.75rem',
    lineHeight: '1.2308',
  },
  15: {
    fontSize: '.875rem',
    lineHeight: '1.3333',
  },
  17: {
    fontSize: '1rem',
    lineHeight: '1.1765',
  },
  20: {
    fontSize: '1.25rem',
    lineHeight: '1.2',
  },
  24: {
    fontSize: '1.5rem',
    lineHeight: '1.1667',
  },
  28: {
    fontSize: '1.75rem',
    lineHeight: '1.1429',
  },
  32: {
    fontSize: '2rem',
    lineHeight: '1.1875',
  },
});

const fontWeightStyles = stylex.create({
  bold: { fontWeight: 700 },
  medium: { fontWeight: 500 },
  normal: { fontWeight: 400 },
  semibold: { fontWeight: 600 },
});

const nestedBeforeOffsetStyles = stylex.create({
  0: {},
  1: {
    marginTop: {
      default: null,
      '::before': '-1px',
    },
  },
  2: {
    marginTop: {
      default: null,
      '::before': '-2px',
    },
  },
  3: {
    marginTop: {
      default: null,
      '::before': '-3px',
    },
  },
  4: {
    marginTop: {
      default: null,
      '::before': '-4px',
    },
  },
  5: {
    marginTop: {
      default: null,
      '::before': '-5px',
    },
  },
  6: {
    marginTop: {
      default: null,
      '::before': '-6px',
    },
  },
  7: {
    marginTop: {
      default: null,
      '::before': '-7px',
    },
  },
  8: {
    marginTop: {
      default: null,
      '::before': '-8px',
    },
  },
  9: {
    marginTop: {
      default: null,
      '::before': '-9px',
    },
  },
  10: {
    marginTop: {
      default: null,
      '::before': '-10px',
    },
  },
});

const nestedAfterOffsetStyles = stylex.create({
  1: {
    marginBottom: {
      default: null,
      '::after': '-1px',
    },
  },
  2: {
    marginBottom: {
      default: null,
      '::after': '-2px',
    },
  },
  3: {
    marginBottom: {
      default: null,
      '::after': '-3px',
    },
  },
  4: {
    marginBottom: {
      default: null,
      '::after': '-4px',
    },
  },
  5: {
    marginBottom: {
      default: null,
      '::after': '-5px',
    },
  },
  6: {
    marginBottom: {
      default: null,
      '::after': '-6px',
    },
  },
  7: {
    marginBottom: {
      default: null,
      '::after': '-7px',
    },
  },
  8: {
    marginBottom: {
      default: null,
      '::after': '-8px',
    },
  },
  9: {
    marginBottom: {
      default: null,
      '::after': '-9px',
    },
  },
  10: {
    marginBottom: {
      default: null,
      '::after': '-10px',
    },
  },
});

const offsetValueStyles = stylex.create({
  1: { paddingBottom: '1px' },
  2: { paddingBottom: '2px' },
  3: { paddingBottom: '3px' },
});

const hyphensStyles = stylex.create({
  auto: {
    hyphens: 'auto',
  },
  manual: {
    hyphens: 'manual',
  },
});

const BUTTON_TYPE = {
  disabled: 'disabledButton',
  highlight: 'primaryDeemphasizedButton',
  secondary: 'secondaryButton',
  white: 'primaryButton',
};
