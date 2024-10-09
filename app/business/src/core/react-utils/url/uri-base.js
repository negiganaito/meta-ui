import { err } from '@meta-core/error/err';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';

import { PHPQuerySerializerNoEncoding } from './php-query-serializer-no-encoding';
import { URIAbstractBase } from './uri-abstract-base';
import { UriNeedRawQuerySVChecker } from './uri-need-raw-query-sv-checker';
import { URISchemes } from './uri-schemes';

// eslint-disable-next-line max-params
function tryParseURI(a, b, d, e) {
  try {
    return URIAbstractBase.parse(a, b, d, e);
  } catch (error) {
    throw new Error(err(error.message));
  }
}

export class URIBase extends URIAbstractBase {
  // eslint-disable-next-line max-params
  constructor(b, c, e = URISchemes.Options.INCLUDE_DEFAULTS, f) {
    super(b, c, e, f);
    this.$URIBase1 = c;
    tryParseURI(this, b, true, c);
  }

  // eslint-disable-next-line max-params
  static tryParse(a, c, e = URISchemes.Options.INCLUDE_DEFAULTS, f) {
    const uriBaseInstance = new URIBase(null, c, e, f);
    return tryParseURI(uriBaseInstance, a, false, c) ? uriBaseInstance : null;
  }

  // eslint-disable-next-line max-params
  static isValid(a, c, e = URISchemes.Options.INCLUDE_DEFAULTS, f) {
    return !!URIBase.tryParse(a, c, e, f);
  }

  setDomain(b) {
    try {
      super.setDomain(b);
    } catch (error) {
      throw new Error(err(error.message));
    }
    return this;
  }

  getQualifiedURIBase() {
    return new URIBase(this, this.$URIBase1).qualify();
  }

  qualify() {
    if (!this.getDomain()) {
      // eslint-disable-next-line no-restricted-globals
      let href = (typeof window !== 'undefined' ? window : self).location.href;
      if (ExecutionEnvironment.isInWorker && href && href.startsWith('blob:')) {
        href = href.substring(5);
      }
      const newURI = new URIBase(href, this.$URIBase1);
      this.setProtocol(newURI.getProtocol()).setDomain(newURI.getDomain()).setPort(newURI.getPort());
    }
    return this;
  }

  isSubdomainOfDomain(a) {
    const domain = this.getDomain();
    return URIBase.isDomainSubdomainOfDomain(domain, a, this.$URIBase1);
  }

  static isDomainSubdomainOfDomain(a, c, d) {
    if (!c || !a) return false;
    if (a.endsWith(c)) {
      const lengthDiff = a.length - c.length - 1;
      if (a.length === c.length || a[lengthDiff] === '.') {
        const uriInstance = new URIBase(null, d);
        uriInstance.setDomain(c);
        return URIBase.isValid(uriInstance, d);
      }
    }
    return false;
  }

  toString() {
    return super.toString(UriNeedRawQuerySVChecker.isDomainNeedRawQuery, PHPQuerySerializerNoEncoding);
  }

  toStringRawQuery() {
    return super.toStringRawQuery(UriNeedRawQuerySVChecker.isDomainNeedRawQuery, PHPQuerySerializerNoEncoding);
  }

  toStringPreserveQuery() {
    return super.toStringPreserveQuery(UriNeedRawQuerySVChecker.isDomainNeedRawQuery, PHPQuerySerializerNoEncoding);
  }

  toStringStrictQueryEncoding() {
    return super.toStringStrictQueryEncoding(UriNeedRawQuerySVChecker.isDomainNeedRawQuery);
  }

  getQueryString(b = false) {
    return super.getQueryString(b, UriNeedRawQuerySVChecker.isDomainNeedRawQuery, PHPQuerySerializerNoEncoding);
  }
}
