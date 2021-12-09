import * as actionTypes from '../actionTypes';
import { getWishlistId } from '../selectors';
import doGetWishlistSet from './doGetWishlistSet';

/**
 * @callback UpdateWishlistSetThunkFactory
 * @param {string} wishlistSetId - Wishlist set id to retrieve information from.
 * @param {object} data - Data to update the wishlist set.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Update information of a set from the wishlist.
 *
 * @function doUpdateWishlistSet
 * @memberof module:wishlists/actions
 *
 * @param {Function} patchWishlistsSet - Patch wishlists set client.
 * @param {Function} getWishlistsSet - Get wishlists set client.
 *
 * @returns {UpdateWishlistSetThunkFactory} Thunk factory.
 */
export default (patchWishlistsSet, getWishlistsSet) =>
  (wishlistSetId, data, config) =>
  async (dispatch, getState) => {
    const state = getState();
    const wishlistId = getWishlistId(state);

    dispatch({
      meta: { wishlistSetId },
      type: actionTypes.UPDATE_WISHLIST_SET_REQUEST,
    });

    try {
      await patchWishlistsSet(wishlistId, wishlistSetId, data, config);

      dispatch({
        meta: { wishlistSetId, data, ...config },
        type: actionTypes.UPDATE_WISHLIST_SET_SUCCESS,
      });

      // Since the PATCH returns 204 (No Content), get the updated set
      const getWishlistSetAction = doGetWishlistSet(getWishlistsSet);

      await dispatch(getWishlistSetAction(wishlistSetId));
    } catch (error) {
      dispatch({
        meta: { wishlistSetId },
        payload: { error },
        type: actionTypes.UPDATE_WISHLIST_SET_FAILURE,
      });

      throw error;
    }
  };
