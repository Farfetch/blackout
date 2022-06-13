import { RESET_PRODUCT_DETAILS_STATE } from '../actionTypes';
import type { Dispatch } from 'redux';
import type { ResetProductDetailsStateAction } from '../types';

/**
 * Reset details state to its initial value.
 *
 * @example
 * ```
 * import { resetProductDetailsState } from '@farfetch/blackout-redux';
 *
 * // State before executing action
 * const state = { id: '123', error: null, isLoading: false, isHydrated: ... };
 *
 * // Result of resetProductDetailsState
 * const state =  { id: null, error: null, isLoading: false, isHydrated: {} }
 *
 * // Usage
 * dispatch(resetProductDetailsState());
 *
 * ```
 *
 * @returns Dispatch reset details state action.
 */
export const resetProductDetailsState =
  () =>
  (dispatch: Dispatch<ResetProductDetailsStateAction>): void => {
    dispatch({
      type: RESET_PRODUCT_DETAILS_STATE,
    });
  };
