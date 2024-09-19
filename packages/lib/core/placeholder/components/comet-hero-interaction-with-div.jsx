import { forwardRef } from 'react';
import { jsx } from 'react/jsx-runtime';
import { LegacyHidden } from '@meta-core/layout';

export const CometHeroInteractionWithDiv = forwardRef(
  ({ children, className, hidden, htmlAttributes, pageletAriaProps }, ref) => {
    return jsx(LegacyHidden, {
      htmlAttributes: {
        className,
        onMouseLeave: !htmlAttributes ? void 0 : htmlAttributes.onMouseLeave,
        style: !htmlAttributes ? void 0 : htmlAttributes.style,
        ...pageletAriaProps,
      },
      mode: hidden === !0 ? 'hidden' : 'visible',
      ref,
      children,
    });
  },
);
