/**
 * Contents utils.
 *
 * @module contents/utils
 * @category Contents
 * @subcategory Utils
 */

import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import type { CommercePagesContentNormalized, QueryContentHash } from './types';
import type { Metadata } from '@farfetch/blackout-client/contents/types';

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
 * Generate a ranking number for each commerce page.
 *
 * @function
 *
 * @param {object} metadata - Metadata object with custom attributes.
 * @returns {number} Ranking number for a specific commerce page.
 *
 * @example
 * const pageRanking = getPageRanking({ custom: { type: "listing" } });
 * Result of pageRanking === 0;
 */
export const getPageRanking = (metadata: Metadata): number => {
  let ranking = 0;
  const { gender, brand, category, priceType, id } = metadata.custom;

  // Return default ranking number when no data was returned from each commerce property.
  // We can't only check if it's empty from 'metadata.custom' because it could have other properties inside.
  if (!gender && !brand && !category && !priceType && !id) {
    return ranking;
  }

  const rankingGender = 10;
  const rankingBrand = 100;
  const rankingCategory = 10000;
  const rankingPriceType = 1000000000;
  const rankingId = 10000000000;

  Object.entries(metadata.custom).forEach(entry => {
    const [key, value] = entry;

    if (isEmpty(value)) {
      return ranking;
    }

    switch (key) {
      case 'gender':
        ranking += rankingGender;
        break;
      case 'brand':
        ranking += rankingBrand;
        break;
      case 'category':
        ranking += rankingCategory;
        break;
      case 'priceType':
        ranking += rankingPriceType;
        break;
      case 'id':
        ranking += rankingId;
        break;

      default:
        return ranking;
    }
  });

  return ranking;
};

/**
 * Method to check each page ranking and return the better one.
 *
 * @function
 *
 * @param {object} result - Commerce page payload result.
 * @returns {object} Selected page with better ranking.
 *
 * @example
 * const defaultStrategy = getDefaultStrategy({ entries: [...pages] });
 * Result of defaultStrategy === { entries: [...bestRankedPage] };
 */
export const getDefaultStrategy = (
  result: CommercePagesContentNormalized,
): CommercePagesContentNormalized => {
  const bestRankedPage = result.entries
    .map(page => ({
      ...page,
      ranking: getPageRanking(page.metadata),
    }))
    .reduce((p, c) => (p.ranking > c.ranking ? p : c));

  return {
    number: 1,
    totalPages: 1,
    totalItems: 1,
    entries: [bestRankedPage],
  };
};

/**
 * Method to return the main page with all components from other pages.
 *
 * @function
 *
 * @param {object} result - Commerce page payload result.
 * @returns {object} Selected page with merged components.
 *
 * @example
 * const mergeStrategy = getMergeStrategy({ entries: [...pages] });
 * Result of mergeStrategy === { entries: [...mergedPages] };
 */
export const getMergeStrategy = (
  result: CommercePagesContentNormalized,
): CommercePagesContentNormalized => {
  // Merge components inside the selected commerce page
  const mergedComponents = [];
  result.entries.forEach(content =>
    content.components.forEach(component => mergedComponents.push(component)),
  );

  return {
    number: 1,
    totalItems: 1,
    totalPages: 1,
    entries: [{ ...result.entries[0], components: mergedComponents }],
  };
};

/**
 * Method to calculate the ranking for commerce pages, according to the selected strategy
 * and returning only the selected one.
 *
 * @function
 *
 * @param {object} result - Commerce page payload result.
 * @param {string} [strategy] - The selected ranking strategy (E.g. 'default | merge').
 * @returns {object} Selected page with best ranking.
 *
 * @example
 * const rankedPage = getRankedCommercePage({ entries: [...pages] }, 'merge');
 * Result of rankedPage === { entries: [...mergedPages] };
 */
export const getRankedCommercePage = (
  result: CommercePagesContentNormalized,
  strategy?: string,
): CommercePagesContentNormalized => {
  switch (strategy) {
    case 'merge':
      return getMergeStrategy(result);
    default:
      return getDefaultStrategy(result);
  }
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
