import type { SearchHash as Hash } from '../types';
import type { StoreState } from '../../types';

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
 *     error: getSearchDidYouMeanError(state, hash)
 * });
 *
 * ```
 *
 * @param state - Application state.
 *
 * @returns Search error.
 */
export const getSearchDidYouMeanError = (state: StoreState, hash: Hash) =>
  getContentByHash(state, hash)?.error;

/**
 * Retrieves the loading condition from current search term.
 *
 * @example
 * ```
 * import { isSearchDidYouMeanLoading } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     isLoading: isSearchDidYouMeanLoading(state, hash)
 * });
 *
 * ```
 *
 * @param state - Application state.
 *
 * @returns Whether a search term response is loading or not.
 */
export const isSearchDidYouMeanLoading = (state: StoreState, hash: Hash) =>
  getContentByHash(state, hash)?.isLoading;

/**
 * Retrieves the current query applied to get did you mean results.
 *
 * @example
 * ```
 * import { getSearchDidYouMeanQuery } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     query: getSearchDidYouMeanQuery(state, hash)
 * });
 *
 * ```
 *
 * @param state - Application state.
 *
 * @returns The current query.
 */
export const getSearchDidYouMeanQuery = (state: StoreState, hash: Hash) =>
  getContentByHash(state, hash)?.query;

/**
 * Retrieves the facets of a specific search for did you mean.
 *
 * @example
 * ```
 * import { getSearchDidYouMeanResult } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     result: getSearchDidYouMeanResult(state, hash)
 * });
 *
 * ```
 *
 * @param state - Application state.
 *
 * @returns Facets of a specific search.
 */
export const getSearchDidYouMeanResult = (state: StoreState, hash: Hash) =>
  getContentByHash(state, hash)?.result;

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
 *
 * @returns isFetched status of the search did you mean.
 */
export const isSearchDidYouMeanFetched = (state: StoreState, hash: Hash) =>
  (!!getSearchDidYouMeanResult(state, hash) ||
    !!getSearchDidYouMeanError(state, hash)) &&
  !isSearchDidYouMeanLoading(state, hash);
