import stylex from '@stylexjs/stylex';

const containerInternalPageSpacingStyles = stylex.create({
  bottom: {
    paddingBottom: '24px',
  },
  top: {
    paddingTop: '24px',
  },
  end: {
    paddingRight: '24px',
    paddingLeft: null,
  },
  start: {
    paddingLeft: '24px',
    paddingRight: null,
  },
  horizontal: {
    paddingLeft: '24px',
    paddingRight: '24px',
  },
  vertical: {
    paddingTop: '24px',
    paddingBottom: '24px',
  },
});

const containerInternalComponentSpacingStyles = stylex.create({
  bottom: {
    paddingBottom: '16px',
  },
  top: {
    paddingTop: '16px',
  },
  end: {
    paddingRight: '16px',
    paddingLeft: null,
  },
  start: {
    paddingLeft: '16px',
    paddingRight: null,
  },
  horizontal: {
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  vertical: {
    paddingTop: '16px',
    paddingBottom: '16px',
  },
});

const containerExternalRelatedSpacingStyles = stylex.create({
  bottom: {
    marginBottom: '8px',
  },
  top: {
    marginTop: '8px',
  },
  end: {
    marginRight: '8px',
    marginLeft: null,
  },
  start: {
    marginLeft: '8px',
    marginRight: null,
  },
  horizontal: {
    marginLeft: '8px',
    marginRight: '8px',
  },
  vertical: {
    marginTop: '8px',
    marginBottom: '8px',
  },
});

const containerExternalUnrelatedSpacingStyles = stylex.create({
  bottom: {
    marginBottom: '16px',
  },
  top: {
    marginTop: '16px',
  },
  end: {
    marginRight: '16px',
    marginLeft: null,
  },
  start: {
    marginLeft: '16px',
    marginRight: null,
  },
  horizontal: {
    marginLeft: '16px',
    marginRight: '16px',
  },
  vertical: {
    marginTop: '16px',
    marginBottom: '16px',
  },
});

const containerExternalSectionSpacingStyles = stylex.create({
  bottom: {
    marginBottom: '32px',
  },
  top: {
    marginTop: '32px',
  },
  end: {
    marginRight: '32px',
    marginLeft: null,
  },
  start: {
    marginRight: null,
  },
  horizontal: {
    marginLeft: '32px',
    marginRight: '32px',
  },
  vertical: {
    marginTop: '32px',
    marginBottom: '32px',
  },
});

const componentFineSpacingStyles = stylex.create({
  bottom: {
    paddingBottom: '4px',
  },
  top: {
    paddingTop: '4px',
  },
  end: {
    paddingRight: '4px',
    paddingLeft: null,
  },
  start: {
    paddingLeft: '4px',
    paddingRight: null,
  },
  horizontal: {
    paddingLeft: '4px',
    paddingRight: '4px',
  },
  vertical: {
    paddingTop: '4px',
    paddingBottom: '4px',
  },
});

const componentFineSpacingOffsetStyles = stylex.create({
  bottom: {
    marginBottom: '-4px',
  },
  top: {
    marginTop: '-4px',
  },
  end: {
    marginRight: '-4px',
    marginLeft: null,
  },
  start: {
    marginLeft: '-4px',
    marginRight: null,
  },
  horizontal: {
    marginLeft: '-4px',
    marginRight: '-4px',
  },
  vertical: {
    marginTop: '-4px',
    marginBottom: '-4px',
  },
});

const componentNormalSpacingStyles = stylex.create({
  bottom: {
    paddingBottom: '8px',
  },
  top: {
    paddingTop: '8px',
  },
  end: {
    paddingRight: '8px',
    paddingLeft: null,
  },
  start: {
    paddingLeft: '8px',
    paddingRight: null,
  },
  horizontal: {
    paddingLeft: '8px',
    paddingRight: '8px',
  },
  vertical: {
    paddingTop: '8px',
    paddingBottom: '8px',
  },
});

const componentNormalSpacingOffsetStyles = stylex.create({
  bottom: {
    marginBottom: '-8px',
  },
  top: {
    marginTop: '-8px',
  },
  end: {
    marginRight: '-8px',
    marginLeft: null,
  },
  start: {
    marginLeft: '-8px',
    marginRight: null,
  },
  horizontal: {
    marginLeft: '-8px',
    marginRight: '-8px',
  },
  vertical: {
    marginTop: '-8px',
    marginBottom: '-8px',
  },
});

const componentCoarseSpacingStyles = stylex.create({
  bottom: {
    paddingBottom: '12px',
  },
  top: {
    paddingTop: '12px',
  },
  end: {
    paddingRight: '12px',
    paddingLeft: null,
  },
  start: {
    paddingLeft: 'x1ye3gou',
    paddingRight: null,
  },
  horizontal: {
    paddingLeft: 'x1ye3gou',
    paddingRight: '12px',
  },
  vertical: {
    paddingTop: '12px',
    paddingBottom: '12px',
  },
});

const componentCoarseSpacingOffsetStyles = stylex.create({
  bottom: {
    marginBottom: '-12px',
  },
  top: {
    marginTop: '-12px',
  },
  end: {
    marginRight: '-12px',
    marginLeft: null,
  },
  start: {
    marginLeft: '-12px',
    marginRight: null,
  },
  horizontal: {
    marginLeft: '-12px',
    marginRight: '-12px',
  },
  vertical: {
    marginTop: '-12px',
    marginBottom: '-12px',
  },
});

const componentExternalRelatedSpacingStyles = stylex.create({
  bottom: {
    marginBottom: '4px',
  },
  top: {
    marginTop: '4px',
  },
  end: {
    marginRight: '4px',
    marginLeft: null,
  },
  start: {
    marginLeft: '4px',
    marginRight: null,
  },
  horizontal: {
    marginLeft: '4px',
    marginRight: '4px',
  },
  vertical: {
    marginTop: '4px',
    marginBottom: '4px',
  },
});

const componentExternalUnrelatedSpacingStyles = stylex.create({
  bottom: {
    marginBottom: '8px',
  },
  top: {
    marginTop: '8px',
  },
  end: {
    marginRight: '8px',
    marginLeft: null,
  },
  start: {
    marginLeft: '8px',
    marginRight: null,
  },
  horizontal: {
    marginLeft: '8px',
    marginRight: '8px',
  },
  vertical: {
    marginTop: '8px',
    marginBottom: '8px',
  },
});

const contentExternalHeadingSpacingStyles = stylex.create({
  bottom: {
    marginBottom: '4px',
  },
  top: {
    marginTop: '4px',
  },
  end: {
    marginRight: '4px',
    marginLeft: null,
  },
  start: {
    marginLeft: '4px',
    marginRight: null,
  },
  horizontal: {
    marginLeft: '4px',
    marginRight: '4px',
  },
  vertical: {
    marginTop: '4px',
    marginBottom: '4px',
  },
});

const contentExternalParagraphSpacingStyles = stylex.create({
  bottom: {
    marginBottom: '12px',
  },
  top: {
    marginTop: '12px',
  },
  end: {
    marginRight: '12px',
    marginLeft: null,
  },
  start: {
    marginLeft: '12px',
    marginRight: null,
  },
  horizontal: {
    marginLeft: '12px',
    marginRight: '12px',
  },
  vertical: {
    marginTop: '12px',
    marginBottom: '12px',
  },
});

const contentExternalSectionSpacingStyles = stylex.create({
  bottom: {
    marginBottom: '16px',
  },
  top: {
    marginTop: '16px',
  },
  end: {
    marginRight: '16px',
    marginLeft: null,
  },
  start: {
    marginLeft: '16px',
    marginRight: null,
  },
  horizontal: {
    marginLeft: '16px',
    marginRight: '16px',
  },
  vertical: {
    marginTop: '16px',
    marginBottom: '16px',
  },
});

const controlNormalSpacingStyles = stylex.create({
  bottom: {
    paddingBottom: '8px',
  },
  top: {
    paddingTop: '8px',
  },
  end: {
    paddingRight: '12px',
    paddingLeft: null,
  },
  start: {
    paddingLeft: '12px',
    paddingRight: null,
  },
  horizontal: {
    paddingLeft: '12px',
    paddingRight: '12px',
  },
  vertical: {
    paddingTop: '8px',
    paddingBottom: '8px',
  },
});

const controlFineSpacingStyles = stylex.create({
  bottom: {
    paddingBottom: '8px',
  },
  top: {
    paddingTop: '8px',
  },
  end: {
    paddingRight: '8px',
    paddingLeft: null,
  },
  start: {
    paddingLeft: '8px',
    paddingRight: null,
  },
  horizontal: {
    paddingLeft: '8px',
    paddingRight: '8px',
  },
  vertical: {
    paddingTop: '8px',
    paddingBottom: '8px',
  },
});

const controlCoarseSpacingStyles = stylex.create({
  bottom: {
    paddingBottom: '8px',
  },
  top: {
    paddingTop: '8px',
  },
  end: {
    paddingRight: '16px',
    paddingLeft: null,
  },
  start: {
    paddingLeft: '16px',
    paddingRight: null,
  },
  horizontal: {
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  vertical: {
    paddingTop: '8px',
    paddingBottom: '8px',
  },
});

const inputSpacingStyles = stylex.create({
  bottom: {
    paddingBottom: '7px',
  },
  top: {
    paddingTop: '7px',
  },
  end: {
    paddingRight: '11px',
    paddingLeft: null,
  },
  start: {
    paddingLeft: '11px',
    paddingRight: null,
  },
  horizontal: {
    paddingLeft: '11px',
    paddingRight: '11px',
  },
  vertical: {
    paddingTop: '7px',
    paddingBottom: '7px',
  },
});

const layoutContainerExternalRelatedSpacingStyles = stylex.create({
  bottom: {
    marginBottom: {
      default: null,
      ':not([stylex-hack]) > * + *': '8px',
    },
  },
  top: {
    marginTop: {
      default: null,
      ':not([stylex-hack]) > * + *': '8px',
    },
  },
  end: {
    marginRight: {
      default: null,
      ':not([stylex-hack]) > :not(:last-child)': '8px',
    },

    marginLeft: {
      default: null,
      ':not([stylex-hack]) > :not(:last-child)': null,
    },

    // ":not([stylex-hack]) > :not(:last-child)_marginLeft": null,
    // ":not([stylex-hack]) > :not(:last-child)_marginRight": null,
  },
  start: {
    marginRight: {
      default: null,
      ':not([stylex-hack]) > :not(:first-child)': '8px',
    },

    marginLeft: {
      default: null,
      ':not([stylex-hack]) > :not(:first-child)': null,
    },

    // ":not([stylex-hack]) > :not(:first-child)_marginEnd": "x1cjjmgv",
    // ":not([stylex-hack]) > :not(:first-child)_marginLeft": null,
    // ":not([stylex-hack]) > :not(:first-child)_marginRight": null,
  },
  horizontal: {
    marginLeft: {
      default: null,
      ':not([stylex-hack]) > * + *': '8px',
    },

    marginRight: {
      default: null,
      ':not([stylex-hack]) > * + *': '8px',
    },

    // ":not([stylex-hack]) > * + *_marginStart": "x1k3wvip",
    // ":not([stylex-hack]) > * + *_marginLeft": null,
    // ":not([stylex-hack]) > * + *_marginRight": null,
    // ":not([stylex-hack]) > * + *_marginEnd": "x98vc6m",
  },
  vertical: {
    marginTop: {
      default: null,
      ':not([stylex-hack]) > * + *': '8px',
    },

    marginBottom: {
      default: null,
      ':not([stylex-hack]) > * + *': '8px',
    },

    // ":not([stylex-hack]) > * + *_marginTop": "xavht8x",
    // ":not([stylex-hack]) > * + *_marginBottom": "x1n14ejq",
  },
});

const layoutContainerExternalUnrelatedSpacingStyles = stylex.create({
  bottom: {
    marginBottom: {
      default: null,
      ':not([stylex-hack]) > * + *': '16px',
    },
  },
  top: {
    marginTop: {
      default: null,
      ':not([stylex-hack]) > * + *': '16px',
    },
  },
  end: {
    marginRight: {
      default: null,
      ':not([stylex-hack]) > :not(:last-child)': '16px',
    },

    marginLeft: {
      default: null,
      ':not([stylex-hack]) > :not(:last-child)': null,
    },
  },
  start: {
    marginRight: {
      default: null,
      ':not([stylex-hack]) > :not(:first-child)': '16px',
    },

    marginLeft: {
      default: null,
      ':not([stylex-hack]) > :not(:first-child)': null,
    },
  },
  horizontal: {
    marginRight: {
      default: null,
      ':not([stylex-hack]) > * + *': '16px',
    },

    marginLeft: {
      default: null,
      ':not([stylex-hack]) > * + *': '16px',
    },
  },
  vertical: {
    marginTop: {
      default: null,
      ':not([stylex-hack]) > * + *': '16px',
    },

    marginBottom: {
      default: null,
      ':not([stylex-hack]) > * + *': '16px',
    },
  },
});

const layoutContainerExternalSectionSpacingStyles = stylex.create({
  bottom: {
    marginBottom: {
      default: null,
      ':not([stylex-hack]) > * + *': '32px',
    },
  },
  top: {
    marginTop: {
      default: null,
      ':not([stylex-hack]) > * + *': '32px',
    },
  },
  end: {
    marginRight: {
      default: null,
      ':not([stylex-hack]) > :not(:last-child)': '32px',
    },

    marginLeft: {
      default: null,
      ':not([stylex-hack]) > :not(:last-child)': null,
    },
  },
  start: {
    marginRight: {
      default: null,
      ':not([stylex-hack]) > :not(:first-child)': '32px',
    },

    marginLeft: {
      default: null,
      ':not([stylex-hack]) > :not(:first-child)': null,
    },
  },
  horizontal: {
    marginRight: {
      default: null,
      ':not([stylex-hack]) > * + *': '32px',
    },

    marginLeft: {
      default: null,
      ':not([stylex-hack]) > * + *': '32px',
    },
  },
  vertical: {
    marginTop: {
      default: null,
      ':not([stylex-hack]) > * + *': '32px',
    },

    marginBottom: {
      default: null,
      ':not([stylex-hack]) > * + *': '32px',
    },
  },
});

const layoutComponentExternalRelatedSpacingStyles = stylex.create({
  bottom: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > * + *': {
      marginBottom: '4px',
    },
  },
  top: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > * + *': {
      marginTop: '4px',
    },
  },
  end: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > :not(:last-child)': {
      marginRight: '4px',
      marginLeft: null,
    },

    // ":not([stylex-hack]) > :not(:last-child)_marginEnd": "x65s2av",
    // ":not([stylex-hack]) > :not(:last-child)_marginLeft": null,
    // ":not([stylex-hack]) > :not(:last-child)_marginRight": null,
  },
  start: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > :not(:first-child)': {
      marginRight: '4px',
      marginLeft: null,
    },

    // ":not([stylex-hack]) > :not(:first-child)_marginEnd": "xsvltjl",
    // ":not([stylex-hack]) > :not(:first-child)_marginLeft": null,
    // ":not([stylex-hack]) > :not(:first-child)_marginRight": null,
  },
  horizontal: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > * + *': {
      marginRight: '4px',
      marginLeft: '4px',
    },

    // ":not([stylex-hack]) > * + *_marginStart": "xi9rg8n",
    // ":not([stylex-hack]) > * + *_marginLeft": null,
    // ":not([stylex-hack]) > * + *_marginRight": null,
    // ":not([stylex-hack]) > * + *_marginEnd": "x1nvpu9x",
  },
  vertical: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > * + *': {
      marginTop: '4px',
      marginBottom: '4px',
    },

    // ":not([stylex-hack]) > * + *_marginTop": "xyqj3jm",
    // ":not([stylex-hack]) > * + *_marginBottom": "x1xcg3fx",
  },
});

