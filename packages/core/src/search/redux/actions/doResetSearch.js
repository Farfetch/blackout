import doResetSearchDidYouMean from './doResetSearchDidYouMean';
import doResetSearchIntents from './doResetSearchIntents';
import doResetSearchSuggestions from './doResetSearchSuggestions';

/**
 * Reset search state: didYouMean, intents and suggestions.
 *
 * @function doResetSearch
 * @memberof module:search/actions
 *
 * @example
 * import { doResetSearch } from '@farfetch/blackout-core/search/redux';
 *
 * // State object before executing action
 * const state = {
 *     didYouMean: {
 *         error: { message: 'Error error' }
 *         isLoading: true,
 *         result: { foo: 'bar' }
 *     },
 *     intents: {
 *         error: { message: 'Error error' }
 *         isLoading: true,
 *         result: { foo: 'bar' }
 *     },
 *     suggestions: {
 *         error: { message: 'Error error' }
 *         isLoading: true,
 *         result: { foo: 'bar' }
 *     }
 * };
 *
 * // Result:
 * const state = {
 *     didYouMean: {
 *         error: null
 *         isLoading: false,
 *         result: null
 *     },
 *     intents: {
 *         error: null
 *         isLoading: false,
 *         result: null
 *     },
 *     suggestions: {
 *         error: null
 *         isLoading: false,
 *         result: null
 *     }
 * };
 *
 * dispatch(doResetSearch());
 *
 * @returns {Function} Thunk factory.
 */
export default () => dispatch => {
  dispatch(doResetSearchDidYouMean());
  dispatch(doResetSearchIntents());
  dispatch(doResetSearchSuggestions());
};
