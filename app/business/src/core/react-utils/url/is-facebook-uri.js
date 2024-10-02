let facebookDomainRegex = null;
const allowedProtocols = ['http', 'https'];

export function isFacebookURI(uri) {
  if (!facebookDomainRegex) {
    // eslint-disable-next-line prefer-regex-literals
    facebookDomainRegex = new RegExp('(^|\\.)facebook\\.com$', 'i');
  }

  if (uri.isEmpty() && uri.toString() !== '#') {
    return false;
  }

  const protocol = uri.getProtocol();
  const domain = uri.getDomain();

  return (!domain && !protocol) || (allowedProtocols.indexOf(protocol) !== -1 && facebookDomainRegex.test(domain));
}

isFacebookURI.setRegex = function (newRegex) {
  facebookDomainRegex = newRegex;
};
