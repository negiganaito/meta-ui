import React, { forwardRef } from 'react';
import { jsx } from 'react/jsx-runtime';
import { RecoverableViolationWithComponentStack } from '@meta-ui/core/error';
import {
  coerceImageishSprited,
  coerceImageishURL,
  CometVisualCompletionAttributes,
  xplatToDOMRef,
} from '@meta-ui/core/react-utils';
import { testID } from '@meta-ui/core/utils';
import stylex from '@stylexjs/stylex';

import { CometSSRBackgroundImageUtils } from '../utils/comet-ssr-background-image-utils';

import { BaseImage } from './base-image';

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
