import React, { useContext } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import { CometCompositeStructureContext } from '@meta-core/contexts';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  i1: {
    backgroundColor: 'var(--surface-background)',
    borderColor: 'var(--warning)',
    borderRadius: '3px',
    borderStyle: 'solid',
    borderWidth: '1px',
    height: '8px',
    lineHeight: 0,
    padding: '2px 2px 3px 3px',
    position: 'absolute',
    width: '8px',
    marginTop: '-8px',
    left: '-10px',
    top: '50%',
  },
  i2: {
    backgroundColor: 'var(--surface-background)',
    borderColor: 'var(--warning)',
    borderRadius: '3px',
    borderStyle: 'solid',
    borderWidth: '1px',
    height: '8px',
    lineHeight: 0,
    padding: '2px 2px 3px 3px',
    position: 'absolute',
    width: '8px',
    marginTop: '-8px',
    top: '50%',
    right: '-10px',
  },
  i3: {
    backgroundColor: 'var(--surface-background)',
    borderColor: 'var(--warning)',
    borderRadius: '3px',
    borderStyle: 'solid',
    borderWidth: '1px',
    height: '8px',
    lineHeight: 0,
    padding: '2px 2px 3px 3px',
    position: 'absolute',
    width: '8px',
    marginLeft: '-7px',
    left: '50%',
    top: '-10px',
  },
  i4: {
    backgroundColor: 'var(--surface-background)',
    borderColor: 'var(--warning)',
    borderRadius: '3px',
    borderStyle: 'solid',
    borderWidth: '1px',
    height: '8px',
    lineHeight: 0,
    padding: '2px 2px 3px 3px',
    position: 'absolute',
    width: '8px',
    marginLeft: '-7px',
    left: '50%',
    bottom: '-10px',
  },
});

export const CometCompositeItemFocusIndicator = () => {
  const context = useContext(CometCompositeStructureContext);

  return context.hideArrowSignifiers
    ? null
    : jsxs(React.Fragment, {
        children: [
          context.horizontal === !0
            ? jsxs(React.Fragment, {
                children: [
                  jsx('div', {
                    className: styles.i1,
                    children: jsx(CometIcon, {
                      color: 'primary',
                      icon: fbicon._(ix(1739808), 8),
                    }),
                  }),
                  jsx('div', {
                    className: styles.i2,
                    children: jsx(CometIcon, {
                      color: 'primary',
                      icon: fbicon._(ix(897949), 8),
                    }),
                  }),
                ],
              })
            : null,
          context.vertical
            ? jsxs(React.Fragment, {
                children: [
                  React.jsx('div', {
                    className: styles.i3,
                    children: React.jsx(CometIcon, {
                      color: 'primary',
                      icon: fbicon._(ix(702721), 8),
                    }),
                  }),
                  jsx('div', {
                    className: styles.i4,
                    children: jsx(CometIcon, {
                      color: 'primary',
                      icon: fbicon._(ix(701592), 8),
                    }),
                  }),
                ],
              })
            : null,
        ],
      });
};

CometCompositeItemFocusIndicator.displayName = 'CometCompositeItemFocusIndicator.react';
