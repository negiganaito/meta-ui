import React from 'react';
import { useKeyCommands } from '@meta-core/hooks/use-key-commands';
import stylex from '@stylexjs/stylex';

import { CometKeyCommandWrapper } from './comet-key-command-wrapper';

const styles = stylex.create({
  displayInherit: {
    display: 'inherit',
  },
  inherit: {
    alignContent: 'inherit',
    alignItems: 'inherit',
    flexDirection: 'inherit',
    flexGrow: 'inherit',
    flexShrink: 'inherit',
    height: 'inherit',
    justifyContent: 'inherit',
    maxHeight: 'inherit',
    maxWidth: 'inherit',
    minHeight: 'inherit',
    minWidth: 'inherit',
    position: 'relative',
    width: 'inherit',
  },
});

function UseKeyCommandHandler(props) {
  useKeyCommands(props.commandConfigs);
  return null;
}

export const CometComponentWithKeyCommands = (props) => {
  const { children, commandConfigs, elementType, xstyle, ...rest } = props;

  const className = elementType === 'span' ? styles.inherit : [styles.inherit, styles.displayInherit];

  return (
    <CometKeyCommandWrapper elementType={elementType} xstyle={xstyle ?? className} {...rest}>
      <UseKeyCommandHandler commandConfigs={commandConfigs} />
      {children}
    </CometKeyCommandWrapper>
  );
};
