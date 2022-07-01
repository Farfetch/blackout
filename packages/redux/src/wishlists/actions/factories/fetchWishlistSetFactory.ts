import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetWishlistSet,
  toBlackoutError,
  WishlistSet,
} from '@farfetch/blackout-client';
import { getWishlistId } from '../../selectors';
import { normalize } from 'normalizr';
import wishlistSetSchema from '../../../entities/schemas/wishlistSet';
import type { Dispatch } from 'redux';
import type { FetchWishlistSetAction } from '../../types';
import type { StoreState } from '../../../types';

/**
 * @param wishlistSetId - Wishlist set id to retrieve information from.
 * @param config        - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to get information
 * of a set from a wishlist.
 *
 * @param getWishlistSet - Get wishlists set client.
 *
 * @returns Thunk factory.
 */
const fetchWishlistSetFactory =
  (getWishlistSet: GetWishlistSet) =>
  (wishlistSetId: WishlistSet['setId'], config?: Config) =>
  async (
    dispatch: Dispatch<FetchWishlistSetAction>,
    getState: () => StoreState,
  ): Promise<WishlistSet | undefined> => {
    try {
      const state = getState();
      const wishlistId = getWishlistId(state);

      if (!wishlistSetId) {
        throw new Error('No wishlist set id is set');
      }

      if (!wishlistId) {
        throw new Error('No wishlist id is set');
      }

      dispatch({
        meta: { wishlistSetId },
        type: actionTypes.FETCH_WISHLIST_SET_REQUEST,
      });

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
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_WISHLIST_SET_FAILURE,
      });

      throw error;
    }
  };

export default fetchWishlistSetFactory;
