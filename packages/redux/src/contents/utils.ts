/**
 * Contents utils.
 *
 * @module contents/utils
 * @category Contents
 * @subcategory Utils
 */

import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import type { QueryContentHash } from './types';

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
 * Build a hash with query object received to identify the type of content, when searching for contents.
 *
 * @param   {object} query - Object with query parameters applied to search contents.
 *
 * @returns {string} - Hash built to identify a content.
 *
 * @example
 * const contentHash = generateContentHash({ codes: 'about', contentTypeCode: 'pages', target.language: 'en-US' });
 * Result of contentHash === 'pages!about!en-US';
 */
export const generateContentHash = (query: QueryContentHash): string => {
  if (
    isEmpty(query) ||
    (!get(query, 'contentTypeCode') && !get(query, 'codes'))
  ) {
    return '';
  }

  const contentType = get(query, 'contentTypeCode', 'all');
  const codes = get(query, 'codes', 'all');
  const targets = [
    get(query, 'target.benefits', ''),
    get(query, 'target.country', ''),
    get(query, 'target.contentzone', ''),
    get(query, 'target.language', ''),
  ]
    .filter(Boolean)
    .join();
  const pageSize = get(query, 'pageSize', '');
  const hash = [contentType, codes, targets, pageSize];

  return hash.filter(Boolean).join('!');
};

/**
 * Build a hash with query object received to identify the page of the metadata selected.
 *
 * @param   {object} query - Object with query parameters applied to search for metadata.
 * @param   {string} query.path - The pathname of the location.
 * @param   {string} query.pageType - The type of the page (pages|stories...).
 *
 * @returns {string} - Hash built to identify the metadata for a specific page and pageType.
 *
 * @example
 * const pathname = generateSEOPathname({ path: '/about', pageType: 'pages'});
 * Result of pathname === 'pages!/about';
 */
export const generateSEOPathname = (query: {
  path: string;
  pageType: string;
}): string => {
  if (isEmpty(query) || !get(query, 'path')) {
    return '';
  }

  const pageType = get(query, 'pageType', 'all');

  return `${pageType}!${query.path}`;
};
