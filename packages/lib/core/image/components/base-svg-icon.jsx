import { useContext } from 'react';
import { jsx } from 'react/jsx-runtime';
import { BaseIsDecorativeContext } from '@meta-core/contexts';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  color: (color) => ({
    color: color,
  }),
});

export function BaseSVGIcon({ alt, xstyle, color, icon, size = 8 }) {
  const ah = useContext(BaseIsDecorativeContext) === true ? true : undefined;

  return jsx(icon, {
    'aria-hidden': ah,
    height: size,
    title: !alt || alt === '' ? undefined : alt,
    width: size,
    ...stylex.props([color && styles.color(color), xstyle]),
  });
}
