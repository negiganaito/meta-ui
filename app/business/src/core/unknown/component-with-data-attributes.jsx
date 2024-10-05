import React from 'react';

export function ComponentWithDataAttributes({ children, dataAttributes }) {
  const attributes = dataAttributes
    ? Object.keys(dataAttributes).reduce((acc, key) => {
        if (acc && key) {
          acc['data-' + key] = dataAttributes[key];
        }
        return acc;
      }, {})
    : null;

  return attributes ? <div {...attributes}>{children}</div> : children;
}
