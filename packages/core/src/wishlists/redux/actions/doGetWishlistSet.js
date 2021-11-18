import * as actionTypes from '../actionTypes';
import { getWishlistId } from '../selectors';
import { normalize } from 'normalizr';
import wishlistSetSchema from '../../../entities/schemas/wishlistSet';

/**
 * @callback GetWishlistSetThunkFactory
 * @param {string} wishlistSetId - Wishlist set id to retrieve information from.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Get information of a set from a wishlist.
 *
 * @function doGetWishlistSet
 * @memberof module:wishlists/actions
 *
 * @param {Function} getWishlistsSet - Get wishlists set client.
 *
 * @returns {GetWishlistSetThunkFactory} Thunk factory.
 */
export default getWishlistsSet =>
  (wishlistSetId, config) =>
  async (dispatch, getState) => {
    const state = getState();
    const wishlistId = getWishlistId(state);

    dispatch({
      meta: { wishlistSetId },
      type: actionTypes.GET_WISHLIST_SET_REQUEST,
    });

    try {
      const result = await getWishlistsSet(wishlistId, wishlistSetId, config);

      dispatch({
        meta: { wishlistSetId },
        payload: normalize(result, wishlistSetSchema),
        type: actionTypes.GET_WISHLIST_SET_SUCCESS,
      });
    } catch (error) {
      dispatch({
        meta: { wishlistSetId },
        payload: { error },
        type: actionTypes.GET_WISHLIST_SET_FAILURE,
      });

      throw error;
    }
  };
