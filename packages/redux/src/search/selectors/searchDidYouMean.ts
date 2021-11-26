import * as fromSearchDidYouMeanReducer from '../reducer/searchDidYouMean';
import type { Error } from '@farfetch/blackout-client/types';
import type {
  SearchDidYouMean,
  SearchDidYouMeanQuery,
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
 * import { getSearchDidYouMeanError } from '@farfetch/blackout-redux/search';
 *
 * const mapStateToProps = state => ({
 *     error: getSearchDidYouMeanError(state)
 * });
 *
 */
export const getSearchDidYouMeanError = (state: StoreState): Error | null =>
  fromSearchDidYouMeanReducer.getError(state.search.didYouMean);

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
 * import { isSearchDidYouMeanLoading } from '@farfetch/blackout-redux/search';
 *
 * const mapStateToProps = state => ({
 *     isLoading: isSearchDidYouMeanLoading(state)
 * });
 *
 */
export const isSearchDidYouMeanLoading = (state: StoreState): boolean =>
  fromSearchDidYouMeanReducer.getIsLoading(state.search.didYouMean);

/**
 * Retrieves the current query applied to get did you mean results.
 *
 * @memberof module:search/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {?object} The current query.
 *
 * @example
 * import { getSearchDidYouMeanQuery } from '@farfetch/blackout-redux/search';
 *
 * const mapStateToProps = state => ({
 *     query: getSearchDidYouMeanQuery(state)
 * });
 *
 */
export const getSearchDidYouMeanQuery = (
  state: StoreState,
): SearchDidYouMeanQuery | null =>
  fromSearchDidYouMeanReducer.getQuery(state.search.didYouMean);

/**
 * Retrieves the facets of a specific search for did you mean.
 *
 * @memberof module:search/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {?Array} Facets of a specific search.
 *
 * @example
 * import { getSearchDidYouMeanResult } from '@farfetch/blackout-redux/search';
 *
 * const mapStateToProps = state => ({
 *     result: getSearchDidYouMeanResult(state)
 * });
 *
 */
export const getSearchDidYouMeanResult = (
  state: StoreState,
): SearchDidYouMean[] | null =>
  fromSearchDidYouMeanReducer.getResult(state.search.didYouMean);
