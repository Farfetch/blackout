import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';
import type { ResetProductsListsStateAction } from '../types';

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
 * @returns Dispatch reset products list state action.
 */
export const resetProductsListsState =
  () =>
  (dispatch: Dispatch<ResetProductsListsStateAction>): void => {
    dispatch({
      type: actionTypes.RESET_PRODUCTS_LISTS_STATE,
    });
  };
