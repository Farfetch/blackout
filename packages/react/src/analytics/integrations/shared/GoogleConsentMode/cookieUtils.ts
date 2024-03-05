import { PACKAGE_NAME } from '../../../constants.js';

export const GCM_SHARED_COOKIE_NAME = `${PACKAGE_NAME}__gcm_shared_consent_mode`;

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

export function setCookie(name: string, value: string, domain = getDomain()) {
  document.cookie = name + '=' + (value || '') + '; path=/ ; domain=' + domain;
}
