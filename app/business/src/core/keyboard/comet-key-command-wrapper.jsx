import React from 'react';

import { CometKeyCommandWidget } from './comet-key-command-widget';

export const CometKeyCommandWrapper = (props) => {
  const { children, ...rest } = props;

  return <CometKeyCommandWidget.Wrapper {...rest} children={children} />;
};
