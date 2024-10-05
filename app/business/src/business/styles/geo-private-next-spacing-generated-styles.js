import stylex from '@stylexjs/stylex';

const a = stylex.create({
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
const b = stylex.create({
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
const c = stylex.create({
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
const d = stylex.create({
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
const e = stylex.create({
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
const f = stylex.create({
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
let h = stylex.create({
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
    paddingLeft: '12px',
    paddingRight: null,
  },
  horizontal: {
    paddingLeft: '12px',
    paddingRight: '12px',
  },
  vertical: {
    paddingTop: '12px',
    paddingBottom: '12px',
  },
});
let i = stylex.create({
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
let j = stylex.create({
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
let k = stylex.create({
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
let l = stylex.create({
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
let m = stylex.create({
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
let n = stylex.create({
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
let o = stylex.create({
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

    // ':not([stylex-hack]) > :not(:last-child)_marginRight': '8px',
    // ':not([stylex-hack]) > :not(:last-child)_marginLeft': null,
    // ':not([stylex-hack]) > :not(:last-child)_marginRight': null,
  },
  start: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > :not(:first-child)': {
      marginRight: '8px',
      marginLeft: null,
    },

    // ':not([stylex-hack]) > :not(:first-child)_marginRight': 'x1cjjmgv',
    // ':not([stylex-hack]) > :not(:first-child)_marginLeft': null,
    // ':not([stylex-hack]) > :not(:first-child)_marginRight': null,
  },
  horizontal: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > * + *': {
      marginLeft: '8px',
      marginRight: '8px',
    },

    // ':not([stylex-hack]) > * + *_marginLeft': 'x1k3wvip',
    // ':not([stylex-hack]) > * + *_marginLeft': null,
    // ':not([stylex-hack]) > * + *_marginRight': null,
    // ':not([stylex-hack]) > * + *_marginRight': 'x98vc6m',
  },
  vertical: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > * + *': {
      marginTop: '8px',
      marginBottom: '8px',
    },

    // ':not([stylex-hack]) > * + *_marginTop': 'xavht8x',
    // ':not([stylex-hack]) > * + *_marginBottom': 'x1n14ejq',
  },
});
let p = stylex.create({
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
let q = stylex.create({
  bottom: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > * + *': {
      marginBottom: '16px',
    },
  },
  top: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > * + *': {
      marginTop: '16px',
    },
  },
  end: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > :not(:last-child)': {
      marginRight: '16px',
      marginLeft: null,
    },

    // ':not([stylex-hack]) > :not(:last-child)_marginRight': 'x1jjk293',
    // ':not([stylex-hack]) > :not(:last-child)_marginLeft': null,
    // ':not([stylex-hack]) > :not(:last-child)_marginRight': null,
  },
  start: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > :not(:first-child)': {
      marginRight: '16px',
      marginLeft: null,
    },

    // ':not([stylex-hack]) > :not(:first-child)_marginRight': 'xg3tqtt',
    // ':not([stylex-hack]) > :not(:first-child)_marginLeft': null,
    // ':not([stylex-hack]) > :not(:first-child)_marginRight': null,
  },
  horizontal: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > * + *': {
      marginLeft: '16px',
      marginRight: '16px',
    },

    // ':not([stylex-hack]) > * + *_marginLeft': 'xe9zolg',
    // ':not([stylex-hack]) > * + *_marginLeft': null,
    // ':not([stylex-hack]) > * + *_marginRight': null,
    // ':not([stylex-hack]) > * + *_marginRight': 'x1ywc1mj',
  },
  vertical: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > * + *': {
      marginTop: '16px',
      marginBottom: '16px',
    },

    // ':not([stylex-hack]) > * + *_marginTop': 'x1kxxb1g',
    // ':not([stylex-hack]) > * + *_marginBottom': 'x1jbr5dy',
  },
});
let r = stylex.create({
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
    marginLeft: '32px',
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
let s = stylex.create({
  bottom: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > * + *': {
      marginBottom: '32px',
    },
  },
  top: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > * + *': {
      marginTop: '32px',
    },
  },
  end: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > :not(:last-child)': {
      marginRight: '32px',
      marginLeft: null,
    },

    // ':not([stylex-hack]) > :not(:last-child)_marginRight': 'xy9qb40',
    // ':not([stylex-hack]) > :not(:last-child)_marginLeft': null,
    // ':not([stylex-hack]) > :not(:last-child)_marginRight': null,
  },
  start: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > :not(:first-child)': {
      marginRight: '32px',
      marginLeft: null,
    },

    // ':not([stylex-hack]) > :not(:first-child)_marginRight': 'x15topv2',
    // ':not([stylex-hack]) > :not(:first-child)_marginLeft': null,
    // ':not([stylex-hack]) > :not(:first-child)_marginRight': null,
  },
  horizontal: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > * + *': {
      marginLeft: '32px',
      marginRight: '32px',
    },

    // ':not([stylex-hack]) > * + *_marginLeft': 'x1iugkjb',
    // ':not([stylex-hack]) > * + *_marginLeft': null,
    // ':not([stylex-hack]) > * + *_marginRight': null,
    // ':not([stylex-hack]) > * + *_marginRight': 'x9capae',
  },
  vertical: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > * + *': {
      marginTop: '32px',
      marginBottom: '32px',
    },

    // ':not([stylex-hack]) > * + *_marginTop': 'x1w65fby',
    // ':not([stylex-hack]) > * + *_marginBottom': 'x33y71p',
  },
});
let t = stylex.create({
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
let u = stylex.create({
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

    // ':not([stylex-hack]) > :not(:last-child)_marginRight': 'x65s2av',
    // ':not([stylex-hack]) > :not(:last-child)_marginLeft': null,
    // ':not([stylex-hack]) > :not(:last-child)_marginRight': null,
  },
  start: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > :not(:first-child)': {
      marginRight: '4px',
      marginLeft: null,
    },

    // ':not([stylex-hack]) > :not(:first-child)_marginRight': 'xsvltjl',
    // ':not([stylex-hack]) > :not(:first-child)_marginLeft': null,
    // ':not([stylex-hack]) > :not(:first-child)_marginRight': null,
  },
  horizontal: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > * + *': {
      marginLeft: '4px',
      marginRight: '4px',
    },

    // ':not([stylex-hack]) > * + *_marginLeft': 'xi9rg8n',
    // ':not([stylex-hack]) > * + *_marginLeft': null,
    // ':not([stylex-hack]) > * + *_marginRight': null,
    // ':not([stylex-hack]) > * + *_marginRight': 'x1nvpu9x',
  },
  vertical: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > * + *': {
      marginTop: '4px',
      marginBottom: '4px',
    },

    // ':not([stylex-hack]) > * + *_marginTop': 'xyqj3jm',
    // ':not([stylex-hack]) > * + *_marginBottom': 'x1xcg3fx',
  },
});
let v = stylex.create({
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
let w = stylex.create({
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

    // ':not([stylex-hack]) > :not(:last-child)_marginRight': 'x19lwn94',
    // ':not([stylex-hack]) > :not(:last-child)_marginLeft': null,
    // ':not([stylex-hack]) > :not(:last-child)_marginRight': null,
  },
  start: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > :not(:first-child)': {
      marginRight: '8px',
      marginLeft: null,
    },

    // ':not([stylex-hack]) > :not(:first-child)_marginRight': 'x1cjjmgv',
    // ':not([stylex-hack]) > :not(:first-child)_marginLeft': null,
    // ':not([stylex-hack]) > :not(:first-child)_marginRight': null,
  },
  horizontal: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > * + *': {
      marginLeft: '8px',
      marginRight: '8px',
    },

    // ':not([stylex-hack]) > * + *_marginLeft': 'x1k3wvip',
    // ':not([stylex-hack]) > * + *_marginLeft': null,
    // ':not([stylex-hack]) > * + *_marginRight': null,
    // ':not([stylex-hack]) > * + *_marginRight': 'x98vc6m',
  },
  vertical: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > * + *': {
      marginTop: '8px',
      marginBottom: '8px',
    },

    // ':not([stylex-hack]) > * + *_marginTop': 'xavht8x',
    // ':not([stylex-hack]) > * + *_marginBottom': 'x1n14ejq',
  },
});
let x = stylex.create({
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
let y = stylex.create({
  bottom: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > * + *': {
      marginBottom: '4px',
    },

    // ':not([stylex-hack]) > * + *_marginBottom': 'x1xcg3fx',
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

    // ':not([stylex-hack]) > :not(:last-child)_marginRight': 'x65s2av',
    // ':not([stylex-hack]) > :not(:last-child)_marginLeft': null,
    // ':not([stylex-hack]) > :not(:last-child)_marginRight': null,
  },
  start: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > :not(:first-child)': {
      marginRight: '4px',
      marginLeft: null,
    },

    // ':not([stylex-hack]) > :not(:first-child)_marginRight': 'xsvltjl',
    // ':not([stylex-hack]) > :not(:first-child)_marginLeft': null,
    // ':not([stylex-hack]) > :not(:first-child)_marginRight': null,
  },
  horizontal: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > * + *': {
      marginLeft: '4px',
      marginRight: '4px',
    },

    // ':not([stylex-hack]) > * + *_marginLeft': 'xi9rg8n',
    // ':not([stylex-hack]) > * + *_marginLeft': null,
    // ':not([stylex-hack]) > * + *_marginRight': null,
    // ':not([stylex-hack]) > * + *_marginRight': 'x1nvpu9x',
  },
  vertical: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > * + *': {
      marginTop: '4px',
      marginBottom: '4px',
    },

    // ':not([stylex-hack]) > * + *_marginTop': 'xyqj3jm',
    // ':not([stylex-hack]) > * + *_marginBottom': 'x1xcg3fx',
  },
});
let z = stylex.create({
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
let A = stylex.create({
  bottom: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > * + *': {
      marginBottom: '12px',
    },
  },
  top: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > * + *': {
      marginTop: '12px',
    },
  },
  end: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > :not(:last-child)': {
      marginRight: '12px',
      marginLeft: null,
    },

    // ':not([stylex-hack]) > :not(:last-child)_marginRight': 'x15r7cj3',
    // ':not([stylex-hack]) > :not(:last-child)_marginLeft': null,
    // ':not([stylex-hack]) > :not(:last-child)_marginRight': null,
  },
  start: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > :not(:first-child)': {
      marginRight: '12px',
      marginLeft: null,
    },

    // ':not([stylex-hack]) > :not(:first-child)_marginRight': 'x16me3o6',
    // ':not([stylex-hack]) > :not(:first-child)_marginLeft': null,
    // ':not([stylex-hack]) > :not(:first-child)_marginRight': null,
  },
  horizontal: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > * + *': {
      marginLeft: '12px',
      marginRight: '12px',
    },

    // ':not([stylex-hack]) > * + *_marginLeft': 'x1ud7p3u',
    // ':not([stylex-hack]) > * + *_marginLeft': null,
    // ':not([stylex-hack]) > * + *_marginRight': null,
    // ':not([stylex-hack]) > * + *_marginRight': 'xct3uda',
  },
  vertical: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > * + *': {
      marginTop: '12px',
      marginBottom: '12px',
    },

    // ':not([stylex-hack]) > * + *_marginTop': 'x1ov1sdl',
    // ':not([stylex-hack]) > * + *_marginBottom': 'x149ltce',
  },
});
let B = stylex.create({
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
let C = stylex.create({
  bottom: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > * + *': {
      marginBottom: '16px',
    },
  },
  top: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > * + *': {
      marginTop: '16px',
    },
  },
  end: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > :not(:last-child)': {
      marginRight: '16px',
      marginLeft: null,
    },

    // ':not([stylex-hack]) > :not(:last-child)_marginRight': 'x1jjk293',
    // ':not([stylex-hack]) > :not(:last-child)_marginLeft': null,
    // ':not([stylex-hack]) > :not(:last-child)_marginRight': null,
  },
  start: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > :not(:first-child)': {
      marginRight: '16px',
      marginLeft: null,
    },

    // ':not([stylex-hack]) > :not(:first-child)_marginRight': 'xg3tqtt',
    // ':not([stylex-hack]) > :not(:first-child)_marginLeft': null,
    // ':not([stylex-hack]) > :not(:first-child)_marginRight': null,
  },
  horizontal: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > * + *': {
      marginLeft: '16px',
      marginRight: '16px',
    },

    // ':not([stylex-hack]) > * + *_marginLeft': 'xe9zolg',
    // ':not([stylex-hack]) > * + *_marginLeft': null,
    // ':not([stylex-hack]) > * + *_marginRight': null,
    // ':not([stylex-hack]) > * + *_marginRight': 'x1ywc1mj',
  },
  vertical: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':not([stylex-hack]) > * + *': {
      marginTop: '16px',
      marginBottom: '16px',
    },

    // ':not([stylex-hack]) > * + *_marginTop': 'x1kxxb1g',
    // ':not([stylex-hack]) > * + *_marginBottom': 'x1jbr5dy',
  },
});

