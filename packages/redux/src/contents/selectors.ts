/**
 * Contents selectors.
 */
import { type ContentEntity, getEntityById } from '../entities/index.js';
import {
  generateContentHash,
  generateSEOFilesHash,
  generateSEOPathname,
} from './utils.js';
import {
  getContentResult,
  getContentTypes as getContentTypesFromReducer,
  getSEOFiles,
  getSEOmetadata,
} from './reducer.js';
import type { ContentsState, Hash } from './types/index.js';
import type {
  GetSEOFilesQuery,
  GetSEOMetadataQuery,
  QueryCommercePages,
  QuerySearchContents,
} from '@farfetch/blackout-client';
import type { StoreState } from '../types/index.js';

/**
 * Retrieves the content result from a specific hash.
 *
 * @example
 * ```
 * import { getContentsByHash } from '@farfetch/blackout-redux';
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
 * Returns the error thrown by the fetchContents request, by query.
 *
 * @example
 * ```
 * import { getContentError } from '@farfetch/blackout-redux';
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
export const getContentError = (
  state: StoreState,
  query: QuerySearchContents | QueryCommercePages,
) => {
  const hash = generateContentHash(query);
  const contentByHash = getContentsByHash(state, hash);

  return contentByHash && contentByHash.error;
};

/**
 * Returns the loading condition to the fetchContents request, by query.
 *
 * @example
 * ```
 * import { isContentLoading } from '@farfetch/blackout-redux';
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
  query: QuerySearchContents | QueryCommercePages,
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
 * import { getContentByQuery } from '@farfetch/blackout-redux';
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
  query: QuerySearchContents | QueryCommercePages,
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
 * import { getContents } from '@farfetch/blackout-redux';
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
export const getContents = <T>(
  state: StoreState,
  query: QuerySearchContents | QueryCommercePages,
) => {
  const result = getContentByQuery(state, query);

  return (
    result &&
    (result.entries
      .map((hash: Hash) => getContent<T>(state, hash))
      .filter(Boolean) as ContentEntity<T>[])
  );
};

/**
 * Retrieves if the content has been fetched.
 *
 * Will return true if a fetch for a certain content entry
 * has been made that returned either successfully or failed
 * and false otherwise.
 *
 * @example
 * ```
 * import { isContentFetched } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     isFetched: isContentFetched(state)
 * });
 * ```
 * @param state - Application state.
 *
 * @returns isFetched status of the content.
 */
export const isContentFetched = (
  state: StoreState,
  query: QuerySearchContents | QueryCommercePages,
) =>
  (!!getContentByQuery(state, query) || !!getContentError(state, query)) &&
  !isContentLoading(state, query);

/**
 * Retrieves an array with the content types available obtained
 * from the `fetchContentTypes` action.
 *
 * @example
 * ```
 * import { getContentTypes } from '@farfetch/blackout-redux';
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
export const getContentTypes = (state: StoreState) =>
  getContentTypesFromReducer(state.contents as ContentsState).result;

/**
 * Returns the error thrown to the fetchSEOMetadata request.
 *
 * @example
 * ```
 * import { getSEOMetadataError } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = (state, { query }) => ({
 *     seoError: getSEOMetadataError(state, query)
 * });
 *
 * ```
 *
 * @param state - Application state.
 * @param query - Query applied to search the contents.
 *
 * @returns - Content error.
 */
export const getSEOMetadataError = (
  state: StoreState,
  query: GetSEOMetadataQuery,
) => {
  const pathname = generateSEOPathname(query);
  const error = getSEOmetadata(state.contents as ContentsState).error;

  return error && error[pathname];
};

/**
 * Returns the loading status to the fetchSEOMetadata request.
 *
 * @example
 * ```
 * import { isSEOMetadataLoading } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = (state, { query }) => ({
 *     isSEOMetadataLoading: isSEOMetadataLoading(state, query)
 * });
 *
 * ```
 *
 * @param state - Application state.
 * @param query - Query applied to search the contents.
 *
 * @returns - If the content is loading or not.
 */
export const isSEOMetadataLoading = (
  state: StoreState,
  query: GetSEOMetadataQuery,
) => {
  const pathname = generateSEOPathname(query);

  return getSEOmetadata(state.contents as ContentsState).isLoading[pathname];
};

