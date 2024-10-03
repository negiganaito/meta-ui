import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import { BaseChameleonThemeContext } from '@meta-core/contexts/base-chameleon-theme-context';
import { BasePortalTargetContext } from '@meta-core/contexts/base-portal-target-context';
import { useStable } from '@meta-core/hooks/use-stable';
import { BaseThemeProvider } from '@meta-core/theme/base-theme-provider';
import { suspendOrThrowIfUsedInSSR } from '@meta-core/unknown/suspend-or-throw-if-used-in-ssr';
import stylex from '@stylexjs/stylex';
import executionEnvironment from 'fbjs/lib/ExecutionEnvironment';

import { BaseDOMContainer } from './base-dom-container';

export const BasePortal = (props) => {
  const { children, xstyle, hidden = false, target } = props;

  const basePortalTargetContext = useContext(BasePortalTargetContext);

  let chameleon = useContext(BaseChameleonThemeContext);

  const domNode = target || basePortalTargetContext;
  const providerValue = useStable(() => {
    executionEnvironment.canUseDOM ? document.createElement('div') : null;
  });

  suspendOrThrowIfUsedInSSR('BasePortal: Portals are not currently supported by the server renderer.');

  return domNode
    ? createPortal(
        <BaseThemeProvider>
          {(themeClasses, themeStyle) => (
            <div
              {...(hidden && { hidden: true })}
              className={stylex(themeClasses, chameleon.classNames, xstyle)}
              style={themeStyle}
            >
              <BasePortalTargetContext.Provider value={providerValue}>{children}</BasePortalTargetContext.Provider>
              <BaseDOMContainer node={providerValue} />
            </div>
          )}
        </BaseThemeProvider>,
        domNode,
      )
    : undefined;
};
