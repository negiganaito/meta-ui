import React from 'react';
import { CometLayerKeyCommandWrapper } from '@meta-ui/core/keyboard';
import { HiddenSubtreeContextProvider } from '@meta-ui/core/layout';
import stylex from '@stylexjs/stylex';

// import { CometContentWrapperContext } from "../context/comet-content-wrapper-context";

// function m(a) {
//   return a;
// }

export const CometMainRoute = ({ contentRefProvider, contentStyleProvider, contentXStyleProvider, children }) => {
  // const { mainRoutesWrapper = m } = useContext(CometContentWrapperContext);

  // h = c("useCometRouterState")();
  // if (h == null)
  //   throw c("unrecoverableViolation")(
  //     "Attempting to render main routes without a router state (provided by the CometRouterStateProvider/CometRouterStateContext).",
  //     "comet_infra"
  //   );

  return (
    <HiddenSubtreeContextProvider isBackgrounded={false} isHidden={false}>
      <div
        className={stylex(
          contentXStyleProvider({
            isHidden: false,
            tabVisibilityHidden: undefined,
          }),
        )}
      >
        {/* eslint-disable-next-line no-useless-concat */}
        <CometLayerKeyCommandWrapper debugName={'tab layer for: ' + 'a'}>{children}</CometLayerKeyCommandWrapper>
      </div>
    </HiddenSubtreeContextProvider>
  );
};
