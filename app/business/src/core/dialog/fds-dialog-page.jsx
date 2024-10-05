/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from 'react';
import { html } from 'react-strict-dom';
import { FocusInertRegion } from '@meta-core/focus/focus-inert-region';
import { focusScopeQueries } from '@meta-core/focus/focus-scope-queries';
import { BaseHeadingContextWrapper } from '@meta-core/text/base-heading-context-wrapper';
import { BaseScrollableArea } from '@meta-core/unknown/base-scrollable-area';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    minHeight: '50px',
  },
  inert: {
    pointerEvents: 'none',
    userSelect: 'none',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    maxHeight: {
      default: 'calc(100vh - (2 * var(--dialog-anchor-vertical-padding)))',
      '@media (max-width: 679px)': 'none',
    },
    position: 'relative',
  },
  rootFullHeight: {
    minHeight: 'calc(100vh - (2 * var(--dialog-anchor-vertical-padding)))',
  },
  rootMinHeight: {
    minHeight: {
      default: null,
      '@media (max-width: 679px)': '100vh',
    },
  },
  scrollableArea: {
    flexGrow: 1,
    overscrollBehaviorY: 'auto',
  },

  // ==================================================================
  // ==================================================================

  root_LEGACY: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    maxHeight: 'calc(100vh - (2 * var(--dialog-anchor-vertical-padding)))',
    // eslint-disable-next-line @stylexjs/valid-styles
    '@media (max-width: 679px)': {
      maxHeight: 'none',
    },
    position: 'relative',
  },

  rootMinHeight_LEGACY: {
    // eslint-disable-next-line @stylexjs/valid-styles
    '@media (max-width: 679px)': {
      minHeight: '100vh',
    },
  },

  rootFullAndMinHeight_LEGACY: {
    // eslint-disable-next-line @stylexjs/valid-styles
    '@media (max-width: 679px)': {
      minHeight: '100vh',
    },

    // eslint-disable-next-line @stylexjs/valid-styles
    minHeight: 'calc(100vh - (2 * var(--dialog-anchor-vertical-padding)))',
  },
});

export const FDSDialogPage = ({
  children,
  disablePageScroll = false,
  footer,
  header,
  isContentInert = false,
  isFullHeightByDefault = false,
  mobileFullHeight = true,
  pageXStyle,
  scrollAreaRef,
}) => {
  const renderContent = (
    <FocusInertRegion disabled={!isContentInert} focusQuery={focusScopeQueries.tabbableScopeQuery}>
      {/* eslint-disable-next-line react/jsx-pascal-case */}
      <html.div style={[styles.container, isContentInert && styles.inert]}>{children}</html.div>
    </FocusInertRegion>
  );

  return (
    // eslint-disable-next-line react/jsx-pascal-case
    <html.div
      style={[
        styles.root_LEGACY,
        [isFullHeightByDefault && styles.rootFullHeight],
        [mobileFullHeight && children && styles.rootMinHeight_LEGACY],
        [isFullHeightByDefault && mobileFullHeight && children && styles.rootFullAndMinHeight_LEGACY],
        pageXStyle,
      ]}
    >
      {header}
      {children && (
        <BaseHeadingContextWrapper>
          {disablePageScroll ? (
            renderContent
          ) : (
            <BaseScrollableArea
              horizontal={false}
              ref={scrollAreaRef}
              vertical={true}
              withBottomShadow={true}
              withTopShadow={true}
              xstyle={styles.scrollableArea}
            >
              {renderContent}
            </BaseScrollableArea>
          )}
        </BaseHeadingContextWrapper>
      )}
      {footer}
    </html.div>
  );

  // return jsxs(StrictDom.html.div, {
  //   style: [
  //     styles.root,
  //     isFullHeightByDefault && styles.rootFullHeight,
  //     mobileFullHeight && children && styles.rootMinHeight,
  //     pageXStyle,
  //   ],
  //   children: [
  //     header,
  //     children &&
  //       jsx(BaseHeadingContextWrapper, {
  //         children: disablePageScroll
  //           ? renderContent
  //           : jsx(BaseScrollableArea, {
  //               horizontal: false,
  //               ref: scrollAreaRef,
  //               vertical: true,
  //               withBottomShadow: true,
  //               withTopShadow: true,
  //               xstyle: styles.scrollableArea,
  //               children: renderContent,
  //             }),
  //       }),
  //     footer,
  //   ],
  // });
};
