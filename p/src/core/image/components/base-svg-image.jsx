import React, { useEffect, useRef } from 'react';

export const BaseSvgImage = ({ onError, src, testid, ...rest }) => {
  let imageRef = useRef(null);
  let srcRef = useRef(src);

  const _onError = () => {
    onError && onError();
  };
  const _onLoad = () => {};

  useEffect(() => {
    imageRef.current &&
      imageRef.current.getAttribute('xlink:href') !== srcRef.current &&
      imageRef.current.setAttribute('xlink:href', srcRef.current);
  }, [imageRef, srcRef]);

  return (
    <image
      {...rest}
      data-testid={undefined}
      // eslint-disable-next-line react/no-unknown-property
      onError={_onError}
      // eslint-disable-next-line react/no-unknown-property
      onLoad={_onLoad}
      preserveAspectRatio="xMidYMid slice"
      ref={imageRef}
      width="100%"
      xlinkHref={src}
    />
  );
};

BaseSvgImage.displayName = 'BaseSvgImage';