const layoutComponentExternalUnrelatedSpacingStyles = stylex.create({
  bottom: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > * + *': {
      marginBottom: '8px',
    },
  },
  top: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > * + *': {
      marginTop: '8px',
    },
  },
  end: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > :not(:last-child)': {
      marginRight: '8px',
      marginLeft: null,
    },
  },
  start: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > :not(:first-child)': {
      marginRight: '8px',
      marginLeft: null,
    },
  },
  horizontal: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > * + *': {
      marginLeft: '8px',
      marginRight: '8px',
    },

    // ":not([stylex-hack]) > * + *_marginStart": "x1k3wvip",
    // ":not([stylex-hack]) > * + *_marginLeft": null,
    // ":not([stylex-hack]) > * + *_marginRight": null,
    // ":not([stylex-hack]) > * + *_marginEnd": "x98vc6m",
  },
  vertical: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > * + *': {
      marginTop: '8px',
      marginBottom: '8px',
    },
  },
});

const layoutContentExternalHeadingSpacingStyles = stylex.create({
  bottom: {
    marginBottom: {
      default: null,
      ':not([stylex-hack]) > * + *': '4px',
    },
  },
  top: {
    marginTop: {
      default: null,
      ':not([stylex-hack]) > * + *': '4px',
    },
  },
  end: {
    marginRight: {
      default: null,
      ':not([stylex-hack]) > :not(:last-child)': '4px',
    },

    marginLeft: {
      default: null,
      ':not([stylex-hack]) > :not(:last-child)': null,
    },
  },
  start: {
    marginRight: {
      default: null,
      ':not([stylex-hack]) > :not(:first-child)': '4px',
    },

    marginLeft: {
      default: null,
      ':not([stylex-hack]) > :not(:first-child)': null,
    },

    // ":not([stylex-hack]) > :not(:first-child)_marginEnd": "xsvltjl",
    // ":not([stylex-hack]) > :not(:first-child)_marginLeft": null,
    // ":not([stylex-hack]) > :not(:first-child)_marginRight": null,
  },
  horizontal: {
    marginRight: {
      default: null,
      ':not([stylex-hack]) > * + *': '4px',
    },

    marginLeft: {
      default: null,
      ':not([stylex-hack]) > * + *': '4px',
    },

    // ":not([stylex-hack]) > * + *_marginStart": "xi9rg8n",
    // ":not([stylex-hack]) > * + *_marginLeft": null,
    // ":not([stylex-hack]) > * + *_marginRight": null,
    // ":not([stylex-hack]) > * + *_marginEnd": "x1nvpu9x",
  },
  vertical: {
    marginTop: {
      default: null,
      ':not([stylex-hack]) > * + *': '4px',
    },

    marginBottom: {
      default: null,
      ':not([stylex-hack]) > * + *': '4px',
    },

    // ":not([stylex-hack]) > * + *_marginTop": "xyqj3jm",
    // ":not([stylex-hack]) > * + *_marginBottom": "x1xcg3fx",
  },
});

