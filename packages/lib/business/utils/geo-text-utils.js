/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  truncate: {
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    overflowY: 'hidden',
    textOverflow: 'ellipsis',
  },
});

function getTextTruncateStyle() {
  return styles.truncate;
}

function getAriaLevelForSize(ariaLevel) {
  switch (ariaLevel) {
    case 'header1':
      return 1;
    case 'header2':
      return 2;
    case 'header3':
      return 3;
    case 'header4':
      return 4;
    default:
      return void 0;
  }
}

function getPairingTextSize(size) {
  switch (size) {
    case 'value':
    case 'header4':
      return 'valueDescription';
    case 'data':
      return 'header2';
    default:
      return 'value';
  }
}

function getPairingTextProps(props) {
  let size = props.size;
  let display = props.display === undefined ? 'block' : props.display;

  let textProps = {
    color: 'heading',
    display: display,
    size: 'value',
    weight: 'normal',
  };

  textProps.size = getPairingTextSize(size);
  if (size === 'data') {
    textProps.weight = 'bold';
  }

  return textProps;
}

function isHeader(header) {
  switch (header) {
    case 'header1':
    case 'header2':
    case 'header3':
    case 'header4':
      return true;
    default:
      return false;
  }
}

function mapHeadingSizeToLevel(size) {
  switch (size) {
    case 'header2':
      return 2;
    case 'header3':
      return 3;
    case 'header4':
      return 4;
    default:
      return 1;
  }
}

function mapHeadingLevelToSize(level) {
  switch (level) {
    case 2:
      return 'header2';
    case 3:
      return 'header3';
    case 4:
      return 'header4';
    default:
      return 'header1';
  }
}

export const GeoTextUtils = {
  getTextTruncateStyle,
  getAriaLevelForSize,
  getPairingTextSize,
  getPairingTextProps,
  isHeader,
  mapHeadingSizeToLevel,
  mapHeadingLevelToSize,
};
