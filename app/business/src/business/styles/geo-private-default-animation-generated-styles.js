import stylex from '@stylexjs/stylex';

const animationDurationStyles = stylex.create({
  extraExtraShort: {
    animationDuration: '.1s',
  },
  fast: {
    animationDuration: '.2s',
  },
  short: {
    animationDuration: '.28s',
  },
  slow: {
    animationDuration: '.4s',
  },
  sluggish: {
    animationDuration: '.7s',
  },
});

const animationTimingStyles = stylex.create({
  enter: {
    animationTimingFunction: 'cubic-bezier(.14,1,.34,1)',
  },
  exit: {
    animationTimingFunction: 'cubic-bezier(.45,.1,.2,1)',
  },
  fade: {
    animationTimingFunction: 'cubic-bezier(0,0,1,1)',
  },
  move: {
    animationTimingFunction: 'cubic-bezier(.17,.17,0,1)',
  },
  quickMove: {
    animationTimingFunction: 'cubic-bezier(.1,.9,.2,1)',
  },
  soft: {
    animationTimingFunction: 'cubic-bezier(.08,.52,.52,1)',
  },
  strong: {
    animationTimingFunction: 'cubic-bezier(.12,.8,.32,1)',
  },
});

export const GeoPrivateDefaultAnimationGeneratedStyles = {
  animationDurationStyles,
  animationTimingStyles,
};
