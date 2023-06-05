import * as actionTypes from '../actionTypes';

/**
 * @callback DeleteSharedWishlistThunkFactory
 * @param {string} sharedWishlistId - Shared wislist id to remove.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Remove a shared wishlist.
 *
 * @function doRemoveSharedWishlist
 * @memberof module:sharedWishlists/actions
 *
 * @param {Function} deleteSharedWishlist - Delete shared wishlist client.
 *
 *  @returns {DeleteSharedWishlistThunkFactory} Thunk factory.
 */
export default deleteSharedWishlist =>
  (sharedWishlistId, config) =>
  async dispatch => {
    try {
      dispatch({
        type: actionTypes.REMOVE_SHARED_WISHLIST_REQUEST,
      });

      const result = await deleteSharedWishlist(sharedWishlistId, config);

      dispatch({
        type: actionTypes.REMOVE_SHARED_WISHLIST_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: actionTypes.REMOVE_SHARED_WISHLIST_FAILURE,
      });

      throw error;
    }
  };
