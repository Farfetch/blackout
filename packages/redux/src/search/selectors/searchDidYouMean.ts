import * as fromSearchDidYouMeanReducer from '../reducer/searchDidYouMean';
import type { SearchState } from '../types';
import type { StoreState } from '../../types';

/**
 * Retrieves the error thrown by current search term.
 *
 * @example
 * ```
 * import { getSearchDidYouMeanError } from '@farfetch/blackout-redux/search';
 *
 * const mapStateToProps = state => ({
 *     error: getSearchDidYouMeanError(state)
 * });
 *
 * ```
 *
 * @param state - Application state.
 *
 * @returns Search error.
 */
export const getSearchDidYouMeanError = (state: StoreState) =>
  fromSearchDidYouMeanReducer.getError(
    (state.search as SearchState).didYouMean,
  );

/**
 * Retrieves the loading condition from current search term.
 *
 * @example
 * ```
 * import { isSearchDidYouMeanLoading } from '@farfetch/blackout-redux/search';
 *
 * const mapStateToProps = state => ({
 *     isLoading: isSearchDidYouMeanLoading(state)
 * });
 *
 * ```
 *
 * @param state - Application state.
 *
 * @returns Whether a search term response is loading or not.
 */
export const isSearchDidYouMeanLoading = (state: StoreState) =>
  fromSearchDidYouMeanReducer.getIsLoading(
    (state.search as SearchState).didYouMean,
  );

/**
 * Retrieves the current query applied to get did you mean results.
 *
 * @example
 * ```
 * import { getSearchDidYouMeanQuery } from '@farfetch/blackout-redux/search';
 *
 * const mapStateToProps = state => ({
 *     query: getSearchDidYouMeanQuery(state)
 * });
 *
 * ```
 *
 * @param state - Application state.
 *
 * @returns The current query.
 */
export const getSearchDidYouMeanQuery = (state: StoreState) =>
  fromSearchDidYouMeanReducer.getQuery(
    (state.search as SearchState).didYouMean,
  );

/**
 * Retrieves the facets of a specific search for did you mean.
 *
 * @example
 * ```
 * import { getSearchDidYouMeanResult } from '@farfetch/blackout-redux/search';
 *
 * const mapStateToProps = state => ({
 *     result: getSearchDidYouMeanResult(state)
 * });
 *
 * ```
 *
 * @param state - Application state.
 *
 * @returns Facets of a specific search.
 */
export const getSearchDidYouMeanResult = (state: StoreState) =>
  fromSearchDidYouMeanReducer.getResult(
    (state.search as SearchState).didYouMean,
  );
