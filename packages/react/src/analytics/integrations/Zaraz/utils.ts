import { URL_HOST_REGEX } from './constants';

/**
 * Helper function to return the host from urls that are contained in a string.
 *
 * @param script - Script to analyze.
 *
 * @returns The extracted host, if any, from the passed in script.
 */
export function extractHostFromScript(script: string) {
  const match = URL_HOST_REGEX.exec(script);
  return match?.[1];
}

/**
 * Helper function to check if the hostname is from a local network or not.
 *
 * @param hostname - The hostname to analyze.
 *
 * @returns If the hostname is from a local network or not.
 */
export function isLocalNetwork(hostname: string) {
  if (!hostname) {
    return false;
  }

  return (
    ['localhost', '127.0.0.1', '', '::1'].includes(hostname) ||
    hostname.startsWith('192.168.') ||
    hostname.startsWith('10.0.') ||
    hostname.endsWith('.local')
  );
}
