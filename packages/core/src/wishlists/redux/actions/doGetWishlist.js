import * as actionTypes from '../actionTypes';
import { normalize } from 'normalizr';
import wishlistSchema from '../../../entities/schemas/wishlist';

/**
 * @callback GetWishlistThunkFactory
 * @param {number} wishlistId - Wishlist id.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load wishlist with given id.
 *
 * @function doGetWishlist
 * @memberof module:wishlists/actions
 *
 * @param {Function} getWishlist - Get wishlist client.
 *
 * @returns {GetWishlistThunkFactory} Thunk factory.
 */
export default getWishlist =>
  (wishlistId, config) =>
  async (dispatch, getState, { getOptions = arg => ({ arg }) }) => {
    dispatch({
      type: actionTypes.GET_WISHLIST_REQUEST,
    });

    try {
      const result = await getWishlist(wishlistId, config);
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
        type: actionTypes.GET_WISHLIST_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: actionTypes.GET_WISHLIST_FAILURE,
      });

      throw error;
    }
  };