/**
 * Returns the isFetched status to the fetchSEOMetadata request.
 *
 * @example
 * ```
 * import { isSEOMetadataFetched } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = (state, { query }) => ({
 *     isSEOMetadataFetched: isSEOMetadataFetched(state, query)
 * });
 *
 * ```
 *
 * @param state - Application state.
 * @param query - Query applied to search the contents.
 *
 * @returns - If the content is loading or not.
 */
export const isSEOMetadataFetched = (
  state: StoreState,
  query: GetSEOMetadataQuery,
) => {
  const pathname = generateSEOPathname(query);

  return (
    (!!getSEOmetadata(state.contents as ContentsState).result?.[pathname] ||
      !!getSEOMetadataError(state, query)) &&
    !isSEOMetadataLoading(state, query)
  );
};

/**
 * Returns the metadata content of that page.
 *
 * @example
 * ```
 * import { getSEOMetadataResult } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = (state, { query }) => ({
 *     seo: getSEOMetadataResult(state, query)
 * });
 *
 * ```
 *
 * @param state - Application state.
 * @param query - Query applied to search for the metadata.
 *
 * @returns - All metadata for that page.
 */
export const getSEOMetadataResult = (
  state: StoreState,
  query: GetSEOMetadataQuery,
) => {
  const pathname = generateSEOPathname(query);
  const result = getSEOmetadata(state.contents as ContentsState).result;

  return result && result[pathname];
};

/**
 * Returns a specific content by its id.
 *
 * @param state - Application state.
 * @param hash  - Content hash.
 *
 * @returns Content normalized.
 */
export const getContent = <T>(state: StoreState, hash: string) =>
  getEntityById(state, 'contents', hash) as ContentEntity<T> | undefined;

/**
 * Returns the error thrown to the getSEOFiles request.
 *
 * @example
 * ```
 * import { getSEOFilesError } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = (state, { query }) => ({
 *     seoFilesError: getSEOFilesError(state, query)
 * });
 *
 * ```
 *
 * @param state - Application state.
 * @param query - Query applied to search the SEO Files.
 *
 * @returns - Content error.
 */
export const getSEOFilesError = (
  state: StoreState,
  query: GetSEOFilesQuery,
) => {
  const hash = generateSEOFilesHash(query);
  const error = getSEOFiles(state.contents as ContentsState).error;

  return error && error[hash];
};

/**
 * Returns the loading status to the getSEOFiles request.
 *
 * @example
 * ```
 * import { areSEOFilesLoading } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = (state, { query }) => ({
 *     areSEOMetadataLoading: areSEOFilesLoading(state, query)
 * });
 *
 * ```
 *
 * @param state - Application state.
 * @param query - Query applied to search the SEO Files.
 *
 * @returns - If the content is loading or not.
 */
export const areSEOFilesLoading = (
  state: StoreState,
  query: GetSEOFilesQuery,
) => {
  const hash = generateSEOFilesHash(query);

  return !!getSEOFiles(state.contents as ContentsState).isLoading[hash];
};

/**
 * Returns the isFetched status to the getSEOFiles request.
 *
 * @example
 * ```
 * import { areSEOFilesFetched } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = (state, { query }) => ({
 *     areSEOMetadataFetched: areSEOFilesFetched(state, query)
 * });
 *
 * ```
 *
 * @param state - Application state.
 * @param query - Query applied to search the SEO Files.
 *
 * @returns - If the SEO Files is loading or not.
 */
export const areSEOFilesFetched = (
  state: StoreState,
  query: GetSEOFilesQuery,
) => {
  const hash = generateSEOFilesHash(query);

  return (
    (!!getSEOFiles(state.contents as ContentsState).result?.[hash] ||
      !!getSEOFilesError(state, query)) &&
    !areSEOFilesLoading(state, query)
  );
};

/**
 * Returns the SEO Files of that page.
 *
 * @example
 * ```
 * import { getSEOFilesResult } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = (state, { query }) => ({
 *     seo: getSEOFilesResult(state, query)
 * });
 *
 * ```
 *
 * @param state - Application state.
 * @param query - Query applied to search for the SEO Files.
 *
 * @returns - All SEO Files for that page.
 */
export const getSEOFilesResult = (
  state: StoreState,
  query: GetSEOFilesQuery,
) => {
  const hash = generateSEOFilesHash(query);
  const result = getSEOFiles(state.contents as ContentsState).result;

  return result && result[hash];
};
