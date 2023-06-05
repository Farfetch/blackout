import { RESET_SHARED_WISHLIST_STATE } from '../actionTypes';

/**
 * Reset shared wishist state to its initial value.
 *
 * @function resetState
 * @memberof module:sharedWishlists/actions
 *
 * @param {Array} [fieldsToReset=[]] - List of fields to reset during the reset
 * operation.
 *
 * @example <caption>Reset with no fields to reset, resetting all</caption>
 *
 * import { resetState } from '@farfetch/blackout-core/sharedWishlist/redux';
 *
 * dispatch(resetWishlistState(["error"]));
 *
 * // State object before executing action
 * const state = {
 *  result: '123-456-789',
 *  error: { message: 'error },
 *  isLoading: false,
 * };
 *
 * // Result:
 *  {
 *   result: '123-456-789',
 *   error: null,
 *   isLoading: false,
 *  };
 */

export default fieldsToReset => dispatch => {
  dispatch({
    payload: { fieldsToReset },
    type: RESET_SHARED_WISHLIST_STATE,
  });
};
