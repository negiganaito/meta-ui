export function createGeoPrivateDataVizTheme(theme) {
  function selectCategoricalColor(b) {
    const { color, variant = 'default' } = b;
    return theme.categorical_color[color][variant];
  }

  function selectFill(b) {
    const { context } = b;
    return theme.fill[context];
  }

  function selectFont(b) {
    const { context } = b;
    return {
      fontFamily: theme.font.family,
      fontSize: theme.font.size[context].font_size,
      lineHeight: theme.font.size[context].line_height,
    };
  }

  function selectPalette(b) {
    const { isDeemphasized = false, type } = b;
    return theme.palette[type][isDeemphasized ? 'deemphasized' : 'default'];
  }

  function selectRadius(b) {
    const { density } = b;
    return theme.radius[density];
  }

  function selectStroke(b) {
    const { path } = b;
    return theme.stroke[path];
  }

  function selectStrokeWidth(b) {
    const { density } = b;
    return theme.stroke_width[density];
  }

  function selectTextColor(b) {
    const { context } = b;
    return theme.text_color[context];
  }

  return {
    selectCategoricalColor,
    selectFill,
    selectFont,
    selectPalette,
    selectRadius,
    selectStroke,
    selectStrokeWidth,
    selectTextColor,
  };
}
