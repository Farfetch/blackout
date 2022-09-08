import type { SearchHash as Hash } from '../types';
import type { StoreState } from '../../types';

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
 *     error: getSearchSuggestionsError(state)
 * });
 *
 * ```
 *
 * @param state - Application state.
 *
 * @returns Search error.
 */
export const getSearchSuggestionsError = (state: StoreState, hash: Hash) =>
  getContentByHash(state, hash)?.error;

/**
 * Retrieves the loading condition from current search term.
 *
 * @example
 * ```
 * import { areSearchSuggestionsLoading } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     isLoading: areSearchSuggestionsLoading(state, hash)
 * });
 *
 * ```
 *
 * @param state - Application state.
 *
 * @returns Whether a search term response is loading or not.
 */
export const areSearchSuggestionsLoading = (state: StoreState, hash: Hash) =>
  getContentByHash(state, hash)?.isLoading;

/**
 * Retrieves the current query applied to get suggestions.
 *
 * @example
 * ```
 * import { getSearchSuggestionsQuery } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     query: getSearchSuggestionsQuery(state, hash)
 * });
 *
 * ```
 *
 * @param state - Application state.
 *
 * @returns The current query.
 */
export const getSearchSuggestionsQuery = (state: StoreState, hash: Hash) =>
  getContentByHash(state, hash)?.query;
/**
 * Retrieves the suggestions of a specific search.
 *
 * @example
 * ```
 * import { getSearchSuggestionsResult } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     suggestions: getSearchSuggestionsResult(state, hash)
 * });
 *
 * ```
 *
 * @param state - Application state.
 *
 * @returns Search suggestions.
 */
export const getSearchSuggestionsResult = (state: StoreState, hash: Hash) =>
  getContentByHash(state, hash)?.result;

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
 *
 * @returns isFetched status of the search suggestions.
 */
export const areSearchSuggestionsFetched = (state: StoreState, hash: Hash) =>
  (!!getSearchSuggestionsResult(state, hash) ||
    !!getSearchSuggestionsError(state, hash)) &&
  !areSearchSuggestionsLoading(state, hash);
