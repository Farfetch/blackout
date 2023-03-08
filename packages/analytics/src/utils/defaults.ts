import { PACKAGE_NAME, PACKAGE_VERSION } from './constants.js';
import urlparse from 'url-parse';

/*
 * Returns an object with default context properties.
 */
export const getContextDefaults = (): {
  library: { version: string; name: string };
} => {
  return {
    library: {
      version: PACKAGE_VERSION,
      name: PACKAGE_NAME,
    },
  };
};

/**
 * Stringifies query objects obtained by parsing a url string with url-parse's
 * parse method. It uses the qs named export from url-parse (that is used by the
 * url-parse's parse method internally to build the query object) to stringify the
 * passed in query object.
 *
 * @example
 * ```
 * Input query object
 * \{
 *   colors: '3|11',
 *   categories: 187345
 * \}
 * Output query string
 * '?colors=3|11&categories=187345'
 * ```
 *
 * @param query - Query object to stringify.
 *
 * @returns Returns the query string object stringified.
 */

export const stringifyQuery = (
  query: Record<string, string | undefined>,
): string => {
  return urlparse.qs.stringify(query, true);
};
