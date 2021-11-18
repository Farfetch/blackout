import * as actionTypes from '../actionTypes';
import { getWishlistId } from '../selectors';
import { normalize } from 'normalizr';
import wishlistSetSchema from '../../../entities/schemas/wishlistSet';

/**
 * @callback GetWishlistSetsThunkFactory
 * @param {string} wishlistId - Wishlist id to get the sets from.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load wishlist sets for a given wishlist id.
 *
 * @function doGetWishlistSets
 * @memberof module:wishlists/actions
 *
 * @param {Function} getWishlistsSets - Get wishlists sets client.
 *
 * @returns {GetWishlistSetsThunkFactory} Thunk factory.
 */
export default getWishlistsSets => config => async (dispatch, getState) => {
  const state = getState();
  const wishlistId = getWishlistId(state);

  dispatch({
    type: actionTypes.GET_WISHLIST_SETS_REQUEST,
  });

  try {
    const result = await getWishlistsSets(wishlistId, config);

    dispatch({
      payload: normalize(result, [wishlistSetSchema]),
      type: actionTypes.GET_WISHLIST_SETS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: actionTypes.GET_WISHLIST_SETS_FAILURE,
    });

    throw error;
  }
};
