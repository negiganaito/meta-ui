function mapAlign(pos) {
  switch (pos) {
    case 'left':
      return 'start';
    case 'center':
      return 'middle';
    case 'right':
      return 'end';
  }
  throw new Error('Unknown align');
}
function mapPosition(pos) {
  switch (pos) {
    case 'below':
      return 'below';
    case 'above':
      return 'above';
    case 'left':
      return 'start';
    case 'right':
      return 'end';
  }
  throw new Error('Unknown position');
}

export const GeoLayerUtils = { mapAlign, mapPosition };
