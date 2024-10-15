import React from 'react';
import { jsx } from 'react/jsx-runtime';
import { invariant } from '@meta-core/error/invariant';
import { isNode } from '@meta-core/utils/is-node';

export class DOMContainer extends React.Component {
  constructor() {
    super();

    this.containerNode = null;
    this.setContainerNode = function (a) {
      this.containerNode = a;
      let b = this.props.containerRef;
      typeof b === 'function' && b(a);
    };
  }

  componentDidMount = function () {
    let a = this.containerNode;
    a !== null && a.appendChild(this.getDOMChild());
  };

  shouldComponentUpdate = function (a) {
    return a.children !== this.props.children;
  };

  componentDidUpdate = function (a) {
    a = this.containerNode;
    if (a === null) return;
    while (a.lastChild) a.removeChild(a.lastChild);
    a.appendChild(this.getDOMChild());
  };

  getDOMChild = function () {
    let a = this.props.children;
    isNode(a) || invariant(0, 1533);
    return a;
  };

  render = function () {
    let a = this.props;
    let b = a.display;
    // a = babelHelpers.objectWithoutPropertiesLoose(a, ['display']);

    // eslint-disable-next-line no-unused-vars
    const { display, ...aa } = this.props;

    b = b === 'block' ? 'div' : 'span';
    return jsx(b, { ...aa, ref: this.setContainerNode, children: void 0 });
  };
}

// eslint-disable-next-line react/static-property-placement
DOMContainer.defaultProps = {
  display: 'inline',
};
