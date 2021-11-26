/**
 * @module analytics/utils/defaults
 * @private
 */

import { PACKAGE_NAME, PACKAGE_VERSION } from './constants';
import parse, { qs } from 'url-parse';

/*
 * Returns an object with default context properties.
 */
export const getContextDefaults = () => {
  return {
    library: {
      version: PACKAGE_VERSION,
      name: PACKAGE_NAME,
    },
  };
};

/*
 * Returns an object with default page properties.
 */
export const getPageDefaults = () => {
  if (typeof window === 'undefined') {
    return {};
  }

  return {
    location: parse(window.location.href, true),
    title: document.title,
    referrer: document.referrer,
  };
};

/**
 * Stringifies query objects obtained by parsing a url string with url-parse's parse method.
 * It uses the qs named export from url-parse (that is used by the url-parse's parse method internally to build the query object)
 * to stringify the passed in query object.
 *
 * @param {object} query - Query object to stringify.
 *
 * @returns {string} - Returns the query string object stringified.
 *
 * @example
 * Input query object
 * {
 *   colors: '3|11',
 *   categories: 187345
 * }
 * Output query string
 * '?colors=3|11&categories=187345'
 * }
 */
export const stringifyQuery = query => {
  return qs.stringify(query, true);
};
