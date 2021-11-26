/**
 * Contents selectors.
 *
 * @module contents/selectors
 * @category Contents
 * @subcategory Selectors
 */
import { generateContentHash, generateSEOPathname } from './utils';
import { getContent } from '../entities';
import { getContentResult, getContentTypes, getSEOmetadata } from './reducer';
import type {
  GetAllContentTypes,
  GetContentByQuery,
  GetContentError,
  GetContents,
  GetContentsByHash,
  GetSEO,
  GetSEOError,
  Hash,
  IsContentLoading,
  IsSEOLoading,
  QueryContentHash,
  QuerySEO,
} from './types';
import type { StoreState } from '../types';

/**
 * Retrieves the content result from a specific hash.
 *
 * @memberof contents/selectors
 *
 * @param {object} state - Application state.
 * @param {string} hash - Hash key for each content.
 *
 * @returns {?object} - Content from a specific hash.
 *
 * @example
 * import { getContentsByHash } from '@bw/redux/contents';
 *
 * const mapStateToProps = (state, { hash }) => ({
 *     result: getContentsByHash(state, hash)
 * });
 *
 */
export const getContentsByHash = (
  state: StoreState,
  hash: Hash,
): GetContentsByHash => getContentResult(state.contents)[hash];

/**
 * Returns the error thrown by the getContent request, by query.
 *
 * @param {object} state - Application state.
 * @param {object} query - Query applied to search the contents.
 * @param {string} query.spaceCode - The space where the content belongs to (website|mobileapp|emailTool...).
 * @param {string} query.environmentCode - The environment identifier (live | preview).
 * @param {string} query.contentTypeCode - The content type unique code (page|post|menu|pages|posts|widgets|waterproof...).
 * @param {Array}  query.codes - List of codes that representing the content code (about-us|today-news|header|productId...).
 * @param {object} query.target - The targets and respective values that a content type is configured (contentzone:ROW | country:GB | language:en-GB | benefits:test).
 * @param {number} [query.page=1] - Number of the page to get, starting at 1. The default is 1.
 * @param {number} [query.pageSize=60] - Size of each page, as a number between 1 and 180. The default is 60.
 * @returns {?object} - Content error.
 * @example
 * import { getContentError } from '@farfetch/blackout-redux/contents';
 *
 * const mapStateToProps = (state, { query }) => ({
 * error: getContentError(state, query)
 * });
 */
export const getContentError = (
  state: StoreState,
  query: QueryContentHash,
): GetContentError => {
  const hash = generateContentHash(query);
  const contentByHash = getContentsByHash(state, hash);

  return contentByHash && contentByHash.error;
};

/**
 * Returns the loading condition to the getContent request, by query.
 *
 * @param {object} state - Application state.
 * @param {object} query - Query applied to search the contents.
 *
 * @returns {boolean} - If the content is loading or not.
 * @example
 * import { isContentLoading } from '@farfetch/blackout-redux/contents';
 *
 * const mapStateToProps = (state, { query }) => ({
 * isLoading: isContentLoading(state, query)
 * });
 */
export const isContentLoading = (
  state: StoreState,
  query: QueryContentHash,
): IsContentLoading => {
  const hash = generateContentHash(query);
  const contentByHash = getContentsByHash(state, hash);

  return contentByHash && contentByHash.isLoading;
};

/**
 * Find the content corresponding to a specific query.
 *
 * @param {object} state - Application state.
 * @param {object} query - Query applied to search the contents.
 *
 * @returns {object} - Content entry that aggregates all contents for the query received.
 *
 * @example
 * import { getContentByQuery } from '@bw/redux/contents';
 *
 * const mapStateToProps = (state, { query }) => ({
 *     contentEntry: getContentByQuery(state, query)
 * });
 *
 */
export const getContentByQuery = (
  state: StoreState,
  query: QueryContentHash,
): GetContentByQuery => {
  const hash = generateContentHash(query);
  const contentByHash = getContentsByHash(state, hash);

  return contentByHash && contentByHash.result;
};

/**
 * Retrieves the contents result from a certain content entry retrieved by its query/hash.
 *
 * @param {object} state - Application state.
 * @param {object} query - Query applied to search the contents.
 *
 * @returns {Array} - All the contents for the given content entry.
 *
 * @example
 * import { getContents } from '@farfetch/blackout-redux/contents';
 *
 * const mapStateToProps = (state, { query }) => ({
 *     contents: getContents(state, query)
 * });
 *
 */
export const getContents = (
  state: StoreState,
  query: QueryContentHash,
): GetContents => {
  const result = getContentByQuery(state, query);

  return result && result.entries.map((hash: Hash) => getContent(state, hash));
};

/**
 * Retrives an array with the content types available.
 *
 * @param {object} state - Application state.
 *
 * @returns {Array} - All the content types.
 *
 * @example
 * import { getContentTypes } from '@farfetch/blackout-redux/contents';
 *
 * const mapStateToProps = state => ({
 *      contentTypes: getContentTypes(state)
 * });
 */
export const getAllContentTypes = (state: StoreState): GetAllContentTypes =>
  getContentTypes(state.contents).result;

/**
 * Returns the error thrown to the getSEO request.
 *
 * @param {object} state - Application state.
 * @param {object} query - Query applied to search the contents.
 *
 * @returns {?object} - Content error.
 *
 * @example
 * import { getSEOError } from '@farfetch/blackout-redux/contents';
 *
 * const mapStateToProps = (state, { query }) => ({
 *     seoError: getSEOError(state, query)
 * });
 *
 */
export const getSEOError = (
  state: StoreState,
  query: QuerySEO,
): GetSEOError => {
  const pathname = generateSEOPathname(query);
  const error = getSEOmetadata(state.contents).error;

  return error && error[pathname];
};

/**
 * Returns the loading status to the getSEO request.
 *
 * @param {object} state - Application state.
 * @param {object} query - Query applied to search the contents.
 *
 * @returns {boolean} - If the content is loading or not.
 *
 * @example
 * import { isSEOLoading } from '@farfetch/blackout-redux/contents';
 *
 * const mapStateToProps = (state, { query }) => ({
 *     isSEOLoading: isSEOLoading(state, query)
 * });
 *
 */
export const isSEOLoading = (
  state: StoreState,
  query: QuerySEO,
): IsSEOLoading => {
  const pathname = generateSEOPathname(query);

  return getSEOmetadata(state.contents).isLoading[pathname];
};

/**
 * Returns the metadata content of that page.
 *
 * @param {object} state - Application state.
 * @param {object} query - Query applied to search for the metadata.
 *
 * @returns {object} - All metadata for that page.
 *
 * @example
 * import { getSEO } from '@farfetch/blackout-redux/contents';
 *
 * const mapStateToProps = (state, { query }) => ({
 *     seo: getSEO(state, query)
 * });
 *
 */
export const getSEO = (state: StoreState, query: QuerySEO): GetSEO => {
  const pathname = generateSEOPathname(query);
  const result = getSEOmetadata(state.contents).result;

  return result && result[pathname];
};
