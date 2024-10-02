import stylex from '@stylexjs/stylex';

const core = stylex.create({
  cardContentEndAction: {
    marginTop: '-4px',
    marginBottom: '-4px',
    marginRight: '-8px',
  },
  cardEndAction: {
    marginTop: '-8px',
    marginBottom: '-8px',
    marginRight: '-8px',
  },
  cardAction: {
    marginTop: '-8px',
    marginBottom: '-8px',
  },
  cardStartAction: {
    marginTop: '-8px',
    marginBottom: '-8px',
    marginStart: '-8px',
  },
  popoverCloseButton: {
    marginTop: '-8px',
    marginBottom: '-8px',
    marginRight: '-8px',
  },
  monthYearSelectorHeader: {
    marginTop: '-8px',
    marginBottom: '-8px',
  },
});

export const geoOffset = {
  cardContentEndAction: core.cardContentEndAction,
  cardEndAction: core.cardEndAction,
  cardAction: core.cardAction,
  cardStartAction: core.cardStartAction,
  popoverCloseButton: core.popoverCloseButton,
  monthYearSelectorHeader: core.monthYearSelectorHeader,
};
