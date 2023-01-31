import * as actionTypes from '../actionTypes';
import { getWishlistId } from '../selectors';
import { normalize } from 'normalizr';
import wishlistSchema from '../../../entities/schemas/wishlist';

/**
 * @callback AddWishlistItemThunkFactory
 * @param {object} data - Item data used to add it to wishlist.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Add item with given data to the wishlist.
 *
 * @function doAddWishlistItem
 * @memberof module:wishlists/actions
 *
 * @param {Function} postWishlistItem - Post wishlist item client.
 *
 * @returns {AddWishlistItemThunkFactory} Thunk factory.
 */
export default postWishlistItem =>
  (data, config) =>
  async (dispatch, getState, { getOptions = arg => ({ arg }) }) => {
    const state = getState();
    const wishlistId = getWishlistId(state);

    // Do not add product if there's no wishlist set yet
    if (!wishlistId) {
      throw new Error('No wishlist id is set');
    }

    dispatch({
      type: actionTypes.ADD_ITEM_TO_WISHLIST_REQUEST,
    });

    try {
      const result = await postWishlistItem(wishlistId, data, config);
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
        type: actionTypes.ADD_ITEM_TO_WISHLIST_SUCCESS,
        meta: {
          ...data,
          wishlistId,
          ...config,
        },
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: actionTypes.ADD_ITEM_TO_WISHLIST_FAILURE,
      });

      throw error;
    }
  };
