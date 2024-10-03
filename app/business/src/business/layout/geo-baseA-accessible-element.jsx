import React from 'react';
import { GeoDomID } from '@meta-business/utils/geo-dom-id';
import { useMergeRefs } from '@meta-core/react-utils/use-merge-refs';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  hidden: {
    clip: 'rect(1px,1px,1px,1px)',
    height: '1px',
    margin: '-1px',
    overflowX: 'hidden',
    overflowY: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px',
  },
});

export function GeoBaseAccessibleElement({ children, containerRef, id, isHidden = false, xstyle, ...props }) {
  const geoDomID = GeoDomID.useApplyGeoDomIDsDirectly({
    id: id ?? undefined,
  });
  const { ref, ...domProps } = geoDomID;
  const mergedRef = useMergeRefs(containerRef, ref);

  return (
    <div
      {...props}
      {...domProps}
      className={stylex(xstyle, isHidden && styles.hidden)}
      data-sscoverage-ignore={true}
      ref={mergedRef}
    >
      {children}
    </div>
  );
}
