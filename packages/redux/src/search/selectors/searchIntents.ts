import * as fromSearchIntentsReducer from '../reducer/searchIntents';
import type { SearchState } from '../types';
import type { StoreState } from '../../types';

/**
 * Retrieves the error thrown by current search term.
 *
 * @example
 * ```
 * import { getSearchIntentsError } from '@farfetch/blackout-redux/search';
 *
 * const mapStateToProps = state => ({
 *     error: getSearchIntentsError(state)
 * });
 *
 * ```
 *
 * @param state - Application state.
 *
 * @returns Search error.
 */
export const getSearchIntentsError = (state: StoreState) =>
  fromSearchIntentsReducer.getError((state.search as SearchState).intents);

/**
 * Retrieves the loading condition from current search term.
 *
 * @example
 * ```
 * import { areSearchIntentsLoading } from '@farfetch/blackout-redux/search';
 *
 * const mapStateToProps = state => ({
 *     isLoading: areSearchIntentsLoading(state)
 * });
 *
 * ```
 *
 * @param state - Application state.
 *
 * @returns Whether a search term response is loading or not.
 */
export const areSearchIntentsLoading = (state: StoreState): boolean =>
  fromSearchIntentsReducer.getIsLoading((state.search as SearchState).intents);

/**
 * Retrieves the result of a specific search.
 *
 * @example
 * ```
 * import { getSearchIntentsResult } from '@farfetch/blackout-redux/search';
 *
 * const mapStateToProps = state => ({
 *     result: getSearchIntentsResult(state)
 * });
 *
 * ```
 *
 * @param state - Application state.
 *
 * @returns Search result.
 */
export const getSearchIntentsResult = (state: StoreState) =>
  fromSearchIntentsReducer.getResult((state.search as SearchState).intents);
