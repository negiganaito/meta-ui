import React from 'react';
import { BaseViewportMarginsContext } from '@meta-ui/core/contexts';
import { CometContextualLayerAnchorRoot } from '@meta-ui/core/contextual';
import { BaseDocumentScrollView } from '@meta-ui/core/layout';
import { CometPlaceholder } from '@meta-ui/core/placeholder';
import stylex from '@stylexjs/stylex';

import { CometRootContainer } from './comet-root-container';

const rect = {
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
};

const styles = stylex.create({
  root: {
    // x78zum5 xdt5ytf xg6iff7 x1n2onr6
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    position: 'relative',
  },
});

export const BusinessCometMainContentWrapper = ({ children, ...rest }) => {
  return (
    <BaseDocumentScrollView {...rest}>
      <CometRootContainer>
        <BaseViewportMarginsContext.Provider value={rect}>
          <div className={styles.root}>
            <CometContextualLayerAnchorRoot>
              <CometPlaceholder fallback={<div />}>{children}</CometPlaceholder>
            </CometContextualLayerAnchorRoot>
          </div>
        </BaseViewportMarginsContext.Provider>
      </CometRootContainer>
    </BaseDocumentScrollView>
  );
};
