import { PACKAGE_NAME } from '../../../constants';

export const GCM_SHARED_COOKIE_NAME = `${PACKAGE_NAME}__gcm_shared_consent_mode`;

/**
 *
 */
function getDomain() {
  const fullDomain = window.location.hostname;
  const domainParts = fullDomain.split('.');

  // Check if there is a subdomain
  if (domainParts.length > 1) {
    return (
      domainParts[domainParts.length - 2] +
      '.' +
      domainParts[domainParts.length - 1]
    );
  }

  return fullDomain;
}

/**
 * @param name - Cookie name.
 * @param value - Cookie value.
 * @param domain - Domain to set. If not passed, will use the parent domain from the hostname.
 */
export function setCookie(name, value, domain = getDomain()) {
  document.cookie = name + '=' + (value || '') + '; path=/ ; domain=' + domain;
}
