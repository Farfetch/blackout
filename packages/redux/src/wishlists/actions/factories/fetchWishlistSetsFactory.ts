import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetWishlistSets,
  toBlackoutError,
  WishlistSets,
} from '@farfetch/blackout-client';
import { getWishlistId } from '../../selectors';
import { normalize } from 'normalizr';
import wishlistSetSchema from '../../../entities/schemas/wishlistSet';
import type { Dispatch } from 'redux';
import type { FetchWishlistSetsAction } from '../../types';
import type { StoreState } from '../../../types';

/**
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to load wishlist
 * sets for a given wishlist id.
 *
 * @param getWishlistSets - Get wishlists sets client.
 *
 * @returns Thunk factory.
 */
const fetchWishlistSetsFactory =
  (getWishlistSets: GetWishlistSets) =>
  (config?: Config) =>
  async (
    dispatch: Dispatch<FetchWishlistSetsAction>,
    getState: () => StoreState,
  ): Promise<WishlistSets | undefined> => {
    try {
      const state = getState();
      const wishlistId = getWishlistId(state);

      if (!wishlistId) {
        throw new Error('No wishlist id is set');
      }

      dispatch({
        type: actionTypes.FETCH_WISHLIST_SETS_REQUEST,
      });

      const result = await getWishlistSets(wishlistId, config);

      dispatch({
        payload: normalize(result, [wishlistSetSchema]),
        type: actionTypes.FETCH_WISHLIST_SETS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_WISHLIST_SETS_FAILURE,
      });

      throw error;
    }
  };

export default fetchWishlistSetsFactory;
