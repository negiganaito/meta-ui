import stylex from '@stylexjs/stylex';

const transitionDurationStyles = stylex.create({
  extraExtraShort: {
    transitionDuration: '.1s',
  },
  fast: {
    transitionDuration: '.2s',
  },
  short: {
    transitionDuration: '.28s',
  },
  slow: {
    transitionDuration: '.4s',
  },
  sluggish: {
    transitionDuration: '.7s',
  },
});

const transitionTimingStyles = stylex.create({
  enter: {
    transitionTimingFunction: 'cubic-bezier(.14,1,.34,1)',
  },
  exit: {
    transitionTimingFunction: 'cubic-bezier(.45,.1,.2,1)',
  },
  fade: {
    transitionTimingFunction: 'cubic-bezier(0,0,1,1)',
  },
  move: {
    transitionTimingFunction: 'cubic-bezier(.17,.17,0,1)',
  },
  quickMove: {
    transitionTimingFunction: 'cubic-bezier(.1,.9,.2,1)',
  },
  soft: {
    transitionTimingFunction: 'cubic-bezier(.08,.52,.52,1)',
  },
  strong: {
    transitionTimingFunction: 'cubic-bezier(.12,.8,.32,1)',
  },
});

export const GeoPrivateNextTransitionGeneratedStyles = {
  transitionDurationStyles,
  transitionTimingStyles,
};
