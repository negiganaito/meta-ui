import { FBLogger, invariant } from '@meta-core/error';

import { isSameOrigin as _isSameOrigin } from './is-same-origin';
import { PHPStrictQuerySerializer } from './php-strict-query-serializer';
import { setHostSubdomain } from './set-host-subdomain';
import { URISchemes } from './uri-schemes';
import { URIRFC3986 } from './URIRFC3986';

// eslint-disable-next-line prefer-regex-literals
const unsafeDomainRegExp = new RegExp(
  '[\\x00-\\x2c\\x2f\\x3b-\\x40\\x5c\\x5e\\x60\\x7b-\\x7f\\uFDD0-\\uFDEF\\uFFF0-\\uFFFF\\u2047\\u2048\\uFE56\\uFE5F\\uFF03\\uFF0F\\uFF1F]',
);
// eslint-disable-next-line prefer-regex-literals
const protocolRelativeRegExp = new RegExp('^(?:[^/]*:|[\\x00-\\x1f]*/[\\x00-\\x1f]*/)');
const uriFilters = [];

export class URIAbstractBase {
  // eslint-disable-next-line max-params, complexity
  static parse(c, d, e, f) {
    if (!d) return true;
    if (d instanceof URIAbstractBase) {
      c.setProtocol(d.getProtocol());
      c.setDomain(d.getDomain());
      c.setPort(d.getPort());
      c.setPath(d.getPath());
      c.setQueryData(f.deserialize(f.serialize(d.getQueryData())));
      c.setFragment(d.getFragment());
      c.setIsGeneric(d.getIsGeneric());
      c.setForceFragmentSeparator(d.getForceFragmentSeparator());
      c.setOriginalRawQuery(d.getOriginalRawQuery());
      c.setQueryParamModified(false);
      return true;
    }

    d = d.toString().trim();
    const parsed = URIRFC3986.parse(d) || { fragment: null, scheme: null, query: null };

    if (!e && !URISchemes.isAllowed(parsed.scheme, c.$12, c.$13)) return false;
    c.setProtocol(parsed.scheme || '');
    if (!e && unsafeDomainRegExp.test(parsed.host || '')) return false;
    c.setDomain(parsed.host || '');
    c.setPort(parsed.port || '');
    c.setPath(parsed.path || '');

    try {
      c.setQueryData(f.deserialize(parsed.query || '') || {});
    } catch (err) {
      return false;
    }

    c.setFragment(parsed.fragment || '');
    if (parsed.fragment === '') c.setForceFragmentSeparator(true);
    c.setIsGeneric(parsed.isGenericURI || false);
    c.setOriginalRawQuery(parsed.query);
    c.setQueryParamModified(false);

    if (parsed.userinfo !== null) return false;

    if (!c.getDomain() && c.getPath().indexOf('\\') !== -1) return false;

    if (!c.getProtocol() && protocolRelativeRegExp.test(d)) return false;

    if (c.getDomain() && c.getPath() && !c.getPath().startsWith('/')) return false;

    if (c.getProtocol() && !c.getIsGeneric() && !c.getDomain() && c.getPath() !== '') {
      FBLogger('uri').warn(`URI.parse: invalid URI (protocol "${c.getProtocol()}" with no domain)`);
    }

    return true;
  }

  // eslint-disable-next-line max-params
  static tryParse(b, c, d, e) {
    const instance = new URIAbstractBase(null, c, d, e);
    return URIAbstractBase.parse(instance, b, false, c) ? instance : null;
  }

  // eslint-disable-next-line max-params
  static isValid(b, c, d, e) {
    return !!URIAbstractBase.tryParse(b, c, d, e);
  }

  // eslint-disable-next-line max-params
  constructor(c, d, e = URISchemes.Options.INCLUDE_DEFAULTS, f) {
    d || invariant(0, 2966);
    this.$9 = d;
    this.$7 = '';
    this.$1 = '';
    this.$6 = '';
    this.$5 = '';
    this.$3 = '';
    this.$4 = false;
    this.$8 = {};
    this.$2 = false;
    this.$12 = e;
    this.$13 = f;
    URIAbstractBase.parse(this, c, true, d);
    this.$11 = false;
  }

  setProtocol(protocol) {
    if (!URISchemes.isAllowed(protocol, this.$12, this.$13)) {
      invariant(0, 11793, protocol);
    }
    this.$7 = protocol;
    return this;
  }

  getProtocol() {
    return (this.$7 || '').toLowerCase();
  }

  setSecure(secure) {
    return this.setProtocol(secure ? 'https' : 'http');
  }

  isSecure() {
    return this.getProtocol() === 'https';
  }

  setDomain(domain) {
    if (unsafeDomainRegExp.test(domain)) {
      throw new Error(`URI.setDomain: unsafe domain specified: ${domain}`);
    }
    this.$1 = domain;
    return this;
  }

  getDomain() {
    return this.$1;
  }

  setPort(port) {
    this.$6 = port;
    return this;
  }

  getPort() {
    return this.$6;
  }

  setPath(path) {
    this.$5 = path;
    return this;
  }

  getPath() {
    return this.$5;
  }

