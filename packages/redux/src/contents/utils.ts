/**
 * Contents utils.
 */

import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import type {
  CommercePagesContent,
  ComponentType,
  Metadata,
} from '@farfetch/blackout-client/contents/types';
import type {
  CommercePagesContentNormalized,
  GenerateSEOPathnameQuery,
  QueryContentHash,
} from './types';

/**
 * Constant that represent all possible static values to apply to an environment
 * code variable.
 */
export const ENVIRONMENT_CODES = {
  LIVE: 'live',
  PREVIEW: 'preview',
};

/**
 * Generate a ranking number for each commerce page.
 *
 * @example
 * ```
 * const pageRanking = getPageRanking({ custom: { type: "listing" } });
 * Result of pageRanking === 0;
 * ```
 *
 * @param metadata - Metadata object with custom attributes.
 *
 * @returns Ranking number for a specific commerce page.
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
 * Method to check each page ranking and return a list of ranked commerce pages
 * ordered by the better one.
 *
 * @example
 * ```
 * const getCommercePagesRanked = getCommercePagesRanked({ entries: [...pages] });
 * Result of getCommercePagesRanked === { entries: [commercePagesWithRankProperty] };
 * ```
 *
 * @param result - Commerce page payload result.
 *
 * @returns - List of commerce pages ranked.
 */
const getCommercePagesRanked = (
  result: CommercePagesContentNormalized,
): CommercePagesContent => {
  const commercePagesWithRank = result.entries.map(page => ({
    ...page,
    ranking: getPageRanking(page.metadata),
  }));

  return commercePagesWithRank.sort((p, c) => c.ranking - p.ranking);
};

/**
 * Method to check each page ranking and return the better one.
 *
 * @example
 * ```
 * const defaultStrategy = getDefaultStrategy({ entries: [...pages] });
 * Result of defaultStrategy === { entries: [...bestRankedPage] };
 * ```
 *
 * @param result - Commerce page payload result.
 *
 * @returns Selected page with better ranking.
 */
export const getDefaultStrategy = (
  result: CommercePagesContentNormalized,
): CommercePagesContentNormalized => {
  const bestRankedPage = getCommercePagesRanked(result)[0];

  return {
    number: 1,
    totalPages: 1,
    totalItems: 1,
    entries: [bestRankedPage],
  };
};

/**
 * Method to return the main ranked commerce page with all components from other
 * pages without duplicates.
 *
 * @example
 * ```
 * const mergeStrategy = getMergeStrategy({ entries: [...pages] });
 * Result of mergeStrategy === { entries: [...mergedPages] };
 * ```
 *
 * @param result - Commerce page payload result.
 *
 * @returns Selected page with merged components.
 */
export const getMergeStrategy = (
  result: CommercePagesContentNormalized,
): CommercePagesContentNormalized => {
  const rankedCommercePages = getCommercePagesRanked(result);
  // Merge components inside the selected commerce page
  const mergedComponents: ComponentType[] = [];
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
    entries: [{ ...result.entries[0], components: mergedComponents }],
  };
};

/**
 * Method to calculate the ranking for commerce pages, according to the selected
 * strategy and returning only the selected one.
 *
 * @example
 * ```
 * const rankedPage = getRankedCommercePage({ entries: [...pages] }, 'merge');
 * Result of rankedPage === { entries: [...mergedPages] };
 * ```
 *
 * @param result   - Commerce page payload result.
 * @param strategy - The selected ranking strategy (E.g. 'default | merge').
 *
 * @returns Selected page with best ranking.
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
 * Build a hash with query object received to identify the type of content, when
 * searching for contents.
 *
 * @example
 * ```
 * const contentHash = generateContentHash({ codes: 'about', contentTypeCode: 'pages', 'target.language': 'en-US' });
 * Result of contentHash === 'pages!about!en-US';
 * ```
 *
 * @param query - Object with query parameters applied to search contents.
 *
 * @returns - Hash built to identify a content.
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
 * Build a hash with query object received to identify the page of the metadata
 * selected.
 *
 * @example
 * ```
 * const pathname = generateSEOPathname({ path: '/about', pageType: 'pages'});
 * Result of pathname === 'pages!/about';
 * ```
 *
 * @param query - Object with query parameters applied to search for metadata.
 *
 * @returns - Hash built to identify the metadata for a specific page and pageType.
 */
export const generateSEOPathname = (
  query: GenerateSEOPathnameQuery,
): string => {
  if (isEmpty(query) || !get(query, 'path')) {
    return '';
  }

  const pageType = get(query, 'pageType', 'all');

  return `${pageType}!${query.path}`;
};
