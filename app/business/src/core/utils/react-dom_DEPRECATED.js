import ReactDom from 'react-dom';

import { ReactDOMCompatibilityLayer } from './react-dom-compatibility-layer';

// b('setupReactRefresh');

export const ReactDOM_DEPRECATED = {
  findDOMNode_DEPRECATED: ReactDom.findDOMNode,
  render_DEPRECATED: ReactDOMCompatibilityLayer.render_DEPRECATED,
  unmountComponentAtNode_DEPRECATED: ReactDOMCompatibilityLayer.unmountComponentAtNode_DEPRECATED,
};