  addQueryData(key, value) {
    if (Object.prototype.toString.call(key) === '[object Object]') {
      Object.assign(this.$8, key);
    } else {
      this.$8[key] = value;
    }
    this.$11 = true;
    return this;
  }

  setQueryData(queryData) {
    this.$8 = queryData;
    this.$11 = true;
    return this;
  }

  getQueryData() {
    return this.$8;
  }

  setQueryString(queryString) {
    return this.setQueryData(this.$9.deserialize(queryString));
  }

  getQueryString(a = false, b = () => false, c = null) {
    return this.$14(false, a, b, c);
  }

  // eslint-disable-next-line max-params
  $14(a = false, b = false, c = () => false, d = null) {
    if (!this.$11 && (b || c(this.getDomain()))) {
      return this.$10 ?? '';
    }
    return (a && d ? d : this.$9).serialize(this.getQueryData());
  }

  removeQueryData(keys) {
    if (!Array.isArray(keys)) {
      keys = [keys];
    }
    for (let i = 0; i < keys.length; i++) {
      delete this.$8[keys[i]];
    }
    this.$11 = true;
    return this;
  }

  setFragment(fragment) {
    this.$3 = fragment;
    this.setForceFragmentSeparator(false);
    return this;
  }

  getFragment() {
    return this.$3;
  }

  setForceFragmentSeparator(force) {
    this.$2 = force;
    return this;
  }

  getForceFragmentSeparator() {
    return this.$2;
  }

  setIsGeneric(isGeneric) {
    this.$4 = isGeneric;
    return this;
  }

  getIsGeneric() {
    return this.$4;
  }

  getOriginalRawQuery() {
    return this.$10;
  }

  setOriginalRawQuery(query) {
    this.$10 = query;
    return this;
  }

  setQueryParamModified(modified) {
    this.$11 = modified;
    return this;
  }

  isEmpty() {
    return !(
      this.getPath() ||
      this.getProtocol() ||
      this.getDomain() ||
      this.getPort() ||
      Object.keys(this.getQueryData()).length > 0 ||
      this.getFragment()
    );
  }

  toString(a = () => false, b = null) {
    return this.$15(false, false, a, b);
  }

  toStringRawQuery(a = () => false, b = null) {
    return this.$15(true, false, a, b);
  }

  toStringPreserveQuery(a = () => false, b = null) {
    return this.$15(false, true, a, b);
  }

  toStringStrictQueryEncoding(a = () => false) {
    return this.$15(true, false, a, PHPStrictQuerySerializer);
  }

  // eslint-disable-next-line max-params
  $15(a = false, b = false, c = () => false, d = null) {
    let uri = this;
    for (let filter of uriFilters) {
      uri = filter(uri);
    }
    return uri.$16(a, b, c, d);
  }

  // eslint-disable-next-line max-params
  $16(a = false, b = false, c = () => false, d = null) {
    let uriString = '';
    const protocol = this.getProtocol();
    if (protocol) {
      uriString += protocol + ':' + (this.getIsGeneric() ? '' : '//');
    }
    const domain = this.getDomain();
    if (domain) {
      uriString += domain;
    }
    const port = this.getPort();
    if (port) {
      uriString += ':' + port;
    }
    const path = this.getPath();
    uriString += path || (uriString && '/');

    const queryString = this.$14(a, b, c, d);
    if (queryString) {
      uriString += '?' + queryString;
    }
    const fragment = this.getFragment();
    if (fragment) {
      uriString += '#' + fragment;
    } else if (this.getForceFragmentSeparator()) {
      uriString += '#';
    }
    return uriString;
  }

  static registerFilter(filter) {
    uriFilters.push(filter);
  }

  getOrigin() {
    const port = this.getPort();
    return this.getProtocol() + '://' + this.getDomain() + (port ? ':' + port : '');
  }

  isSameOrigin(uri) {
    return _isSameOrigin(this, uri);
  }

  getQualifiedURIBase() {
    return new URIAbstractBase(this, this.$9).qualify();
  }

  qualify() {
    if (!this.getDomain()) {
      const baseUri = new URIAbstractBase(window.location.href, this.$9);
      this.setProtocol(baseUri.getProtocol()).setDomain(baseUri.getDomain()).setPort(baseUri.getPort());
    }
    return this;
  }

  setSubdomain(subdomain) {
    const qualifiedDomain = this.qualify().getDomain();
    return this.setDomain(setHostSubdomain(qualifiedDomain, subdomain));
  }

  getSubdomain() {
    const domain = this.getDomain();
    if (!domain) return '';
    const parts = domain.split('.');
    return parts.length > 2 ? parts[0] : '';
  }

  isSubdomainOfDomain(domain) {
    return URIAbstractBase.isDomainSubdomainOfDomain(this.getDomain(), domain, this.$9);
  }

  static isDomainSubdomainOfDomain(domain1, domain2, deserializer) {
    if (!domain1 || !domain2) return false;
    if (domain1.endsWith(domain2)) {
      const separator = domain1.length - domain2.length - 1;
      if (separator === -1 || domain1[separator] === '.') {
        const uri = new URIAbstractBase(null, deserializer);
        uri.setDomain(domain2);
        return URIAbstractBase.isValid(uri, deserializer);
      }
    }
    return false;
  }
}
