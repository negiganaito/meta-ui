import React from 'react';
import stylex from '@stylexjs/stylex';

import { CometHeadlineWithAddOn } from './comet-headline-with-add-on';
import { FDSText } from './fds-text';
import { getTetraTextHierarchyStyle } from './tetra-text-hierarchy-style';

const styles = stylex.create({
  item: {
    marginBottom: '5px',
    marginTop: '5px',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '-5px',
    marginTop: '-5px',
  },
});

const levelWrapperStyles = stylex.create({
  1: {
    marginBottom: '-7px',
    marginTop: '-7px',
  },
  2: {
    marginBottom: '-6px',
    marginTop: '-6px',
  },
  3: {},
  4: {},
  entityHeader1: {
    marginBottom: '-8px',
    marginTop: '-8px',
  },
  entityHeader2: {
    marginBottom: '-8px',
    marginTop: '-8px',
  },
});

const levelStyles = stylex.create({
  1: {
    marginBottom: '7px',
    marginTop: '7px',
  },
  2: {
    marginBottom: '6px',
    marginTop: '6px',
  },
  3: {},
  4: {},
  entityHeader1: {
    marginBottom: '8px',
    marginTop: '8px',
  },
  entityHeader2: {
    marginBottom: '8px',
    marginTop: '8px',
  },
});

export const FDSTextPairing = ({
  body,
  bodyColor = 'primary',
  bodyId,
  bodyLineLimit,
  bodyRef,
  bodyTruncationTooltip,
  dir = 'auto',
  headline,
  headlineAddOn,
  headlineColor = 'primary',
  headlineId,
  headlineLineLimit,
  headlineRef,
  headlineTruncationTooltip,
  isPrimaryHeading,
  isSemanticHeading,
  level,
  meta,
  metaColor = 'secondary',
  metaLineLimit,
  metaLocation = 'below',
  metaRef,
  metaTestID,
  metaTruncationTooltip,
  reduceEmphasis = false,
  testid,
  textAlign = 'start',
}) => {
  const { bodyType, headlineType, metaType } = getTetraTextHierarchyStyle(level, reduceEmphasis);

  let clazz = stylex(styles.item, levelStyles[level]);

  const headlineComp = headline && (
    <div className={clazz}>
      {headlineAddOn ? (
        <CometHeadlineWithAddOn
          addOn={headlineAddOn}
          color={headlineColor}
          headlineRef={headlineRef}
          id={headlineId}
          isPrimaryHeading={isPrimaryHeading}
          isSemanticHeading={isSemanticHeading}
          numberOfLines={headlineLineLimit}
          truncationTooltip={headlineTruncationTooltip}
          type={headlineType}
        >
          {headline}
        </CometHeadlineWithAddOn>
      ) : (
        <FDSText
          align={textAlign}
          color={headlineColor}
          dir={dir}
          id={headlineId}
          isPrimaryHeading={isPrimaryHeading}
          isSemanticHeading={isSemanticHeading}
          numberOfLines={headlineLineLimit}
          ref={headlineRef}
          truncationTooltip={headlineTruncationTooltip}
          type={headlineType}
        >
          {headline}
        </FDSText>
      )}
    </div>
  );

  const metaComp = meta && (
    <div className={clazz}>
      <FDSText
        align={textAlign}
        color={metaColor}
        dir={dir}
        isSemanticHeading={false}
        numberOfLines={metaLineLimit}
        ref={metaRef}
        testid={undefined}
        truncationTooltip={metaTruncationTooltip}
        type={metaType}
      >
        {meta}
      </FDSText>
    </div>
  );

  return (
    <div className={stylex(styles.root, levelWrapperStyles[level])} data-testid={undefined}>
      {metaLocation === 'above' && metaComp}
      {headlineComp}
      {body && (
        <div className={clazz}>
          <FDSText
            align={textAlign}
            color={bodyColor}
            dir={dir}
            id={bodyId}
            isSemanticHeading={false}
            numberOfLines={bodyLineLimit}
            ref={bodyRef}
            truncationTooltip={bodyTruncationTooltip}
            type={bodyType}
          >
            {body}
          </FDSText>
        </div>
      )}
      {metaLocation === 'below' && metaComp}
    </div>
  );
};
