import * as actionTypes from '../actionTypes/index.js';
import type { Dispatch } from 'redux';
import type { ResetProductListsStateAction } from '../types/index.js';

/**
 * Reset products lists state to its initial value.
 *
 * @example
 * ```
 * import { resetProductsListsState } from '@farfetch/blackout-redux';
 *
 * // State before executing action
 * const state = {
 *     hash: '123-foo',
 *     error: {'123-foo': 'Error'},
 *     isLoading: {'123-foo': false},
 *     ...
 * };
 *
 * // Result of reset:
 * const state =  { hash: null, error: {}, isLoading: {}, isHydrated: {} }
 *
 * // Usage
 * dispatch(resetProductsListsState());
 *
 * ```
 *
 * @returns Dispatch reset product list state action.
 */
const resetProductsListsState =
  (productsListsHashes?: Array<string>) =>
  (dispatch: Dispatch<ResetProductListsStateAction>): void => {
    dispatch({
      type: actionTypes.RESET_PRODUCTS_LISTS_STATE,
      payload: productsListsHashes,
    });
  };

export default resetProductsListsState;
