import { env } from '@meta-core/utils';

import { memoize } from '../memoize';
import { memoizeStringOnly } from '../memorize-string-only';
import { unexpectedUseInComet } from '../unexpected-use-in-comet';

import { isFacebookURI } from './is-facebook-uri';
import { PHPQuerySerializer } from './php-query-serializer';
import { PHPQuerySerializerNoEncoding } from './php-query-serializer-no-encoding';
import { ReloadPage } from './reload-page';
import { unqualifyURI } from './unqualify-uri';
import { URIBase } from './uri-base';
import { UriNeedRawQuerySVChecker } from './uri-need-raw-query-sv-checker';

const memoizedURI = memoize(() => new URI(window.location.href));

function getPageTransitions() {
  // return ifRequired('PageTransitions', (PageTransitions) => {
  //   if (PageTransitions.isInitialized()) return PageTransitions;
  // });
}

const cr1078 = null;

export class URI extends URIBase {
  // eslint-disable-next-line max-params
  constructor(url, deserializer, b, e) {
    const serializer = UriNeedRawQuerySVChecker.isUriNeedRawQuery(url)
      ? PHPQuerySerializerNoEncoding
      : PHPQuerySerializer;
    super(url, serializer, b, e);
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
    let index = domainParts.indexOf('facebook');
    if (index === -1) index = domainParts.indexOf('workplace');
    return domainParts.slice(index).join('.');
  }

  getUnqualifiedURI() {
    return unqualifyURI(new URI(this));
  }

  getQualifiedURI() {
    return new URI(this).qualify();
  }

  isSameOrigin(otherURI) {
    if (!otherURI) {
      otherURI = memoizedURI();
    } else if (!(otherURI instanceof URI)) {
      otherURI = new URI(otherURI.toString());
    }
    return super.isSameOrigin(otherURI);
  }

  static goURIOnNewWindow(uri) {
    URI.goURIOnWindow(uri, window.open('', '_blank'), true);
  }

  // eslint-disable-next-line max-params
  static goURIOnWindow(uri, win, useTransitions = false, replace = false) {
    URI.goURIOnWindowWithReference(uri, win, useTransitions, replace);
  }

  // eslint-disable-next-line max-params
  static goURIOnWindowWithReference(uri, win, useTransitions = false, replace = false) {
    uri = new URI(uri);
    const isSameWindow = !win || win === window;

    if (env.isCQuick && isFacebookURI(uri) && isSameWindow) {
      const cquickParams = {
        cquick: env.iframeKey,
        ctarget: env.iframeTarget,
        cquick_token: env.iframeToken,
      };
      uri.addQueryData(cquickParams);
      useTransitions = false;
    }

    const uriString = uri.toString();
    const targetWindow = win || window;
    const isSameURI = window.location.href === uriString && targetWindow === window;

    if (!useTransitions && getPageTransitions()) {
      getPageTransitions().go(uriString, replace);
    } else if (isSameURI) {
      ReloadPage.now();
    } else if (replace) {
      targetWindow.location.replace(uriString);
    } else {
      targetWindow.location.href = uriString;
    }

    return targetWindow;
  }

  go(useTransitions, replace) {
    if (cr1078) {
      cr1078(this, useTransitions, replace);
      return;
    }
    if (unexpectedUseInComet) {
      unexpectedUseInComet('uri.go');
    }
    URI.go(this, useTransitions, replace);
  }

  static tryParseURI(url) {
    const parsedURI = URIBase.tryParse(url, PHPQuerySerializer);
    return parsedURI ? new URI(parsedURI) : null;
  }

  static isValidURI(url) {
    return URIBase.isValid(url, PHPQuerySerializer);
  }

  static getRequestURI(usePageTransitions = true, qualified = false) {
    if (usePageTransitions) {
      const pageTransitions = getPageTransitions();
      if (pageTransitions) {
        return pageTransitions.getCurrentURI(qualified).getQualifiedURI();
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

  static normalize(input) {
    return input && typeof input === 'string' ? this.normalizeString(input) : new URI(input).toString();
  }
}

URI.go = function (uri, useTransitions, replace) {
  if (unexpectedUseInComet) {
    unexpectedUseInComet('URI.go');
  }
  URI.goURIOnWindow(uri, window, useTransitions, replace);
};

URI.normalizeString = memoizeStringOnly((input) => {
  return new URI(input).toString();
});

URI.expression = /(((\w+):\/\/)([^\/:]*)(:(\d+))?)?([^#?]*)(\?([^#]*))?(#(.*))?/;
URI.arrayQueryExpression = /^(\w+)((?:\[\w*\])+)=?(.*)/;
