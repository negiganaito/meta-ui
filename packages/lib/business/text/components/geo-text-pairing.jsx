import React from 'react';
import { GeoTextUtils } from '@meta-ui/business/utils';
import stylex from '@stylexjs/stylex';

import { GeoBaseText } from './geo-base-text';
import { GeoDataText } from './geo-data-text';
import { GeoHeading } from './geo-heading';
import { GeoText } from './geo-text';

function GeoTextContent({ children, size, ...props }) {
  switch (size) {
    case 'value':
      return <GeoText {...props}>{children}</GeoText>;
    case 'data':
      return <GeoDataText {...props}>{children}</GeoDataText>;
    case 'header2':
    case 'header3':
    case 'header4':
      return (
        <GeoHeading level={GeoTextUtils.mapHeadingSizeToLevel(size)} {...props}>
          {children}
        </GeoHeading>
      );
    default:
      return null;
  }
}
GeoTextContent.displayName = 'GeoTextContent';

export function GeoTextPairing({
  'data-description-testid': descriptionTestId,
  'data-heading-testid': headingTestId,
  description,
  descriptionId,
  heading,
  headingId,
  overflowWrap,
  size,
  textAlign,
  truncate,
  xstyle,
  ...props
}) {
  const headingDisplay = truncate === 'heading' || truncate === 'both' ? 'truncate' : 'block';
  const descriptionDisplay = truncate === 'description' || truncate === 'both' ? 'truncate' : 'block';

  return (
    <div className={stylex(styles.root, xstyle)} {...props}>
      <GeoTextContent
        data-testid={headingTestId}
        display={headingDisplay}
        id={headingId}
        overflowWrap={overflowWrap}
        size={size}
        textAlign={textAlign}
      >
        {heading}
      </GeoTextContent>
      {description && description !== '' && (
        <GeoBaseText
          data-testid={descriptionTestId}
          id={descriptionId}
          overflowWrap={overflowWrap}
          textAlign={textAlign}
          {...GeoTextUtils.getPairingTextProps({ size, display: descriptionDisplay })}
        >
          {description}
        </GeoBaseText>
      )}
    </div>
  );
}

GeoTextPairing.displayName = 'GeoTextPairing';

const styles = stylex.create({
  root: {
    minWidth: 0,
  },
});
