/* eslint-disable no-unused-vars */

import React, { forwardRef, useContext } from 'react';
import { CometColumnContext } from '@meta-core/contexts';
import { CometErrorBoundary } from '@meta-core/error';
import { CometPlaceholder } from '@meta-core/placeholder';
import { stylexCompose } from '@meta-core/styles';
import stylex from '@stylexjs/stylex';
import UserAgent from 'fbjs/lib/UserAgent';

import { BaseView } from './base-view';

const isIE11 = UserAgent.isBrowser('IE >= 11');

// eslint-disable-next-line complexity
/**
 * @param {import("./types").CometColumnItemProps} props - The props for the component.
 */
const _CometColumnItem = (props, ref) => {
  const contextValues = useContext(CometColumnContext) ?? {};

  const align = !props.align ? contextValues.align ?? 'stretch' : props.align;

  const {
    children,
    expanding = false,
    fallback,
    paddingTop,
    paddingVertical = 0,
    placeholder,
    verticalAlign = 'top',
    align: _align,
    paddingHorizontal: _paddingHorizontal,
    ...rest
  } = props;

  const paddingHorizontal =
    _paddingHorizontal === undefined ? contextValues.paddingHorizontal ?? 0 : _paddingHorizontal;

  const stylesObj = stylexCompose.compose(props.xstyle);

  let _children = (
    <>
      {contextValues.hasDividers === true && (
        <BaseView
          role="seperator"
          xstyle={[
            styles.divider,
            spacingStyles[contextValues.paddingHorizontal ?? 0],
            contextValues.spacing && styles.dividerMargin,
          ]}
        />
      )}
      <BaseView
        {...rest}
        ref={ref}
        xstyle={[
          styles.root,
          // TODO 29/05/2024
          // expanding && [styles.expanding, isIE11 && styles.expandingIE11],
          expanding && styles.expanding,
          align !== 'stretch' && alignStyles[align],
          verticalAlign !== 'top' && justifyContentStyles[verticalAlign],
          paddingHorizontalStyles[paddingHorizontal],
          paddingStyles[paddingVertical],
          paddingTop && paddingTopStyles[paddingTop],

          contextValues.spacing !== undefined && [
            marginStyles[contextValues.spacing],
            !stylesObj.marginBottom && styles.marginLastChild,
            !stylesObj.marginTop && styles.marginFirstChild,
          ],

          // contextValues.spacing && marginStyles[contextValues.spacing],
          // contextValues.spacing &&
          //   !stylesObj.marginBottom &&
          //   styles.marginLastChild,
          // contextValues.spacing &&
          //   !stylesObj.marginTop &&
          //   styles.marginFirstChild,

          props.xstyle,
        ]}
      >
        <CometColumnContext.Provider value={null}>{children}</CometColumnContext.Provider>
      </BaseView>
    </>
  );

  if (fallback) {
    // eslint-disable-next-line no-unused-vars
    const { fallback: _fallback, ...propsRest } = props;

    if (!fallback) {
      _children = <CometErrorBoundary>{_children}</CometErrorBoundary>;
    } else {
      _children = (
        <CometErrorBoundary
          // eslint-disable-next-line react/no-unstable-nested-components
          fallback={(a, c) => {
            return (
              <CometColumnItem {...propsRest} ref={ref}>
                {typeof fallback === 'function' ? fallback(a, c) : fallback}
              </CometColumnItem>
            );
          }}
        >
          {_children}
        </CometErrorBoundary>
      );
    }
  }

  if (placeholder) {
    const { placeholder: _placeholder, ...propsRest } = props;

    _children = (
      <CometPlaceholder
        fallback={
          placeholder ? (
            <CometColumnItem {...propsRest} ref={ref}>
              {placeholder}
            </CometColumnItem>
          ) : undefined
        }
      >
        {_children}
      </CometPlaceholder>
    );
  }

  return _children;
};

