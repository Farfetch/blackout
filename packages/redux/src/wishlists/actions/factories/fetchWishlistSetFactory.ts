import * as actionTypes from '../../actionTypes';
import { getWishlistId } from '../../selectors';
import { normalize } from 'normalizr';
import wishlistSetSchema from '../../../entities/schemas/wishlistSet';
import type { Dispatch } from 'redux';
import type { FetchWishlistSetAction } from '../../types';
import type {
  GetWishlistSet,
  WishlistSet,
} from '@farfetch/blackout-client/wishlists/types';
import type { StoreState } from '../../../types';

/**
 * @callback FetchWishlistSetThunkFactory
 * @param {string} wishlistSetId - Wishlist set id to retrieve information from.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client
 * to get information of a set from a wishlist.
 *
 * @memberof module:wishlists/actions/factories
 *
 * @param {Function} getWishlistSet - Get wishlists set client.
 *
 * @returns {FetchWishlistSetThunkFactory} Thunk factory.
 */
const fetchWishlistSetFactory =
  (getWishlistSet: GetWishlistSet) =>
  (wishlistSetId: WishlistSet['setId'], config?: Record<string, unknown>) =>
  async (
    dispatch: Dispatch<FetchWishlistSetAction>,
    getState: () => StoreState,
  ): Promise<WishlistSet | undefined> => {
    const state = getState();
    const wishlistId = getWishlistId(state);

    if (!wishlistId) {
      throw new Error('No wishlist id is set');
    }

    dispatch({
      meta: { wishlistSetId },
      type: actionTypes.FETCH_WISHLIST_SET_REQUEST,
    });

    try {
      const result = await getWishlistSet(wishlistId, wishlistSetId, config);

      dispatch({
        meta: { wishlistSetId },
        payload: normalize(result, wishlistSetSchema),
        type: actionTypes.FETCH_WISHLIST_SET_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { wishlistSetId },
        payload: { error },
        type: actionTypes.FETCH_WISHLIST_SET_FAILURE,
      });

      throw error;
    }
  };

export default fetchWishlistSetFactory;
