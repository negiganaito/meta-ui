import React, { forwardRef } from 'react';

import { useHeroErrorMetadata } from '../hooks/use-hero-error-metadata';

import { ErrorBoundary } from './error-boundary';

const cometErrorBoundary = (props, ref) => {
  const metadata = useHeroErrorMetadata();

  return <ErrorBoundary {...props} augmentError={metadata} fallback={props.fallback} ref={ref} />;
};

export const CometErrorBoundary = forwardRef(cometErrorBoundary);
