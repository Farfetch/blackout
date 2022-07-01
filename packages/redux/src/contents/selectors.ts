/**
 * Contents selectors.
 */
import { generateContentHash, generateSEOPathname } from './utils';
import { getContent } from '../entities';
import { getContentResult, getContentTypes, getSEOmetadata } from './reducer';
import type { ContentEntries, QuerySEO } from '@farfetch/blackout-client';
import type { ContentsState, Hash, QueryContentHash } from './types';
import type { StoreState } from '../types';

/**
 * Retrieves the content result from a specific hash.
 *
 * @example
 * ```
 * import { getContentsByHash } from '@bw/redux/contents';
 *
 * const mapStateToProps = (state, { hash }) => ({
 *     result: getContentsByHash(state, hash)
 * });
 *
 * ```
 *
 * @param state - Application state.
 * @param hash  - Hash key for each content.
 *
 * @returns - Content from a specific hash.
 */
export const getContentsByHash = (state: StoreState, hash: Hash) =>
  getContentResult(state.contents as ContentsState)[hash];

/**
 * Returns the error thrown by the getContent request, by query.
 *
 * @example
 * ```
 * import { getContentError } from '@farfetch/blackout-redux/contents';
 *
 * const mapStateToProps = (state, { query }) => ({
 * error: getContentError(state, query)
 * });
 * ```
 *
 * @param state - Application state.
 * @param query - Query applied to search the contents.
 *
 * @returns - Content error.
 */
export const getContentError = (state: StoreState, query: QueryContentHash) => {
  const hash = generateContentHash(query);
  const contentByHash = getContentsByHash(state, hash);

  return contentByHash && contentByHash.error;
};

/**
 * Returns the loading condition to the getContent request, by query.
 *
 * @example
 * ```
 * import { isContentLoading } from '@farfetch/blackout-redux/contents';
 *
 * const mapStateToProps = (state, { query }) => ({
 * isLoading: isContentLoading(state, query)
 * });
 * ```
 *
 * @param state - Application state.
 * @param query - Query applied to search the contents.
 *
 * @returns - If the content is loading or not.
 */
export const isContentLoading = (
  state: StoreState,
  query: QueryContentHash,
) => {
  const hash = generateContentHash(query);
  const contentByHash = getContentsByHash(state, hash);

  return contentByHash && contentByHash.isLoading;
};

/**
 * Find the content corresponding to a specific query.
 *
 * @example
 * ```
 * import { getContentByQuery } from '@bw/redux/contents';
 *
 * const mapStateToProps = (state, { query }) => ({
 *     contentEntry: getContentByQuery(state, query)
 * });
 *
 * ```
 *
 * @param state - Application state.
 * @param query - Query applied to search the contents.
 *
 * @returns - Content entry that aggregates all contents for the query received.
 */
export const getContentByQuery = (
  state: StoreState,
  query: QueryContentHash,
) => {
  const hash = generateContentHash(query);
  const contentByHash = getContentsByHash(state, hash);

  return contentByHash && contentByHash.result;
};

/**
 * Retrieves the contents result from a certain content entry retrieved by its
 * query/hash.
 *
 * @example
 * ```
 * import { getContents } from '@farfetch/blackout-redux/contents';
 *
 * const mapStateToProps = (state, { query }) => ({
 *     contents: getContents(state, query)
 * });
 *
 * ```
 *
 * @param state - Application state.
 * @param query - Query applied to search the contents.
 *
 * @returns - All the contents for the given content entry.
 */
export const getContents = (state: StoreState, query: QueryContentHash) => {
  const result = getContentByQuery(state, query);

  return (
    result &&
    (result.entries
      .map((hash: Hash) => getContent(state, hash))
      .filter(Boolean) as ContentEntries[])
  );
};

/**
 * Retrieves an array with the content types available.
 *
 * @example
 * ```
 * import { getContentTypes } from '@farfetch/blackout-redux/contents';
 *
 * const mapStateToProps = state => ({
 *      contentTypes: getContentTypes(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns - All the content types.
 */
export const getAllContentTypes = (state: StoreState) =>
  getContentTypes(state.contents as ContentsState).result;

/**
 * Returns the error thrown to the getSEO request.
 *
 * @example
 * ```
 * import { getSEOError } from '@farfetch/blackout-redux/contents';
 *
 * const mapStateToProps = (state, { query }) => ({
 *     seoError: getSEOError(state, query)
 * });
 *
 * ```
 *
 * @param state - Application state.
 * @param query - Query applied to search the contents.
 *
 * @returns - Content error.
 */
export const getSEOError = (state: StoreState, query: QuerySEO) => {
  const pathname = generateSEOPathname(query);
  const error = getSEOmetadata(state.contents as ContentsState).error;

  return error && error[pathname];
};

/**
 * Returns the loading status to the getSEO request.
 *
 * @example
 * ```
 * import { isSEOLoading } from '@farfetch/blackout-redux/contents';
 *
 * const mapStateToProps = (state, { query }) => ({
 *     isSEOLoading: isSEOLoading(state, query)
 * });
 *
 * ```
 *
 * @param state - Application state.
 * @param query - Query applied to search the contents.
 *
 * @returns - If the content is loading or not.
 */
export const isSEOLoading = (state: StoreState, query: QuerySEO) => {
  const pathname = generateSEOPathname(query);

  return getSEOmetadata(state.contents as ContentsState).isLoading[pathname];
};

/**
 * Returns the metadata content of that page.
 *
 * @example
 * ```
 * import { getSEO } from '@farfetch/blackout-redux/contents';
 *
 * const mapStateToProps = (state, { query }) => ({
 *     seo: getSEO(state, query)
 * });
 *
 * ```
 *
 * @param state - Application state.
 * @param query - Query applied to search for the metadata.
 *
 * @returns - All metadata for that page.
 */
export const getSEO = (state: StoreState, query: QuerySEO) => {
  const pathname = generateSEOPathname(query);
  const result = getSEOmetadata(state.contents as ContentsState).result;

  return result && result[pathname];
};
