import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';
import type { ResetWishlistSetsStateAction } from '../types';

/**
 * Reset wishlist sets state to its initial value.
 *
 * @param fieldsToReset - List of fields to reset during the reset operation.
 *
 * @returns Dispatch reset wishlists sets state action.
 */
const resetWishlistSetsState =
  (fieldsToReset?: string[]) =>
  (dispatch: Dispatch<ResetWishlistSetsStateAction>): void => {
    dispatch({
      payload: { fieldsToReset },
      type: actionTypes.RESET_WISHLIST_SETS_STATE,
    });
  };

export default resetWishlistSetsState;
