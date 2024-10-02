import stylex from '@stylexjs/stylex';

const alignContentStyles = stylex.create({
  center: {
    alignContent: 'center',
  },
  end: {
    alignContent: 'flex-end',
  },
  'space-around': {
    alignContent: 'space-around',
  },
  'space-between': {
    alignContent: 'space-between',
  },
  start: {
    alignContent: 'flex-start',
  },
  stretch: {
    alignContent: 'stretch',
  },
});

const alignItemsStyles = stylex.create({
  baseline: {
    alignItems: 'baseline',
  },
  center: {
    alignItems: 'center',
  },
  end: {
    alignItems: 'flex-end',
  },
  start: {
    alignItems: 'flex-start',
  },
  stretch: {
    alignItems: 'stretch',
  },
});

const flexDirectionStyles = stylex.create({
  column: {
    flexDirection: 'column',
  },
  'column-reverse': {
    flexDirection: 'column-reverse',
  },
  row: {
    flexDirection: 'row',
  },
  'row-reverse': {
    flexDirection: 'row-reverse',
  },
});

const displayStyles = stylex.create({
  flex: {
    display: 'flex',
  },
  'inline-flex': {
    display: 'inline-flex',
  },
});

const columnGapStyles = stylex.create({
  0: {
    columnGap: '0',
  },
  4: {
    columnGap: '4px',
  },
  8: {
    columnGap: '8px',
  },
  12: {
    columnGap: '12px',
  },
  16: {
    columnGap: '16px',
  },
  20: {
    columnGap: '20px',
  },
  24: {
    columnGap: '24px',
  },
});

const rowGapStyles = stylex.create({
  0: {
    rowGap: '0',
  },
  4: {
    rowGap: '4px',
  },
  8: {
    rowGap: '8px',
  },
  12: {
    rowGap: '12px',
  },
  16: {
    rowGap: '16px',
  },
  20: {
    rowGap: '20px',
  },
  24: {
    rowGap: '24px',
  },
});

const justifyContentStyles = stylex.create({
  center: {
    justifyContent: 'center',
  },
  end: {
    justifyContent: 'flex-end',
  },
  'space-around': {
    justifyContent: 'space-around',
  },
  'space-between': {
    justifyContent: 'space-between',
  },
  'space-evenly': {
    justifyContent: 'space-evenly',
  },
  start: {
    justifyContent: 'flex-start',
  },
});

const flexWrapStyles = stylex.create({
  nowrap: {
    flexWrap: 'nowrap',
  },
  wrap: {
    flexWrap: 'wrap',
  },
  'wrap-reverse': {
    flexWrap: 'wrap-reverse',
  },
});

export function webFlexbox({
  alignContent,
  alignItems,
  display = 'flex',
  direction,
  justifyContent,
  gap,
  columnGap,
  rowGap,
  wrap,
}) {
  columnGap = columnGap ? columnGap : gap;
  rowGap = rowGap ? rowGap : gap;

  return [
    alignContent && alignContentStyles[alignContent],
    alignItems && alignItemsStyles[alignItems],
    displayStyles[display],
    direction && flexDirectionStyles[direction],
    justifyContent && justifyContentStyles[justifyContent],
    columnGap && columnGapStyles[columnGap],
    rowGap && rowGapStyles[rowGap],
    wrap && flexWrapStyles[wrap],
  ];
}
