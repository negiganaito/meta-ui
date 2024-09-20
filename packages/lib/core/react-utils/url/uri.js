import { memoize } from '../memoize';
import { memoizeStringOnly } from '../memorize-string-only';

import { isFacebookURI } from './is-facebook-uri';
import { PHPQuerySerializer } from './php-query-serializer';
import { PHPQuerySerializerNoEncoding } from './php-query-serializer-no-encoding';
import { unqualifyURI } from './unqualify-uri';
import { URIBase } from './uri-base';
import { UriNeedRawQuerySVChecker } from './uri-need-raw-query-sv-checker';

const getMemoizedWindowLocation = memoize(() => {
  return new URI(window.location.href);
});

function getPageTransitions() {
  return ifRequired('PageTransitions', (PageTransitions) => {
    if (PageTransitions.isInitialized()) {
      return PageTransitions;
    }
  });
}

class URI extends URIBase {
  // eslint-disable-next-line max-params
  constructor(uri, serializer, domain, protocol) {
    const useNoEncoding = UriNeedRawQuerySVChecker.isUriNeedRawQuery(uri);
    const querySerializer = useNoEncoding ? PHPQuerySerializerNoEncoding : PHPQuerySerializer;
    super(uri, querySerializer, domain, protocol);
  }

  setPath(path) {
    this.path = path;
    return super.setPath(path);
  }

  getPath() {
    const path = super.getPath();
    return path ? path.replace(/^\/+/, '/') : path;
  }

  setProtocol(protocol) {
    this.protocol = protocol;
    return super.setProtocol(protocol);
  }

  setDomain(domain) {
    this.domain = domain;
    return super.setDomain(domain);
  }

  setPort(port) {
    this.port = port;
    return super.setPort(port);
  }

  setFragment(fragment) {
    this.fragment = fragment;
    return super.setFragment(fragment);
  }

  stripTrailingSlash() {
    this.setPath(this.getPath().replace(/\/$/, ''));
    return this;
  }

  addTrailingSlash() {
    const path = this.getPath();
    if (path.length > 0 && path[path.length - 1] !== '/') {
      this.setPath(path + '/');
    }
    return this;
  }

  valueOf() {
    return this.toString();
  }

  getRegisteredDomain() {
    if (!this.getDomain()) return '';
    if (!isFacebookURI(this)) return null;

    const domainParts = this.getDomain().split('.');
    let facebookIndex = domainParts.indexOf('facebook');
    if (facebookIndex === -1) {
      facebookIndex = domainParts.indexOf('workplace');
    }
    return domainParts.slice(facebookIndex).join('.');
  }

  getUnqualifiedURI() {
    return unqualifyURI(new URI(this));
  }

  getQualifiedURI() {
    return new URI(this).qualify();
  }

  isSameOrigin(uri) {
    uri = uri || getMemoizedWindowLocation();
    if (!(uri instanceof URI)) {
      uri = new URI(uri.toString());
    }
    return super.isSameOrigin(uri);
  }

  static goURIOnNewWindow(uri) {
    URI.goURIOnWindow(uri, window.open('', '_blank'), true);
  }

  // eslint-disable-next-line max-params
  static goURIOnWindow(uri, targetWindow, useReplace = false, force = false) {
    URI.goURIOnWindowWithReference(uri, targetWindow, useReplace, force);
  }

  // eslint-disable-next-line max-params
  static goURIOnWindowWithReference(uri, targetWindow, useReplace = false, force = false) {
    uri = new URI(uri);
    const isCurrentWindow = !targetWindow || targetWindow === window;

    if (Env.isCQuick && isFacebookURI(uri) && isCurrentWindow) {
      const cquickParams = {
        cquick: Env.iframeKey,
        ctarget: Env.iframeTarget,
        cquick_token: Env.iframeToken,
      };
      uri.addQueryData(cquickParams);
      useReplace = false;
    }

    const uriString = uri.toString();
    targetWindow = targetWindow || window;
    const isSameURL = window.location.href === uriString && targetWindow === window;

    if (!useReplace && PageTransitions) {
      PageTransitions.go(uriString, force);
    } else if (isSameURL) {
      ReloadPage.now();
    } else if (force) {
      targetWindow.location.replace(uriString);
    } else {
      targetWindow.location.href = uriString;
    }

    return targetWindow;
  }

  go(useReplace, force) {
    // if (cr1078) {
    //   cr1078(this, useReplace, force);
    //   return;
    // }
    // if (cr1080) cr1080('uri.go');
    URI.go(this, useReplace, force);
  }

  static tryParseURI(uri) {
    const parsedURI = URIBase.tryParse(uri, PHPQuerySerializer);
    return parsedURI ? new URI(parsedURI) : null;
  }

  static isValidURI(uri) {
    return URIBase.isValid(uri, PHPQuerySerializer);
  }

  static getRequestURI(usePreviousValue = true, qualifyURI = false) {
    if (usePreviousValue) {
      const pageTransitions = getPageTransitions();
      if (pageTransitions) {
        return pageTransitions.getCurrentURI(!!qualifyURI).getQualifiedURI();
      }
    }
    return new URI(window.location.href);
  }

  static getMostRecentURI() {
    const pageTransitions = getPageTransitions();
    return pageTransitions ? pageTransitions.getMostRecentURI().getQualifiedURI() : new URI(window.location.href);
  }

  static getNextURI() {
    const pageTransitions = getPageTransitions();
    return pageTransitions ? pageTransitions.getNextURI().getQualifiedURI() : new URI(window.location.href);
  }

  static encodeComponent(component) {
    return encodeURIComponent(component).replace(/%5D/g, ']').replace(/%5B/g, '[');
  }

  static decodeComponent(component) {
    return decodeURIComponent(component.replace(/\+/g, ' '));
  }

  static normalize(uri) {
    return uri && typeof uri === 'string' ? URI.normalizeString(uri) : new URI(uri).toString();
  }
}

URI.go = function (uri, useReplace, force) {
  // if (cr1080) cr1080('URI.go');
  URI.goURIOnWindow(uri, window, useReplace, force);
};

URI.normalizeString = memoizeStringOnly((uri) => new URI(uri).toString());

URI.expression = /(((\w+):\/\/)([^\/:]*)(:(\d+))?)?([^#?]*)(\?([^#]*))?(#(.*))?/;
URI.arrayQueryExpression = /^(\w+)((?:\[\w*\])+)=?(.*)/;

export { URI };
