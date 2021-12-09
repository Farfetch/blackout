import * as actionTypes from '../actionTypes';
import { getWishlistId, getWishlistItem } from '../selectors';
import { normalize } from 'normalizr';
import wishlistSchema from '../../../entities/schemas/wishlist';

/**
 * @callback DeleteWishlistItemThunkFactory
 * @param {string} wishlistItemId - Wishlist item id.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Delete wishlist item with given id.
 *
 * @function doDeleteWishlistItem
 * @memberof module:wishlists/actions
 *
 * @param {Function} deleteWishlistItem - Delete wishlist item client.
 *
 * @returns {DeleteWishlistItemThunkFactory} Thunk factory.
 */
export default deleteWishlistItem =>
  (wishlistItemId, config) =>
  async (dispatch, getState) => {
    const state = getState();
    const wishlistId = getWishlistId(state);
    const wishlistItem = getWishlistItem(state, wishlistItemId);

    dispatch({
      meta: { wishlistItemId },
      type: actionTypes.DELETE_WISHLIST_ITEM_REQUEST,
    });

    try {
      const result = await deleteWishlistItem(
        wishlistId,
        wishlistItemId,
        config,
      );

      dispatch({
        payload: normalize(result, wishlistSchema),
        type: actionTypes.DELETE_WISHLIST_ITEM_SUCCESS,
        meta: {
          productId: wishlistItem.product.id,
          wishlistItemId,
          wishlistId,
          ...config,
        },
      });
    } catch (error) {
      dispatch({
        meta: { wishlistItemId },
        payload: { error },
        type: actionTypes.DELETE_WISHLIST_ITEM_FAILURE,
      });

      throw error;
    }
  };
