import * as fromSearchIntentsReducer from '../reducer/searchIntents';
import type { BlackoutError } from '@farfetch/blackout-client/types';
import type { SearchIntents } from '@farfetch/blackout-client/search/types';
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
export const getSearchIntentsError = (
  state: StoreState,
): BlackoutError | null =>
  fromSearchIntentsReducer.getError(state.search.intents);

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
  fromSearchIntentsReducer.getIsLoading(state.search.intents);

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
export const getSearchIntentsResult = (
  state: StoreState,
): SearchIntents | null =>
  fromSearchIntentsReducer.getResult(state.search.intents);