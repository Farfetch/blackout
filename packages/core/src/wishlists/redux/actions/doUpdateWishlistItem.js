import * as actionTypes from '../actionTypes';
import { getWishlistId, getWishlistItem } from '../selectors';
import { normalize } from 'normalizr';
import wishlistSchema from '../../../entities/schemas/wishlist';

/**
 * @callback UpdateWishlistItemThunkFactory
 * @param {string} wishlistItemId - Wishlist item id.
 * @param {object} data - Data to update the wishlist item.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Updates wishlist item with given `data`.
 *
 * @function doUpdateWishlistItem
 * @memberof module:wishlists/actions
 *
 * @param {Function} patchWishlistItem - Patch wishlist item client.
 *
 * @returns {UpdateWishlistItemThunkFactory} Thunk factory.
 */
export default patchWishlistItem =>
  (wishlistItemId, data, config) =>
  async (dispatch, getState, { getOptions = arg => ({ arg }) }) => {
    const state = getState();
    const wishlistId = getWishlistId(state);
    const wishlistItem = getWishlistItem(state, wishlistItemId);

    dispatch({
      meta: { wishlistItemId },
      type: actionTypes.UPDATE_WISHLIST_ITEM_REQUEST,
    });

    try {
      const result = await patchWishlistItem(
        wishlistId,
        wishlistItemId,
        data,
        config,
      );
      const { productImgQueryParam } = getOptions(getState);

      dispatch({
        payload: normalize(
          {
            // Send this to the entity's `adaptProductImages`
            productImgQueryParam,
            ...result,
          },
          wishlistSchema,
        ),
        type: actionTypes.UPDATE_WISHLIST_ITEM_SUCCESS,
        meta: {
          productId: wishlistItem.product.id,
          wishlistItemId,
          ...data,
        },
      });
    } catch (error) {
      dispatch({
        meta: { wishlistItemId },
        payload: { error },
        type: actionTypes.UPDATE_WISHLIST_ITEM_FAILURE,
      });

      throw error;
    }
  };
