import generateSearchDidYouMeanHash from '../helpers/generateSearchDidYouMeanHash.js';
import type { GetSearchDidYouMeanQuery } from '@farfetch/blackout-client';
import type { SearchHash as Hash } from '../types/index.js';
import type { StoreState } from '../../types/index.js';

/*
 * @param state - Application state.
 * @param hash  - Hash key for each content.
 *
 * @returns - Content from a specific hash.
 */
const getContentByHash = (state: StoreState, hash: Hash) =>
  state.search?.didYouMean[hash];

/**
 * Retrieves the error thrown by current search term.
 *
 * @example
 * ```
 * import { getSearchDidYouMeanError } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     error: getSearchDidYouMeanError(state, query)
 * });
 *
 * ```
 *
 * @param state - Application state.
 * @param query - Get search did you mean query.
 *
 * @returns Search did you mean request error.
 */
export const getSearchDidYouMeanError = (
  state: StoreState,
  query: GetSearchDidYouMeanQuery,
) => {
  const hash = generateSearchDidYouMeanHash(query);

  return getContentByHash(state, hash)?.error;
};

/**
 * Retrieves the loading condition from current search term.
 *
 * @example
 * ```
 * import { isSearchDidYouMeanLoading } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     isLoading: isSearchDidYouMeanLoading(state, query)
 * });
 *
 * ```
 *
 * @param state - Application state.
 *
 * @returns Whether a search term response is loading or not.
 */
export const isSearchDidYouMeanLoading = (
  state: StoreState,
  query: GetSearchDidYouMeanQuery,
) => {
  const hash = generateSearchDidYouMeanHash(query);

  return getContentByHash(state, hash)?.isLoading;
};

/**
 * Retrieves the facets of a specific search for did you mean.
 *
 * @example
 * ```
 * import { getSearchDidYouMeanResult } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     result: getSearchDidYouMeanResult(state, query)
 * });
 *
 * ```
 *
 * @param state - Application state.
 * @param query - Get search did you mean query.
 *
 * @returns Facets of a specific search.
 */
export const getSearchDidYouMeanResult = (
  state: StoreState,
  query: GetSearchDidYouMeanQuery,
) => {
  const hash = generateSearchDidYouMeanHash(query);

  return getContentByHash(state, hash)?.result;
};

/**
 * Retrieves if the search did you mean has been fetched.
 *
 * Will return true if a fetch request
 * has been made that returned either successfully or failed
 * and false otherwise.
 *
 * @example
 * ```
 * import { isSearchDidYouMeanFetched } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     isFetched: isSearchDidYouMeanFetched(state)
 * });
 * ```
 * @param state - Application state.
 * @param query - Get search did you mean query.
 *
 * @returns isFetched status of the search did you mean.
 */
export const isSearchDidYouMeanFetched = (
  state: StoreState,
  query: GetSearchDidYouMeanQuery,
) =>
  (!!getSearchDidYouMeanResult(state, query) ||
    !!getSearchDidYouMeanError(state, query)) &&
  !isSearchDidYouMeanLoading(state, query);
