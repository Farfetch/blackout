/**
 * Designers utils.
 *
 * @module designers/actions
 * @category Designers
 * @subcategory Utils
 */

import { buildQueryStringFromObject } from '../helpers';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import parse from 'url-parse';

/**
 * Build a hash with subfolder and query to identify designers results.
 *
 * @function
 *
 * @example
 * const designerResultsHash = buildDesignersHash('/en-gb', {categoryId: '123'});
 * const designerResultsHash = buildDesignersHash('/en-gb', '?categoryId=123');
 * Result of designerResultsHash === '/en-gb?categoryId=123';
 * @param {string} subfolder - Current subfolder.
 * @param {object | string} query - Object or string with query parameters applied to a designers page.
 *
 * @returns {string} Hash builded to identify a designers page.
 */
export const buildDesignerResultHash = (subfolder, query) => {
  let finalQuery = {};

  if (isObject(query)) {
    finalQuery = query;
  }

  // If the query is a string should be transformed to an object,
  // with parse function from url-parse package. This is necessary because
  // on SSR the query is retrived from pathname catched from the model.
  //
  // Example:
  // const queryParams = '?categoryId=123';
  // const queryObj = parse(queryParams);
  // Result of queryObj === {categoryId: '123'};
  if (isString(query)) {
    finalQuery = parse(query, true).query;
  }

  const trailingSlash = subfolder && subfolder.charAt(0) === '/' ? '' : '/';

  return `${trailingSlash}${subfolder}${buildQueryStringFromObject(
    finalQuery,
  )}`;
};
