import { PACKAGE_NAME } from '../../../constants';

export const GCM_SHARED_COOKIE_NAME = `${PACKAGE_NAME}__gcm_shared_consent_mode`;

/**
 * Gets the parent domain from the window location.
 *
 * @returns {string} The domain calculated from the window location.
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
 * Sets a cookie with the passed name
 * and value and domain. If domain is not
 * passed, it will be calculated from the
 * window.location to be a parent a domain.
 *
 * @param {string} name - Cookie name.
 * @param {string} value - Cookie value.
 * @param {string} [domain=getDomain()] - Domain to set. If not passed, will use the parent domain from the hostname.
 */
export function setCookie(name, value, domain = getDomain()) {
  document.cookie = name + '=' + (value || '') + '; path=/ ; domain=' + domain;
}
