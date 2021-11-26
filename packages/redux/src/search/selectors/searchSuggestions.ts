import * as fromSearchSuggestionsReducer from '../reducer/searchSuggestions';
import type { Error } from '@farfetch/blackout-client/types';
import type {
  SearchSuggestion,
  SearchSuggestionsQuery,
} from '@farfetch/blackout-client/search/types';
import type { StoreState } from '../../types';

/**
 * Retrieves the error thrown by current search term.
 *
 * @memberof module:search/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {?object} Search error.
 *
 * @example
 * import { getSearchSuggestionsError } from '@farfetch/blackout-redux/search';
 *
 * const mapStateToProps = state => ({
 *     error: getSearchSuggestionsError(state)
 * });
 *
 */
export const getSearchSuggestionsError = (state: StoreState): Error | null =>
  fromSearchSuggestionsReducer.getError(state.search.suggestions);

/**
 * Retrieves the loading condition from current search term.
 *
 * @memberof module:search/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Whether a search term response is loading or not.
 *
 * @example
 * import { areSearchSuggestionsLoading } from '@farfetch/blackout-redux/search';
 *
 * const mapStateToProps = state => ({
 *     isLoading: areSearchSuggestionsLoading(state)
 * });
 *
 */
export const areSearchSuggestionsLoading = (state: StoreState): boolean =>
  fromSearchSuggestionsReducer.getIsLoading(state.search.suggestions);

/**
 * Retrieves the current query applied to get suggestions.
 *
 * @memberof module:search/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {?object} The current query.
 *
 * @example
 * import { getSearchSuggestionsQuery } from '@farfetch/blackout-redux/search';
 *
 * const mapStateToProps = state => ({
 *     query: getSearchSuggestionsQuery(state)
 * });
 *
 */
export const getSearchSuggestionsQuery = (
  state: StoreState,
): SearchSuggestionsQuery | null =>
  fromSearchSuggestionsReducer.getQuery(state.search.suggestions);

/**
 * Retrieves the suggestions of a specific search.
 *
 * @memberof module:search/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {?Array} Search suggestions.
 *
 * @example
 * import { getSearchSuggestionsResult } from '@farfetch/blackout-redux/search';
 *
 * const mapStateToProps = state => ({
 *     suggestions: getSearchSuggestionsResult(state)
 * });
 *
 */
export const getSearchSuggestionsResult = (
  state: StoreState,
): SearchSuggestion[] | null =>
  fromSearchSuggestionsReducer.getResult(state.search.suggestions);