export const GeoPrivateNextSpacingGeneratedStyles = {
  containerInternalPageSpacingStyles: a,
  containerInternalComponentSpacingStyles: b,
  componentFineSpacingStyles: c,
  componentFineSpacingOffsetStyles: d,
  componentNormalSpacingStyles: e,
  componentNormalSpacingOffsetStyles: f,
  componentCoarseSpacingStyles: h,
  componentCoarseSpacingOffsetStyles: i,
  controlNormalSpacingStyles: j,
  controlFineSpacingStyles: k,
  controlCoarseSpacingStyles: l,
  inputSpacingStyles: m,
  containerExternalRelatedSpacingStyles: n,
  layoutContainerExternalRelatedSpacingStyles: o,
  containerExternalUnrelatedSpacingStyles: p,
  layoutContainerExternalUnrelatedSpacingStyles: q,
  containerExternalSectionSpacingStyles: r,
  layoutContainerExternalSectionSpacingStyles: s,
  componentExternalRelatedSpacingStyles: t,
  layoutComponentExternalRelatedSpacingStyles: u,
  componentExternalUnrelatedSpacingStyles: v,
  layoutComponentExternalUnrelatedSpacingStyles: w,
  contentExternalHeadingSpacingStyles: x,
  layoutContentExternalHeadingSpacingStyles: y,
  contentExternalParagraphSpacingStyles: z,
  layoutContentExternalParagraphSpacingStyles: A,
  contentExternalSectionSpacingStyles: B,
  layoutContentExternalSectionSpacingStyles: C,
};
