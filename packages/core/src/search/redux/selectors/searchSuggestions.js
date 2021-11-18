import * as fromSearchSuggestionsReducer from '../reducer/searchSuggestions';

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
 * import { getSearchSuggestionsError } from '@farfetch/blackout-core/search/redux';
 *
 * const mapStateToProps = state => ({
 *     error: getSearchSuggestionsError(state)
 * });
 *
 */
export const getSearchSuggestionsError = state =>
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
 * import { areSearchSuggestionsLoading } from '@farfetch/blackout-core/search/redux';
 *
 * const mapStateToProps = state => ({
 *     isLoading: areSearchSuggestionsLoading(state)
 * });
 *
 */
export const areSearchSuggestionsLoading = state =>
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
 * import { getSearchSuggestionsQuery } from '@farfetch/blackout-core/search/redux';
 *
 * const mapStateToProps = state => ({
 *     query: getSearchSuggestionsQuery(state)
 * });
 *
 */
export const getSearchSuggestionsQuery = state =>
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
 * import { getSearchSuggestionsResult } from '@farfetch/blackout-core/search/redux';
 *
 * const mapStateToProps = state => ({
 *     suggestions: getSearchSuggestionsResult(state)
 * });
 *
 */
export const getSearchSuggestionsResult = state =>
  fromSearchSuggestionsReducer.getResult(state.search.suggestions);
