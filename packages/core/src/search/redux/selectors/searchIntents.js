import * as fromSearchIntentsReducer from '../reducer/searchIntents';

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
 * import { getSearchIntentsError } from '@farfetch/blackout-core/search/redux';
 *
 * const mapStateToProps = state => ({
 *     error: getSearchIntentsError(state)
 * });
 *
 */
export const getSearchIntentsError = state =>
  fromSearchIntentsReducer.getError(state.search.intents);

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
 * import { areSearchIntentsLoading } from '@farfetch/blackout-core/search/redux';
 *
 * const mapStateToProps = state => ({
 *     isLoading: areSearchIntentsLoading(state)
 * });
 *
 */
export const areSearchIntentsLoading = state =>
  fromSearchIntentsReducer.getIsLoading(state.search.intents);

/**
 * Retrieves the result of a specific search.
 *
 * @memberof module:search/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {?object} Search result.
 *
 * @example
 * import { getSearchIntentsResult } from '@farfetch/blackout-core/search/redux';
 *
 * const mapStateToProps = state => ({
 *     result: getSearchIntentsResult(state)
 * });
 *
 */
export const getSearchIntentsResult = state =>
  fromSearchIntentsReducer.getResult(state.search.intents);
