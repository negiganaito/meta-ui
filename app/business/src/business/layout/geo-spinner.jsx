import { useRef } from 'react';
import { geoMargin } from '@meta-business/styles/geo-margin';
import { GeoBaseText } from '@meta-business/text/geo-base-text';
import { useGeoTheme } from '@meta-business/theme/use-geo-theme';
import { CometVisualCompletionAttributes } from '@meta-core/react-utils/comet-visual-completion-attributes';
import stylex from '@stylexjs/stylex';

import { LoadingMarker } from './loading-marker';

const SMALL_CIRCLE_RADIUS = 14.5;
const LARGE_CIRCLE_RADIUS = 22;
const SMALL_STROKE_WIDTH = 1.5;
const LARGE_STROKE_WIDTH = 2;

const xqng64zB = stylex.keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },

  '100%': {
    transform: 'rotate(360deg)',
  },
});

const styles_ = stylex.create({
  root: {
    // x3nfvp2 x1t137rt
    display: 'inline-flex',
    outlineStyle: 'none',
  },

  d1: {
    // x1ka1v4i x7v9bd0 x1esw782 xa4qsjk xxymvpz
    animationName: xqng64zB,
    animationDuration: '.75s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    verticalAlign: 'middle',
  },

  d2: {
    maxWidth: '100%',
  },
});

export function GeoSpinner({
  center,
  'data-testid': dataTestId,
  description,
  label,
  shade = 'dark',
  size = 'large',
  xstyle,
}) {
  const ref = useRef(null);
  const isCentered = center !== null ? center : Boolean(label);
  const styles = getStyles({ isCentered });

  const [color, descriptionColor] = shade === 'dark' ? ['heading', 'headingDescription'] : ['inverted', 'inverted'];

  return (
    <LoadingMarker nodeRef={ref}>
      <div
        {...CometVisualCompletionAttributes.LOADING_STATE}
        className={stylex(styles, xstyle)}
        data-testid={dataTestId}
        ref={ref}
      >
        <span aria-busy={true} aria-valuetext="Loading" className={styles_.root} role="progressbar">
          <Spinner shade={shade} size={size} />
        </span>
        <div className={styles_.d2}>
          {label && (
            <GeoBaseText
              color={color}
              display="truncate"
              size="header4"
              textAlign="center"
              weight="bold"
              whiteSpace="nowrap"
              xstyle={geoMargin.top12}
            >
              {label}
            </GeoBaseText>
          )}
          {description && (
            <GeoBaseText
              color={descriptionColor}
              display="truncate"
              size="valueDescription"
              textAlign="center"
              whiteSpace="nowrap"
              xstyle={geoMargin.top4}
            >
              {description}
            </GeoBaseText>
          )}
        </div>
      </div>
    </LoadingMarker>
  );
}

function getStyles({ isCentered }) {
  const theme = useGeoTheme();
  const spacing = theme.selectSpacing;
  return [
    s.root,
    isCentered && s.fullSize,
    isCentered && spacing({ bounds: 'internal', context: 'component', target: 'coarse' }),
  ];
}

function Spinner({ shade, size }) {
  const theme = useGeoTheme();
  const strokeColor = theme.selectStrokeColor;
  const barColor = strokeColor({ shade, element: 'bar' });
  const trackColor = strokeColor({ shade, element: 'track' });

  const circleRadius = size === 'small' ? SMALL_CIRCLE_RADIUS : LARGE_CIRCLE_RADIUS;
  const strokeWidth = size === 'small' ? SMALL_STROKE_WIDTH : LARGE_STROKE_WIDTH;
  const viewBoxSize = circleRadius + strokeWidth;
  const halfStrokeWidth = strokeWidth / 2;
  const halfCircleRadius = circleRadius / 2;
  const halfViewBoxSize = viewBoxSize / 2;

  return (
    <svg
      className={stylex(styles_.d1)}
      height={viewBoxSize}
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      width={viewBoxSize}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        className={stylex(trackColor)}
        fill="none"
        height={circleRadius}
        rx={halfCircleRadius}
        strokeWidth={strokeWidth}
        width={circleRadius}
        x={halfStrokeWidth}
        y={halfStrokeWidth}
      />
      <path
        className={stylex(barColor)}
        d={getArcPath(halfViewBoxSize, halfViewBoxSize, halfCircleRadius, 1.5 * Math.PI, (1.5 + 1.25) * Math.PI)}
        fill="none"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function radiansToDegrees(radians) {
  return (radians * 180) / Math.PI;
}

// eslint-disable-next-line max-params
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = degreesToRadians(angleInDegrees);
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

// eslint-disable-next-line max-params
function getArcPath(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, radiansToDegrees(endAngle));
  const end = polarToCartesian(x, y, radius, radiansToDegrees(startAngle));
  const arcSweep = endAngle - startAngle > Math.PI ? '1' : '0';

  return [`M ${start.x} ${start.y}`, `A ${radius} ${radius} 0 ${arcSweep} 0 ${end.x} ${end.y}`].join(' ');
}

const s = stylex.create({
  root: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  fullSize: {
    boxSizing: 'border-box',
    height: '100%',
    width: '100%',
  },
});
