import { URL_HOST_REGEX } from './constants';

/**
 * Helper function to return the host from urls that are contained in a string.
 *
 * @param script - Script to analyze.
 *
 * @returns The extracted host, if any, from the passed in script.
 */
export function extractHostFromScript(script) {
  const match = URL_HOST_REGEX.exec(script);
  return match?.[1];
}
