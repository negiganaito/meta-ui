import React from 'react';
import { BizKitConstants } from '@meta-business/utils/biz-kit-constants';
import { FBLogger } from '@meta-core/error/fb-logger';
import { getErrorSafe } from '@meta-core/error/get-error-safe';

import { logBizKitError } from './log-biz-kit-error';

export class BizKitErrorBoundary extends React.Component {
  static getDerivedStateFromError = function (a) {
    return {
      error: getErrorSafe(a),
    };
  };

  constructor() {
    super();

    this.state = {
      error: null,
    };
    this.suppressReactDefaultErrorLoggingIUnderstandThisWillMakeBugsHarderToFindAndFix = !0;
  }

  componentDidUpdate = function (a) {
    if (
      this.state.error &&
      this.props.forceResetErrorCount !== null &&
      this.props.forceResetErrorCount !== a.forceResetErrorCount
    ) {
      this.setState({
        error: null,
      });
      return;
    }
  };

  componentDidCatch = function (a, b) {
    b = b.componentStack;
    a = getErrorSafe(a);
    a.componentStack = b;
    b = this.context;
    let e = this.props;
    let f = e.onError;
    e = e.project;
    e === null || e === BizKitConstants.BIZKIT_PROJECT_NAME
      ? logBizKitError(a)
      : (b(a), FBLogger(e).catching(a).mustfix(a.message));
    f !== null && f(a);
  };

  render = function () {
    let a = this.props;
    let b = a.children;
    a = a.fallback;
    let c = this.state.error;
    return c ? (typeof a === 'function' ? a(c) : a) : b;
  };
}
