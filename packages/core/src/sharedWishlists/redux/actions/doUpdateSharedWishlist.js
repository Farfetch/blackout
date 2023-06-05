import * as actionTypes from '../actionTypes';
import { normalize } from 'normalizr';
import sharedWishlistSchema from '../../../entities/schemas/sharedWishlist';

/**
 * @callback UpdateSharedWishlistThunkFactory
 * @param {string} sharedWishlistId - Universal identifier of the shared wishlist.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Update a shared wishlist.
 *
 * @function doUpdateSharedWishlist
 * @memberof module:sharedWishlists/actions
 *
 * @param {Function} putSharedWishlist - Put shared wishlist client.
 *
 * @returns {UpdateSharedWishlistThunkFactory} Thunk factory.
 */
export default putSharedWishlist =>
  (sharedWishlistId, config) =>
  async (dispatch, getState, { getOptions = arg => ({ arg }) }) => {
    try {
      dispatch({
        type: actionTypes.UPDATE_SHARED_WISHLIST_REQUEST,
      });

      const result = await putSharedWishlist(sharedWishlistId, config);
      const { productImgQueryParam } = getOptions(getState);
      const newItems = result.items.map(item => ({
        ...item,
        productImgQueryParam,
      }));

      dispatch({
        payload: normalize(
          { ...result, items: newItems },
          sharedWishlistSchema,
        ),
        type: actionTypes.UPDATE_SHARED_WISHLIST_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: actionTypes.UPDATE_SHARED_WISHLIST_FAILURE,
      });

      throw error;
    }
  };
