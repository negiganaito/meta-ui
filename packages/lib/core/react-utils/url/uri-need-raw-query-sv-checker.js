import { PHPQuerySerializer } from './php-query-serializer';

const ALLOWED_PROTOCOLS = ['http', 'https'];

function isUriNeedRawQuery(uri) {
  if (!uri) return false;

  let parsedUri;
  if (uri instanceof URIBase) {
    parsedUri = uri;
  } else {
    parsedUri = URIBase.tryParse(uri, PHPQuerySerializer);
  }

  if (!parsedUri) return false;

  const protocol = parsedUri.getProtocol();
  if (!ALLOWED_PROTOCOLS.includes(protocol)) return false;

  return isDomainNeedRawQuery(parsedUri.getDomain());
}

function isDomainNeedRawQuery(domain) {
  if (!domain) return false;

  return UriNeedRawQuerySVConfig.uris.some((configUri) =>
    URIBase.isDomainSubdomainOfDomain(domain, configUri, PHPQuerySerializer),
  );
}

export const UriNeedRawQuerySVChecker = { isDomainNeedRawQuery, isUriNeedRawQuery };
