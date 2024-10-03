import React from 'react';
import { BaseViewportMarginsContext } from '@meta-core/contexts/base-viewport-margins-context';
import { CometContextualLayerAnchorRoot } from '@meta-core/contextual/comet-contextual-layer-anchor-root';
import { BaseDocumentScrollView } from '@meta-core/layout/base-document-scroll-view';
import { CometPlaceholder } from '@meta-core/placeholder/comet-placeholder';
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
