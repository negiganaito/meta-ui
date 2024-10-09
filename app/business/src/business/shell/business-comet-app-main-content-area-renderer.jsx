import React from 'react';
import stylex from '@stylexjs/stylex';

import { BusinessCometMainContentWrapper } from './business-comet-main-content-wrapper';
import { CometMainRoutes } from './comet-main-routes';

const styles = stylex.create({
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 'calc(-100vh + var(--header-height))',
    minHeight: 'inherit',
    position: 'relative',
    zIndex: 'unset',
  },
  contentContainerHidden: {
    display: 'none',
  },
  contentContainerVisibilityHidden: {
    visibility: 'hidden',
  },
});

export const BusinessCometAppMainContentAreaRenderer = ({ children }) => {
  // const context = useContext(CometRouterPushViewStackContext);

  // const onInitialScroll = useMemo(() => {
  //   return function (a, b) {
  //     CometVisualCompletion.setInitialScrollY(b);
  //   };
  // }, []);

  return (
    <BusinessCometMainContentWrapper>
      <CometMainRoutes
        contentXStyleProvider={({ isHidden, tabVisibilityHidden }) => {
          return [
            styles.contentContainer,
            isHidden && tabVisibilityHidden !== !0 && styles.contentContainerHidden,
            isHidden && tabVisibilityHidden === !0 && styles.contentContainerVisibilityHidden,
          ];
        }}
      >
        {children}
      </CometMainRoutes>
    </BusinessCometMainContentWrapper>
  );
};