const layoutContentExternalParagraphSpacingStyles = stylex.create({
  bottom: {
    marginBottom: {
      default: null,
      ':not([stylex-hack]) > * + *': '12px',
    },
  },
  top: {
    marginTop: {
      default: null,
      ':not([stylex-hack]) > * + *': '12px',
    },
  },
  end: {
    marginLeft: {
      default: null,
      ':not([stylex-hack]) > :not(:last-child)': null,
    },

    marginRight: {
      default: null,
      ':not([stylex-hack]) > :not(:last-child)': '12px',
    },

    // ":not([stylex-hack]) > :not(:last-child)_marginEnd": "x15r7cj3",
    // ":not([stylex-hack]) > :not(:last-child)_marginLeft": null,
    // ":not([stylex-hack]) > :not(:last-child)_marginRight": null,
  },
  start: {
    marginLeft: {
      default: null,
      ':not([stylex-hack]) > :not(:first-child)': null,
    },

    marginRight: {
      default: null,
      ':not([stylex-hack]) > :not(:first-child)': '12px',
    },

    // ":not([stylex-hack]) > :not(:first-child)_marginEnd": "x16me3o6",
    // ":not([stylex-hack]) > :not(:first-child)_marginLeft": null,
    // ":not([stylex-hack]) > :not(:first-child)_marginRight": null,
  },
  horizontal: {
    marginLeft: {
      default: null,
      ':not([stylex-hack]) > * + *': '12px',
    },

    marginRight: {
      default: null,
      ':not([stylex-hack]) > * + *': '12px',
    },

    // ":not([stylex-hack]) > * + *_marginStart": "x1ud7p3u",
    // ":not([stylex-hack]) > * + *_marginLeft": null,
    // ":not([stylex-hack]) > * + *_marginRight": null,
    // ":not([stylex-hack]) > * + *_marginEnd": "xct3uda",
  },
  vertical: {
    marginTop: {
      default: null,
      ':not([stylex-hack]) > * + *': '12px',
    },

    marginBottom: {
      default: null,
      ':not([stylex-hack]) > * + *': '12px',
    },
    // ":not([stylex-hack]) > * + *_marginTop": "x1ov1sdl",
    // ":not([stylex-hack]) > * + *_marginBottom": "x149ltce",
  },
});