const CometColumnItemWithFR = forwardRef(_CometColumnItem);

export const CometColumnItem = CometColumnItemWithFR;

const styles = stylex.create({
  divider: {
    borderTopColor: 'var(--divider)',
    borderTopStyle: 'solid',
    borderTopWidth: '1px',

    // eslint-disable-next-line @stylexjs/valid-styles
    ':first-child': {
      display: 'none',
    },
  },
  dividerMargin: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':first-child:empty + *': {
      marginTop: 0,
    },
  },
  expanding: {
    flexBasis: '100%',
    flexGrow: 1,
    flexShrink: 1,
    minHeight: 0,
  },
  expandingIE11: {
    flexBasis: 'auto',
  },
  marginFirstChild: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':first-child': {
      marginTop: 0,
    },
    // marginTop: {
    //   default: null,
    //   ":first-child": 0,
    // },
  },
  marginLastChild: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':last-child': {
      marginBottom: 0,
    },
    // marginBottom: {
    //   default: null,
    //   ":last-child": 0,
    // },
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    maxWidth: '100%',
  },
});

const alignStyles = stylex.create({
  center: {
    alignItems: 'center',
  },
  end: {
    alignItems: 'flex-end',
  },
  start: {
    alignItems: 'flex-start',
  },
});

const paddingHorizontalStyles = stylex.create({
  4: {
    paddingLeft: '4px',
    paddingRight: '4px',
  },
  8: {
    paddingLeft: '8px',
    paddingRight: '8px',
  },
  12: {
    paddingLeft: '12px',
    paddingRight: '12px',
  },
  16: {
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  20: {
    paddingLeft: '20px',
    paddingRight: '20px',
  },
});

const paddingTopStyles = stylex.create({
  0: {
    paddingTop: 0,
  },
  4: {
    paddingTop: '4px',
  },
  8: {
    paddingTop: '8px',
  },
  12: {
    paddingTop: '12px',
  },
  16: {
    paddingTop: '16px',
  },
  20: {
    paddingTop: '20px',
  },
  40: {
    paddingTop: '40px',
  },
});

const paddingStyles = stylex.create({
  4: {
    paddingTop: '4px',
    paddingBottom: '4px',
  },
  8: {
    paddingTop: '8px',
    paddingBottom: '8px',
  },
  12: {
    paddingTop: '12px',
    paddingBottom: '12px',
  },
  16: {
    paddingTop: '16px',
    paddingBottom: '16px',
  },
  20: {
    paddingTop: '20px',
    paddingBottom: '20px',
  },
  40: {
    paddingTop: '40px',
    paddingBottom: '40px',
  },
});

const marginStyles = stylex.create({
  4: {
    marginTop: '2px',
    marginBottom: '2px',
  },
  8: {
    marginTop: '4px',
    marginBottom: '4px',
  },
  12: {
    marginTop: '6px',
    marginBottom: '6px',
  },
  16: {
    marginTop: '8px',
    marginBottom: '8px',
  },
  20: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  24: {
    marginTop: '12px',
    marginBottom: '12px',
  },
  32: {
    marginTop: '16px',
    marginBottom: '16px',
  },
  40: {
    marginTop: '20px',
    marginBottom: '20px',
  },
});

const justifyContentStyles = stylex.create({
  bottom: {
    justifyContent: 'flex-end',
  },
  center: {
    justifyContent: 'center',
  },
  'space-between': {
    justifyContent: 'space-between',
  },
});

const spacingStyles = stylex.create({
  4: {
    marginLeft: '4px',
    marginRight: '4px',
  },
  8: {
    marginLeft: '8px',
    marginRight: '8px',
  },
  12: {
    marginLeft: '12px',
    marginRight: '12px',
  },
  16: {
    marginLeft: '16px',
    marginRight: '16px',
  },
  20: {
    marginLeft: '20px',
    marginRight: '20px',
  },
});
