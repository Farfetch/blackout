/**
 * Designers utils.
 *
 * @module designers/utils
 * @category Designers
 * @subcategory Utils
 */

import { buildQueryStringFromObject } from '../helpers';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import parse from 'url-parse';
import type { GetDesignersQuery } from '@farfetch/blackout-client/designers/types';

export const DEFAULT_DESIGNER_RESULT_HASH = 'root';

/**
 * Build a hash with the query to identify designers results.
 *
 * @function
 *
 * @param {object | string} query - Object or string with query parameters applied to a designers page.
 *
 * @returns {string} Hash builded to identify a designers page.
 *
 * @example
 * const designerResultsHash = generateDesignerResultHash({ categoryId: '123' });
 * const designerResultsHash = generateDesignerResultHash('?categoryId=123');
 *
 * Result of designerResultsHash === '?categoryId=123';
 */
export const generateDesignerResultHash = (
  query?: GetDesignersQuery | string,
): string => {
  let finalQuery = {};

  if (isObject(query)) {
    finalQuery = query;
  }

  // If the query is a string, it should be transformed to an object with parse
  // function from `url-parse` package. This is necessary because on SSR the
  // query is retrieved from the model's pathname.
  //
  // Example:
  // const queryParams = '?categoryId=123';
  // const queryObj = parse(queryParams);
  //
  // Result of queryObj === { categoryId: '123' };
  if (isString(query)) {
    finalQuery = parse(query, true).query;
  }

  return buildQueryStringFromObject(finalQuery) || DEFAULT_DESIGNER_RESULT_HASH;
};
