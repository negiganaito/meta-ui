import React, { forwardRef, useEffect, useMemo, useRef } from 'react';
import { mergeRefs } from '@fb-hook/use-merge-refs.legacy';
import { RecoverableViolationWithComponentStack } from '@meta-ui/core/error';
import stylex from '@stylexjs/stylex';
import executionEnvironment from 'fbjs/lib/ExecutionEnvironment';

import { CometSSRPreloadImageCollection } from '../utils/comet-ssr-preload-image-collection';

const styles = stylex({
  contain: {
    objectFit: 'contain',
  },
  cover: {
    objectFit: 'cover',
  },
  fill: {
    objectFit: 'fill',
  },
});

export const BaseImage = forwardRef((props, ref) => {
  const {
    alt = '',
    'aria-labelledby': al,
    elementtiming,
    objectFit = 'none',
    onLoad,
    referrerPolicy = 'origin-when-cross-origin',
    sizes,
    src,
    srcSet,
    // eslint-disable-next-line no-unused-vars
    testid,
    xstyle,
    ...rest
  } = props;

  const localRef = useRef(null);
  const _ref = useMemo(() => {
    return mergeRefs(localRef, ref);
  }, [localRef, ref]);

  !executionEnvironment.canUseDOM && src && CometSSRPreloadImageCollection.addImage(src);

  useEffect(() => {
    onLoad && localRef.current && localRef.current.complete && onLoad();
  }, [onLoad]);

  if (src === '') {
    return (
      <RecoverableViolationWithComponentStack errorMessage="Invalid src provided to image" projectName="comet_ui" />
    );
  } else {
    return (
      <img
        {...rest}
        alt={alt}
        aria-labelledby={al}
        className={stylex(styles[objectFit], xstyle)}
        // eslint-disable-next-line react/no-unknown-property
        elementtiming={elementtiming}
        onLoad={onLoad}
        ref={_ref}
        referrerPolicy={referrerPolicy}
        sizes={sizes}
        src={src}
        srcSet={srcSet}
      />
    );
  }

  // return src === ""
  //   ? jsx(RecoverableViolationWithComponentStack, {
  //       errorMessage: "Invalid src provided to image",
  //       projectName: "comet_ui",
  //     })
  //   : jsx("img", {
  //       ...rest,
  //       alt,
  //       "aria-labelledby": al,
  //       // className:
  //       //   objectFit === 'none' && className == null
  //       //     ? void 0
  //       //     : mergeClasses(
  //       //         objectFit !== 'none' && classes[objectFit],
  //       //         className
  //       //       ),

  //       className: stylex(styles[objectFit], xstyle),
  //       elementtiming,
  //       onLoad,
  //       ref: _ref,
  //       referrerPolicy,
  //       sizes,
  //       src,
  //       srcSet,
  //     });
});
