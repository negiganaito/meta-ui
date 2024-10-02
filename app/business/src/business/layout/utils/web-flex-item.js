import stylex from '@stylexjs/stylex';

const resetStyles = stylex.create({
  reset: {
    minHeight: '0',
    minWidth: '0',
  },
});

const alignSelfStyles = stylex.create({
  center: {
    alignSelf: 'center',
  },
  end: {
    alignSelf: 'flex-end',
  },
  start: {
    alignSelf: 'flex-start',
  },
  stretch: {
    alignSelf: 'stretch',
  },
  baseline: {
    alignSelf: 'baseline',
  },
});

const flexBasisStyles = stylex.create({
  0: {
    flexBasis: '0px',
  },
  auto: {
    flexBasis: 'auto',
  },
  content: {
    flexBasis: 'content',
  },
});

const flexGrowStyles = stylex.create({
  0: {
    flexGrow: '0',
  },
  1: {
    flexGrow: '1',
  },
  2: {
    flexGrow: '2',
  },
  3: {
    flexGrow: '3',
  },
  4: {
    flexGrow: '4',
  },
});

const orderStyles = stylex.create({
  0: {
    order: '0',
  },
  1: {
    order: '1',
  },
  2: {
    order: '2',
  },
  3: {
    order: '3',
  },
  4: {
    order: '4',
  },
  5: {
    order: '5',
  },
});

const flexShrinkStyles = stylex.create({
  0: {
    flexShrink: '0',
  },
  1: {
    flexShrink: '1',
  },
  2: {
    flexShrink: '2',
  },
  3: {
    flexShrink: '3',
  },
  4: {
    flexShrink: '4',
  },
});

export function webFlexItem({ alignSelf, basis, grow, order, shrink }) {
  return [
    resetStyles.reset,
    alignSelf && alignSelfStyles[alignSelf],
    basis && flexBasisStyles[basis],
    grow && flexGrowStyles[grow],
    order && orderStyles[order],
    shrink && flexShrinkStyles[shrink],
  ];
}
