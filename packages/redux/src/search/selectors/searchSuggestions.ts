import generateSearchSuggestionsHash from '../helpers/generateSearchSuggestionsHash.js';
import type { GetSearchSuggestionsQuery } from '@farfetch/blackout-client';
import type { SearchHash as Hash } from '../types/index.js';
import type { StoreState } from '../../types/index.js';

/*
 * @param state - Application state.
 * @param hash  - Hash key for each content.
 *
 * @returns - Content from a specific hash.
 */
const getContentByHash = (state: StoreState, hash: Hash) =>
  state.search?.suggestions[hash];

/**
 * Retrieves the error thrown by current search term.
 *
 * @example
 * ```
 * import { getSearchSuggestionsError } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     error: getSearchSuggestionsError(state, query)
 * });
 *
 * ```
 *
 * @param state - Application state.
 * @param query - Get search suggestions query.
 *
 * @returns Search error.
 */
export const getSearchSuggestionsError = (
  state: StoreState,
  query: GetSearchSuggestionsQuery,
) => {
  const hash = generateSearchSuggestionsHash(query);

  return getContentByHash(state, hash)?.error;
};

/**
 * Retrieves the loading condition from current search term.
 *
 * @example
 * ```
 * import { areSearchSuggestionsLoading } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     isLoading: areSearchSuggestionsLoading(state, query)
 * });
 *
 * ```
 *
 * @param state - Application state.
 * @param query - Get search suggestions query.
 *
 * @returns Whether a search term response is loading or not.
 */
export const areSearchSuggestionsLoading = (
  state: StoreState,
  query: GetSearchSuggestionsQuery,
) => {
  const hash = generateSearchSuggestionsHash(query);

  return getContentByHash(state, hash)?.isLoading;
};

/**
 * Retrieves the suggestions of a specific search.
 *
 * @example
 * ```
 * import { getSearchSuggestionsResult } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     suggestions: getSearchSuggestionsResult(state, query)
 * });
 *
 * ```
 *
 * @param state - Application state.
 * @param query - Get search suggestions query.
 *
 * @returns Search suggestions.
 */
export const getSearchSuggestionsResult = (
  state: StoreState,
  query: GetSearchSuggestionsQuery,
) => {
  const hash = generateSearchSuggestionsHash(query);

  return getContentByHash(state, hash)?.result;
};

/**
 * Retrieves if the search suggestions has been fetched.
 *
 * Will return true if a fetch request
 * has been made that returned either successfully or failed
 * and false otherwise.
 *
 * @example
 * ```
 * import { areSearchSuggestionsFetched } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     isFetched: areSearchSuggestionsFetched(state)
 * });
 * ```
 * @param state - Application state.
 * @param query - Get search suggestions query.
 *
 * @returns isFetched status of the search suggestions.
 */
export const areSearchSuggestionsFetched = (
  state: StoreState,
  query: GetSearchSuggestionsQuery,
) =>
  (!!getSearchSuggestionsResult(state, query) ||
    !!getSearchSuggestionsError(state, query)) &&
  !areSearchSuggestionsLoading(state, query);
