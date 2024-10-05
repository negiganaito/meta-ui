import React, { Fragment, Suspense, useCallback } from 'react';
import { CometErrorBoundary } from '@meta-core/error/comet-error-boundary';
import { RecoverableViolationWithComponentStack } from '@meta-core/error/recoverable-violation-with-component-stack';
import { CometPlaceholder } from '@meta-core/placeholder/comet-placeholder';
import { HeroPlaceholderUtils } from '@meta-core/placeholder/hero-placeholder-utils';

function handleSuspenseCallback(a) {
  const description = HeroPlaceholderUtils.createThenableDescription(a) || '';
  RecoverableViolationWithComponentStack(
    'Top level suspense boundary triggered, a component suspended outside of a CometPlaceholder, description: ' +
      description,
    'comet_infra',
  );
}

export function CometPlatformAppWrapper({
  KeyboardSettingsStateProvider,
  UncaughtErrorFallback,
  children,
  disableTimeSpentLogging = false,
}) {
  const KeyboardProvider = KeyboardSettingsStateProvider || Fragment;

  const fallbackRender = useCallback(() => {
    return !UncaughtErrorFallback ? null : (
      <CometPlaceholder fallback={null}>
        <UncaughtErrorFallback />
      </CometPlaceholder>
    );
  }, [UncaughtErrorFallback]);

  return (
    <CometErrorProjectContext.Provider value="comet_root">
      <Suspense fallback={null} suspenseCallback={handleSuspenseCallback}>
        <CometErrorBoundary
          context={{ project: 'comet_platform_root_boundary' }}
          fallback={fallbackRender}
          type="fatal"
        >
          <CometSSRMultipassBoundary>
            <KeyboardProvider>
              <TopLevelKeyCommandListener>
                <CometTransientDialogProvider>
                  <CometAccessibilityAlertProvider>{children}</CometAccessibilityAlertProvider>
                  <CometSetKeyCommandWrapperDialogs />
                </CometTransientDialogProvider>
              </TopLevelKeyCommandListener>
            </KeyboardProvider>
            {/* {!disableTimeSpentLogging && !shouldUseNonReactTSListeners && <CometTimeSpentEventListener />} */}
          </CometSSRMultipassBoundary>
        </CometErrorBoundary>
      </Suspense>
    </CometErrorProjectContext.Provider>
  );
}
