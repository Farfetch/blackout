import * as actionTypes from '../actionTypes';
import { normalize } from 'normalizr';
import sharedWishlistSchema from '../../../entities/schemas/sharedWishlist';

/**
 * @callback GetSharedWishlistThunkFactory
 * @param {string} sharedWishlistId - Universal identifier of the shared wishlist.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load shared wishlist with given id.
 *
 * @function doFetchSharedWishlist
 * @memberof module:wishlists/actions
 *
 * @param {Function} getSharedWishlist - Get shared wishlist client.
 *
 * @returns {GetSharedWishlistThunkFactory} Thunk factory.
 */

export default getSharedWishlist =>
  (sharedWishlistId, config) =>
  async (dispatch, getState, { getOptions = arg => ({ arg }) }) => {
    try {
      dispatch({
        meta: { sharedWishlistId },
        type: actionTypes.FETCH_SHARED_WISHLIST_REQUEST,
      });

      const result = await getSharedWishlist(sharedWishlistId, config);
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
        type: actionTypes.FETCH_SHARED_WISHLIST_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: actionTypes.FETCH_SHARED_WISHLIST_FAILURE,
      });

      throw error;
    }
  };