const layoutContentExternalSectionSpacingStyles = stylex.create({
  bottom: {
    marginBottom: {
      default: null,
      ':not([stylex-hack]) > * + *': '16px',
    },
  },
  top: {
    marginTop: {
      default: null,
      ':not([stylex-hack]) > * + *': '16px',
    },
  },
  end: {
    marginLeft: {
      default: null,
      ':not([stylex-hack]) > :not(:last-child)': null,
    },

    marginRight: {
      default: null,
      ':not([stylex-hack]) > :not(:last-child)': '16px',
    },

    // ":not([stylex-hack]) > :not(:last-child)_marginEnd": "x1jjk293",
    // ":not([stylex-hack]) > :not(:last-child)_marginLeft": null,
    // ":not([stylex-hack]) > :not(:last-child)_marginRight": null,
  },
  start: {
    marginLeft: {
      default: null,
      ':not([stylex-hack]) > :not(:first-child)': null,
    },

    marginRight: {
      default: null,
      ':not([stylex-hack]) > :not(:first-child)': '16px',
    },

    // ":not([stylex-hack]) > :not(:first-child)_marginEnd": "xg3tqtt",
    // ":not([stylex-hack]) > :not(:first-child)_marginLeft": null,
    // ":not([stylex-hack]) > :not(:first-child)_marginRight": null,
  },
  horizontal: {
    marginLeft: {
      default: null,
      ':not([stylex-hack]) > * + *': '16px',
    },

    marginRight: {
      default: null,
      ':not([stylex-hack]) > * + *': '16px',
    },

    // ":not([stylex-hack]) > * + *_marginStart": "xe9zolg",
    // ":not([stylex-hack]) > * + *_marginLeft": null,
    // ":not([stylex-hack]) > * + *_marginRight": null,
    // ":not([stylex-hack]) > * + *_marginEnd": "x1ywc1mj",
  },
  vertical: {
    marginTop: {
      default: null,
      ':not([stylex-hack]) > * + *': '16px',
    },

    marginBottom: {
      default: null,
      ':not([stylex-hack]) > * + *': '16px',
    },

    // ":not([stylex-hack]) > * + *_marginTop": "x1kxxb1g",
    // ":not([stylex-hack]) > * + *_marginBottom": "x1jbr5dy",
  },
});

