import React, { forwardRef, useContext, useMemo } from 'react';
import { html } from 'react-strict-dom';
import { BaseHeadingContext } from '@meta-core/contexts/base-heading-context';
import { useBaseTextContext } from '@meta-core/contexts/base-text-context';
import { unrecoverableViolation } from '@meta-core/error/unrecoverable-violation';
import stylex from '@stylexjs/stylex';

// TODO jsdoc
// eslint-disable-next-line no-unused-vars
// const baseHeading = (
//   { children, xstyle, isPrimaryHeading = false, testid, ...rest },
//   ref
// ) => {
//   const heading = useContext(BaseHeadingContext);

//   const HeadingComponent = useMemo(
//     () => (isPrimaryHeading ? "h1" : `h${Math.max(Math.min(heading, 6), 2)}`),
//     [isPrimaryHeading, heading]
//   );

//   const baseTextContextValue = useBaseTextContext();
//   const isNested =
//     (!baseTextContextValue ? undefined : baseTextContextValue?.nested) === true;

//   return (
//     <HeadingComponent
//       {...rest}
//       className={stylex(styles.root, xstyle)}
//       data-testid={undefined}
//       dir={isNested ? undefined : "auto"}
//       ref={ref}
//     >
//       {children}
//     </HeadingComponent>
//   );
// };

const m = {
  1: html.h1,
  2: html.h2,
  3: html.h3,
  4: html.h4,
  5: html.h5,
  6: html.h6,
};

/**
 * @type React.ForwardRefRenderFunction<React.FunctionComponent, import("./types").BaseHeadingProps>
 */
export const BaseHeading = forwardRef(({ children, xstyle, isPrimaryHeading = false, testid, ...rest }, ref) => {
  const heading = useContext(BaseHeadingContext);

  const HeadingComponent = useMemo(() => {
    if (isPrimaryHeading) {
      return html.h1;
    }

    const a = Math.max(Math.min(heading, 6), 2);

    return m[String(a)];
  }, [isPrimaryHeading, heading]);

  if (!HeadingComponent)
    throw unrecoverableViolation('Failed to retrieve a heading tag, this should not be possible', 'comet_ui');

  const baseTextContextValue = useBaseTextContext();
  const isNested = (!baseTextContextValue ? undefined : baseTextContextValue?.nested) === true;

  return (
    <HeadingComponent
      {...rest}
      className={stylex(styles.root, xstyle)}
      data-testid={undefined}
      dir={isNested ? undefined : 'auto'}
      ref={ref}
    >
      {children}
    </HeadingComponent>
  );
});

BaseHeading.displayName = 'BaseHeading.react';

const styles = stylex.create({
  root: {
    color: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    outline: 'none',
  },
});
