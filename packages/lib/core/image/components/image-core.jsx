import { forwardRef } from 'react';
import { jsx } from 'react/jsx-runtime';
import { coerceImageishSprited, coerceImageishURL, getImageSourceURLFromImageish, URI } from '@meta-core/react-utils';
import { CometVisualCompletionAttributes } from '@meta-core/react-utils/comet-visual-completion-attributes';
import { warnUnsupportedProp } from '@meta-core/utils';
import joinClasses from 'fbjs/lib/joinClasses';

function coerceToStringIfURI(value) {
  return value instanceof URI ? value.toString() : value;
}

const ImageRenderer = (props) => {
  const { forwardedRef, ...rest } = props;

  const className = joinClasses(rest.className, 'img');
  const src = coerceToStringIfURI(rest.src);

  if (!src) {
    return jsx('img', { ...rest, className, ref: forwardedRef });
  }

  const spritedImage = coerceImageishSprited();

  const altTextElement =
    !!spritedImage && rest.alt && String(rest.alt) !== '' ? jsx('u', { children: rest.alt }) : null;

  if (typeof src === 'string') {
    return jsx('img', { ...rest, className: className, ref: forwardedRef, src: src, children: altTextElement });
  }

  if (spritedImage) {
    rest.src;
    // let h = rest.style;
    const { style, ...restWithoutSrcStyle } = rest;

    return jsx('i', {
      ...restWithoutSrcStyle,
      ...CometVisualCompletionAttributes.CSS_IMG,
      className: joinClasses(className, spritedImage.type === 'css' ? spritedImage.className : undefined),
      ref: forwardedRef,
      style: spritedImage.type === 'cssless' ? { ...style, ...spritedImage.style } : style,
      children: altTextElement,
    });
  }

  const imageSourceURL = getImageSourceURLFromImageish(src);
  const coercedImage = coerceImageishURL(src);

  return rest.width === void 0 && rest.height === void 0 && coercedImage
    ? jsx('img', {
        ...rest,
        className,
        height: coercedImage.height,
        src: imageSourceURL,
        ref: forwardedRef,
        width: coercedImage.width,
        children: altTextElement,
      })
    : jsx('img', { ...rest, className: className, ref: forwardedRef, src: imageSourceURL, children: altTextElement });
};

export const ImageCore = forwardRef((props, ref) => {
  // Object.prototype.hasOwnProperty.call(props, 'source') &&
  //   warnUnsupportedProp('ImageCore', 'source', 'Did you mean `src`?');

  if (props.source) {
    warnUnsupportedProp('ImageCore', 'source', 'Did you mean `src`?');
  }

  return jsx(ImageRenderer, { ...props, alt: props.alt === undefined ? '' : props.alt, forwardedRef: ref });
});
