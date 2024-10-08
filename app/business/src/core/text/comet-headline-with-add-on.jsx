import React, { forwardRef } from 'react';
import { BaseRow } from '@meta-core/layout/base-row';
import { BaseRowItem } from '@meta-core/layout/base-row-item';
import stylex from '@stylexjs/stylex';
import Locale from 'fbjs/lib/Locale';

import { FDSText } from './fds-text';

/**
 * @type React.ForwardRefRenderFunction<React.FunctionComponent, import("./types").CometHeadlineWithAddOnProps>
 */
export const CometHeadlineWithAddOn = forwardRef(
  ({ headlineRef, addOn, children, color, id, numberOfLines, isPrimaryHeading, isSemanticHeading, type }, ref) => {
    return (
      <FDSText ref={ref} isSemanticHeading={false} type={type}>
        <BaseRow verticalAlign="center" xstyle={Locale.isRTL() ? directionStyles.rtl : directionStyles.ltr}>
          <BaseRowItem expanding={true} xstyle={styles.textFlexFixForIE}>
            <FDSText
              color={color}
              isPrimaryHeading={isPrimaryHeading}
              isSemanticHeading={isSemanticHeading}
              numberOfLines={numberOfLines}
              ref={headlineRef}
              type={type}
              id={id}
            >
              {children}
            </FDSText>
            <BaseRowItem verticalAlign="top" xstyle={styles.addOn}>
              <BaseRow verticalAlign="center">
                <BaseRowItem
                  xstyle={styles.nonBreakingSpace}
                  // TODO
                  children={'\xa0'}
                />
                <BaseRowItem>
                  <BaseRow>{addOn}</BaseRow>
                </BaseRowItem>
              </BaseRow>
            </BaseRowItem>
          </BaseRowItem>
        </BaseRow>
      </FDSText>
    );
  },
);

CometHeadlineWithAddOn.displayName = 'CometHeadlineWithAddOn.react';

const directionStyles = stylex.create({
  ltr: {
    direction: 'ltr',
  },
  rtl: {
    direction: 'rtl',
  },
});

const styles = stylex.create({
  addOn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '8px',
  },
  nonBreakingSpace: {
    visibility: 'hidden',
    width: '0',
  },
  textFlexFixForIE: {
    flexBasis: 'auto',
  },
});
