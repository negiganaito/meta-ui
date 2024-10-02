import { useGeoTheme } from '@meta-ui/business/theme';
import { GeoTextUtils } from '@meta-ui/business/utils';
import stylex from '@stylexjs/stylex';

const textColorStyles = stylex.create({
  inherit: {
    color: 'inherit',
  },
});

const overflowWrapStyles = stylex.create({
  breakWord: {
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    wordBreak: 'break-word',
  },
  normalOverflowWrap: {
    overflowWrap: 'normal',
  },
});

const fontWeightStyles = stylex.create({
  normal: {
    fontWeight: 'normal',
  },
  bold: {
    fontWeight: 'bold',
  },
  inherit: {
    fontWeight: 'inherit',
  },
});

const textAlignStyles = stylex.create({
  center: {
    textAlign: 'center',
  },
  end: {
    textAlign: 'end',
  },
  start: {
    textAlign: 'start',
  },
});

const whiteSpaceStyles = stylex.create({
  inherit: {
    whiteSpace: 'inherit',
  },
  initial: {
    whiteSpace: 'initial',
  },
  normal: {
    whiteSpace: 'normal',
  },
  nowrap: {
    whiteSpace: 'nowrap',
  },
  pre: {
    whiteSpace: 'pre',
  },
  preLine: {
    whiteSpace: 'pre-line',
  },
  preWrap: {
    whiteSpace: 'pre-wrap',
  },
});

export function useGeoPrivateTextStyle(props) {
  const {
    color = 'value',
    display = 'inline',
    isDisabled = false,
    isInverted = false,
    overflowWrap = 'inherit',
    size = 'value',
    textAlign = 'inherit',
    weight,
    whiteSpace = 'inherit',
  } = props;

  const theme = useGeoTheme();
  const { selectFont, selectTextColor } = theme;

  const whiteSpaceStyle = [
    whiteSpace === 'inherit' && whiteSpaceStyles.inherit,
    whiteSpace === 'initial' && whiteSpaceStyles.initial,
    whiteSpace === 'normal' && whiteSpaceStyles.normal,
    whiteSpace === 'nowrap' && whiteSpaceStyles.nowrap,
    whiteSpace === 'pre' && whiteSpaceStyles.pre,
    whiteSpace === 'pre-line' && whiteSpaceStyles.preLine,
    whiteSpace === 'pre-wrap' && whiteSpaceStyles.preWrap,
  ];

  const textAlignStyle = [
    textAlign === 'center' && textAlignStyles.center,
    textAlign === 'start' && textAlignStyles.start,
    textAlign === 'end' && textAlignStyles.end,
  ];

  return [
    selectFont({ size }),
    color === 'inherit' ? textColorStyles.inherit : selectTextColor({ color, isDisabled, isInverted }),
    whiteSpaceStyle,
    textAlignStyle,
    display === 'truncate' && GeoTextUtils.getTextTruncateStyle(),
    overflowWrap === 'break-word' && overflowWrapStyles.breakWord,
    overflowWrap === 'normal' && overflowWrapStyles.normalOverflowWrap,
    weight !== undefined && fontWeightStyles[weight],
  ];
}
