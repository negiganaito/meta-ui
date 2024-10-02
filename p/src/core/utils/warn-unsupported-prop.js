export const warnUnsupportedProp = (a, b, d) => {
  return console.warn('%s component does not support prop `%s`.%s', a, b, d ? ' ' + d : '');
};
