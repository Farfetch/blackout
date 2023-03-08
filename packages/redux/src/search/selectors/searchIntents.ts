import type { SearchHash as Hash } from '../types/index.js';
import type { StoreState } from '../../types/index.js';

/*
 * @param state - Application state.
 * @param hash  - Hash key for each content.
 *
 * @returns - Content from a specific hash.
 */
const getContentByHash = (state: StoreState, hash: Hash) =>
  state.search?.intents[hash];

/**
 * Retrieves the error thrown by current search term.
 *
 * @example
 * ```
 * import { getSearchIntentsError } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     error: getSearchIntentsError(state, hash)
 * });
 *
 * ```
 *
 * @param state - Application state.
 *
 * @returns Search error.
 */
export const getSearchIntentsError = (state: StoreState, hash: Hash) =>
  getContentByHash(state, hash)?.error;

/**
 * Retrieves the loading condition from current search term.
 *
 * @example
 * ```
 * import { areSearchIntentsLoading } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     isLoading: areSearchIntentsLoading(state, hash)
 * });
 *
 * ```
 *
 * @param state - Application state.
 *
 * @returns Whether a search term response is loading or not.
 */
export const areSearchIntentsLoading = (state: StoreState, hash: Hash) =>
  getContentByHash(state, hash)?.isLoading;

/**
 * Retrieves the current query applied to get intents results.
 *
 * @example
 * ```
 * import { getSearchIntentsQuery } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     query: getSearchIntentsQuery(state, hash)
 * });
 *
 * ```
 *
 * @param state - Application state.
 *
 * @returns The current query.
 */
export const getSearchIntentsQuery = (state: StoreState, hash: Hash) =>
  getContentByHash(state, hash)?.query;

/**
 * Retrieves the result of a specific search.
 *
 * @example
 * ```
 * import { getSearchIntentsResult } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     result: getSearchIntentsResult(state, hash)
 * });
 *
 * ```
 *
 * @param state - Application state.
 *
 * @returns Search result.
 */
export const getSearchIntentsResult = (state: StoreState, hash: Hash) =>
  getContentByHash(state, hash)?.result;

/**
 * Retrieves if the search intents has been fetched.
 *
 * Will return true if a fetch request
 * has been made that returned either successfully or failed
 * and false otherwise.
 *
 * @example
 * ```
 * import { areSearchIntentsFetched } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     isFetched: areSearchIntentsFetched(state)
 * });
 * ```
 * @param state - Application state.
 *
 * @returns isFetched status of the search intents.
 */
export const areSearchIntentsFetched = (state: StoreState, hash: Hash) =>
  (!!getSearchIntentsResult(state, hash) ||
    !!getSearchIntentsError(state, hash)) &&
  !areSearchIntentsLoading(state, hash);
