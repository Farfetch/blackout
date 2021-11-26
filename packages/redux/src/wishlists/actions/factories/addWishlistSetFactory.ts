import * as actionTypes from '../../actionTypes';
import { getWishlistId } from '../../selectors';
import { normalize } from 'normalizr';
import wishlistSetSchema from '../../../entities/schemas/wishlistSet';
import type { AddWishlistSetAction } from '../../types';
import type { Dispatch } from 'redux';
import type {
  PostWishlistSet,
  PostWishlistSetData,
  WishlistSet,
} from '@farfetch/blackout-client/wishlists/types';
import type { StoreState } from '../../../types';

/**
 * @callback AddWishlistSetThunkFactory
 * @param {object} data - Details of the set to add to the wishlist.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client
 * to add a new set to the wishlist.
 *
 * @memberof module:wishlists/actions/factories
 *
 * @param {Function} postWishlistSet - Post wishlists set client.
 *
 * @returns {AddWishlistSetThunkFactory} Thunk factory.
 */
const addWishlistSetFactory =
  (postWishlistSet: PostWishlistSet) =>
  (data: PostWishlistSetData, config?: Record<string, unknown>) =>
  async (
    dispatch: Dispatch<AddWishlistSetAction>,
    getState: () => StoreState,
  ): Promise<WishlistSet | undefined> => {
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
      const result = await postWishlistSet(wishlistId, data, config);

      dispatch({
        payload: normalize(result, wishlistSetSchema),
        type: actionTypes.ADD_WISHLIST_SET_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: actionTypes.ADD_WISHLIST_SET_FAILURE,
      });

      throw error;
    }
  };

export default addWishlistSetFactory;
