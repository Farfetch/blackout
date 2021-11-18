import * as actionTypes from '../actionTypes';
import { getWishlistId } from '../selectors';
import { normalize } from 'normalizr';
import wishlistSetSchema from '../../../entities/schemas/wishlistSet';

/**
 * @callback AddWishlistSetThunkFactory
 * @param {object} data - Details of the set to add to the wishlist.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Add a new set to the wishlist.
 *
 * @function doAddWishlistSet
 * @memberof module:wishlists/actions
 *
 * @param {Function} postWishlistsSet - Post wishlists set client.
 *
 * @returns {AddWishlistSetThunkFactory} Thunk factory.
 */
export default postWishlistsSet =>
  (data, config) =>
  async (dispatch, getState) => {
    const state = getState();
    const wishlistId = getWishlistId(state);

    // Do not add the set if there's no wishlist id yet
    if (!wishlistId) {
      throw new Error('No wishlist id is set');
    }

    dispatch({
      type: actionTypes.ADD_WISHLIST_SET_REQUEST,
    });

    try {
      const result = await postWishlistsSet(wishlistId, data, config);

      dispatch({
        payload: normalize(result, wishlistSetSchema),
        type: actionTypes.ADD_WISHLIST_SET_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: actionTypes.ADD_WISHLIST_SET_FAILURE,
      });

      throw error;
    }
  };
