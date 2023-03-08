import * as actionTypes from '../actionTypes/index.js';
import type { Dispatch } from 'redux';
import type { ProductEntity } from '../../entities/types/index.js';
import type { ResetProductDetailsStateAction } from '../types/index.js';

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
const resetProductDetailsState =
  (productIds?: Array<ProductEntity['id']>) =>
  (dispatch: Dispatch<ResetProductDetailsStateAction>): void => {
    dispatch({
      type: actionTypes.RESET_PRODUCT_DETAILS_STATE,
      payload: productIds,
    });
  };

export default resetProductDetailsState;
