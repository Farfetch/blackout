import { RESET_WISHLIST_SETS_STATE } from '../actionTypes';

/**
 * Reset wishlist sets state to its initial value.
 *
 * @function resetWishlistSetsState
 * @memberof module:wishlists/actions
 *
 * @param {Array} [fieldsToReset] List of fields to reset during the reset
 * operation.
 *
 * @returns {Function} Dispatch reset wishlists sets state action.
 */
export default fieldsToReset => dispatch => {
  dispatch({
    payload: { fieldsToReset },
    type: RESET_WISHLIST_SETS_STATE,
  });
};
