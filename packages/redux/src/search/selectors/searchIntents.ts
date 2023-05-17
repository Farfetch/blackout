import generateSearchIntentsHash from '../helpers/generateSearchIntentsHash.js';
import type { GetSearchIntentsQuery } from '@farfetch/blackout-client';
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
 *     error: getSearchIntentsError(state, query)
 * });
 *
 * ```
 * @param state - Application state.
 * @param query - Get search intents query.
 *
 * @returns Search error.
 */
export const getSearchIntentsError = (
  state: StoreState,
  query: GetSearchIntentsQuery,
) => {
  const hash = generateSearchIntentsHash(query);

  return getContentByHash(state, hash)?.error;
};

/**
 * Retrieves the loading condition from current search term.
 *
 * @example
 * ```
 * import { areSearchIntentsLoading } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     isLoading: areSearchIntentsLoading(state, query)
 * });
 *
 * ```
 *
 * @param state - Application state.
 * @param query - Get search intents query.
 *
 * @returns Whether a search term response is loading or not.
 */
export const areSearchIntentsLoading = (
  state: StoreState,
  query: GetSearchIntentsQuery,
) => {
  const hash = generateSearchIntentsHash(query);

  return getContentByHash(state, hash)?.isLoading;
};

/**
 * Retrieves the result of a specific search.
 *
 * @example
 * ```
 * import { getSearchIntentsResult } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     result: getSearchIntentsResult(state, query)
 * });
 *
 * ```
 *
 * @param state - Application state.
 * @param query - Get search intents query.
 *
 * @returns Search result.
 */
export const getSearchIntentsResult = (
  state: StoreState,
  query: GetSearchIntentsQuery,
) => {
  const hash = generateSearchIntentsHash(query);

  return getContentByHash(state, hash)?.result;
};

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
 * @param query - Get search intents query.
 *
 * @returns isFetched status of the search intents.
 */
export const areSearchIntentsFetched = (
  state: StoreState,
  query: GetSearchIntentsQuery,
) =>
  (!!getSearchIntentsResult(state, query) ||
    !!getSearchIntentsError(state, query)) &&
  !areSearchIntentsLoading(state, query);
