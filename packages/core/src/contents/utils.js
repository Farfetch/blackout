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
  const metadataObj =
    typeof metadata.custom === 'string'
      ? JSON.parse(metadata.custom)
      : metadata.custom;
  const { gender, brand, category, priceType, id } = metadataObj;

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

  Object.entries(metadataObj).forEach(entry => {
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
 * Method to check each page ranking and return a list of ranked commerce pages ordered by the better one.
 *
 * @function
 *
 * @param {object} result - Commerce page payload result.
 * @returns {object[]} - List of commerce pages ranked.
 *
 * @example
 * const getCommercePagesRanked = getCommercePagesRanked({ entries: [...pages] });
 * Result of getCommercePagesRanked === { entries: [commercePagesWithRankProperty] };
 */
const getCommercePagesRanked = result => {
  const commercePagesWithRank = result.entries.map(page => ({
    ...page,
    ranking: getPageRanking(page.metadata),
  }));

  return commercePagesWithRank.sort((p, c) => c.ranking - p.ranking);
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
  const bestRankedPage = getCommercePagesRanked(result)[0];

  return {
    number: 1,
    totalPages: 1,
    totalItems: 1,
    entries: [bestRankedPage],
  };
};

/**
 * Method to return the main ranked commerce page with all components from other pages without duplicates.
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
  const rankedCommercePages = getCommercePagesRanked(result);
  // Merge components inside the selected commerce page
  const mergedComponents = [];

  rankedCommercePages.forEach(content =>
    content.components.forEach(component => {
      if (
        !mergedComponents.some(
          mergedComponent =>
            mergedComponent.customType === component.customType,
        )
      )
        mergedComponents.push(component);
    }),
  );

  return {
    number: 1,
    totalItems: 1,
    totalPages: 1,
    entries: [{ ...rankedCommercePages[0], components: mergedComponents }],
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
export const getRankedCommercePage = (result, strategy) => {
  result.entries.forEach(commerce => {
    if (typeof commerce?.metadata?.custom === 'string') {
      console.warn(`[Commerce Pages]: Seems you are trying to fetch legacy commerce page.
      Try to republish the commerce page to update data.`);
    }
  });

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
 * @param {number} [query.page] - Number of the page to get, starting at 1. The default is 1.
 * @param {number} [query.pageSize] - Size of each page, as a number between 1 and 180. The default is 60.
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
  const page = get(query, 'page', 1);
  const pageSize = get(query, 'pageSize', '');
  const pagesQuery = pageSize && `,${pageSize}`;

  return `${contentType}!${codes}!${page}${pagesQuery}`;
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

/**
 * Strip the slug to remove the subfolder and json=true.
 *
 * @param {string} slug - The slug of url.
 * @param {string} subfolder - The subforlder of url.
 *
 * @returns {string} - The slug without subfolder / json=true.
 */
export const stripSlugSubfolderJsonTrue = (slug, subfolder) => {
  let slugMetada = slug;

  if (subfolder !== '/') {
    slugMetada = slug.replace(subfolder, '');
  }

  // Remove json=true from slug
  return slugMetada.replace('?json=true', '').replace('&json=true', '');
};
