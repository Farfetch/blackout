import * as fromSearchSuggestionsReducer from '../reducer/searchSuggestions';
import type { BlackoutError } from '@farfetch/blackout-client/types';
import type {
  SearchSuggestion,
  SearchSuggestionsQuery,
} from '@farfetch/blackout-client/search/types';
import type { StoreState } from '../../types';

/**
 * Retrieves the error thrown by current search term.
 *
 * @example
 * ```
 * import { getSearchSuggestionsError } from '@farfetch/blackout-redux/search';
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
export const getSearchSuggestionsError = (
  state: StoreState,
): BlackoutError | null =>
  fromSearchSuggestionsReducer.getError(state.search.suggestions);

/**
 * Retrieves the loading condition from current search term.
 *
 * @example
 * ```
 * import { areSearchSuggestionsLoading } from '@farfetch/blackout-redux/search';
 *
 * const mapStateToProps = state => ({
 *     isLoading: areSearchSuggestionsLoading(state)
 * });
 *
 * ```
 *
 * @param state - Application state.
 *
 * @returns Whether a search term response is loading or not.
 */
export const areSearchSuggestionsLoading = (state: StoreState): boolean =>
  fromSearchSuggestionsReducer.getIsLoading(state.search.suggestions);

/**
 * Retrieves the current query applied to get suggestions.
 *
 * @example
 * ```
 * import { getSearchSuggestionsQuery } from '@farfetch/blackout-redux/search';
 *
 * const mapStateToProps = state => ({
 *     query: getSearchSuggestionsQuery(state)
 * });
 *
 * ```
 *
 * @param state - Application state.
 *
 * @returns The current query.
 */
export const getSearchSuggestionsQuery = (
  state: StoreState,
): SearchSuggestionsQuery | null =>
  fromSearchSuggestionsReducer.getQuery(state.search.suggestions);

/**
 * Retrieves the suggestions of a specific search.
 *
 * @example
 * ```
 * import { getSearchSuggestionsResult } from '@farfetch/blackout-redux/search';
 *
 * const mapStateToProps = state => ({
 *     suggestions: getSearchSuggestionsResult(state)
 * });
 *
 * ```
 *
 * @param state - Application state.
 *
 * @returns Search suggestions.
 */
export const getSearchSuggestionsResult = (
  state: StoreState,
): SearchSuggestion[] | null =>
  fromSearchSuggestionsReducer.getResult(state.search.suggestions);
