import * as fromSearchIntentsReducer from '../reducer/searchIntents';
import type { Error } from '@farfetch/blackout-client/types';
import type { SearchIntents } from '@farfetch/blackout-client/search/types';
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
 * import { getSearchIntentsError } from '@farfetch/blackout-redux/search';
 *
 * const mapStateToProps = state => ({
 *     error: getSearchIntentsError(state)
 * });
 *
 */
export const getSearchIntentsError = (state: StoreState): Error | null =>
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
 * import { areSearchIntentsLoading } from '@farfetch/blackout-redux/search';
 *
 * const mapStateToProps = state => ({
 *     isLoading: areSearchIntentsLoading(state)
 * });
 *
 */
export const areSearchIntentsLoading = (state: StoreState): boolean =>
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
 * import { getSearchIntentsResult } from '@farfetch/blackout-redux/search';
 *
 * const mapStateToProps = state => ({
 *     result: getSearchIntentsResult(state)
 * });
 *
 */
export const getSearchIntentsResult = (
  state: StoreState,
): SearchIntents | null =>
  fromSearchIntentsReducer.getResult(state.search.intents);
