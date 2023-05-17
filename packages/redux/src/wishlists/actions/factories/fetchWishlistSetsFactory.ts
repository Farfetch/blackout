import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetWishlistSets,
  toBlackoutError,
  type Wishlist,
  type WishlistSets,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import wishlistSetSchema from '../../../entities/schemas/wishlistSet.js';
import type { Dispatch } from 'redux';
import type { FetchWishlistSetsAction } from '../../types/index.js';

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
  (wishlistId: Wishlist['id'], config?: Config) =>
  async (
    dispatch: Dispatch<FetchWishlistSetsAction>,
  ): Promise<WishlistSets | undefined> => {
    try {
      dispatch({
        type: actionTypes.FETCH_WISHLIST_SETS_REQUEST,
      });

      const result = await getWishlistSets(wishlistId, config);

      await dispatch({
        payload: normalize(result, [wishlistSetSchema]),
        type: actionTypes.FETCH_WISHLIST_SETS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_WISHLIST_SETS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchWishlistSetsFactory;
