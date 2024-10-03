/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useContext, useMemo } from 'react';
import { BaseContextualLayerOrientationContext } from '@meta-core/contexts/base-contextual-layer-orientation-context';
import { CometErrorBoundary } from '@meta-core/error/comet-error-boundary';
import { unrecoverableViolation } from '@meta-core/error/unrecoverable-violation';
import { FocusRegionStrictMode } from '@meta-core/focus/focus-region-strict-mode';
import { focusScopeQueries } from '@meta-core/focus/focus-scope-queries';
import { useOnOutsideClick } from '@meta-core/hooks/use-on-outside-click';
import { useVisibilityObserver } from '@meta-core/hooks/use-visibility-observer';
import { fbicon } from '@meta-core/image/fb-icon';
import { FDSIcon } from '@meta-core/image/fds-icon';
import { ix } from '@meta-core/image/ix';
import { BaseRow } from '@meta-core/layout/base-row';
import { BaseRowItem } from '@meta-core/layout/base-row-item';
import { BaseView } from '@meta-core/layout/base-view';
import { CometColumn } from '@meta-core/layout/comet-column';
import { CometColumnItem } from '@meta-core/layout/comet-column-item';
import { FDSTextPairing } from '@meta-core/text/fds-text-pairing';
import stylex from '@stylexjs/stylex';

import { CometHideLayerOnEscape } from './comet-hide-layer-on-escape';
import { FDSCalloutEdge } from './fds-callout-edge';
import { FDSCalloutInset } from './fds-callout-inset';

export const FDSCallout = ({
  arrowStyle = 'none',
  calloutID,
  content,
  contentID,
  disableAutoFocus = false,
  onClose,
  onHide,
  onOutsideClick,
  onShow,
  titleID,
  type = 'default',
  xstyle,
  addOn,
  'aria-label': al,
  hasCloseButton = true,
  title,
}) => {
  const { position } = useContext(BaseContextualLayerOrientationContext);

  const onOutsideClickRef = useOnOutsideClick(onOutsideClick);

  const visibilityObserver = useVisibilityObserver({
    onHidden: onHide,
    onVisible: onShow,
  });

  const colorType = type === 'default' ? 'primary' : 'white';

  if (position === 'end' && (arrowStyle === 'inset' || arrowStyle === 'edge')) {
    throw unrecoverableViolation('"end" position with arrow is not supported yet', 'comet_ui');
  }

  let ariaProps = useMemo(() => {
    return title
      ? {
          'aria-describedby': contentID,
          'aria-labelledby': titleID,
        }
      : {
          'aria-describedby': contentID,
          'aria-label': al,
        };
  }, [al, contentID, title, titleID]);

  const calloutContent = (
    <CometColumn>
      <CometColumnItem>
        <BaseRow>
          <BaseRowItem expanding ref={visibilityObserver} verticalAlign="center" xstyle={styles.item}>
            <FDSTextPairing
              body={content}
              bodyColor={colorType}
              bodyId={contentID}
              headline={title}
              headlineColor={colorType}
              headlineId={titleID}
              isSemanticHeading={true}
              level={3}
            />
          </BaseRowItem>
          {hasCloseButton && (
            <BaseRowItem xstyle={[styles.crossoutButton, styles.item]}>
              <FDSIcon
                aria-label="Close"
                color={type === 'default' ? 'secondary' : 'white'}
                icon={fbicon._(ix(478232), 16)}
                onPress={onClose}
                size={16}
              />
            </BaseRowItem>
          )}
        </BaseRow>
      </CometColumnItem>
      {!addOn ? null : (
        <CometColumnItem paddingTop={12}>
          <BaseRow>
            <BaseRowItem expanding verticalAlign="center" xstyle={styles.item}>
              {addOn}
            </BaseRowItem>
          </BaseRow>
        </CometColumnItem>
      )}
    </CometColumn>
  );

  if (arrowStyle === 'inset') {
    return (
      <FDSCalloutInset
        {...ariaProps}
        disableAutoFocus={disableAutoFocus}
        id={calloutID}
        onClose={onClose}
        onOutsideClick={onOutsideClick}
        type={type}
        xstyle={xstyle}
        children={calloutContent}
      />
    );
  }

  return arrowStyle === 'edge' ? (
    <FDSCalloutEdge
      {...ariaProps}
      disableAutoFocus={disableAutoFocus}
      id={calloutID}
      onClose={onClose}
      onOutsideClick={onOutsideClick}
      type={type}
      xstyle={xstyle}
    />
  ) : (
    <CometErrorBoundary
      // eslint-disable-next-line react/no-unstable-nested-components
      fallback={() => {
        return <div />;
      }}
    >
      <BaseView {...ariaProps} id={calloutID ?? undefined} role="dialog" xstyle={styles.container}>
        <FocusRegionStrictMode.FocusRegion
          autoFocusQuery={disableAutoFocus ? undefined : focusScopeQueries.tabbableScopeQuery}
        >
          <CometHideLayerOnEscape onHide={onClose}>
            <BaseRow
              ref={onOutsideClickRef}
              xstyle={[
                styles.content,
                colorsStyles[type],
                arrowStyle === 'none' && arrowPositionsStyles[position],
                xstyle,
              ]}
            >
              {calloutContent}
            </BaseRow>
          </CometHideLayerOnEscape>
        </FocusRegionStrictMode.FocusRegion>
      </BaseView>
    </CometErrorBoundary>
  );
};

const styles = stylex.create({
  container: {
    display: 'flex',
  },
  content: {
    backgroundColor: 'var(--overlay-alpha-80)',
    borderRadius: '8px',
    borderWidth: '1px',
    boxShadow: '0 8px 16px var(--shadow-1)',
    paddingLeft: '12px',
    paddingRight: '12px',
    paddingTop: '16px',
    paddingBottom: '16px',
  },
  crossoutButton: {
    marginRight: '-4px',
    marginTop: '-8px',
  },
  item: {
    paddingLeft: '6px',
    paddingRight: '6px',
    paddingTop: '6px',
    paddingBottom: '6px',
  },
});

const colorsStyles = stylex.create({
  accent: {
    backgroundColor: 'var(--accent)',
  },
  default: {
    backgroundColor: 'var(--popover-background)',
  },
});

const arrowPositionsStyles = stylex.create({
  above: {
    marginBottom: '4px',
  },
  below: {
    marginTop: '4px',
  },
  end: {
    marginLeft: '4px',
  },
  start: {},
});
