import * as actionTypes from '../actionTypes';
import { getWishlistId } from '../selectors';

/**
 * @callback DeleteWishlistSetThunkFactory
 * @param {string} wishlistSetId - Wishlist set id to remove.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Remove a set from the wishlist.
 *
 * @function doDeleteWishlistSet
 * @memberof module:wishlists/actions
 *
 * @param {Function} deleteWishlistsSet - Delete wishlists set client.
 *
 * @returns {DeleteWishlistSetThunkFactory} Thunk factory.
 */
export default deleteWishlistsSet =>
  (wishlistSetId, config) =>
  async (dispatch, getState) => {
    const state = getState();
    const wishlistId = getWishlistId(state);

    dispatch({
      meta: { wishlistSetId },
      type: actionTypes.DELETE_WISHLIST_SET_REQUEST,
    });

    try {
      await deleteWishlistsSet(wishlistId, wishlistSetId, config);

      dispatch({
        meta: { wishlistSetId },
        type: actionTypes.DELETE_WISHLIST_SET_SUCCESS,
      });
    } catch (error) {
      dispatch({
        meta: { wishlistSetId },
        payload: { error },
        type: actionTypes.DELETE_WISHLIST_SET_FAILURE,
      });

      throw error;
    }
  };
