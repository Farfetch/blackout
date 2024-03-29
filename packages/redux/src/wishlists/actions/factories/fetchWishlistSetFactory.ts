import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetWishlistSet,
  toBlackoutError,
  type Wishlist,
  type WishlistSet,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import wishlistSetSchema from '../../../entities/schemas/wishlistSet.js';
import type { Dispatch } from 'redux';
import type { FetchWishlistSetAction } from '../../types/index.js';

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
  (
    wishlistId: Wishlist['id'],
    wishlistSetId: WishlistSet['setId'],
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch<FetchWishlistSetAction>,
  ): Promise<WishlistSet | undefined> => {
    try {
      if (!wishlistSetId) {
        throw new Error('No wishlist set id is set');
      }

      dispatch({
        meta: { wishlistSetId },
        type: actionTypes.FETCH_WISHLIST_SET_REQUEST,
      });

      const result = await getWishlistSet(wishlistId, wishlistSetId, config);

      await dispatch({
        meta: { wishlistSetId },
        payload: normalize(result, wishlistSetSchema),
        type: actionTypes.FETCH_WISHLIST_SET_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { wishlistSetId },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_WISHLIST_SET_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchWishlistSetFactory;
