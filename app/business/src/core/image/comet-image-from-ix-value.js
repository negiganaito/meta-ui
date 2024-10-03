import React, { forwardRef } from 'react';
import { jsx } from 'react/jsx-runtime';
import { RecoverableViolationWithComponentStack } from '@meta-core/error/recoverable-violation-with-component-stack';
import { coerceImageishSprited } from '@meta-core/react-utils/coerce-imageish-sprited';
import { coerceImageishURL } from '@meta-core/react-utils/coerce-imageish-URL';
import { CometVisualCompletionAttributes } from '@meta-core/react-utils/comet-visual-completion-attributes';
import { xplatToDOMRef } from '@meta-core/react-utils/xplat-to-dom-ref';
import { testID } from '@meta-core/utils/test-id';
import stylex from '@stylexjs/stylex';

import { BaseImage } from './base-image';
import { CometSSRBackgroundImageUtils } from './comet-ssr-background-image-utils';

// type CometImageFromIXValueProps = {
//   alt?: string
//   objectFit?: string
//   source?: any
//   xstyle?: string
//   testid?: string
// }

export const CometImageFromIXValue = forwardRef((props, ref) => {
  // eslint-disable-next-line no-unused-vars
  const { alt = '', isDecorative, objectFit, source, testid, xstyle } = props;

  CometSSRBackgroundImageUtils.processSpritedImagesForSSRPreload(source);

  const spriteImageish = coerceImageishSprited(source);

  if (spriteImageish) {
    const classes = stylex(xstyle);

    return jsx('i', {
      // c('CometVisualCompletionAttributes').CSS_IMG,
      // c('testID')(i),
      'aria-hidden': isDecorative,
      ...CometVisualCompletionAttributes.CSS_IMG,
      ...testID(testid),
      'aria-label': alt === '' ? null : alt,
      className:
        spriteImageish.type === 'css'
          ? classes !== ''
            ? String(spriteImageish.className) + classes
            : spriteImageish.className
          : classes,
      ref,
      role: alt === '' ? null : 'img',
      style: spriteImageish.type === 'cssless' ? spriteImageish.style : undefined,
    });
  }

  const imageOption = coerceImageishURL(source);

  if (imageOption) {
    const { height, width, uri } = imageOption;

    return jsx(BaseImage, {
      alt,
      draggable: false,
      height: objectFit === 'cover' ? '100%' : height,
      objectFit,
      ref: xplatToDOMRef.xplatToDOMRef(ref),
      src: uri,
      testid: undefined,
      width: objectFit === 'cover' ? '100%' : width,
      xstyle,
    });
  }

  return (
    <RecoverableViolationWithComponentStack
      errorMessage="asset provided to CometImageFromIXValue cannot be transformed by Haste"
      projectName="comet_ui"
    />
  );

  // return jsx(RecoverableViolationWithComponentStack, {
  //   errorMessage:
  //     "asset provided to CometImageFromIXValue cannot be transformed by Haste",
  //   projectName: "comet_ui",
  // });
});

CometImageFromIXValue.displayName = 'CometImageFromIXValue.react';
