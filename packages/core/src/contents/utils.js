/**
 * Contents utils.
 *
 * @module contents/utils
 * @category Contents
 * @subcategory Utils
 */

import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

/**
 * Constant that represent all possible static values to apply to an environment code variable.
 *
 * @type {object}
 */
export const ENVIRONMENT_CODES = {
  LIVE: 'live',
  PREVIEW: 'preview',
};

/**
 * Build a hash with query object received to identify contentGroups, when searching for contents.
 *
 * @function
 *
 * @param {object} query - Object with query parameters applied to search contents.
 * @param {string | string[]} [query.codes] - List of codes that representing the content code (about-us|today-news|header|productId...).
 * @param {object} [query.contentTypeCode] - The content type unique code (page|post|menu|pages|posts|widgets|waterproof...).
 * @param {object} [query.pageSize] - Size of each page, as a number between 1 and 180. The default is 60.
 *
 * @returns {string} - Hash built to identify a content group.
 *
 * @example
 * const contentHash = buildContentGroupHash({ codes: 'about', contentTypeCode: 'pages'});
 * Result of contentGroupHash === 'pages!about';
 */
export const buildContentGroupHash = query => {
  if (
    isEmpty(query) ||
    (!get(query, 'contentTypeCode') && !get(query, 'codes'))
  ) {
    return '';
  }

  const contentType = get(query, 'contentTypeCode', 'all');
  const codes = get(query, 'codes', 'all');
  const pageSize = get(query, 'pageSize', '');

  return `${contentType}!${codes}${pageSize && `!${pageSize}`}`;
};

/**
 * Build a hash with query object received to identify the type and page of the metadata selected.
 *
 * @function
 *
 * @param {object} query - Object with query parameters applied to search for metadata.
 * @param {object} query.path - The pathname of the location.
 * @param {object} [query.pageType] - The type of the page we are searching (pages|stories...).
 *
 * @returns {string} - Hash built to identify the metadata for a specific page and pageType.
 *
 * @example
 * const pathname = buildSEOPathname({ path: '/about', pageType: 'pages'});
 * Result of pathname === 'pages!/about';
 */
export const buildSEOPathname = query => {
  if (isEmpty(query) || !get(query, 'path')) {
    return '';
  }

  const pageType = get(query, 'pageType', 'all');

  return `${pageType}!${query.path}`;
};
