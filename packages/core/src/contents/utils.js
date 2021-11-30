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
 * Constant that represent all possible genders.
 *
 * @type {object}
 */
export const GENDER = {
  0: 'Woman',
  1: 'Man',
  2: 'Unisex',
  3: 'Kids',
};

/**
 * Constant that represent the price types available.
 *
 * @type {object}
 */
export const PRICETYPE = {
  0: 'Full Price',
  1: 'Sale',
  2: 'Private Sale',
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
export const getPageRanking = metadata => {
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

    switch (key) {
      case 'gender':
        ranking += !isEmpty(value) && rankingGender;
        break;
      case 'brand':
        ranking += !isEmpty(value) && rankingBrand;
        break;
      case 'category':
        ranking += !isEmpty(value) && rankingCategory;
        break;
      case 'priceType':
        ranking += !isEmpty(value) && rankingPriceType;
        break;
      case 'id':
        ranking += !isEmpty(value) && rankingId;
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
export const getDefaultStrategy = result => {
  const bestRankedPage = result.entries
    .map(page => ({
      ...page,
      ranking: getPageRanking(page.metadata),
    }))
    .reduce((p, c) => (p.ranking > c.ranking ? p : c), {});

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
export const getMergeStrategy = result => {
  // Select the main commerce page
  const selectedCommercePage = result.entries[0];

  // Merge components inside the selected commerce page
  return result.entries.reduce((acc, current) => ({
    number: 1,
    totalPages: 1,
    totalItems: 1,
    entries: [
      {
        ...selectedCommercePage,
        components: [].concat(acc.components, current.components),
      },
    ],
  }));
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
export const getRankedCommercePage = (result, strategy) => {
  switch (strategy) {
    case 'merge':
      return getMergeStrategy(result);
    default:
      return getDefaultStrategy(result);
  }
};

/**
 * Build a hash with query object received to identify contentGroups when searching for contents.
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