export const GeoPrivateDefaultSpacingGeneratedStyles = {
  containerInternalPageSpacingStyles,
  containerInternalComponentSpacingStyles,
  containerExternalRelatedSpacingStyles,
  containerExternalUnrelatedSpacingStyles,
  containerExternalSectionSpacingStyles,
  componentFineSpacingStyles,
  componentFineSpacingOffsetStyles,
  componentNormalSpacingStyles,
  componentNormalSpacingOffsetStyles,
  componentCoarseSpacingStyles,
  componentCoarseSpacingOffsetStyles,
  componentExternalRelatedSpacingStyles,
  componentExternalUnrelatedSpacingStyles,
  contentExternalHeadingSpacingStyles,
  contentExternalParagraphSpacingStyles,
  contentExternalSectionSpacingStyles,
  controlNormalSpacingStyles,
  controlFineSpacingStyles,
  controlCoarseSpacingStyles,
  inputSpacingStyles,
  layoutContainerExternalRelatedSpacingStyles,
  layoutContainerExternalUnrelatedSpacingStyles,
  layoutContainerExternalSectionSpacingStyles,
  layoutComponentExternalRelatedSpacingStyles,
  layoutComponentExternalUnrelatedSpacingStyles,
  layoutContentExternalHeadingSpacingStyles,
  layoutContentExternalParagraphSpacingStyles,
  layoutContentExternalSectionSpacingStyles,
};
